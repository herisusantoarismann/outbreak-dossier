"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { useAppStore } from "@/stores/useAppStore";
import { Activity, Crosshair } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PandemicInfoDrawer } from "./PandemicInfoDrawer";
import { CountryTacticalHUD } from "./CountryTacticalHUD";
import { SurveillanceModal } from "./SurveillanceModal";
import { TelemetryTicker } from "./TelemetryTicker";
import { PandemicSwitcher } from "./PandemicSwitcher";
import { LocaleSwitcher } from "@/components/molecules/LocaleSwitcher";
import { EpicenterMetadata, SupportedLocale } from "@/data/countriesConfig";
import { getEpicentersForPandemic } from "@/data/pandemicsRegistry";
import { PandemicProvider, useActivePandemic } from "@/context/PandemicContext";
import { CountrySurveillanceData, GlobalExtremeRecord } from "@/types/journey";

interface GeoJsonFeature {
    type: string;
    id?: string;
    properties?: {
        ISO_A2?: string;
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

const GlobeViewerInner: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const globeInstanceRef = useRef<any>(null);
    const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const geoDataRef = useRef<CountriesGeoJson | null>(null);

    const router = useRouter();
    const currentLocale = useLocale() as SupportedLocale;
    const { setIsLoading } = useAppStore();

    const {
        activePandemic,
        activePandemicId,
        surveillanceData,
        encryptedNotification,
        triggerEncryptedAlert,
    } = useActivePandemic();

    const tHub = useTranslations("hub");

    const [isInfoDrawerOpen, setIsInfoDrawerOpen] = useState(false);
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
            else if (iso3 === "ESP" || name === "Spain") iso2 = "ES";
            else if (iso3 === "GBR" || name.includes("United Kingdom"))
                iso2 = "GB";
            else if (iso3 === "DEU" || name.includes("Germany")) iso2 = "DE";
            else if (iso3 === "EGY" || name.includes("Egypt")) iso2 = "EG";
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

    // Check if country is an epicenter for active pandemic
    const checkIsEpicenter = useCallback(
        (iso2: string, iso3: string): EpicenterMetadata | null => {
            const epicenters = getEpicentersForPandemic(activePandemicId);
            return (
                epicenters[iso2.toUpperCase()] ||
                epicenters[iso3.toUpperCase()] ||
                null
            );
        },
        [activePandemicId],
    );

    // Handle country selection (direct click on polygon or beacon pin)
    const handleSelectCountry = useCallback(
        (feat: GeoJsonFeature | null, directEpicenter?: EpicenterMetadata) => {
            if (activePandemic.status === "classified_archive") {
                triggerEncryptedAlert();
                if (directEpicenter && globeInstanceRef.current) {
                    globeInstanceRef.current.pointOfView(
                        directEpicenter.coordinates,
                        1200,
                    );
                }
                return;
            }

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
            const epi = checkIsEpicenter(iso2, iso3);

            if (epi) {
                if (globeInstanceRef.current) {
                    globeInstanceRef.current.pointOfView(epi.coordinates, 1200);
                }
                setTacticalHUD({
                    isOpen: true,
                    epicenterData: epi,
                });
            } else {
                // Secondary Surveillance Nation - sourced from isolated active pandemic dataset
                const survData = surveillanceData[iso2] || {
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
                        id: activePandemic.eraLabel,
                        en: activePandemic.eraLabel,
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
        [
            activePandemic.eraLabel,
            activePandemic.status,
            checkIsEpicenter,
            getFeatureCentroid,
            getFeatureCountryInfo,
            surveillanceData,
            triggerEncryptedAlert,
        ],
    );

    // Launch full dossier for Epicenters
    const handleInitializeDossier = useCallback(
        (countryCode: string) => {
            setTacticalHUD((prev) => ({ ...prev, isOpen: false }));
            setIsLoading(true);
            setTimeout(() => {
                router.push(
                    `/dossier/${activePandemicId}/${countryCode.toLowerCase()}`,
                );
                setIsLoading(false);
            }, 2400);
        },
        [activePandemicId, router, setIsLoading],
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

    // Ticker fly-to handler
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

            const epi = checkIsEpicenter(record.iso2, record.iso2);
            if (epi) {
                setTacticalHUD({
                    isOpen: true,
                    epicenterData: epi,
                });
            } else {
                const survData = surveillanceData[record.iso2] || {
                    iso2: record.iso2,
                    name: record.countryName,
                    continent: "Global",
                    confirmedCases: 1250000,
                    fatalities: 18400,
                    recoveryRate: "98.5%",
                    peakWave: {
                        id: activePandemic.eraLabel,
                        en: activePandemic.eraLabel,
                    },
                };
                setSurveillanceModal({
                    isOpen: true,
                    data: survData,
                });
            }
        },
        [
            activePandemic.eraLabel,
            checkIsEpicenter,
            resetIdleTimer,
            surveillanceData,
        ],
    );

    // Initial globe setup
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
            geoDataRef.current = geoData;

            // Build initial rings & points for active pandemic
            const epicenters = getEpicentersForPandemic(activePandemicId);
            const epicenterRings: GlobeRing[] = Object.values(epicenters).map(
                (e) => ({
                    lat: e.coordinates.lat,
                    lng: e.coordinates.lng,
                    maxR: 4.8,
                    propagationSpeed: 2.2,
                    repeatPeriod: 1400,
                    color: e.beaconColor,
                }),
            );

            const pointsData: GlobePoint[] = [];
            Object.values(epicenters).forEach((e) => {
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

            geoData.features.forEach((feat) => {
                const { iso2, iso3 } = getFeatureCountryInfo(feat);
                if (epicenters[iso2] || epicenters[iso3]) return;

                const centroid = getFeatureCentroid(feat);
                if (centroid) {
                    pointsData.push({
                        lat: centroid.lat,
                        lng: centroid.lng,
                        altitude: 0.012,
                        radius: 0.22,
                        color: activePandemic.atmosphereHex,
                        isEpicenter: false,
                        feature: feat,
                    });
                }
            });

            const getPolygonAltitude = (
                f: GeoJsonFeature,
                targetFeat: GeoJsonFeature | null,
            ) => {
                const { iso2, iso3 } = getFeatureCountryInfo(f);
                const isEpi = Boolean(epicenters[iso2] || epicenters[iso3]);
                const isTarget = !!targetFeat && f === targetFeat;
                if (isEpi) return isTarget ? 0.08 : 0.035;
                return isTarget ? 0.028 : 0.008;
            };

            const getPolygonCapColor = (
                f: GeoJsonFeature,
                targetFeat: GeoJsonFeature | null,
            ) => {
                const { iso2, iso3 } = getFeatureCountryInfo(f);
                const epi = epicenters[iso2] || epicenters[iso3];
                const isTarget = !!targetFeat && f === targetFeat;

                if (epi) {
                    if (isTarget) {
                        return epi.beaconColor;
                    }
                    return "rgba(45, 10, 20, 0.92)";
                }

                if (isTarget) {
                    return "rgba(56, 189, 248, 0.85)";
                }
                return "rgba(30, 41, 59, 0.72)";
            };

            const getPolygonSideColor = (
                f: GeoJsonFeature,
                targetFeat: GeoJsonFeature | null,
            ) => {
                const { iso2, iso3 } = getFeatureCountryInfo(f);
                const epi = epicenters[iso2] || epicenters[iso3];
                const isTarget = !!targetFeat && f === targetFeat;

                if (epi) {
                    return isTarget
                        ? `${epi.beaconColor}dd`
                        : "rgba(185, 28, 28, 0.4)";
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
                const epi = epicenters[iso2] || epicenters[iso3];
                const isTarget = !!targetFeat && f === targetFeat;

                if (epi) {
                    if (isTarget) return "#ffffff";
                    return epi.beaconColor || activePandemic.atmosphereHex;
                }

                if (isTarget) {
                    return "rgba(56, 189, 248, 0.95)";
                }
                return "rgba(71, 85, 105, 0.55)";
            };

            // Instantiate Globe
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const globe = (GlobeFactory as any)()(containerRef.current)
                .backgroundColor("rgba(5, 5, 8, 0)")
                .showAtmosphere(true)
                .atmosphereColor(activePandemic.atmosphereHex)
                .atmosphereAltitude(0.22)
                .globeImageUrl(
                    "//unpkg.com/three-globe/example/img/earth-night.jpg",
                )
                .bumpImageUrl(
                    "//unpkg.com/three-globe/example/img/earth-topology.png",
                )
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
                    const epi = epicenters[iso2] || epicenters[iso3];

                    if (epi) {
                        const bc =
                            epi.beaconColor || activePandemic.atmosphereHex;
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
                <span>[ ISO: ${code} // ${activePandemic.status === "classified_archive" ? "ARCHIVE ENCRYPTED" : "CLICK FOR DOSSIER"} ]</span>
              </div>
            `;
                    }

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
                        const isEpi = Boolean(
                            epicenters[iso2] || epicenters[iso3],
                        );
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

            // Set initial camera view
            const initCam = activePandemic.defaultCameraPosition || [
                10, 100, 2.3,
            ];
            globe.pointOfView({
                lat: initCam[0],
                lng: initCam[1],
                altitude: initCam[2],
            });

            const controls = globe.controls();
            controls.autoRotate = true;
            controls.autoRotateSpeed = 0.5;
            controls.enableZoom = true;
            controls.minDistance = 140;
            controls.maxDistance = 500;

            globeInstanceRef.current = globe;

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
        activePandemic,
        activePandemicId,
        currentLocale,
        getFeatureCentroid,
        getFeatureCountryInfo,
        handleSelectCountry,
        resetIdleTimer,
    ]);

    // Reactive handler when activePandemic changes:
    // 1. Smoothly update atmosphere color
    // 2. Swap epicenter rings & point beacons
    // 3. Smooth camera orbit reset via Three.js tween
    useEffect(() => {
        if (!globeInstanceRef.current) return;
        const globe = globeInstanceRef.current;

        // 1. Update atmosphere color (Cyan: #0e7490, Amber: #b45309, Crimson: #881337)
        globe.atmosphereColor(activePandemic.atmosphereHex);

        // 2. Re-target epicenters & build rings for current pandemic
        const epicenters = getEpicentersForPandemic(activePandemicId);
        const newRings: GlobeRing[] = Object.values(epicenters).map((e) => ({
            lat: e.coordinates.lat,
            lng: e.coordinates.lng,
            maxR: 4.8,
            propagationSpeed: 2.2,
            repeatPeriod: 1400,
            color: e.beaconColor,
        }));
        globe.ringsData(newRings);

        // 3. Rebuild pointsData
        const newPoints: GlobePoint[] = [];
        Object.values(epicenters).forEach((e) => {
            newPoints.push({
                lat: e.coordinates.lat,
                lng: e.coordinates.lng,
                altitude: 0.05,
                radius: 0.6,
                color: e.beaconColor,
                isEpicenter: true,
                epicenter: e,
            });
        });

        if (geoDataRef.current) {
            geoDataRef.current.features.forEach((feat) => {
                const { iso2, iso3 } = getFeatureCountryInfo(feat);
                if (epicenters[iso2] || epicenters[iso3]) return;

                const centroid = getFeatureCentroid(feat);
                if (centroid) {
                    newPoints.push({
                        lat: centroid.lat,
                        lng: centroid.lng,
                        altitude: 0.012,
                        radius: 0.22,
                        color: activePandemic.atmosphereHex,
                        isEpicenter: false,
                        feature: feat,
                    });
                }
            });
        }
        globe.pointsData(newPoints);

        // 4. Smooth camera orbit reset
        const cam = activePandemic.defaultCameraPosition || [10, 100, 2.3];
        globe.pointOfView(
            {
                lat: cam[0],
                lng: cam[1],
                altitude: cam[2],
            },
            1600,
        );
    }, [
        activePandemic,
        activePandemicId,
        getFeatureCentroid,
        getFeatureCountryInfo,
    ]);

    const infoButtonText =
        currentLocale === "id"
            ? activePandemic.aboutTitle.id
            : activePandemic.aboutTitle.en;

    return (
        <div className="relative w-full h-full overflow-hidden bg-[#050508]">
            {/* 3D WebGL Canvas Mount */}
            <div
                ref={containerRef}
                className="w-full h-full cursor-grab active:cursor-grabbing"
            />

            {/* Sci-Fi Ambient Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,#050508_95%)] pointer-events-none" />

            {/* Top HUD Header - Kept clean with only Logo & Nav, leaving room for Telemetry Ticker */}
            <header className="absolute top-0 left-0 right-0 p-3 sm:p-6 flex items-center justify-between pointer-events-none z-10">
                <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto min-w-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded border border-red-500/40 bg-black/70 flex items-center justify-center text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.25)] shrink-0">
                        <Activity className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                    </div>
                    <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                            <span className="text-[9px] sm:text-xs font-mono font-bold tracking-widest text-red-500 truncate max-w-[130px] xs:max-w-[200px] sm:max-w-none">
                                {tHub("badge")}
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping shrink-0" />
                        </div>
                        <h1 className="font-mono tracking-widest text-xs sm:text-base font-bold text-neutral-100 uppercase truncate">
                            {tHub("title")}
                        </h1>
                    </div>
                </div>

                {/* Right Header Cluster: Locale Switcher & Coordinates HUD */}
                <div className="flex items-center gap-2 pointer-events-auto shrink-0">
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
                                : `ORBITAL BIO-SURVEILLANCE // ${activePandemic.eraLabel}`}
                        </div>
                    </div>
                </div>
            </header>

            {/* Subtle Encrypted Archive HUD Notification */}
            <AnimatePresence>
                {encryptedNotification && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-26 sm:top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded border border-amber-500/60 bg-black/95 backdrop-blur-md shadow-[0_0_25px_rgba(245,158,11,0.35)] font-mono text-[11px] sm:text-xs text-amber-400 tracking-wider pointer-events-none max-w-[92vw] text-center"
                    >
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
                        <span className="font-bold truncate">
                            {encryptedNotification}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mission Control Tactical Telemetry Ticker (Global Extremes) - Top Center */}
            <div className="absolute top-14 sm:top-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                <TelemetryTicker onSelectRecord={handleSelectRecord} />
            </div>

            {/* 1. Mobile Unified Command Island (Bottom Center, Non-overlapping) */}
            <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex md:hidden items-center gap-2 max-w-[95vw] pointer-events-auto select-none">
                {/* Compact Pathogen Brief Trigger */}
                <button
                    onClick={() => setIsInfoDrawerOpen(true)}
                    className="font-mono text-xs text-neutral-200 border border-white/20 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-full hover:border-cyan-400 hover:text-cyan-300 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.8)] flex items-center gap-1.5 active:scale-95 shrink-0"
                    aria-label="Open Pathogen Brief"
                    title="Open Pathogen Intelligence Brief"
                >
                    <span className="text-cyan-400 font-bold shrink-0">
                        [!]
                    </span>
                    <span className="font-bold tracking-wider">BRIEF</span>
                </button>

                {/* Compact Epoch Switcher Trigger & Modal */}
                <PandemicSwitcher isMobileTriggerOnly />
            </div>

            {/* 2. Desktop Pinned Chronological Pandemic Switcher (Bottom-Center Command Dock) */}
            <PandemicSwitcher className="hidden md:flex" />

            {/* 3. Desktop Floating Tactical Pill: Dynamic Pathogen/Pandemic Brief Trigger (Bottom-Left) */}
            <aside className="hidden md:block absolute bottom-6 left-4 sm:left-6 z-30 pointer-events-auto">
                <button
                    onClick={() => setIsInfoDrawerOpen(true)}
                    className="font-mono text-xs text-neutral-300 border border-white/20 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full hover:border-cyan-400 hover:text-cyan-300 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.6)] flex items-center gap-1.5 active:scale-95 max-w-[45vw] sm:max-w-xs truncate"
                >
                    <span className="text-cyan-400 font-bold shrink-0">
                        [!]
                    </span>
                    <span className="truncate">{infoButtonText}</span>
                </button>
            </aside>

            {/* Global Tactical Footer (Bottom-Right) */}
            <footer className="hidden md:flex absolute bottom-6 right-4 sm:right-6 flex-col items-end gap-1.5 pointer-events-none z-10 font-mono text-[10px] text-neutral-500">
                <div className="bg-black/60 border border-neutral-800/80 px-3 py-1 rounded backdrop-blur">
                    {hoveredCountryName ? (
                        <span
                            className={
                                hoveredIsEpicenter
                                    ? "text-red-400"
                                    : "text-cyan-400"
                            }
                        >
                            {hoveredIsEpicenter
                                ? `HOTSPOT // ${hoveredCountryName.toUpperCase()} [${activePandemic.status === "classified_archive" ? "CLASSIFIED ARCHIVE" : "CLICK TO DECLASSIFY"}]`
                                : `SURVEILLANCE // ${hoveredCountryName.toUpperCase()} [CLICK FOR TELEMETRY]`}
                        </span>
                    ) : (
                        <span>{tHub("dragPrompt")}</span>
                    )}
                </div>
                <div className="bg-black/75 border border-neutral-800/80 px-3 py-1 rounded backdrop-blur text-right text-[9px] text-neutral-600">
                    {`OUTBREAK DOSSIER © ${new Date().getFullYear()} // DECLASSIFIED EPIDEMIOLOGICAL DATA INTELLIGENCE.`}
                </div>
            </footer>

            {/* Slide-over Pandemic & Pathogen Intelligence Drawer */}
            <PandemicInfoDrawer
                isOpen={isInfoDrawerOpen}
                onClose={() => setIsInfoDrawerOpen(false)}
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

export const GlobeViewer: React.FC<{ initialPandemicId?: string }> = ({
    initialPandemicId,
}) => {
    return (
        <PandemicProvider initialPandemicId={initialPandemicId}>
            <GlobeViewerInner />
        </PandemicProvider>
    );
};

export default GlobeViewer;
