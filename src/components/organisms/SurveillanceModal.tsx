"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import {
    X,
    Activity,
    Users,
    Skull,
    HeartPulse,
    Calendar,
    AlertCircle,
} from "lucide-react";
import { CountrySurveillanceData, SupportedLocale } from "@/types/journey";
import { t } from "@/utils/i18n";

export interface SurveillanceModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: CountrySurveillanceData | null;
}

export const SurveillanceModal: React.FC<SurveillanceModalProps> = ({
    isOpen,
    onClose,
    data,
}) => {
    const locale = useLocale() as SupportedLocale;

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

    if (!isOpen || !data) return null;

    const countryName = data.name
        ? t(data.name, locale)
        : data.regionName
          ? t(data.regionName, locale)
          : data.iso2;
    const peakWaveText = data.peakWave
        ? t(data.peakWave, locale)
        : data.peakPeriod || "—";

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

                    {/* Compact Tactical HUD Modal */}
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        initial={{ opacity: 0, scale: 0.94, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.94, y: 15 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="relative z-10 w-full max-w-md pointer-events-auto text-neutral-200 overflow-hidden rounded-xl border border-neutral-700/60 bg-[#07080f]/95 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,0,0,0.9)]"
                    >
                        {/* Top Ambient Glow Line */}
                        <div className="h-1 w-full bg-gradient-to-r from-neutral-600 via-cyan-500 to-neutral-600" />

                        {/* Modal Header */}
                        <header className="p-4 sm:p-5 pb-3 border-b border-neutral-800/80 flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border bg-neutral-900 border-neutral-700 text-cyan-400">
                                    <Activity className="w-5 h-5" />
                                </div>

                                <div>
                                    {/* Classification & ISO-2 Badge */}
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/80 font-mono font-black text-xs tracking-wider">
                                            {data.iso2}
                                        </span>
                                        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                                            {`${data.continent} // SECTOR 02`}
                                        </span>
                                    </div>

                                    {/* Country Name */}
                                    <h2 className="text-lg sm:text-xl font-mono font-black text-white tracking-wider uppercase">
                                        {countryName}
                                    </h2>
                                </div>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="p-1.5 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-600 transition-colors cursor-pointer shrink-0"
                                aria-label="Close modal"
                                title="Close (Esc)"
                            >
                                <X className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </header>

                        {/* Modal Body */}
                        <div className="p-4 sm:p-5 space-y-3.5">
                            {/* Secondary Surveillance Notice */}
                            <div className="p-2.5 bg-neutral-900/80 border border-neutral-700/80 rounded-lg flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-amber-300 tracking-wider">
                                    {data.statusBadge
                                        ? t(data.statusBadge, locale)
                                        : locale === "id"
                                          ? "[!] PENGAWASAN SEKUNDER // TELEMETRI MONITORING SAJA"
                                          : "[!] SECONDARY SURVEILLANCE // MONITORING TELEMETRY ONLY"}
                                </span>
                            </div>

                            {/* Macro Metrics Grid */}
                            <div className="grid grid-cols-2 gap-2.5 pt-1">
                                {/* Confirmed Cases */}
                                <div className="bg-neutral-950/80 border border-neutral-800 rounded-lg p-3">
                                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                                        <span>
                                            {locale === "id"
                                                ? "Kasus Terkonfirmasi"
                                                : "Confirmed Cases"}
                                        </span>
                                        <Users className="w-3.5 h-3.5 text-neutral-500" />
                                    </div>
                                    <div className="text-base sm:text-lg font-mono font-black text-neutral-100 tracking-tight truncate">
                                        {typeof data.confirmedCases === "number"
                                            ? data.confirmedCases.toLocaleString()
                                            : (data.confirmedCases ?? "—")}
                                    </div>
                                    <div className="text-[8px] font-mono text-neutral-500 mt-0.5">
                                        {locale === "id"
                                            ? "Infeksi Kumulatif"
                                            : "Cumulative Infections"}
                                    </div>
                                </div>

                                {/* Total Deaths */}
                                <div className="bg-neutral-950/80 border border-neutral-800 rounded-lg p-3">
                                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                                        <span>
                                            {locale === "id"
                                                ? "Total Kematian"
                                                : "Total Deaths"}
                                        </span>
                                        <Skull className="w-3.5 h-3.5 text-red-500/80" />
                                    </div>
                                    <div className="text-base sm:text-lg font-mono font-black text-red-400 tracking-tight truncate">
                                        {data.fatalitiesEstimate ||
                                            (typeof data.fatalities === "number"
                                                ? data.fatalities.toLocaleString()
                                                : (data.fatalities ?? "—"))}
                                    </div>
                                    <div className="text-[8px] font-mono text-neutral-500 mt-0.5">
                                        {locale === "id"
                                            ? "Estimasi Fatalitas"
                                            : "Fatalities Estimate"}
                                    </div>
                                </div>

                                {/* Recovery Rate */}
                                <div className="bg-neutral-950/80 border border-neutral-800 rounded-lg p-3">
                                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                                        <span>
                                            {locale === "id"
                                                ? "Tingkat Kesembuhan"
                                                : "Recovery Rate"}
                                        </span>
                                        <HeartPulse className="w-3.5 h-3.5 text-emerald-400" />
                                    </div>
                                    <div className="text-base sm:text-lg font-mono font-black text-emerald-400 tracking-tight">
                                        {data.recoveryRate ?? "—"}
                                    </div>
                                    <div className="text-[8px] font-mono text-neutral-500 mt-0.5">
                                        {locale === "id"
                                            ? "Resolusi Klinis"
                                            : "Clinical Resolution"}
                                    </div>
                                </div>

                                {/* Peak Wave */}
                                <div className="bg-neutral-950/80 border border-neutral-800 rounded-lg p-3">
                                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                                        <span>
                                            {locale === "id"
                                                ? "Puncak Gelombang"
                                                : "Peak Wave"}
                                        </span>
                                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                                    </div>
                                    <div className="text-xs sm:text-sm font-mono font-bold text-cyan-300 tracking-tight truncate">
                                        {peakWaveText}
                                    </div>
                                    <div className="text-[8px] font-mono text-neutral-500 mt-0.5">
                                        {locale === "id"
                                            ? "Transmisi Tertinggi"
                                            : "Highest Transmission"}
                                    </div>
                                </div>
                            </div>

                            {/* Historical Tactical Notes (if available) */}
                            {data.notes && (
                                <div className="p-3 bg-neutral-900/60 border border-neutral-800/80 rounded-lg font-mono text-[11px] text-neutral-300 leading-relaxed">
                                    <span className="text-red-400 font-bold uppercase tracking-wider block text-[9px] mb-1">
                                        {locale === "id"
                                            ? "// CATATAN HISTORIS REGIONAL"
                                            : "// REGIONAL HISTORICAL CHRONICLE"}
                                    </span>
                                    {t(data.notes, locale)}
                                </div>
                            )}

                            {/* Dismiss / Close Action Button */}
                            <div className="pt-2">
                                <button
                                    onClick={onClose}
                                    className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-950 text-neutral-300 hover:text-white font-mono text-xs uppercase tracking-wider rounded-lg border border-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
                                >
                                    <span>
                                        {locale === "id"
                                            ? "[ TUTUP X ]"
                                            : "[ CLOSE X ]"}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SurveillanceModal;
