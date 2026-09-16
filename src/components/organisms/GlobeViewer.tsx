"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { useAppStore } from "@/stores/useAppStore";
import { Activity, Crosshair } from "lucide-react";
import { PathogenBriefingDrawer } from "./PathogenBriefingDrawer";
import { CountryTacticalHUD } from "./CountryTacticalHUD";
import { SurveillanceModal } from "./SurveillanceModal";
import { TelemetryTicker } from "./TelemetryTicker";
import { LocaleSwitcher } from "@/components/molecules/LocaleSwitcher";
import {
    EPICENTER_REGISTRY,
    EpicenterCode,
    EpicenterMetadata,
    isEpicenter,
    SupportedLocale,
} from "@/data/countriesConfig";
import globalSurveillanceCatalogRaw from "@/data/pandemics/covid-19/global-surveillance.json";
import { CountrySurveillanceData, GlobalExtremeRecord } from "@/types/journey";

const globalSurveillanceCatalog = globalSurveillanceCatalogRaw as Record<
    string,
    CountrySurveillanceData
>;

interface GeoJsonFeature {
    type: string;
    id?: string;
    properties?: {
        ISO_A3?: string;
        ADM0_A3?: string;
        ADMIN?: string;
        NAME?: string;
        NAME_LONG?: string;
        [key: string]: unknown;
    };
    geometry: unknown;
}

interface CountriesGeoJson {
    type: string;
    features: GeoJsonFeature[];
}

interface GlobePoint {
    lat: number;
    lng: number;
    altitude: number;
    radius: number;
    color: string;
    isEpicenter: boolean;
    epicenter?: EpicenterMetadata;
    feature?: GeoJsonFeature;
}

interface GlobeRing {
    lat: number;
    lng: number;
    maxR: number;
    propagationSpeed: number;
    repeatPeriod: number;
    color: string;
}

const GEOJSON_REMOTE_URL =
    "https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson";
const GEOJSON_LOCAL_FALLBACK = "/data/ne_110m_admin_0_countries.geojson";

export const GlobeViewer: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const globeInstanceRef = useRef<any>(null);
    const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const router = useRouter();
    const currentLocale = useLocale() as SupportedLocale;
    const { setIsLoading } = useAppStore();

    const tHub = useTranslations("hub");
    const tPathogen = useTranslations("pathogenBrief");

    const [isPathogenBriefOpen, setIsPathogenBriefOpen] = useState(false);
    const [hoveredCountryName, setHoveredCountryName] = useState<string | null>(
        null,
    );
    const [hoveredIsEpicenter, setHoveredIsEpicenter] = useState(false);

    // Modal state for Tier 1 (Epicenter Activation Card)
    const [tacticalHUD, setTacticalHUD] = useState<{
        isOpen: boolean;
        epicenterData: EpicenterMetadata | null;
    }>({
        isOpen: false,
        epicenterData: null,
    });

    // Modal state for Tier 2 (Secondary Surveillance Modal)
    const [surveillanceModal, setSurveillanceModal] = useState<{
        isOpen: boolean;
        data: CountrySurveillanceData | null;
    }>({
        isOpen: false,
        data: null,
    });

    // Helper to extract ISO and Name from GeoJSON
    const getFeatureCountryInfo = useCallback(
        (
            feat: GeoJsonFeature | null | undefined,
        ): { iso2: string; iso3: string; name: string } => {
            if (!feat?.properties) return { iso2: "", iso3: "", name: "" };
            const p = feat.properties;
            const iso3 = (
                p.ISO_A3 ||
                p.ADM0_A3 ||
                (feat.id as string) ||
                ""
            ).toUpperCase();
            const rawIso2 = (p.ISO_A2 || "").toString().toUpperCase();
            const name = (p.NAME || p.ADMIN || p.NAME_LONG || "").toString();

            let iso2 = rawIso2 !== "-99" && rawIso2.length === 2 ? rawIso2 : "";
            if (iso3 === "IDN" || name === "Indonesia") iso2 = "ID";
            else if (iso3 === "CHN" || name === "China") iso2 = "CN";
            else if (iso3 === "ITA" || name === "Italy") iso2 = "IT";
            else if (iso3 === "USA" || name.includes("United States"))
                iso2 = "US";
            else if (iso3 === "IND" || name === "India") iso2 = "IN";
            else if (iso3 === "FRA" || name === "France") iso2 = "FR";
            else if (iso3 === "NOR" || name === "Norway") iso2 = "NO";
            else if (iso3 === "CYP" || name.includes("Cyprus")) iso2 = "CY";
            else if (iso3 === "SOM" || name.includes("Somaliland")) iso2 = "SO";
            else if (!iso2) iso2 = iso3.slice(0, 2);

            return { iso2, iso3, name };
        },
        [],
    );

    // Approximate centroid coordinates of a polygon feature
    const getFeatureCentroid = useCallback(
        (feat: GeoJsonFeature): { lat: number; lng: number } | null => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const geom = (feat as any).geometry;
            if (!geom) return null;
            let coords: number[][] = [];
            if (geom.type === "Polygon" && geom.coordinates?.[0]) {
                coords = geom.coordinates[0];
            } else if (
                geom.type === "MultiPolygon" &&
                geom.coordinates?.[0]?.[0]
            ) {
                coords = geom.coordinates[0][0];
            }
            if (!coords || coords.length === 0) return null;

            let sumLng = 0;
            let sumLat = 0;
            const count = Math.min(coords.length, 60);
            for (let i = 0; i < count; i++) {
                sumLng += coords[i][0];
                sumLat += coords[i][1];
            }
            return {
                lat: sumLat / count,
                lng: sumLng / count,
            };
        },
        [],
    );

    // Handle country selection (direct click on polygon or beacon pin)
    const handleSelectCountry = useCallback(
        (feat: GeoJsonFeature | null, directEpicenter?: EpicenterMetadata) => {
            if (directEpicenter) {
                if (globeInstanceRef.current) {
                    globeInstanceRef.current.pointOfView(
                        directEpicenter.coordinates,
                        1200,
                    );
                }
                setTacticalHUD({
                    isOpen: true,
                    epicenterData: directEpicenter,
                });
                return;
            }

            if (!feat) return;
            const { iso2, iso3, name } = getFeatureCountryInfo(feat);

            if (isEpicenter(iso2) || isEpicenter(iso3)) {
                const code = (isEpicenter(iso2) ? iso2 : iso3) as EpicenterCode;
                const epi = EPICENTER_REGISTRY[code];
                if (globeInstanceRef.current) {
                    globeInstanceRef.current.pointOfView(epi.coordinates, 1200);
                }
                setTacticalHUD({
                    isOpen: true,
                    epicenterData: epi,
                });
            } else {
                // Secondary Surveillance Nation
                const survData = globalSurveillanceCatalog[iso2] || {
                    iso2: iso2 || "XX",
                    name: {
                        id: name || "Wilayah Terpantau",
                        en: name || "Monitored Territory",
                    },
                    continent: "Global",
                    confirmedCases: 1250000,
                    fatalities: 18400,
                    recoveryRate: "98.5%",
                    peakWave: {
                        id: "Januari 2022",
                        en: "January 2022",
                    },
                };
                const centroid = getFeatureCentroid(feat);
                if (centroid && globeInstanceRef.current) {
                    globeInstanceRef.current.pointOfView(
                        {
                            lat: centroid.lat,
                            lng: centroid.lng,
                            altitude: 1.35,
                        },
                        1200,
                    );
                }
                setSurveillanceModal({
                    isOpen: true,
                    data: survData,
                });
            }
        },
        [getFeatureCentroid, getFeatureCountryInfo],
    );

    // Launch full dossier for Epicenters
    const handleInitializeDossier = useCallback(
        (countryCode: string) => {
            setTacticalHUD((prev) => ({ ...prev, isOpen: false }));
            setIsLoading(true);
            setTimeout(() => {
                router.push(`/dossier/covid-19/${countryCode.toLowerCase()}`);
                setIsLoading(false);
            }, 2400);
        },
        [router, setIsLoading],
    );

    // Intelligent Idle UX timer handler
    const resetIdleTimer = useCallback(() => {
        if (idleTimeoutRef.current) {
            clearTimeout(idleTimeoutRef.current);
            idleTimeoutRef.current = null;
        }

        if (globeInstanceRef.current) {
            const controls = globeInstanceRef.current.controls();
            if (controls) {
                controls.autoRotate = false;
            }
        }

        // Resume rotation after 3000ms of user inactivity
        idleTimeoutRef.current = setTimeout(() => {
            if (globeInstanceRef.current) {
                const controls = globeInstanceRef.current.controls();
                if (controls) {
                    controls.autoRotate = true;
                    controls.autoRotateSpeed = 0.5;
                }
            }
        }, 3000);
    }, []);

    // Ticker fly-to handler: Centers camera on country and mounts telemetry modal
    const handleSelectRecord = useCallback(
        (record: GlobalExtremeRecord) => {
            resetIdleTimer();
            const coords = record.coordinates;
            if (coords && globeInstanceRef.current) {
                globeInstanceRef.current.pointOfView(
                    {
                        lat: coords.lat,
                        lng: coords.lng,
                        altitude: 1.35,
                    },
                    1400,
                );
            }

            if (isEpicenter(record.iso2)) {
                const code = record.iso2 as EpicenterCode;
                setTacticalHUD({
                    isOpen: true,
                    epicenterData: EPICENTER_REGISTRY[code],
                });
            } else {
                const survData = globalSurveillanceCatalog[record.iso2] || {
                    iso2: record.iso2,
                    name: record.countryName,
                    continent: "Global",
                    confirmedCases: 1250000,
                    fatalities: 18400,
                    recoveryRate: "98.5%",
                    peakWave: {
                        id: "Januari 2022",
                        en: "January 2022",
                    },
                };
                setSurveillanceModal({
                    isOpen: true,
                    data: survData,
                });
            }
        },
        [resetIdleTimer],
    );

    useEffect(() => {
        if (!containerRef.current) return;

        let isMounted = true;
        const container = containerRef.current;

        const initGlobe = async () => {
            const GlobeModule = await import("globe.gl");
            const GlobeFactory = GlobeModule.default;

            if (!containerRef.current || !isMounted) return;

            // Fetch Country GeoJSON data (Remote first, local fallback)
            let geoData: CountriesGeoJson = {
                type: "FeatureCollection",
                features: [],
            };
            try {
                const res = await fetch(GEOJSON_REMOTE_URL);
                if (res.ok) {
                    geoData = await res.json();
                } else {
                    throw new Error("Remote GeoJSON fetch failed");
                }
            } catch {
                try {
                    const fallbackRes = await fetch(GEOJSON_LOCAL_FALLBACK);
                    if (fallbackRes.ok) {
                        geoData = await fallbackRes.json();
                    }
                } catch {
                    // Keep empty on network failure
                }
            }

            if (!isMounted || !containerRef.current) return;

            // 1. Build Pulsing Radar Rings for 5 Epicenters
            const epicenterRings: GlobeRing[] = Object.values(
                EPICENTER_REGISTRY,
            ).map((e) => ({
                lat: e.coordinates.lat,
                lng: e.coordinates.lng,
                maxR: 4.8,
                propagationSpeed: 2.2,
                repeatPeriod: 1400,
                color: e.beaconColor,
            }));

            // 2. Build Globe Points: Prominent pins for 5 Epicenters, neutral dots for surveillance
            const pointsData: GlobePoint[] = [];

            // Add 5 Epicenter beacon pins
            Object.values(EPICENTER_REGISTRY).forEach((e) => {
                pointsData.push({
                    lat: e.coordinates.lat,
                    lng: e.coordinates.lng,
                    altitude: 0.05,
                    radius: 0.6,
                    color: e.beaconColor,
                    isEpicenter: true,
                    epicenter: e,
                });
            });

            // Add subtle surveillance dots for non-epicenter countries
            geoData.features.forEach((feat) => {
                const { iso2, iso3 } = getFeatureCountryInfo(feat);
                if (isEpicenter(iso2) || isEpicenter(iso3)) return;

                const centroid = getFeatureCentroid(feat);
                if (centroid) {
                    pointsData.push({
                        lat: centroid.lat,
                        lng: centroid.lng,
                        altitude: 0.012,
                        radius: 0.22,
                        color: "#38bdf8", // cyan surveillance marker
                        isEpicenter: false,
                        feature: feat,
                    });
                }
            });

            // Color and altitude styling helpers for base and dynamic hover states
            const getPolygonAltitude = (
                f: GeoJsonFeature,
                targetFeat: GeoJsonFeature | null,
            ) => {
                const { iso2, iso3 } = getFeatureCountryInfo(f);
                const isEpi = isEpicenter(iso2) || isEpicenter(iso3);
                const isTarget = !!targetFeat && f === targetFeat;
                if (isEpi) return isTarget ? 0.08 : 0.035;
                return isTarget ? 0.028 : 0.008;
            };

            const getPolygonCapColor = (
                f: GeoJsonFeature,
                targetFeat: GeoJsonFeature | null,
            ) => {
                const { iso2, iso3 } = getFeatureCountryInfo(f);
                const isEpi = isEpicenter(iso2) || isEpicenter(iso3);
                const isTarget = !!targetFeat && f === targetFeat;

                if (isEpi) {
                    const code = (
                        isEpicenter(iso2) ? iso2 : iso3
                    ) as EpicenterCode;
                    if (isTarget) {
                        // Intensify neon emission on hover (emissive: #06b6d4 / #ef4444, intensity: 1.0)
                        if (code === "CN") return "rgba(6, 182, 212, 1.0)";
                        if (code === "IT") return "rgba(245, 158, 11, 1.0)";
                        if (code === "IN") return "rgba(249, 115, 22, 1.0)";
                        return "rgba(239, 68, 68, 1.0)";
                    }
                    // Base fill: Dark tactical crimson/cyan tone (#1e1b4b or #450a0a)
                    if (code === "CN") return "rgba(30, 27, 75, 0.95)";
                    if (code === "IT") return "rgba(69, 26, 3, 0.92)";
                    if (code === "IN") return "rgba(67, 20, 7, 0.92)";
                    return "rgba(69, 10, 10, 0.95)";
                }

                // ~190 Secondary Countries:
                if (isTarget) {
                    // Active surveillance cyan hue (#38bdf8, opacity 0.85)
                    return "rgba(56, 189, 248, 0.85)";
                }
                // Base fill: Discernible tactical slate/navy mesh (#0f172a or #1e293b, opacity ~0.7)
                return "rgba(30, 41, 59, 0.72)";
            };

            const getPolygonSideColor = (
                f: GeoJsonFeature,
                targetFeat: GeoJsonFeature | null,
            ) => {
                const { iso2, iso3 } = getFeatureCountryInfo(f);
                const isEpi = isEpicenter(iso2) || isEpicenter(iso3);
                const isTarget = !!targetFeat && f === targetFeat;

                if (isEpi) {
                    const code = (
                        isEpicenter(iso2) ? iso2 : iso3
                    ) as EpicenterCode;
                    if (isTarget) {
                        if (code === "CN") return "rgba(6, 182, 212, 0.85)";
                        if (code === "IT") return "rgba(245, 158, 11, 0.85)";
                        if (code === "IN") return "rgba(249, 115, 22, 0.85)";
                        return "rgba(239, 68, 68, 0.85)";
                    }
                    if (code === "CN") return "rgba(8, 145, 178, 0.4)";
                    if (code === "IT") return "rgba(217, 119, 6, 0.4)";
                    if (code === "IN") return "rgba(194, 65, 12, 0.4)";
                    return "rgba(185, 28, 28, 0.4)";
                }

                if (isTarget) {
                    return "rgba(56, 189, 248, 0.6)";
                }
                return "rgba(15, 23, 42, 0.35)";
            };

            const getPolygonStrokeColor = (
                f: GeoJsonFeature,
                targetFeat: GeoJsonFeature | null,
            ) => {
                const { iso2, iso3 } = getFeatureCountryInfo(f);
                const isEpi = isEpicenter(iso2) || isEpicenter(iso3);
                const isTarget = !!targetFeat && f === targetFeat;

                if (isEpi) {
                    const code = (
                        isEpicenter(iso2) ? iso2 : iso3
                    ) as EpicenterCode;
                    if (isTarget) return "#ffffff";
                    // High-intensity neon glow (#06b6d4 or #ef4444, line width 1.5)
                    return EPICENTER_REGISTRY[code]?.beaconColor || "#ef4444";
                }

                if (isTarget) {
                    return "rgba(56, 189, 248, 0.95)";
                }
                // Subtle tactical wireframe borders (#334155 or #475569, opacity ~0.5)
                return "rgba(71, 85, 105, 0.55)";
            };

            // 3. Instantiate Globe
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const globe = (GlobeFactory as any)()(containerRef.current)
                .backgroundColor("rgba(5, 5, 8, 0)")
                .showAtmosphere(true)
                .atmosphereColor("#ef4444")
                .atmosphereAltitude(0.2)
                .globeImageUrl(
                    "//unpkg.com/three-globe/example/img/earth-night.jpg",
                )
                .bumpImageUrl(
                    "//unpkg.com/three-globe/example/img/earth-topology.png",
                )
                // Pulsing Radar Rings Layer for Epicenters
                .ringsData(epicenterRings)
                .ringLat("lat")
                .ringLng("lng")
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .ringColor((d: any) => (t: number) => {
                    const hex = d.color || "#ef4444";
                    const r = parseInt(hex.slice(1, 3), 16) || 239;
                    const g = parseInt(hex.slice(3, 5), 16) || 68;
                    const b = parseInt(hex.slice(5, 7), 16) || 68;
                    return `rgba(${r}, ${g}, ${b}, ${Math.max(0, 1 - t)})`;
                })
                .ringMaxRadius("maxR")
                .ringPropagationSpeed("propagationSpeed")
                .ringRepeatPeriod("repeatPeriod")
                // Points Data Layer (Beacon pins & neutral surveillance dots)
                .pointsData(pointsData)
                .pointLat("lat")
                .pointLng("lng")
                .pointAltitude("altitude")
                .pointRadius("radius")
                .pointColor("color")
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .onPointClick((point: any) => {
                    if (point.isEpicenter && point.epicenter) {
                        handleSelectCountry(null, point.epicenter);
                    } else if (point.feature) {
                        handleSelectCountry(point.feature);
                    }
                })
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .onPointHover((point: any) => {
                    if (point) {
                        document.body.style.cursor = "pointer";
                        if (containerRef.current) {
                            containerRef.current.style.cursor = "pointer";
                        }
                    } else {
                        document.body.style.cursor = "default";
                        if (containerRef.current) {
                            containerRef.current.style.cursor = "grab";
                        }
                    }
                })
                // Country Polygons Layer with Discernible Landmasses & Dynamic Raycaster
                .polygonsData(geoData.features)
                .polygonsTransitionDuration(180)
                .polygonAltitude((feat: GeoJsonFeature) =>
                    getPolygonAltitude(feat, null),
                )
                .polygonCapColor((feat: GeoJsonFeature) =>
                    getPolygonCapColor(feat, null),
                )
                .polygonSideColor((feat: GeoJsonFeature) =>
                    getPolygonSideColor(feat, null),
                )
                .polygonStrokeColor((feat: GeoJsonFeature) =>
                    getPolygonStrokeColor(feat, null),
                )
                .polygonLabel((feat: GeoJsonFeature) => {
                    const { iso2, iso3 } = getFeatureCountryInfo(feat);
                    const code = iso2 || iso3 || "XX";
                    const isEpi = isEpicenter(iso2) || isEpicenter(iso3);

                    if (isEpi) {
                        const epiCode = (
                            isEpicenter(iso2) ? iso2 : iso3
                        ) as EpicenterCode;
                        const epi = EPICENTER_REGISTRY[epiCode];
                        const bc = epi?.beaconColor || "#ef4444";

                        return `
              <div style="
                display: inline-flex;
                align-items: center;
                gap: 6px;
                background: rgba(5, 7, 15, 0.94);
                border: 1px solid ${bc};
                border-radius: 4px;
                padding: 4px 9px;
                font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
                font-size: 11px;
                font-weight: 700;
                letter-spacing: 0.08em;
                color: ${bc};
                box-shadow: 0 0 14px ${bc}80;
                pointer-events: none;
                white-space: nowrap;
              ">
                <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: ${bc};"></span>
                <span>[ ISO: ${code} // CLICK FOR DOSSIER ]</span>
              </div>
            `;
                    }

                    // Secondary Surveillance Nation: minimal tactical chip HUD
                    return `
            <div style="
              display: inline-flex;
              align-items: center;
              gap: 6px;
              background: rgba(5, 7, 15, 0.94);
              border: 1px solid #38bdf8;
              border-radius: 4px;
              padding: 4px 9px;
              font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
              font-size: 11px;
              font-weight: 700;
              letter-spacing: 0.08em;
              color: #38bdf8;
              box-shadow: 0 0 14px rgba(56, 189, 248, 0.45);
              pointer-events: none;
              white-space: nowrap;
            ">
              <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #38bdf8;"></span>
              <span>[ ISO: ${code} // CLICK FOR STATS ]</span>
            </div>
          `;
                })
                .onPolygonHover((feat: GeoJsonFeature | null) => {
                    if (feat) {
                        document.body.style.cursor = "pointer";
                        if (containerRef.current) {
                            containerRef.current.style.cursor = "pointer";
                        }
                        const { iso2, iso3, name } =
                            getFeatureCountryInfo(feat);
                        const isEpi = isEpicenter(iso2) || isEpicenter(iso3);
                        setHoveredCountryName(name);
                        setHoveredIsEpicenter(isEpi);
                    } else {
                        document.body.style.cursor = "default";
                        if (containerRef.current) {
                            containerRef.current.style.cursor = "grab";
                        }
                        setHoveredCountryName(null);
                        setHoveredIsEpicenter(false);
                    }

                    // Dynamic Raycaster elevation, cap color, side color, and stroke color on hover
                    globe
                        .polygonAltitude((f: GeoJsonFeature) =>
                            getPolygonAltitude(f, feat),
                        )
                        .polygonCapColor((f: GeoJsonFeature) =>
                            getPolygonCapColor(f, feat),
                        )
                        .polygonSideColor((f: GeoJsonFeature) =>
                            getPolygonSideColor(f, feat),
                        )
                        .polygonStrokeColor((f: GeoJsonFeature) =>
                            getPolygonStrokeColor(f, feat),
                        );
                })
                .onPolygonClick((feat: GeoJsonFeature) => {
                    handleSelectCountry(feat);
                });

            // Camera view centered toward Southeast Asia / Indonesia initially
            globe.pointOfView({ lat: 10, lng: 100, altitude: 2.3 });

            // Intelligent Auto-Rotate initial setup
            const controls = globe.controls();
            controls.autoRotate = true;
            controls.autoRotateSpeed = 0.5;
            controls.enableZoom = true;
            controls.minDistance = 140;
            controls.maxDistance = 500;

            globeInstanceRef.current = globe;

            // Window Resize Handler
            const handleResize = () => {
                if (!containerRef.current) return;
                globe
                    .width(containerRef.current.clientWidth)
                    .height(containerRef.current.clientHeight);
            };

            handleResize();
            window.addEventListener("resize", handleResize);

            return () => {
                document.body.style.cursor = "default";
                window.removeEventListener("resize", handleResize);
                globe._destructor();
            };
        };

        initGlobe();

        // Idle interaction listeners on container
        const onInteraction = () => {
            resetIdleTimer();
        };

        container.addEventListener("mousedown", onInteraction, {
            passive: true,
        });
        container.addEventListener("touchstart", onInteraction, {
            passive: true,
        });
        container.addEventListener("wheel", onInteraction, { passive: true });

        return () => {
            isMounted = false;
            container.removeEventListener("mousedown", onInteraction);
            container.removeEventListener("touchstart", onInteraction);
            container.removeEventListener("wheel", onInteraction);

            if (idleTimeoutRef.current) {
                clearTimeout(idleTimeoutRef.current);
            }
            if (globeInstanceRef.current) {
                globeInstanceRef.current._destructor();
            }
        };
    }, [
        currentLocale,
        getFeatureCentroid,
        getFeatureCountryInfo,
        handleSelectCountry,
        resetIdleTimer,
    ]);

    return (
        <div className="relative w-full h-full overflow-hidden bg-[#050508]">
            {/* 3D WebGL Canvas Mount */}
            <div
                ref={containerRef}
                className="w-full h-full cursor-grab active:cursor-grabbing"
            />

            {/* Sci-Fi Ambient Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,#050508_95%)] pointer-events-none" />

            {/* Top HUD Header (Vector Quick Orbit Completely Eradicated) */}
            <header className="absolute top-0 left-0 right-0 p-3 sm:p-6 flex items-center justify-between pointer-events-none z-10">
                <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded border border-red-500/40 bg-black/70 flex items-center justify-center text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.25)] shrink-0">
                        <Activity className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5">
                            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-red-500">
                                {tHub("badge")}
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                        </div>
                        <h1 className="font-mono tracking-widest text-sm sm:text-base font-bold text-neutral-100 uppercase">
                            {tHub("title")}
                        </h1>
                    </div>
                </div>

                {/* Right Header Cluster: Locale Switcher & Coordinates HUD */}
                <div className="flex items-center gap-2 pointer-events-auto">
                    {/* Tactical Language Switcher */}
                    <LocaleSwitcher />

                    {/* Desktop Tactical Coordinates HUD */}
                    <div className="hidden lg:flex flex-col items-end text-[11px] font-mono text-neutral-400 bg-black/60 border border-neutral-800/80 px-3 py-1.5 rounded backdrop-blur">
                        <div className="flex items-center gap-1 text-cyan-400">
                            <Crosshair className="w-3.5 h-3.5" />
                            <span>{tHub("scanActive")}</span>
                        </div>
                        <div className="text-[10px] text-neutral-400">
                            {hoveredCountryName
                                ? `${hoveredIsEpicenter ? "EPICENTER TARGET" : "SURVEILLANCE"}: ${hoveredCountryName.toUpperCase()}`
                                : "ORBITAL BIO-SURVEILLANCE ACTIVE"}
                        </div>
                    </div>
                </div>
            </header>

            {/* Mission Control Tactical Telemetry Ticker (Global Extremes) */}
            <div className="absolute top-16 sm:top-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                <TelemetryTicker onSelectRecord={handleSelectRecord} />
            </div>

            {/* Minimal Floating Tactical Pill: Pathogen Brief Trigger */}
            <aside className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 pointer-events-auto">
                <button
                    onClick={() => setIsPathogenBriefOpen(true)}
                    className="font-mono text-xs text-neutral-300 border border-white/20 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full hover:border-cyan-400 hover:text-cyan-300 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center gap-1.5 active:scale-95"
                >
                    <span className="text-cyan-400 font-bold">[!]</span>
                    <span>{tPathogen("trigger")}</span>
                </button>
            </aside>

            {/* Global Tactical Footer */}
            <footer className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex flex-col sm:flex-row items-end sm:items-center gap-2 pointer-events-none z-10 font-mono text-[10px] sm:text-[11px] text-neutral-500">
                <div className="bg-black/60 border border-neutral-800/80 px-3 py-1.5 rounded backdrop-blur">
                    {hoveredCountryName ? (
                        <span
                            className={
                                hoveredIsEpicenter
                                    ? "text-red-400"
                                    : "text-cyan-400"
                            }
                        >
                            {hoveredIsEpicenter
                                ? `HOTSPOT // ${hoveredCountryName.toUpperCase()} [CLICK TO DECLASSIFY]`
                                : `SURVEILLANCE // ${hoveredCountryName.toUpperCase()} [CLICK FOR TELEMETRY]`}
                        </span>
                    ) : (
                        <span>{tHub("dragPrompt")}</span>
                    )}
                </div>
                <div className="bg-black/75 border border-neutral-800/80 px-3 py-1.5 rounded backdrop-blur text-right">
                    {`OUTBREAK DOSSIER © ${new Date().getFullYear()} // DECLASSIFIED EPIDEMIOLOGICAL DATA INTELLIGENCE.`}
                </div>
            </footer>

            {/* Slide-over Pathogen Briefing Drawer */}
            <PathogenBriefingDrawer
                isOpen={isPathogenBriefOpen}
                onClose={() => setIsPathogenBriefOpen(false)}
            />

            {/* Epicenter Activation Card (Tier 1 Hotspots) */}
            <CountryTacticalHUD
                isOpen={tacticalHUD.isOpen}
                onClose={() =>
                    setTacticalHUD({ isOpen: false, epicenterData: null })
                }
                epicenterData={tacticalHUD.epicenterData}
                onInitializeDossier={handleInitializeDossier}
            />

            {/* Compact Tactical HUD Modal (Tier 2 Secondary Surveillance) */}
            <SurveillanceModal
                isOpen={surveillanceModal.isOpen}
                onClose={() =>
                    setSurveillanceModal({ isOpen: false, data: null })
                }
                data={surveillanceModal.data}
            />
        </div>
    );
};

export default GlobeViewer;
