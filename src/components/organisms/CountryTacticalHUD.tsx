"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import {
    X,
    ShieldAlert,
    Activity,
    Users,
    Skull,
    HeartPulse,
    Calendar,
    ArrowRight,
    Radio,
} from "lucide-react";
import {
    EpicenterMetadata,
    SurveillanceData,
    SupportedLocale,
} from "@/data/countriesConfig";

export interface CountryTacticalHUDProps {
    isOpen: boolean;
    onClose: () => void;
    epicenterData?: EpicenterMetadata | null;
    surveillanceData?: SurveillanceData | null;
    onInitializeDossier?: (countryCode: string) => void;
}

export const CountryTacticalHUD: React.FC<CountryTacticalHUDProps> = ({
    isOpen,
    onClose,
    epicenterData,
    surveillanceData,
    onInitializeDossier,
}) => {
    const router = useRouter();
    const currentLocale = useLocale() as SupportedLocale;

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    const handleLaunch = () => {
        if (!epicenterData) return;
        const code = epicenterData.code.toLowerCase();
        if (onInitializeDossier) {
            onInitializeDossier(code);
        } else {
            router.push(`/dossier/covid-19/${code}`);
        }
    };

    if (!isOpen || (!epicenterData && !surveillanceData)) return null;

    const isEpicenter = !!epicenterData;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/75 backdrop-blur-sm cursor-pointer pointer-events-auto"
                        aria-hidden="true"
                    />

                    {/* Modal Content */}
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        initial={{ opacity: 0, scale: 0.94, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.94, y: 15 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className={`relative z-10 w-full pointer-events-auto text-neutral-200 overflow-hidden rounded-xl border backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.85)] ${
                            isEpicenter
                                ? "max-w-lg bg-[#070712]/95 border-red-500/40 shadow-[0_0_50px_rgba(239,68,68,0.2)]"
                                : "max-w-md bg-[#07080f]/95 border-neutral-700/60 shadow-[0_0_40px_rgba(0,0,0,0.9)]"
                        }`}
                    >
                        {/* Top Ambient Glow Line */}
                        <div
                            className={`h-1 w-full ${
                                isEpicenter
                                    ? "bg-gradient-to-r from-red-500 via-cyan-400 to-red-500"
                                    : "bg-gradient-to-r from-neutral-600 via-cyan-600 to-neutral-600"
                            }`}
                        />

                        {/* Modal Header */}
                        <header className="p-4 sm:p-6 pb-3 border-b border-neutral-800/80 flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3">
                                <div
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${
                                        isEpicenter
                                            ? "bg-red-950/70 border-red-500/50 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                                            : "bg-neutral-900 border-neutral-700 text-neutral-400"
                                    }`}
                                >
                                    {isEpicenter ? (
                                        <ShieldAlert className="w-5 h-5 animate-pulse" />
                                    ) : (
                                        <Activity className="w-5 h-5" />
                                    )}
                                </div>

                                <div>
                                    {/* Classification / Sector Tag */}
                                    <div
                                        className={`text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase flex items-center gap-1.5 ${
                                            isEpicenter
                                                ? "text-red-400"
                                                : "text-neutral-400"
                                        }`}
                                    >
                                        <span
                                            className={`w-1.5 h-1.5 rounded-full ${
                                                isEpicenter
                                                    ? "bg-red-500 animate-ping"
                                                    : "bg-neutral-500"
                                            }`}
                                        />
                                        <span>
                                            {isEpicenter
                                                ? epicenterData?.sectorCode
                                                : surveillanceData?.region}
                                        </span>
                                    </div>

                                    {/* Country Name */}
                                    <h2 className="text-lg sm:text-xl font-mono font-black text-white tracking-wider uppercase mt-0.5">
                                        {isEpicenter
                                            ? epicenterData?.name[
                                                  currentLocale
                                              ] || epicenterData?.name.en
                                            : surveillanceData?.name}
                                    </h2>
                                </div>
                            </div>

                            {/* Close Trigger Button */}
                            <button
                                onClick={onClose}
                                className="p-1.5 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-600 transition-colors cursor-pointer shrink-0"
                                aria-label="Close dialog"
                                title="Close (Esc)"
                            >
                                <X className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </header>

                        {/* Modal Body */}
                        <div className="p-4 sm:p-6 space-y-4">
                            {/* TIER 1: EPICENTER CONTENT */}
                            {isEpicenter && epicenterData && (
                                <>
                                    {/* Status Badge Callout */}
                                    <div className="p-2.5 sm:p-3 bg-red-950/40 border border-red-500/30 rounded-lg flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Radio className="w-4 h-4 text-red-400 animate-pulse shrink-0" />
                                            <span className="text-[10px] sm:text-xs font-mono font-bold text-red-300 tracking-wider">
                                                {epicenterData.status[
                                                    currentLocale
                                                ] || epicenterData.status.en}
                                            </span>
                                        </div>
                                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-200 border border-red-800/80 uppercase">
                                            TIER 1 ARCHIVE
                                        </span>
                                    </div>

                                    {/* Narrative Synopsis */}
                                    <div className="bg-neutral-950/70 border border-neutral-800/80 rounded-lg p-3 sm:p-4">
                                        <div className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest mb-1.5">
                                            CHRONOLOGICAL INTELLIGENCE SUMMARY
                                        </div>
                                        <p className="text-xs sm:text-[13px] text-neutral-300 leading-relaxed font-sans">
                                            {epicenterData.synopsis[
                                                currentLocale
                                            ] || epicenterData.synopsis.en}
                                        </p>
                                        <div className="mt-2.5 pt-2 border-t border-neutral-800/60 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                                            <span>RECORDED PERIOD:</span>
                                            <span className="text-neutral-200 font-bold">
                                                {epicenterData.timelinePeriod[
                                                    currentLocale
                                                ] ||
                                                    epicenterData.timelinePeriod
                                                        .en}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Primary CTA: Initialize Deep Dossier */}
                                    <div className="pt-2">
                                        <button
                                            onClick={handleLaunch}
                                            className="w-full flex items-center justify-center gap-2.5 py-3 px-4 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-mono font-black text-xs sm:text-sm uppercase tracking-widest rounded-lg shadow-[0_0_25px_rgba(239,68,68,0.4)] hover:shadow-[0_0_35px_rgba(239,68,68,0.6)] transition-all duration-200 cursor-pointer active:scale-[0.99]"
                                        >
                                            <ShieldAlert className="w-4 h-4" />
                                            <span>
                                                [ INITIALIZE DEEP DOSSIER ]
                                            </span>
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* TIER 2: SURVEILLANCE ONLY CONTENT */}
                            {!isEpicenter && surveillanceData && (
                                <>
                                    {/* Status Badge */}
                                    <div className="p-2 sm:p-2.5 bg-neutral-900/80 border border-neutral-700/80 rounded-lg flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-amber-400/80" />
                                            <span className="text-[10px] sm:text-[11px] font-mono font-bold text-amber-300 tracking-wider">
                                                {surveillanceData.statusBadge}
                                            </span>
                                        </div>
                                        <span className="text-[9px] font-mono text-neutral-400">
                                            TIER 2 DATA
                                        </span>
                                    </div>

                                    {/* Macro Epidemiological Figures Grid */}
                                    <div className="grid grid-cols-2 gap-2.5 pt-1">
                                        {/* Metric 1: Confirmed Cases */}
                                        <div className="bg-neutral-950/80 border border-neutral-800 rounded-lg p-3">
                                            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                                                <span>Confirmed Cases</span>
                                                <Users className="w-3.5 h-3.5 text-neutral-500" />
                                            </div>
                                            <div className="text-base sm:text-lg font-mono font-black text-neutral-100 tracking-tight">
                                                {
                                                    surveillanceData.confirmedCases
                                                }
                                            </div>
                                            <div className="text-[8px] font-mono text-neutral-500 mt-0.5">
                                                Cumulative Infections
                                            </div>
                                        </div>

                                        {/* Metric 2: Total Deaths */}
                                        <div className="bg-neutral-950/80 border border-neutral-800 rounded-lg p-3">
                                            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                                                <span>Total Deaths</span>
                                                <Skull className="w-3.5 h-3.5 text-red-500/80" />
                                            </div>
                                            <div className="text-base sm:text-lg font-mono font-black text-red-400 tracking-tight">
                                                {surveillanceData.totalDeaths}
                                            </div>
                                            <div className="text-[8px] font-mono text-neutral-500 mt-0.5">
                                                Official Attributed
                                            </div>
                                        </div>

                                        {/* Metric 3: Recovery Rate */}
                                        <div className="bg-neutral-950/80 border border-neutral-800 rounded-lg p-3">
                                            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                                                <span>Recovery Rate</span>
                                                <HeartPulse className="w-3.5 h-3.5 text-emerald-400" />
                                            </div>
                                            <div className="text-base sm:text-lg font-mono font-black text-emerald-400 tracking-tight">
                                                {surveillanceData.recoveryRate}
                                            </div>
                                            <div className="text-[8px] font-mono text-neutral-500 mt-0.5">
                                                Clinical Resolution
                                            </div>
                                        </div>

                                        {/* Metric 4: Peak Wave Date */}
                                        <div className="bg-neutral-950/80 border border-neutral-800 rounded-lg p-3">
                                            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                                                <span>Peak Wave</span>
                                                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                                            </div>
                                            <div className="text-xs sm:text-sm font-mono font-bold text-cyan-300 tracking-tight truncate">
                                                {surveillanceData.peakWaveDate}
                                            </div>
                                            <div className="text-[8px] font-mono text-neutral-500 mt-0.5">
                                                Highest Transmission
                                            </div>
                                        </div>
                                    </div>

                                    {/* Purely Informational Telemetry Notice */}
                                    <div className="pt-2">
                                        <button
                                            onClick={onClose}
                                            className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-950 text-neutral-300 hover:text-white font-mono text-xs uppercase tracking-wider rounded-lg border border-neutral-800 transition-colors cursor-pointer text-center"
                                        >
                                            ACKNOWLEDGE // DISMISS TELEMETRY
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CountryTacticalHUD;
