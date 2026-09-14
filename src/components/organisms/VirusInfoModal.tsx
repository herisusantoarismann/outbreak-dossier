"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { X, Dna, ShieldCheck, Radio, AlertOctagon } from "lucide-react";

interface VirusInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const VirusInfoModal: React.FC<VirusInfoModalProps> = ({
    isOpen,
    onClose,
}) => {
    const t = useTranslations("bioModal");

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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 15 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="relative z-10 w-full max-w-xl mx-4 rounded-xl border border-red-500/40 bg-[#050508]/95 p-6 sm:p-8 shadow-[0_0_50px_rgba(239,68,68,0.25)] text-neutral-200 overflow-hidden"
                    >
                        {/* Ambient sci-fi corner lines */}
                        <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none overflow-hidden rounded-tl-xl">
                            <div className="absolute top-0 left-0 w-12 h-1 bg-red-500 shadow-[0_0_10px_#ef4444]" />
                            <div className="absolute top-0 left-0 h-12 w-1 bg-red-500 shadow-[0_0_10px_#ef4444]" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none overflow-hidden rounded-br-xl">
                            <div className="absolute bottom-0 right-0 w-12 h-1 bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
                            <div className="absolute bottom-0 right-0 h-12 w-1 bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
                        </div>

                        {/* Header */}
                        <div className="flex items-start justify-between pb-4 mb-5 border-b border-neutral-800/90">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-red-950/70 border border-red-800/80 flex items-center justify-center text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                                    <AlertOctagon className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-red-400 uppercase flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                                        {t("classifiedBadge")}
                                    </div>
                                    <h2 className="text-lg sm:text-xl font-mono font-black text-white tracking-wider">
                                        {t("title")}
                                    </h2>
                                </div>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="p-1.5 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 hover:border-red-500/50 transition-colors cursor-pointer"
                                aria-label="Close modal"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Core Definition */}
                        <div className="space-y-4 mb-6">
                            <div>
                                <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                                    <Dna className="w-3.5 h-3.5 text-cyan-400" />
                                    <span>{t("bioIdentityTitle")}</span>
                                </h3>
                                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                                    {t("bioIdentityP1")}
                                </p>
                            </div>

                            {/* Transmission Vector */}
                            <div className="p-3 bg-red-950/30 border border-red-900/60 rounded-lg">
                                <h4 className="text-[11px] font-mono font-bold text-red-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                    <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                                    <span>{t("transmissionTitle")}</span>
                                </h4>
                                <p className="text-xs text-neutral-300 leading-relaxed">
                                    {t("transmissionText")}
                                </p>
                            </div>
                        </div>

                        {/* Key Metrics Grid */}
                        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
                            <div className="bg-neutral-950/80 border border-neutral-800 rounded-lg p-3 text-center">
                                <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                                    {t("incubationTitle")}
                                </div>
                                <div className="text-sm sm:text-base font-mono font-bold text-red-400">
                                    {t("incubationValue")}
                                </div>
                                <div className="text-[9px] font-mono text-neutral-500 mt-0.5">
                                    {t("incubationSub")}
                                </div>
                            </div>

                            <div className="bg-neutral-950/80 border border-neutral-800 rounded-lg p-3 text-center">
                                <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                                    {t("receptorTitle")}
                                </div>
                                <div className="text-sm sm:text-base font-mono font-bold text-cyan-400">
                                    {t("receptorValue")}
                                </div>
                                <div className="text-[9px] font-mono text-neutral-500 mt-0.5">
                                    {t("receptorSub")}
                                </div>
                            </div>

                            <div className="bg-neutral-950/80 border border-neutral-800 rounded-lg p-3 text-center">
                                <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                                    {t("familyTitle")}
                                </div>
                                <div className="text-xs sm:text-sm font-mono font-bold text-neutral-200 truncate">
                                    {t("familyValue")}
                                </div>
                                <div className="text-[9px] font-mono text-neutral-500 mt-0.5">
                                    {t("familySub")}
                                </div>
                            </div>
                        </div>

                        {/* Close Action Button */}
                        <button
                            onClick={onClose}
                            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-950 text-neutral-200 hover:text-white font-mono font-bold text-xs uppercase tracking-widest rounded-lg border border-neutral-700/80 hover:border-red-500/60 transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                        >
                            <ShieldCheck className="w-4 h-4 text-cyan-400" />
                            <span>{t("acknowledgeBtn")}</span>
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default VirusInfoModal;
