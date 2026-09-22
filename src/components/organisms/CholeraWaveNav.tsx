"use client";

import React from "react";
import { motion } from "framer-motion";
import { Waves } from "lucide-react";
import { useLocale } from "next-intl";
import { useActivePandemic } from "@/context/PandemicContext";
import { CHOLERA_WAVES, CholeraWave } from "@/data/pandemics/cholera/waves";
import { SupportedLocale } from "@/types/journey";

export interface CholeraWaveNavProps {
    className?: string;
    onWaveSelect?: (wave: CholeraWave) => void;
}

export const CholeraWaveNav: React.FC<CholeraWaveNavProps> = ({
    className = "",
    onWaveSelect,
}) => {
    const locale = (useLocale() as SupportedLocale) || "id";
    const { activePandemicId, activeWaveIndex, setActiveWaveIndex } =
        useActivePandemic();

    if (activePandemicId !== "cholera-series") {
        return null;
    }

    const handleWaveClick = (wave: CholeraWave) => {
        setActiveWaveIndex(wave.waveIndex);
        if (onWaveSelect) {
            onWaveSelect(wave);
        }
    };

    return (
        <div
            className={`pointer-events-auto select-none flex flex-col items-center gap-1.5 ${className}`}
            role="navigation"
            aria-label="Cholera Pandemic Wave Navigation"
        >
            {/* Tactical Timeline Bar */}
            <div className="flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-lg border border-cyan-500/40 bg-black/85 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.25)] font-mono max-w-[95vw] overflow-x-auto scrollbar-none">
                {/* Tactical Indicator Tag (Desktop) */}
                <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 border-r border-cyan-500/30 text-[10px] text-cyan-400 font-bold uppercase tracking-widest shrink-0">
                    <Waves className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span>WAVES</span>
                </div>

                {/* Wave Segments [W1 | W2 | W3 | W4 | W5 | W6 | W7] */}
                <div className="flex items-center gap-1 sm:gap-1.5">
                    {CHOLERA_WAVES.map((wave) => {
                        const isActive = wave.waveIndex === activeWaveIndex;
                        return (
                            <button
                                key={wave.id}
                                onClick={() => handleWaveClick(wave)}
                                className={`relative flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded text-xs sm:text-xs font-mono font-bold transition-all duration-200 outline-none ${
                                    isActive
                                        ? "text-cyan-200 bg-cyan-950/70 border border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.45)]"
                                        : "text-neutral-400 hover:text-cyan-300 border border-transparent hover:border-cyan-500/30 hover:bg-cyan-950/30"
                                }`}
                                title={`${wave.name[locale]} (${wave.yearRange})`}
                            >
                                {/* Active Ping Indicator */}
                                {isActive && (
                                    <motion.span
                                        layoutId="activeWaveGlow"
                                        className="absolute inset-0 rounded border border-cyan-400/80 bg-cyan-400/10 pointer-events-none"
                                        transition={{
                                            type: "spring",
                                            stiffness: 450,
                                            damping: 35,
                                        }}
                                    />
                                )}

                                <span
                                    className={`relative z-10 tracking-widest ${
                                        isActive
                                            ? "text-cyan-300 font-extrabold"
                                            : ""
                                    }`}
                                >
                                    {wave.shortLabel}
                                </span>

                                {/* Epoch Year Badge (Visible on sm: screens and above) */}
                                <span
                                    className={`relative z-10 hidden sm:inline text-[10px] tracking-tight ${
                                        isActive
                                            ? "text-cyan-400/90 font-medium"
                                            : "text-neutral-500"
                                    }`}
                                >
                                    {wave.startYear}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CholeraWaveNav;
