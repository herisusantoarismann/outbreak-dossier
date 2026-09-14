"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useAppStore } from "@/stores/useAppStore";
import {
    Activity,
    Crosshair,
    AlertTriangle,
    ShieldAlert,
    HelpCircle,
    ChevronDown,
} from "lucide-react";
import { VirusInfoModal } from "./VirusInfoModal";
import { LocaleSwitcher } from "@/components/molecules/LocaleSwitcher";

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

const INDONESIA_CAMERA_TARGET = {
    lat: -0.7893,
    lng: 113.9213,
    altitude: 0.85,
};

const GEOJSON_REMOTE_URL =
    "https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson";
const GEOJSON_LOCAL_FALLBACK = "/data/ne_110m_admin_0_countries.geojson";

export const GlobeViewer: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const globeInstanceRef = useRef<any>(null);
    const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const router = useRouter();
    const { setIsLoading, isLoading } = useAppStore();

    const tHub = useTranslations("hub");
    const tStats = useTranslations("whoStats");
    const tBriefing = useTranslations("briefing");

    const [isIndonesiaHovered, setIsIndonesiaHovered] = useState(false);
    const [isGlobeReady, setIsGlobeReady] = useState(false);
    const [isBioModalOpen, setIsBioModalOpen] = useState(false);
    const [isStatsExpanded, setIsStatsExpanded] = useState(false);

    // Helper to identify Indonesia polygon features
    const isIndonesia = useCallback(
        (feat: GeoJsonFeature | null | undefined): boolean => {
            if (!feat?.properties) return false;
            const p = feat.properties;
            return (
                p.ISO_A3 === "IDN" ||
                p.ADM0_A3 === "IDN" ||
                p.ADMIN === "Indonesia" ||
                p.NAME === "Indonesia" ||
                p.NAME_LONG === "Indonesia" ||
                feat.id === "IDN"
            );
        },
        [],
    );

    // Trigger documentary sequence
    const handleTriggerJourney = useCallback(() => {
        if (isLoading) return;

        // Smoothly focus camera onto Indonesia
        if (globeInstanceRef.current) {
            globeInstanceRef.current.pointOfView(INDONESIA_CAMERA_TARGET, 1200);
        }

        // Trigger Cinematic Loading
        setIsLoading(true);

        // 3-second delay for cinematic typewriter loading sequence
        setTimeout(() => {
            router.push("/journey/id");
            setIsLoading(false);
        }, 3000);
    }, [isLoading, router, setIsLoading]);

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

            // Instantiate Globe
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const globe = (GlobeFactory as any)()(containerRef.current)
                .backgroundColor("rgba(5, 5, 8, 0)")
                .showAtmosphere(true)
                .atmosphereColor("#ef4444")
                .atmosphereAltitude(0.22)
                .globeImageUrl(
                    "//unpkg.com/three-globe/example/img/earth-night.jpg",
                )
                .bumpImageUrl(
                    "//unpkg.com/three-globe/example/img/earth-topology.png",
                )
                // Country Polygons Layer
                .polygonsData(geoData.features)
                .polygonAltitude((feat: GeoJsonFeature) =>
                    isIndonesia(feat) ? 0.06 : 0.006,
                )
                .polygonCapColor((feat: GeoJsonFeature) => {
                    if (isIndonesia(feat)) {
                        return "rgba(239, 68, 68, 0.88)";
                    }
                    return "rgba(15, 23, 42, 0.35)";
                })
                .polygonSideColor((feat: GeoJsonFeature) => {
                    if (isIndonesia(feat)) {
                        return "rgba(185, 28, 28, 0.8)";
                    }
                    return "rgba(15, 23, 42, 0.15)";
                })
                .polygonStrokeColor((feat: GeoJsonFeature) => {
                    if (isIndonesia(feat)) {
                        return "#fca5a5";
                    }
                    return "rgba(75, 85, 99, 0.22)";
                })
                .polygonLabel((feat: GeoJsonFeature) => {
                    if (isIndonesia(feat)) {
                        return `
              <div style="
                background: rgba(5, 5, 8, 0.92);
                border: 1px solid rgba(239, 68, 68, 0.8);
                border-radius: 6px;
                padding: 8px 12px;
                font-family: monospace;
                box-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
                color: #ffffff;
                pointer-events: none;
              ">
                <div style="color: #ef4444; font-weight: bold; font-size: 11px; letter-spacing: 0.1em; display: flex; align-items: center; gap: 4px;">
                  <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #ef4444;"></span>
                  ${tHub("hotspotTooltip")}
                </div>
                <div style="font-size: 10px; color: #d1d5db; margin-top: 2px;">
                  ${tHub("hotspotClick")}
                </div>
              </div>
            `;
                    }
                    return "";
                })
                .onPolygonHover((feat: GeoJsonFeature | null) => {
                    const hoveredIsIdn = isIndonesia(feat);
                    setIsIndonesiaHovered(hoveredIsIdn);

                    if (containerRef.current) {
                        containerRef.current.style.cursor = hoveredIsIdn
                            ? "pointer"
                            : "grab";
                    }

                    // Dynamic elevation and brightness on hover
                    globe
                        .polygonAltitude((f: GeoJsonFeature) => {
                            if (isIndonesia(f)) {
                                return hoveredIsIdn ? 0.09 : 0.06;
                            }
                            return 0.006;
                        })
                        .polygonCapColor((f: GeoJsonFeature) => {
                            if (isIndonesia(f)) {
                                return hoveredIsIdn
                                    ? "rgba(248, 113, 113, 0.98)"
                                    : "rgba(239, 68, 68, 0.88)";
                            }
                            return "rgba(15, 23, 42, 0.35)";
                        });
                })
                .onPolygonClick((feat: GeoJsonFeature) => {
                    if (isIndonesia(feat)) {
                        handleTriggerJourney();
                    }
                });

            // Camera view centered toward Southeast Asia / Indonesia
            globe.pointOfView({ lat: 2, lng: 116, altitude: 2.2 });

            // Intelligent Auto-Rotate initial setup
            const controls = globe.controls();
            controls.autoRotate = true;
            controls.autoRotateSpeed = 0.5;
            controls.enableZoom = true;
            controls.minDistance = 140;
            controls.maxDistance = 500;

            globeInstanceRef.current = globe;
            setIsGlobeReady(true);

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
    }, [handleTriggerJourney, isIndonesia, resetIdleTimer, tHub]);

    return (
        <div className="relative w-full h-full overflow-hidden bg-[#050508]">
            {/* 3D WebGL Canvas Mount */}
            <div
                ref={containerRef}
                className="w-full h-full cursor-grab active:cursor-grabbing"
            />

            {/* Sci-Fi Ambient Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,#050508_95%)] pointer-events-none" />

            {/* Top HUD Header */}
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

                {/* Right Header Cluster: Locale Switcher, Mobile Stats Toggle, Desktop Coordinates */}
                <div className="flex items-center gap-2 pointer-events-auto">
                    {/* Tactical Language Switcher */}
                    <LocaleSwitcher />

                    {/* Mobile Stats Toggle Badge */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsStatsExpanded((prev) => !prev)}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/85 border border-neutral-800 hover:border-cyan-500/50 text-[10px] font-mono text-cyan-400 backdrop-blur-md cursor-pointer active:scale-95 transition-all shadow-[0_0_12px_rgba(6,182,212,0.15)]"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                            <span className="font-bold">{tHub("sitrep")}</span>
                            <ChevronDown
                                className={`w-3 h-3 transition-transform duration-200 ${
                                    isStatsExpanded ? "rotate-180" : ""
                                }`}
                            />
                        </button>
                    </div>

                    {/* Desktop Tactical Coordinates HUD */}
                    <div className="hidden md:flex flex-col items-end text-[11px] font-mono text-neutral-400 bg-black/60 border border-neutral-800/80 px-3 py-2 rounded backdrop-blur">
                        <div className="flex items-center gap-1 text-red-400">
                            <Crosshair className="w-3.5 h-3.5" />
                            <span>{tHub("scanActive")}</span>
                        </div>
                        <div>{tHub("targetVector")}</div>
                    </div>
                </div>
            </header>

            {/* Floating Global Pandemic Statistics Widget (WHO Telemetry) */}
            <section
                className={`absolute top-14 right-3 sm:top-24 sm:right-6 z-20 w-[calc(100%-1.5rem)] sm:w-80 max-w-sm pointer-events-none transition-all duration-300 ${
                    isStatsExpanded
                        ? "block pointer-events-auto"
                        : "hidden md:block md:pointer-events-none"
                }`}
            >
                <div className="bg-black/90 md:bg-black/80 backdrop-blur-md border border-neutral-800/90 hover:border-cyan-500/40 rounded-lg p-3 sm:p-4 shadow-[0_0_30px_rgba(0,0,0,0.9)] pointer-events-auto transition-colors duration-300">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-2 mb-2.5 sm:mb-3 border-b border-neutral-800/80">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                            <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
                                {tStats("title")}
                            </span>
                        </div>
                        <span className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/60">
                            {tStats("archiveBadge")}
                        </span>
                    </div>

                    {/* Metric Grid */}
                    <div className="grid grid-cols-2 gap-2 mb-2.5">
                        {/* Global Infections */}
                        <div className="bg-neutral-950/80 border border-neutral-800/90 rounded p-2 sm:p-2.5">
                            <div className="text-[9px] sm:text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-0.5 sm:mb-1 flex items-center justify-between">
                                <span>{tStats("infections")}</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            </div>
                            <div className="text-sm sm:text-lg font-mono font-black text-red-500 tracking-tight hud-glow">
                                {tStats("infectionsCount")}
                            </div>
                            <div className="text-[8px] sm:text-[9px] font-mono text-neutral-500 mt-0.5">
                                {tStats("infectionsLabel")}
                            </div>
                        </div>

                        {/* Global Deaths */}
                        <div className="bg-neutral-950/80 border border-neutral-800/90 rounded p-2 sm:p-2.5">
                            <div className="text-[9px] sm:text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-0.5 sm:mb-1 flex items-center justify-between">
                                <span>{tStats("mortality")}</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
                            </div>
                            <div className="text-sm sm:text-lg font-mono font-black text-neutral-100 tracking-tight">
                                {tStats("mortalityCount")}
                            </div>
                            <div className="text-[8px] sm:text-[9px] font-mono text-neutral-500 mt-0.5">
                                {tStats("mortalityLabel")}
                            </div>
                        </div>
                    </div>

                    {/* Status Span */}
                    <div className="bg-neutral-950/90 border border-neutral-800/80 rounded px-2.5 py-1.5 flex items-center justify-between text-[9px] sm:text-[11px] font-mono">
                        <span className="text-neutral-400">
                            {tStats("statusLabel")}
                        </span>
                        <span className="text-cyan-400 font-bold tracking-wide">
                            {tStats("statusValue")}
                        </span>
                    </div>
                </div>
            </section>

            {/* Bottom Tactical Briefing Card / Callout (Mobile-optimized) */}
            <aside className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:w-96 z-10 pointer-events-none">
                <div className="bg-black/85 backdrop-blur-md border border-red-500/30 rounded-lg p-3 sm:p-4 shadow-[0_0_25px_rgba(239,68,68,0.15)] text-neutral-200 pointer-events-auto">
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono font-bold text-red-400">
                            <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                            <span>{tBriefing("territoryLocked")}</span>
                        </div>
                        <span className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-800">
                            {tBriefing("period")}
                        </span>
                    </div>

                    <h2 className="text-sm sm:text-base font-mono font-bold text-white mb-1">
                        {tBriefing("headline")}
                    </h2>
                    <p className="hidden sm:block text-xs text-neutral-400 mb-3 leading-relaxed">
                        {tBriefing("description")}
                    </p>

                    <div className="flex flex-col gap-1.5 mt-1 sm:mt-0">
                        <button
                            onClick={handleTriggerJourney}
                            disabled={isLoading || !isGlobeReady}
                            className="w-full flex items-center justify-center gap-2 py-2 sm:py-2.5 px-3 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-mono font-bold text-[11px] sm:text-xs uppercase tracking-widest rounded transition-all duration-200 shadow-[0_0_20px_rgba(239,68,68,0.4)] disabled:opacity-50 cursor-pointer"
                        >
                            <ShieldAlert className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span>{tBriefing("launchButton")}</span>
                        </button>

                        {/* Secondary Educational Trigger Button */}
                        <button
                            onClick={() => setIsBioModalOpen(true)}
                            className="w-full flex items-center justify-center gap-1.5 py-1.5 sm:py-2 px-3 bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white font-mono text-[10px] sm:text-xs uppercase tracking-wider rounded border border-neutral-700/80 hover:border-cyan-500/60 transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                        >
                            <HelpCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400" />
                            <span>{tBriefing("bioModalButton")}</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Global Tactical Footer */}
            <footer className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row items-center justify-between gap-2 pointer-events-none z-10 font-mono text-[10px] sm:text-[11px] text-neutral-500">
                <div className="bg-black/75 border border-neutral-800/80 px-3 py-1.5 rounded backdrop-blur text-center sm:text-left">
                    {`OUTBREAK DOSSIER © ${new Date().getFullYear()} // DECLASSIFIED EPIDEMIOLOGICAL DATA INTELLIGENCE.`}
                </div>
                <div className="hidden md:block bg-black/60 border border-neutral-800/80 px-3 py-1.5 rounded backdrop-blur">
                    {isIndonesiaHovered ? (
                        <span className="text-red-400">
                            {tHub("targetLockedPrompt")}
                        </span>
                    ) : (
                        <span>{tHub("dragPrompt")}</span>
                    )}
                </div>
            </footer>

            {/* Educational Virus Info Modal */}
            <VirusInfoModal
                isOpen={isBioModalOpen}
                onClose={() => setIsBioModalOpen(false)}
            />
        </div>
    );
};

export default GlobeViewer;
