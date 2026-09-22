"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ChevronUp, X, Activity } from "lucide-react";
import { useLocale } from "next-intl";
import { useActivePandemic } from "@/context/PandemicContext";
import { PandemicProfile } from "@/data/pandemicsRegistry";
import { SupportedLocale } from "@/types/journey";

export interface PandemicSwitcherProps {
    className?: string;
    onOpenInfo?: () => void;
}

export const PandemicSwitcher: React.FC<PandemicSwitcherProps> = ({
    className = "",
    onOpenInfo,
}) => {
    const locale = useLocale() as SupportedLocale;
    const {
        activePandemic,
        activePandemicId,
        setActivePandemicId,
        allPandemics,
    } = useActivePandemic();

    const [isSheetOpen, setIsSheetOpen] = useState(false);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsSheetOpen(false);
        };
        if (isSheetOpen) {
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isSheetOpen]);

    // Sort strictly chronological by year (earliest to latest: 541, 1347, 1817, 1918, 2020)
    const chronologicalPandemics = [...allPandemics].sort(
        (a, b) => a.year - b.year,
    );

    const getChipLabel = (pandemic: PandemicProfile): string => {
        if (pandemic.shortLabel) {
            return pandemic.shortLabel;
        }
        return `${pandemic.year} // ${pandemic.name.en.toUpperCase()}`;
    };

    const getThemeClasses = (
        id: string,
        isActive: boolean,
        isClassified: boolean,
    ): string => {
        if (!isActive) {
            if (isClassified) {
                return "border border-transparent text-neutral-400 hover:text-neutral-200 hover:border-white/20 bg-transparent opacity-60 hover:opacity-90 transition-opacity cursor-pointer";
            }
            return "border border-transparent text-neutral-400 hover:text-neutral-200 hover:border-white/25 bg-transparent cursor-pointer";
        }

        switch (id) {
            case "plague-of-justinian-541":
                return "border-purple-500 text-purple-300 shadow-[0_0_14px_rgba(168,85,247,0.45)] bg-purple-950/50 font-bold";
            case "black-death-1347":
                return "border-rose-600 text-rose-300 shadow-[0_0_14px_rgba(225,29,72,0.45)] bg-rose-950/50 font-bold";
            case "cholera-series":
                return "border-cyan-400 text-cyan-300 shadow-[0_0_14px_rgba(6,182,212,0.45)] bg-cyan-950/50 font-bold";
            case "cholera-1817":
                return "border-emerald-500 text-emerald-300 shadow-[0_0_14px_rgba(16,185,129,0.45)] bg-emerald-950/50 font-bold";
            case "spanish-flu-1918":
                return "border-amber-500 text-amber-300 shadow-[0_0_14px_rgba(245,158,11,0.45)] bg-amber-950/50 font-bold";
            case "covid-19":
                return "border-cyan-400 text-cyan-300 shadow-[0_0_14px_rgba(6,182,212,0.45)] bg-cyan-950/50 font-bold";
            default:
                return "border-cyan-400 text-cyan-300 shadow-[0_0_14px_rgba(6,182,212,0.45)] bg-cyan-950/50 font-bold";
        }
    };

    const getBadgeStyle = (id: string) => {
        switch (id) {
            case "plague-of-justinian-541":
                return "border-purple-500/50 bg-purple-950/60 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.3)]";
            case "black-death-1347":
                return "border-rose-600/50 bg-rose-950/60 text-rose-300 shadow-[0_0_10px_rgba(225,29,72,0.3)]";
            case "cholera-series":
                return "border-cyan-400/50 bg-cyan-950/60 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]";
            case "cholera-1817":
                return "border-emerald-500/50 bg-emerald-950/60 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.3)]";
            case "spanish-flu-1918":
                return "border-amber-500/50 bg-amber-950/60 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.3)]";
            case "covid-19":
            default:
                return "border-cyan-400/50 bg-cyan-950/60 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]";
        }
    };

    const activeBadgeClasses = getBadgeStyle(activePandemic.id);

    const activeDisplayName =
        locale === "id" ? activePandemic.name.id : activePandemic.name.en;

    return (
        <>
            {/* 1. Mobile & Tablet Unified Tactical Command Dock (< xl: below 1280px) */}
            <div className="fixed bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 flex xl:hidden items-center gap-2 sm:gap-3 max-w-[95vw] pointer-events-auto select-none">
                {/* Pathogen Intelligence Brief Trigger */}
                {onOpenInfo && (
                    <button
                        type="button"
                        onClick={onOpenInfo}
                        className="font-mono text-xs text-neutral-200 border border-white/20 bg-black/90 backdrop-blur-md px-3 sm:px-3.5 py-1.5 rounded-full hover:border-cyan-400 hover:text-cyan-300 transition-all cursor-pointer shadow-[0_0_18px_rgba(0,0,0,0.8)] flex items-center gap-1.5 active:scale-95 shrink-0"
                        aria-label="Open Pathogen Intelligence Brief"
                        title="Open Pathogen Intelligence Brief"
                    >
                        <span className="text-cyan-400 font-bold shrink-0">
                            [!]
                        </span>
                        <span className="font-bold tracking-wider">BRIEF</span>
                        <span className="hidden sm:inline text-neutral-400 text-[10px] font-normal truncate max-w-[130px]">
                            {activeDisplayName}
                        </span>
                    </button>
                )}

                {/* Compact Epoch Trigger Button */}
                <button
                    type="button"
                    onClick={() => setIsSheetOpen(true)}
                    className={`px-3 sm:px-3.5 py-1.5 rounded-full border bg-black/90 backdrop-blur-md text-xs font-mono flex items-center gap-2 shadow-[0_0_18px_rgba(0,0,0,0.8)] text-neutral-200 active:scale-95 cursor-pointer hover:border-white/40 transition-all ${activeBadgeClasses}`}
                    aria-label="Select Historical Pandemic Epoch"
                    title="Switch Historical Pandemic Epoch"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse shrink-0" />
                    <span className="text-[10px] text-neutral-400 font-normal uppercase tracking-wider">
                        ERA:
                    </span>
                    <span className="font-bold tracking-wider truncate max-w-[140px] xs:max-w-[180px] sm:max-w-[220px]">
                        {activePandemic.shortLabel || activeDisplayName}
                    </span>
                    <ChevronUp className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                </button>
            </div>

            {/* 2. Widescreen Desktop Tactical Command Dock (xl: 1280px and above) */}
            <nav
                aria-label="Chronological Pandemic Dossier Selector"
                className={`hidden xl:flex fixed bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 flex-row items-center gap-1.5 p-1.5 bg-black/90 border border-white/15 backdrop-blur-md rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.85)] pointer-events-auto font-mono text-[11px] 2xl:text-xs select-none ${className}`}
            >
                {/* Pathogen Intelligence Brief Trigger Button */}
                {onOpenInfo && (
                    <>
                        <button
                            type="button"
                            onClick={onOpenInfo}
                            className="px-3 py-1 rounded-full border border-white/10 hover:border-cyan-400/60 bg-white/5 hover:bg-cyan-950/40 text-neutral-300 hover:text-cyan-300 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shrink-0 shadow-sm"
                            aria-label="Open Pathogen Intelligence Brief"
                            title={`Open Intelligence Brief: ${activeDisplayName}`}
                        >
                            <span className="text-cyan-400 font-bold shrink-0">
                                [!]
                            </span>
                            <span className="font-bold tracking-wider">
                                BRIEF
                            </span>
                        </button>
                        <div
                            className="h-3.5 w-px bg-white/15 mx-0.5 shrink-0"
                            aria-hidden="true"
                        />
                    </>
                )}

                {/* Historical Epoch Buttons */}
                {chronologicalPandemics.map((pandemic) => {
                    const isActive = pandemic.id === activePandemicId;
                    const isClassified =
                        pandemic.status === "classified_archive";
                    const label = getChipLabel(pandemic);
                    const buttonClass = getThemeClasses(
                        pandemic.id,
                        isActive,
                        isClassified,
                    );

                    return (
                        <button
                            key={pandemic.id}
                            type="button"
                            onClick={() => setActivePandemicId(pandemic.id)}
                            className={`px-2.5 2xl:px-3 py-1 rounded-full border transition-all duration-200 tracking-wider whitespace-nowrap active:scale-95 flex items-center gap-1.5 ${buttonClass}`}
                            title={
                                isClassified
                                    ? `[ RESTRICTED ARCHIVE ] ${pandemic.name.en} (${pandemic.eraLabel}) — ${pandemic.pathogenName}`
                                    : `${pandemic.name.en} (${pandemic.eraLabel}) — ${pandemic.pathogenName}`
                            }
                        >
                            {isClassified && !isActive && (
                                <Lock className="w-3 h-3 shrink-0 opacity-70" />
                            )}
                            {isActive && (
                                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse shrink-0" />
                            )}
                            <span>
                                {isActive ? `[● ${label} ]` : `[ ${label} ]`}
                            </span>
                        </button>
                    );
                })}
            </nav>

            {/* 3. Responsive Tactical Epoch Selector Modal (Slide-up Sheet on Mobile, Centered on Tablet) */}
            <AnimatePresence>
                {isSheetOpen && (
                    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-auto">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setIsSheetOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
                            aria-hidden="true"
                        />

                        {/* Tactical Sheet/Modal Container */}
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-label="Historical Pandemic Epochs Selector"
                            initial={{ opacity: 0, y: 30, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 30, scale: 0.98 }}
                            transition={{
                                duration: 0.25,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="relative z-10 w-full max-w-lg bg-[#07090f]/98 border-t sm:border border-neutral-800 rounded-t-2xl sm:rounded-2xl p-4 sm:p-5 pb-8 sm:pb-5 shadow-[0_-10px_40px_rgba(0,0,0,0.9)] max-h-[85vh] overflow-y-auto font-mono text-neutral-200 select-none"
                        >
                            {/* Sheet Pull Bar (Mobile only) */}
                            <div className="sm:hidden w-10 h-1 rounded-full bg-neutral-700 mx-auto mb-3.5" />

                            {/* Modal Header */}
                            <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80 mb-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                                        <Activity className="w-3.5 h-3.5 animate-pulse" />
                                    </div>
                                    <div>
                                        <div className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest">
                                            TEMPORAL RECONNAISSANCE
                                        </div>
                                        <div className="text-xs font-bold text-neutral-100 uppercase tracking-wider">
                                            HISTORICAL PANDEMIC EPOCHS
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsSheetOpen(false)}
                                    className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                                    aria-label="Close dialog"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Epochs List */}
                            <div className="space-y-2">
                                {chronologicalPandemics.map((pandemic) => {
                                    const isActive =
                                        pandemic.id === activePandemicId;
                                    const isClassified =
                                        pandemic.status ===
                                        "classified_archive";
                                    const badgeClass = getBadgeStyle(
                                        pandemic.id,
                                    );
                                    const displayName =
                                        locale === "id"
                                            ? pandemic.name.id
                                            : pandemic.name.en;

                                    return (
                                        <button
                                            key={pandemic.id}
                                            type="button"
                                            onClick={() => {
                                                setActivePandemicId(
                                                    pandemic.id,
                                                );
                                                setIsSheetOpen(false);
                                            }}
                                            className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-3 active:scale-[0.99] cursor-pointer ${
                                                isActive
                                                    ? `${badgeClass} bg-opacity-30`
                                                    : isClassified
                                                      ? "border-neutral-800/70 bg-neutral-950/60 text-neutral-400 hover:border-neutral-700"
                                                      : "border-neutral-700/60 bg-neutral-900/60 text-neutral-200 hover:border-neutral-500"
                                            }`}
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                {/* Year Badge */}
                                                <div
                                                    className={`w-12 h-11 rounded-lg flex flex-col items-center justify-center border font-mono font-bold shrink-0 ${badgeClass}`}
                                                >
                                                    <span className="text-xs font-black">
                                                        {pandemic.year}
                                                    </span>
                                                    <span className="text-[8px] tracking-widest opacity-80">
                                                        M
                                                    </span>
                                                </div>

                                                {/* Text Information */}
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-1.5">
                                                        <span
                                                            className={`text-xs font-bold truncate ${
                                                                isActive
                                                                    ? "text-white"
                                                                    : isClassified
                                                                      ? "text-neutral-300"
                                                                      : "text-white"
                                                            }`}
                                                        >
                                                            {displayName}
                                                        </span>
                                                    </div>
                                                    <div className="text-[10px] text-neutral-400 truncate italic">
                                                        {pandemic.pathogenName}
                                                    </div>
                                                    <div className="text-[9px] text-neutral-500 font-mono tracking-tight">
                                                        {pandemic.eraLabel} •{" "}
                                                        {
                                                            pandemic.globalFatalities
                                                        }
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Status Badge */}
                                            <div className="shrink-0 flex items-center">
                                                {isClassified ? (
                                                    <div className="flex items-center gap-1 px-2 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 text-[9px] font-mono tracking-wider">
                                                        <Lock className="w-3 h-3" />
                                                        <span>LOCKED</span>
                                                    </div>
                                                ) : isActive ? (
                                                    <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-cyan-950 border border-cyan-500/60 text-cyan-300 text-[9px] font-mono font-bold tracking-wider shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                                        <span>ACTIVE</span>
                                                    </div>
                                                ) : (
                                                    <div className="px-2 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 text-[9px] font-mono tracking-wider">
                                                        SELECT
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default PandemicSwitcher;
