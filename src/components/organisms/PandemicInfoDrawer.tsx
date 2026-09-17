"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import {
    X,
    Dna,
    Radio,
    ShieldCheck,
    AlertOctagon,
    Thermometer,
} from "lucide-react";
import { useActivePandemic } from "@/context/PandemicContext";
import { SupportedLocale } from "@/types/journey";

export interface PandemicInfoDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export const PandemicInfoDrawer: React.FC<PandemicInfoDrawerProps> = ({
    isOpen,
    onClose,
}) => {
    const locale = useLocale() as SupportedLocale;
    const { activePandemic, aboutDrawerContent } = useActivePandemic();

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

    const title =
        locale === "id"
            ? aboutDrawerContent.title.id
            : aboutDrawerContent.title.en;

    const overview =
        locale === "id"
            ? aboutDrawerContent.overview.id
            : aboutDrawerContent.overview.en;

    const classification = aboutDrawerContent.clinical.classification;
    const metrics = aboutDrawerContent.clinical.metrics;
    const transmission = aboutDrawerContent.clinical.transmission;
    const symptoms = aboutDrawerContent.clinical.symptoms;

    const isBlackDeath = activePandemic.id === "black-death-1347";
    const isSpanishFlu = activePandemic.id === "spanish-flu-1918";
    const isJustinian = activePandemic.id === "plague-of-justinian-541";

    const accentColor = isJustinian
        ? "text-purple-400 border-purple-500/40 bg-purple-950/70 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
        : isBlackDeath
          ? "text-rose-400 border-rose-500/40 bg-rose-950/70 shadow-[0_0_15px_rgba(225,29,72,0.3)]"
          : isSpanishFlu
            ? "text-amber-400 border-amber-500/40 bg-amber-950/70 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
            : "text-cyan-400 border-cyan-500/40 bg-cyan-950/70 shadow-[0_0_15px_rgba(6,182,212,0.3)]";

    const topBorderGradient = isJustinian
        ? "from-purple-500 via-neutral-900 to-purple-600"
        : isBlackDeath
          ? "from-rose-500 via-neutral-900 to-rose-600"
          : isSpanishFlu
            ? "from-amber-500 via-neutral-900 to-amber-600"
            : "from-cyan-500 via-red-500 to-cyan-400";

    const closeBtnHover = isJustinian
        ? "hover:border-purple-500/50"
        : isBlackDeath
          ? "hover:border-rose-500/50"
          : isSpanishFlu
            ? "hover:border-amber-500/50"
            : "hover:border-cyan-500/50";

    const ackBtnClass = isJustinian
        ? "bg-purple-950/80 hover:bg-purple-900 text-purple-200 border-purple-700/60 hover:border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
        : isBlackDeath
          ? "bg-rose-950/80 hover:bg-rose-900 text-rose-200 border-rose-700/60 hover:border-rose-400 shadow-[0_0_20px_rgba(225,29,72,0.2)]"
          : isSpanishFlu
            ? "bg-amber-950/80 hover:bg-amber-900 text-amber-200 border-amber-700/60 hover:border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
            : "bg-cyan-950/80 hover:bg-cyan-900 text-cyan-200 border-cyan-700/60 hover:border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]";

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-hidden">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/75 backdrop-blur-sm cursor-pointer z-40"
                        aria-hidden="true"
                    />

                    {/* Slide-over Tactical Drawer */}
                    <motion.aside
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="drawer-title"
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{
                            type: "spring",
                            damping: 30,
                            stiffness: 300,
                            mass: 0.8,
                        }}
                        className="fixed top-0 bottom-0 left-0 z-50 w-full sm:w-[480px] max-w-full bg-[#06060c]/98 border-r border-white/10 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.8)] flex flex-col text-neutral-200 select-text overflow-hidden"
                    >
                        {/* Top Ambient Glow Strip */}
                        <div
                            className={`h-1 w-full bg-gradient-to-r ${topBorderGradient} opacity-80`}
                        />

                        {/* Drawer Header */}
                        <header className="p-4 sm:p-6 border-b border-neutral-800/80 relative flex items-start justify-between gap-3 shrink-0">
                            <div className="flex items-start gap-3">
                                <div
                                    className={`w-10 h-10 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${accentColor}`}
                                >
                                    <AlertOctagon className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-[10px] font-mono font-bold tracking-widest uppercase flex items-center gap-1.5 mb-1 text-neutral-400">
                                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                                        <span>
                                            HISTORICAL EPIDEMIOLOGY //{" "}
                                            {activePandemic.eraLabel}
                                        </span>
                                    </div>
                                    <h2
                                        id="drawer-title"
                                        className="text-base sm:text-lg font-mono font-black text-white tracking-wider uppercase"
                                    >
                                        {title}
                                    </h2>
                                    {aboutDrawerContent.subtitle && (
                                        <p className="text-xs text-purple-300 font-medium italic mt-1 leading-snug">
                                            {locale === "id"
                                                ? aboutDrawerContent.subtitle.id
                                                : aboutDrawerContent.subtitle
                                                      .en}
                                        </p>
                                    )}
                                    <p className="text-[10px] font-mono text-neutral-400 mt-0.5 tracking-wide">
                                        {aboutDrawerContent.pathogenName}
                                    </p>
                                </div>
                            </div>

                            {/* Close Trigger Button */}
                            <button
                                onClick={onClose}
                                className={`p-1.5 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 transition-colors cursor-pointer shrink-0 ${closeBtnHover}`}
                                aria-label="Close Drawer"
                                title="Close (Esc)"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </header>

                        {/* Scrollable Intelligence Body */}
                        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 custom-scrollbar">
                            {/* Overview Box */}
                            <div className="p-3.5 bg-neutral-950/90 border border-neutral-800/80 rounded-lg">
                                <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold mb-1">
                                    [ HISTORICAL DOSSIER OVERVIEW ]
                                </div>
                                <p className="text-xs sm:text-[13px] text-neutral-300 leading-relaxed font-sans">
                                    {overview}
                                </p>
                            </div>

                            {/* Section 1: Biological Classification & Pathogen Structure */}
                            <section className="space-y-2">
                                <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-neutral-300">
                                    <Dna className="w-4 h-4 text-cyan-400" />
                                    <span>
                                        {locale === "id"
                                            ? classification.title.id
                                            : classification.title.en}
                                    </span>
                                </div>
                                <p className="text-xs sm:text-[13px] text-neutral-300 leading-relaxed font-sans bg-neutral-950/60 border border-neutral-800/80 p-3.5 rounded-lg">
                                    {locale === "id"
                                        ? classification.text.id
                                        : classification.text.en}
                                </p>
                            </section>

                            {/* Tactical Metric Grid */}
                            <div className="grid grid-cols-3 gap-2">
                                <div className="bg-neutral-950/90 border border-neutral-800/90 rounded-lg p-2.5 text-center">
                                    <div className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider mb-1 truncate">
                                        {locale === "id"
                                            ? metrics.incubation.title.id
                                            : metrics.incubation.title.en}
                                    </div>
                                    <div className="text-xs sm:text-sm font-mono font-bold text-red-400">
                                        {metrics.incubation.value}
                                    </div>
                                    <div className="text-[8px] font-mono text-neutral-500 mt-0.5 truncate">
                                        {locale === "id"
                                            ? metrics.incubation.sub.id
                                            : metrics.incubation.sub.en}
                                    </div>
                                </div>

                                <div className="bg-neutral-950/90 border border-neutral-800/90 rounded-lg p-2.5 text-center">
                                    <div className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider mb-1 truncate">
                                        {locale === "id"
                                            ? metrics.receptor.title.id
                                            : metrics.receptor.title.en}
                                    </div>
                                    <div className="text-xs sm:text-sm font-mono font-bold text-cyan-400 truncate">
                                        {metrics.receptor.value}
                                    </div>
                                    <div className="text-[8px] font-mono text-neutral-500 mt-0.5 truncate">
                                        {locale === "id"
                                            ? metrics.receptor.sub.id
                                            : metrics.receptor.sub.en}
                                    </div>
                                </div>

                                <div className="bg-neutral-950/90 border border-neutral-800/90 rounded-lg p-2.5 text-center">
                                    <div className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider mb-1 truncate">
                                        {locale === "id"
                                            ? metrics.family.title.id
                                            : metrics.family.title.en}
                                    </div>
                                    <div className="text-xs sm:text-sm font-mono font-bold text-neutral-200 truncate">
                                        {metrics.family.value}
                                    </div>
                                    <div className="text-[8px] font-mono text-neutral-500 mt-0.5 truncate">
                                        {locale === "id"
                                            ? metrics.family.sub.id
                                            : metrics.family.sub.en}
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Transmission Vectors */}
                            <section className="p-3.5 bg-red-950/25 border border-red-900/50 rounded-lg space-y-1.5">
                                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
                                    <Radio className="w-4 h-4 text-red-400 animate-pulse" />
                                    <span>
                                        {locale === "id"
                                            ? transmission.title.id
                                            : transmission.title.en}
                                    </span>
                                </div>
                                <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                                    {locale === "id"
                                        ? transmission.text.id
                                        : transmission.text.en}
                                </p>
                            </section>

                            {/* Section 3: Core Clinical Manifestations */}
                            <section className="p-3.5 bg-cyan-950/20 border border-cyan-900/50 rounded-lg space-y-1.5">
                                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                                    <Thermometer className="w-4 h-4 text-cyan-400" />
                                    <span>
                                        {locale === "id"
                                            ? symptoms.title.id
                                            : symptoms.title.en}
                                    </span>
                                </div>
                                <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                                    {locale === "id"
                                        ? symptoms.text.id
                                        : symptoms.text.en}
                                </p>
                            </section>

                            {/* Section 4: Clinical Features / Syndromic Profile */}
                            {aboutDrawerContent.clinicalFeatures &&
                                aboutDrawerContent.clinicalFeatures.length >
                                    0 && (
                                    <section className="space-y-2">
                                        <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-neutral-300">
                                            <Thermometer className="w-4 h-4 text-purple-400" />
                                            <span>
                                                {locale === "id"
                                                    ? "Fitur Klinis Khas"
                                                    : "Key Clinical Features"}
                                            </span>
                                        </div>
                                        <div className="space-y-2">
                                            {aboutDrawerContent.clinicalFeatures.map(
                                                (feat, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="p-3 bg-neutral-950/70 border border-neutral-800/80 rounded-lg"
                                                    >
                                                        <div className="text-xs font-bold text-purple-300 mb-1">
                                                            {locale === "id"
                                                                ? feat.name.id
                                                                : feat.name.en}
                                                        </div>
                                                        <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                                                            {locale === "id"
                                                                ? feat
                                                                      .description
                                                                      .id
                                                                : feat
                                                                      .description
                                                                      .en}
                                                        </p>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </section>
                                )}

                            {/* Section 5: Historical & Geopolitical Impact */}
                            {aboutDrawerContent.historicalImpact && (
                                <section className="p-3.5 bg-purple-950/25 border border-purple-900/50 rounded-lg space-y-1.5">
                                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
                                        <AlertOctagon className="w-4 h-4 text-purple-400" />
                                        <span>
                                            {locale === "id"
                                                ? "Dampak Historis & Geopolitik"
                                                : "Historical & Geopolitical Impact"}
                                        </span>
                                    </div>
                                    <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                                        {locale === "id"
                                            ? aboutDrawerContent
                                                  .historicalImpact.id
                                            : aboutDrawerContent
                                                  .historicalImpact.en}
                                    </p>
                                </section>
                            )}
                        </div>

                        {/* Drawer Footer Action */}
                        <footer className="p-4 sm:p-5 border-t border-neutral-800/80 bg-neutral-950/80 shrink-0">
                            <button
                                onClick={onClose}
                                className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 font-mono font-bold text-xs uppercase tracking-widest rounded-lg border transition-all duration-200 cursor-pointer active:scale-[0.99] ${ackBtnClass}`}
                            >
                                <ShieldCheck className="w-4 h-4" />
                                <span>
                                    {locale === "id"
                                        ? "Konfirmasi & Tutup Berkas"
                                        : "Acknowledge & Close Dossier"}
                                </span>
                            </button>
                        </footer>
                    </motion.aside>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PandemicInfoDrawer;
