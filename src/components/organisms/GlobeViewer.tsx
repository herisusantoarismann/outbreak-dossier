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
import { CholeraWaveNav } from "./CholeraWaveNav";
import { PandemicSwitcher } from "./PandemicSwitcher";
import { LocaleSwitcher } from "@/components/molecules/LocaleSwitcher";
import { EpicenterMetadata, SupportedLocale } from "@/data/countriesConfig";
import { getCountryInteraction } from "@/data/pandemicsRegistry";
import { PandemicProvider, useActivePandemic } from "@/context/PandemicContext";
import { PathogenHoloLoader } from "@/components/loading/PathogenHoloLoader";
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

const GEOJSON_REMOTE_URL =
    "https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson";
const GEOJSON_LOCAL_FALLBACK = "/data/ne_110m_admin_0_countries.geojson";

// Helper to convert camera coords (supports both [lat, lng, alt] and Cartesian [x, y, z])
const resolveCameraPOV = (
    cam: [number, number, number],
): { lat: number; lng: number; altitude: number } => {
    // If values are large, it's Cartesian x,y,z - convert to spherical
    if (
        Math.abs(cam[0]) > 90 ||
        Math.abs(cam[1]) > 180 ||
        Math.abs(cam[2]) > 50
    ) {
        const [x, y, z] = cam;
        const r = Math.sqrt(x * x + y * y + z * z);
        const lat = (Math.asin(y / r) * 180) / Math.PI;
        const lng = (Math.atan2(x, z) * 180) / Math.PI;
        const altitude = Math.max(1.5, Math.min(3.5, r / 100));
        return { lat, lng, altitude };
    }
    return { lat: cam[0], lng: cam[1], altitude: cam[2] };
};

const GlobeViewerInner: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const globeInstanceRef = useRef<any>(null);
    const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const geoDataRef = useRef<CountriesGeoJson | null>(null);
    const lastHoveredFeatureRef = useRef<GeoJsonFeature | null>(null);

    const router = useRouter();
    const currentLocale = useLocale() as SupportedLocale;
    const { setIsLoading } = useAppStore();

    const {
        activePandemic,
        activePandemicId,
        activeWaveIndex,
        activeWave,
        surveillanceData,
        encryptedNotification,
        triggerEncryptedAlert,
    } = useActivePandemic();

    const activePandemicIdRef = useRef(activePandemicId);
    const activeWaveIndexRef = useRef(activeWaveIndex);

    useEffect(() => {
        activePandemicIdRef.current = activePandemicId;
        activeWaveIndexRef.current = activeWaveIndex;
    }, [activePandemicId, activeWaveIndex]);

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
            else if (iso3 === "RUS" || name.includes("Russia")) iso2 = "RU";
            else if (iso3 === "BRA" || name.includes("Brazil")) iso2 = "BR";
            else if (iso3 === "JPN" || name.includes("Japan")) iso2 = "JP";
            else if (iso3 === "ZAF" || name.includes("South Africa"))
                iso2 = "ZA";
            else if (iso3 === "WSM" || name.includes("Samoa")) iso2 = "WS";
            else if (iso3 === "NZL" || name.includes("New Zealand"))
                iso2 = "NZ";
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
            const interaction =
                getCountryInteraction(
                    activePandemicId,
                    iso2,
                    activeWaveIndex,
                ) ||
                getCountryInteraction(activePandemicId, iso3, activeWaveIndex);
            return interaction?.type === "epicenter" && interaction.epicenter
                ? interaction.epicenter
                : null;
        },
        [activePandemicId, activeWaveIndex],
    );

    // Dismiss all active modals & drawers
    const dismissActiveModals = useCallback(() => {
        setTacticalHUD({ isOpen: false, epicenterData: null });
        setSurveillanceModal({ isOpen: false, data: null });
        setIsInfoDrawerOpen(false);
    }, []);

    // Launch full Dossier Scrollytelling Reader for Tier-1 Primary Epicenters with camera warp
    const openDossierJourney = useCallback(
        (
            regionId: string,
            coordinates?: { lat: number; lng: number; altitude?: number },
        ) => {
            dismissActiveModals();
            if (activePandemic.status === "classified_archive") {
                triggerEncryptedAlert();
            }

            if (globeInstanceRef.current && coordinates) {
                globeInstanceRef.current.pointOfView(
                    {
                        lat: coordinates.lat,
                        lng: coordinates.lng,
                        altitude: coordinates.altitude ?? 1.15,
                    },
                    1100,
                );
            }

            if (typeof window !== "undefined") {
                const currentUrl = new URL(window.location.href);
                currentUrl.searchParams.set("sector", regionId.toLowerCase());
                if (activePandemicId === "cholera-series") {
                    currentUrl.searchParams.set(
                        "wave",
                        String(activeWaveIndex + 1),
                    );
                }
                window.history.replaceState(null, "", currentUrl.toString());
            }

            setIsLoading(true);
            setTimeout(() => {
                const waveSuffix =
                    activePandemicId === "cholera-series"
                        ? `?wave=${activeWaveIndex + 1}`
                        : "";
                router.push(
                    `/dossier/${activePandemicId}/${regionId.toLowerCase()}${waveSuffix}`,
                );
                setIsLoading(false);
            }, 1400);
        },
        [
            activePandemic.status,
            activePandemicId,
            activeWaveIndex,
            dismissActiveModals,
            router,
            setIsLoading,
            triggerEncryptedAlert,
        ],
    );

    // Open Secondary Surveillance Telemetry Modal for Tier-2 Territories
    const openSurveillanceModal = useCallback(
        (
            data: CountrySurveillanceData,
            coordinates?: { lat: number; lng: number; altitude?: number },
        ) => {
            dismissActiveModals();
            if (coordinates && globeInstanceRef.current) {
                globeInstanceRef.current.pointOfView(
                    {
                        lat: coordinates.lat,
                        lng: coordinates.lng,
                        altitude: coordinates.altitude ?? 1.35,
                    },
                    1100,
                );
            }
            setSurveillanceModal({
                isOpen: true,
                data,
            });
        },
        [dismissActiveModals],
    );

    // Unified dynamic country selection handler with strict Era-Specific Raycast Guard
    const handleSelectCountry = useCallback(
        (feat: GeoJsonFeature | null, directEpicenter?: EpicenterMetadata) => {
            if (directEpicenter) {
                openDossierJourney(
                    directEpicenter.code,
                    directEpicenter.coordinates,
                );
                return;
            }

            if (!feat) {
                dismissActiveModals();
                return;
            }

            const { iso2, iso3 } = getFeatureCountryInfo(feat);
            const interaction =
                getCountryInteraction(
                    activePandemicId,
                    iso2,
                    activeWaveIndex,
                ) ||
                getCountryInteraction(activePandemicId, iso3, activeWaveIndex);

            // Strict Era-Specific Raycast Guard (Zero Data Bleed):
            // Unregistered countries return null and dismiss modals
            if (!interaction) {
                dismissActiveModals();
                return;
            }

            const clickedRegionId = interaction.code.toUpperCase();
            const activePrimaryIds = (
                activePandemicId === "cholera-series" && activeWave
                    ? Object.keys(activeWave.primaryEpicenters)
                    : activePandemic.primaryEpicenters ||
                      activePandemic.epicenters ||
                      []
            ).map((id) => id.toUpperCase());
            const activeSurveillanceKeys = Object.keys(surveillanceData).map(
                (k) => k.toUpperCase(),
            );

            if (
                activePrimaryIds.includes(clickedRegionId) ||
                interaction.type === "epicenter"
            ) {
                const centroid = feat ? getFeatureCentroid(feat) : null;
                const coords =
                    interaction.epicenter?.coordinates ||
                    (centroid ? centroid : undefined);
                openDossierJourney(clickedRegionId, coords);
            } else if (
                activeSurveillanceKeys.includes(clickedRegionId) ||
                interaction.type === "surveillance"
            ) {
                const centroid = getFeatureCentroid(feat);
                const surv =
                    interaction.surveillance ||
                    surveillanceData[clickedRegionId] ||
                    surveillanceData[interaction.code];
                if (surv) {
                    openSurveillanceModal(
                        surv,
                        centroid
                            ? {
                                  lat: centroid.lat,
                                  lng: centroid.lng,
                                  altitude: 1.35,
                              }
                            : undefined,
                    );
                } else {
                    dismissActiveModals();
                }
            } else {
                dismissActiveModals();
            }
        },
        [
            activePandemic.epicenters,
            activePandemic.primaryEpicenters,
            activePandemicId,
            activeWave,
            activeWaveIndex,
            dismissActiveModals,
            getFeatureCentroid,
            getFeatureCountryInfo,
            openDossierJourney,
            openSurveillanceModal,
            surveillanceData,
        ],
    );

    // Standardized Visual Styling Callbacks across all pandemics
    const getPolygonAltitude = useCallback(
        (f: GeoJsonFeature, targetFeat: GeoJsonFeature | null) => {
            const { iso2, iso3 } = getFeatureCountryInfo(f);
            const interaction =
                getCountryInteraction(
                    activePandemicId,
                    iso2,
                    activeWaveIndex,
                ) ||
                getCountryInteraction(activePandemicId, iso3, activeWaveIndex);
            if (!interaction) return 0.002;

            const isTarget = !!targetFeat && f === targetFeat;
            if (interaction.type === "epicenter") {
                return isTarget ? 0.065 : 0.038;
            }
            // Tier-2 Surveillance
            return isTarget ? 0.02 : 0.005;
        },
        [activePandemicId, activeWaveIndex, getFeatureCountryInfo],
    );

    const getPolygonCapColor = useCallback(
        (f: GeoJsonFeature, targetFeat: GeoJsonFeature | null) => {
            const { iso2, iso3 } = getFeatureCountryInfo(f);
            const interaction =
                getCountryInteraction(
                    activePandemicId,
                    iso2,
                    activeWaveIndex,
                ) ||
                getCountryInteraction(activePandemicId, iso3, activeWaveIndex);
            if (!interaction) return "rgba(0, 0, 0, 0)";

            const isTarget = !!targetFeat && f === targetFeat;
            const themeColor = activePandemic.themeColor;

            if (interaction.type === "epicenter") {
                const regionColor =
                    interaction.epicenter?.beaconColor || themeColor;
                // Tier-1: Solid fill in region's unique color. On hover: full opacity glow
                return isTarget ? `${regionColor}ff` : `${regionColor}aa`;
            }

            // Tier-2: Transparent base (standard earth wireframe). On hover: subtle accent sheen
            if (!isTarget) {
                return "rgba(0, 0, 0, 0)";
            }
            return `${themeColor}26`;
        },
        [
            activePandemic.themeColor,
            activePandemicId,
            activeWaveIndex,
            getFeatureCountryInfo,
        ],
    );

    const getPolygonSideColor = useCallback(
        (f: GeoJsonFeature, targetFeat: GeoJsonFeature | null) => {
            const { iso2, iso3 } = getFeatureCountryInfo(f);
            const interaction =
                getCountryInteraction(
                    activePandemicId,
                    iso2,
                    activeWaveIndex,
                ) ||
                getCountryInteraction(activePandemicId, iso3, activeWaveIndex);
            if (!interaction) return "rgba(0, 0, 0, 0)";

            const isTarget = !!targetFeat && f === targetFeat;
            const themeColor = activePandemic.themeColor;

            if (interaction.type === "epicenter") {
                const regionColor =
                    interaction.epicenter?.beaconColor || themeColor;
                return isTarget ? `${regionColor}99` : `${regionColor}55`;
            }

            if (!isTarget) {
                return "rgba(0, 0, 0, 0)";
            }
            return `${themeColor}33`;
        },
        [
            activePandemic.themeColor,
            activePandemicId,
            activeWaveIndex,
            getFeatureCountryInfo,
        ],
    );

    const getPolygonStrokeColor = useCallback(
        (f: GeoJsonFeature, targetFeat: GeoJsonFeature | null) => {
            const { iso2, iso3 } = getFeatureCountryInfo(f);
            const interaction =
                getCountryInteraction(
                    activePandemicId,
                    iso2,
                    activeWaveIndex,
                ) ||
                getCountryInteraction(activePandemicId, iso3, activeWaveIndex);
            // Unregistered: subtle wireframe border
            if (!interaction) return "rgba(255, 255, 255, 0.05)";

            const isTarget = !!targetFeat && f === targetFeat;
            const themeColor = activePandemic.themeColor;

            if (interaction.type === "epicenter") {
                const regionColor =
                    interaction.epicenter?.beaconColor || themeColor;
                // Glowing borders in region's unique color
                return isTarget ? "#ffffff" : regionColor;
            }

            // Tier-2: subtle wireframe border when resting; highlight outline in active era themeColor on hover
            if (!isTarget) {
                return "rgba(255, 255, 255, 0.05)";
            }
            return themeColor;
        },
        [
            activePandemic.themeColor,
            activePandemicId,
            activeWaveIndex,
            getFeatureCountryInfo,
        ],
    );

    const getPolygonLabel = useCallback(
        (feat: GeoJsonFeature) => {
            const { iso2, iso3 } = getFeatureCountryInfo(feat);
            const interaction =
                getCountryInteraction(
                    activePandemicId,
                    iso2,
                    activeWaveIndex,
                ) ||
                getCountryInteraction(activePandemicId, iso3, activeWaveIndex);
            if (!interaction) return ""; // Unregistered: no tooltip

            const tc = activePandemic.themeColor;

            if (interaction.type === "epicenter") {
                const regionColor = interaction.epicenter?.beaconColor || tc;
                const sectorCode =
                    interaction.epicenter?.sectorCode ||
                    `SECTOR // ${interaction.code}`;
                const name =
                    interaction.epicenter?.name[currentLocale] ||
                    interaction.epicenter?.name.en ||
                    interaction.code;
                return `
              <div style="
                display: inline-flex;
                align-items: center;
                gap: 7px;
                background: rgba(5, 7, 15, 0.95);
                border: 1px solid ${regionColor};
                border-radius: 4px;
                padding: 5px 10px;
                font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
                font-size: 11px;
                font-weight: 700;
                letter-spacing: 0.08em;
                color: #ffffff;
                box-shadow: 0 0 16px ${regionColor}88;
                pointer-events: none;
                white-space: nowrap;
              ">
                <span style="display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: ${regionColor}; box-shadow: 0 0 8px ${regionColor};"></span>
                <span style="color: ${regionColor};">[ ${sectorCode} // ${name.toUpperCase()} ]</span>
              </div>
            `;
            }

            // Tier-2 Surveillance
            const survName =
                interaction.surveillance?.name[currentLocale] ||
                interaction.surveillance?.name.en ||
                interaction.code;
            return `
              <div style="
                display: inline-flex;
                align-items: center;
                gap: 7px;
                background: rgba(5, 7, 15, 0.95);
                border: 1px solid ${tc}80;
                border-radius: 4px;
                padding: 5px 10px;
                font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
                font-size: 11px;
                font-weight: 700;
                letter-spacing: 0.08em;
                color: #ffffff;
                box-shadow: 0 0 12px ${tc}50;
                pointer-events: none;
                white-space: nowrap;
              ">
                <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: ${tc};"></span>
                <span style="color: #e2e8f0;">[ SURVEILLANCE // ${survName.toUpperCase()} ]</span>
              </div>
            `;
        },
        [
            activePandemic.themeColor,
            activePandemicId,
            activeWaveIndex,
            currentLocale,
            getFeatureCountryInfo,
        ],
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
            const epi = checkIsEpicenter(record.iso2, record.iso2);
            if (epi) {
                openDossierJourney(
                    epi.code,
                    coords
                        ? {
                              lat: coords.lat,
                              lng: coords.lng,
                              altitude: 1.15,
                          }
                        : epi.coordinates,
                );
            } else {
                const survData =
                    surveillanceData[record.iso2] ||
                    surveillanceData[record.iso2.toUpperCase()];
                if (survData) {
                    openSurveillanceModal(
                        survData,
                        coords
                            ? {
                                  lat: coords.lat,
                                  lng: coords.lng,
                                  altitude: 1.35,
                              }
                            : undefined,
                    );
                }
            }
        },
        [
            checkIsEpicenter,
            openDossierJourney,
            openSurveillanceModal,
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
                .lineHoverPrecision(0.08)
                // Purge radius rings and point dots since regions already have colored polygons
                .ringsData([])
                .pointsData([])
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
                .polygonLabel((feat: GeoJsonFeature) => getPolygonLabel(feat))
                .onPolygonHover((feat: GeoJsonFeature | null) => {
                    let activeFeat: GeoJsonFeature | null = null;
                    let interactionName: string | null = null;
                    let isEpicenter = false;

                    if (feat) {
                        const { iso2, iso3 } = getFeatureCountryInfo(feat);
                        const interaction =
                            getCountryInteraction(
                                activePandemicIdRef.current,
                                iso2,
                                activeWaveIndexRef.current,
                            ) ||
                            getCountryInteraction(
                                activePandemicIdRef.current,
                                iso3,
                                activeWaveIndexRef.current,
                            );

                        if (interaction) {
                            activeFeat = feat;
                            interactionName =
                                interaction.epicenter?.name[currentLocale] ||
                                interaction.surveillance?.name[currentLocale] ||
                                interaction.code;
                            isEpicenter = interaction.type === "epicenter";
                        }
                    }

                    // Strict FPS Guard: Only re-render polygon geometry and materials when hovered feature changes
                    if (activeFeat !== lastHoveredFeatureRef.current) {
                        lastHoveredFeatureRef.current = activeFeat;

                        if (activeFeat) {
                            document.body.style.cursor = "pointer";
                            if (containerRef.current) {
                                containerRef.current.style.cursor = "pointer";
                            }
                            setHoveredCountryName(interactionName);
                            setHoveredIsEpicenter(isEpicenter);
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
                                getPolygonAltitude(f, activeFeat),
                            )
                            .polygonCapColor((f: GeoJsonFeature) =>
                                getPolygonCapColor(f, activeFeat),
                            )
                            .polygonSideColor((f: GeoJsonFeature) =>
                                getPolygonSideColor(f, activeFeat),
                            )
                            .polygonStrokeColor((f: GeoJsonFeature) =>
                                getPolygonStrokeColor(f, activeFeat),
                            );
                    }
                })
                .onPolygonClick((feat: GeoJsonFeature) => {
                    handleSelectCountry(feat);
                })
                .onGlobeClick(() => {
                    // Gracefully dismiss open HUDs/modals on clicking unmonitored areas
                    setTacticalHUD({ isOpen: false, epicenterData: null });
                    setSurveillanceModal({ isOpen: false, data: null });
                    setIsInfoDrawerOpen(false);
                });

            // Set initial camera view
            if (activePandemicId === "cholera-series" && activeWave) {
                globe.pointOfView({
                    lat: activeWave.cameraPosition.lat,
                    lng: activeWave.cameraPosition.lng,
                    altitude: activeWave.cameraPosition.altitude,
                });
            } else {
                const initCam = activePandemic.defaultCameraPosition || [
                    10, 100, 2.3,
                ];
                globe.pointOfView(resolveCameraPOV(initCam));
            }

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

        // 2. Clear rings & points since all primary epicenters have colored polygons
        globe.ringsData([]);
        globe.pointsData([]);

        // 4. Refresh polygon styling and labels for the new era
        globe
            .polygonAltitude((f: GeoJsonFeature) => getPolygonAltitude(f, null))
            .polygonCapColor((f: GeoJsonFeature) => getPolygonCapColor(f, null))
            .polygonSideColor((f: GeoJsonFeature) =>
                getPolygonSideColor(f, null),
            )
            .polygonStrokeColor((f: GeoJsonFeature) =>
                getPolygonStrokeColor(f, null),
            )
            .polygonLabel((f: GeoJsonFeature) => getPolygonLabel(f));

        // 5. Smooth camera orbit reset or URL sector fly-to
        let targetedSector = false;
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const sectorParam = params.get("sector");
            if (sectorParam) {
                const interaction = getCountryInteraction(
                    activePandemicId,
                    sectorParam,
                );
                if (
                    interaction?.type === "epicenter" &&
                    interaction.epicenter
                ) {
                    globe.pointOfView(interaction.epicenter.coordinates, 1400);
                    targetedSector = true;
                }
            }
        }

        if (!targetedSector) {
            const cam = activePandemic.defaultCameraPosition || [10, 100, 2.3];
            globe.pointOfView(resolveCameraPOV(cam), 1600);
        }
    }, [
        activePandemic,
        activePandemicId,
        checkIsEpicenter,
        getFeatureCentroid,
        getFeatureCountryInfo,
        getPolygonAltitude,
        getPolygonCapColor,
        getPolygonLabel,
        getPolygonSideColor,
        getPolygonStrokeColor,
        openDossierJourney,
    ]);

    // 6. Reactive camera repositioning & polygon refresh when activeWaveIndex changes (for cholera-series)
    useEffect(() => {
        if (
            !globeInstanceRef.current ||
            activePandemicId !== "cholera-series" ||
            !activeWave
        ) {
            return;
        }
        const globe = globeInstanceRef.current;

        // Smooth camera flight to wave's epicentral focal coordinates
        globe.pointOfView(
            {
                lat: activeWave.cameraPosition.lat,
                lng: activeWave.cameraPosition.lng,
                altitude: activeWave.cameraPosition.altitude,
            },
            1600,
        );

        // Refresh polygon styling for the new wave
        globe
            .polygonAltitude((f: GeoJsonFeature) => getPolygonAltitude(f, null))
            .polygonCapColor((f: GeoJsonFeature) => getPolygonCapColor(f, null))
            .polygonSideColor((f: GeoJsonFeature) =>
                getPolygonSideColor(f, null),
            )
            .polygonStrokeColor((f: GeoJsonFeature) =>
                getPolygonStrokeColor(f, null),
            )
            .polygonLabel((f: GeoJsonFeature) => getPolygonLabel(f));
    }, [
        activePandemicId,
        activeWave,
        activeWaveIndex,
        getPolygonAltitude,
        getPolygonCapColor,
        getPolygonLabel,
        getPolygonSideColor,
        getPolygonStrokeColor,
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

                    {/* Desktop Tactical Coordinates HUD (Visible on >1440px where header has full clearance) */}
                    <div className="hidden hud-coordinates-wide flex-col items-end text-[11px] font-mono text-neutral-400 bg-black/60 border border-neutral-800/80 px-3 py-1.5 rounded backdrop-blur">
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
                        className="fixed top-28 sm:top-32 md:top-34 xl:top-34 hud-encrypted-wide left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded border border-amber-500/60 bg-black/95 backdrop-blur-md shadow-[0_0_25px_rgba(245,158,11,0.35)] font-mono text-[11px] sm:text-xs text-amber-400 tracking-wider pointer-events-none max-w-[92vw] text-center"
                    >
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
                        <span className="font-bold truncate">
                            {encryptedNotification}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mission Control Tactical Telemetry Ticker (Global Extremes) - Top Center (Parallel with Header on >1440px, Below on <=1440px) */}
            <div className="absolute top-16 sm:top-18 md:top-20 xl:top-20 hud-ticker-wide left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                <TelemetryTicker
                    key={`${activePandemicId}-${activeWaveIndex}`}
                    onSelectRecord={handleSelectRecord}
                />
            </div>

            {/* 7-Wave Cholera Timeline Sub-Navigation */}
            {activePandemicId === "cholera-series" && (
                <div className="absolute top-28 sm:top-32 md:top-36 xl:top-36 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
                    <CholeraWaveNav
                        onSectorSelect={(sectorId, coords) => {
                            if (globeInstanceRef.current) {
                                globeInstanceRef.current.pointOfView(
                                    {
                                        lat: coords.lat,
                                        lng: coords.lng,
                                        altitude: 1.25,
                                    },
                                    1400,
                                );
                            }
                            const interaction = getCountryInteraction(
                                "cholera-series",
                                sectorId,
                                activeWaveIndex,
                            );
                            if (
                                interaction?.type === "epicenter" &&
                                interaction.epicenter
                            ) {
                                setTacticalHUD({
                                    isOpen: true,
                                    epicenterData: interaction.epicenter,
                                });
                            }
                        }}
                    />
                </div>
            )}

            {/* Unified Responsive Pandemic Switcher & Bottom Dock */}
            <PandemicSwitcher onOpenInfo={() => setIsInfoDrawerOpen(true)} />

            {/* Global Tactical Footer & Hover Telemetry (Bottom-Right, Elevated on <=1440px, Parallel with Switcher on >1440px) */}
            <footer className="hidden xl:flex fixed bottom-20 hud-footer-wide right-6 flex-col items-end gap-1.5 pointer-events-none z-10 font-mono text-[10px] text-neutral-500">
                <div className="bg-black/80 border border-neutral-800/80 px-3 py-1 rounded backdrop-blur shadow-lg">
                    {hoveredCountryName ? (
                        <span
                            className={
                                hoveredIsEpicenter
                                    ? "text-red-400 font-bold"
                                    : "text-cyan-400 font-bold"
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
                <div className="bg-black/80 border border-neutral-800/80 px-3 py-1 rounded backdrop-blur text-right text-[9px] text-neutral-600">
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
                onInitializeDossier={(code) => openDossierJourney(code)}
                pandemicId={activePandemicId}
                activeWaveIndex={activeWaveIndex}
            />

            {/* Compact Tactical HUD Modal (Tier 2 Secondary Surveillance) */}
            <SurveillanceModal
                isOpen={surveillanceModal.isOpen}
                onClose={() =>
                    setSurveillanceModal({ isOpen: false, data: null })
                }
                data={surveillanceModal.data}
            />

            {/* 5-Epoch Context-Aware Pathogen Hologram Loader */}
            <PathogenHoloLoader pandemicId={activePandemicId} />
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
