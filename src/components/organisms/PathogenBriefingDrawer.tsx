"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
    X,
    Dna,
    Radio,
    ShieldCheck,
    AlertOctagon,
    Thermometer,
} from "lucide-react";

interface PathogenBriefingDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export const PathogenBriefingDrawer: React.FC<PathogenBriefingDrawerProps> = ({
    isOpen,
    onClose,
}) => {
    const t = useTranslations("pathogenBrief");

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
                        className="fixed top-0 bottom-0 left-0 z-50 w-full sm:w-[460px] max-w-full bg-[#06060c]/98 border-r border-cyan-500/30 backdrop-blur-2xl shadow-[0_0_60px_rgba(6,182,212,0.15)] flex flex-col text-neutral-200 select-text overflow-hidden"
                    >
                        {/* Top Ambient Glow Strip */}
                        <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-red-500 to-cyan-400 opacity-80" />

                        {/* Drawer Header */}
                        <header className="p-4 sm:p-6 border-b border-neutral-800/80 relative flex items-start justify-between gap-3 shrink-0">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-cyan-950/70 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] shrink-0 mt-0.5">
                                    <AlertOctagon className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase flex items-center gap-1.5 mb-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                                        {t("classifiedBadge")}
                                    </div>
                                    <h2
                                        id="drawer-title"
                                        className="text-base sm:text-lg font-mono font-black text-white tracking-wider uppercase"
                                    >
                                        {t("title")}
                                    </h2>
                                    <p className="text-[10px] font-mono text-neutral-400 mt-0.5 tracking-wide">
                                        {t("subtitle")}
                                    </p>
                                </div>
                            </div>

                            {/* Close Trigger Button */}
                            <button
                                onClick={onClose}
                                className="p-1.5 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 hover:border-cyan-500/50 transition-colors cursor-pointer shrink-0"
                                aria-label={t("closeBtn")}
                                title="Close (Esc)"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </header>

                        {/* Scrollable Intelligence Body */}
                        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 custom-scrollbar">
                            {/* Section 1: Biological Classification & Virion Structure */}
                            <section className="space-y-2">
                                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                                    <Dna className="w-4 h-4 text-cyan-400" />
                                    <span>{t("classificationTitle")}</span>
                                </div>
                                <p className="text-xs sm:text-[13px] text-neutral-300 leading-relaxed font-sans bg-neutral-950/60 border border-neutral-800/80 p-3.5 rounded-lg">
                                    {t("classificationText")}
                                </p>
                            </section>

                            {/* Tactical Metric Grid */}
                            <div className="grid grid-cols-3 gap-2">
                                <div className="bg-neutral-950/90 border border-neutral-800/90 rounded-lg p-2.5 text-center">
                                    <div className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                                        {t("incubationTitle")}
                                    </div>
                                    <div className="text-xs sm:text-sm font-mono font-bold text-red-400">
                                        {t("incubationValue")}
                                    </div>
                                    <div className="text-[8px] font-mono text-neutral-500 mt-0.5 truncate">
                                        {t("incubationSub")}
                                    </div>
                                </div>

                                <div className="bg-neutral-950/90 border border-neutral-800/90 rounded-lg p-2.5 text-center">
                                    <div className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                                        {t("receptorTitle")}
                                    </div>
                                    <div className="text-xs sm:text-sm font-mono font-bold text-cyan-400">
                                        {t("receptorValue")}
                                    </div>
                                    <div className="text-[8px] font-mono text-neutral-500 mt-0.5 truncate">
                                        {t("receptorSub")}
                                    </div>
                                </div>

                                <div className="bg-neutral-950/90 border border-neutral-800/90 rounded-lg p-2.5 text-center">
                                    <div className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                                        {t("familyTitle")}
                                    </div>
                                    <div className="text-xs sm:text-sm font-mono font-bold text-neutral-200 truncate">
                                        {t("familyValue")}
                                    </div>
                                    <div className="text-[8px] font-mono text-neutral-500 mt-0.5 truncate">
                                        {t("familySub")}
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Transmission Vectors */}
                            <section className="p-3.5 bg-red-950/25 border border-red-900/50 rounded-lg space-y-1.5">
                                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
                                    <Radio className="w-4 h-4 text-red-400 animate-pulse" />
                                    <span>{t("transmissionTitle")}</span>
                                </div>
                                <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                                    {t("transmissionText")}
                                </p>
                            </section>

                            {/* Section 3: Core Clinical Manifestations */}
                            <section className="p-3.5 bg-cyan-950/20 border border-cyan-900/50 rounded-lg space-y-1.5">
                                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                                    <Thermometer className="w-4 h-4 text-cyan-400" />
                                    <span>{t("symptomsTitle")}</span>
                                </div>
                                <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                                    {t("symptomsText")}
                                </p>
                            </section>
                        </div>

                        {/* Drawer Footer Action */}
                        <footer className="p-4 sm:p-5 border-t border-neutral-800/80 bg-neutral-950/80 shrink-0">
                            <button
                                onClick={onClose}
                                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-cyan-950/80 hover:bg-cyan-900 text-cyan-200 hover:text-white font-mono font-bold text-xs uppercase tracking-widest rounded-lg border border-cyan-700/60 hover:border-cyan-400 transition-all duration-200 cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.2)] active:scale-[0.99]"
                            >
                                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                                <span>{t("acknowledgeBtn")}</span>
                            </button>
                        </footer>
                    </motion.aside>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PathogenBriefingDrawer;
