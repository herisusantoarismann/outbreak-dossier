"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { Crosshair } from "lucide-react";
import { GlobalExtremeRecord, SupportedLocale } from "@/types/journey";
import { useActivePandemic } from "@/context/PandemicContext";
import { t } from "@/utils/i18n";

export interface TelemetryTickerProps {
    records?: GlobalExtremeRecord[];
    onSelectRecord: (record: GlobalExtremeRecord) => void;
    className?: string;
}

export const TelemetryTicker: React.FC<TelemetryTickerProps> = ({
    records,
    onSelectRecord,
    className = "",
}) => {
    const locale = useLocale() as SupportedLocale;
    const { activePandemic, extremesData } = useActivePandemic();

    const effectiveRecords = records ?? extremesData;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const [prevPandemicId, setPrevPandemicId] = useState(activePandemic.id);
    if (prevPandemicId !== activePandemic.id) {
        setPrevPandemicId(activePandemic.id);
        setCurrentIndex(0);
    }

    // Auto-cycle through items every 7 seconds
    useEffect(() => {
        if (!effectiveRecords.length || isPaused) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % effectiveRecords.length);
        }, 7000);

        return () => clearInterval(interval);
    }, [effectiveRecords.length, isPaused]);

    const pandemicDisplayName =
        locale === "id" ? activePandemic.name.id : activePandemic.name.en;

    // Graceful fallback display when records are still in drafting
    if (!effectiveRecords.length) {
        return (
            <div className={`pointer-events-auto select-none ${className}`}>
                <div className="bg-black/85 border border-amber-500/40 text-[10.5px] sm:text-xs font-mono text-neutral-300 px-2.5 py-1 sm:px-4 sm:py-2 rounded-full backdrop-blur-md flex items-center gap-2 sm:gap-2.5 shadow-[0_0_20px_rgba(0,0,0,0.7)]">
                    <span className="relative flex h-2 w-2 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
                    </span>
                    <span className="text-[9.5px] sm:text-[11px] font-bold tracking-widest text-amber-300 uppercase truncate">
                        [● SURVEILLANCE TELEMETRY // ERA:{" "}
                        {pandemicDisplayName.toUpperCase()} ARCHIVE ACTIVE]
                    </span>
                </div>
            </div>
        );
    }

    const currentRecord = effectiveRecords[currentIndex] || effectiveRecords[0];
    const countryName = t(currentRecord.countryName, locale);
    const label = t(currentRecord.label, locale);

    // Dynamic accent color depending on metric type
    const getMetricAccent = (type: GlobalExtremeRecord["metricType"]) => {
        switch (type) {
            case "mortality":
                return {
                    badge: "border-red-500/40 text-red-400 bg-red-950/40",
                    value: "text-red-300",
                };
            case "survival":
                return {
                    badge: "border-emerald-500/40 text-emerald-400 bg-emerald-950/40",
                    value: "text-emerald-300",
                };
            case "containment":
                return {
                    badge: "border-cyan-500/40 text-cyan-400 bg-cyan-950/40",
                    value: "text-cyan-300",
                };
            case "density":
                return {
                    badge: "border-amber-500/40 text-amber-400 bg-amber-950/40",
                    value: "text-amber-300",
                };
            default:
                return {
                    badge: "border-cyan-500/40 text-cyan-400 bg-cyan-950/40",
                    value: "text-cyan-300",
                };
        }
    };

    const accent = getMetricAccent(currentRecord.metricType);

    return (
        <div
            className={`pointer-events-auto select-none ${className}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <button
                onClick={() => onSelectRecord(currentRecord)}
                title="Click to locate on 3D Globe"
                aria-label={`Locate ${countryName} on Globe`}
                className="group relative bg-black/85 border border-cyan-500/35 hover:border-cyan-400/80 text-[10.5px] sm:text-xs font-mono text-neutral-300 px-2.5 py-1 sm:px-4 sm:py-2 rounded-full backdrop-blur-md flex items-center gap-2 sm:gap-3.5 shadow-[0_0_20px_rgba(0,0,0,0.7)] hover:shadow-[0_0_25px_rgba(6,182,212,0.35)] transition-all duration-300 cursor-pointer max-w-[90vw] sm:max-w-2xl overflow-hidden active:scale-[0.98]"
            >
                {/* Status Indicator Light */}
                <div className="flex items-center gap-1.5 shrink-0 pr-1 border-r border-neutral-800">
                    <span className="relative flex h-2 w-2 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                    </span>
                    <span className="text-[9.5px] sm:text-[11px] font-bold tracking-widest text-cyan-400 uppercase hidden sm:inline">
                        [● LIVE TELEMETRY]
                    </span>
                </div>

                {/* Animated Rotating Ticker Content */}
                <div className="overflow-hidden relative min-h-[22px] flex items-center flex-1">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${activePandemic.id}-${currentRecord.id}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="flex items-center gap-1.5 sm:gap-2.5 whitespace-nowrap text-left truncate"
                        >
                            {/* ISO Badge */}
                            <span
                                className={`px-1.5 py-0.5 rounded border text-[10px] font-black uppercase shrink-0 ${accent.badge}`}
                            >
                                {currentRecord.iso2}
                            </span>

                            {/* Record Country & Label */}
                            <span className="text-neutral-200 font-bold truncate">
                                {countryName}:
                            </span>

                            <span className="text-neutral-400 truncate hidden sm:inline">
                                {label} —
                            </span>

                            {/* Record Value */}
                            <span
                                className={`font-black tracking-tight shrink-0 ${accent.value}`}
                            >
                                {currentRecord.value}
                            </span>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Locate Action Prompt */}
                <div className="hidden md:flex items-center gap-1 shrink-0 text-[10px] text-cyan-400/70 group-hover:text-cyan-300 transition-colors pl-1 border-l border-neutral-800">
                    <Crosshair className="w-3 h-3 group-hover:rotate-45 transition-transform duration-300" />
                    <span className="tracking-wider">[LOCATE]</span>
                </div>
            </button>
        </div>
    );
};

export default TelemetryTicker;
