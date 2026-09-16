"use client";

import React from "react";
import { Lock } from "lucide-react";
import { useActivePandemic } from "@/context/PandemicContext";
import { PandemicProfile } from "@/data/pandemicsRegistry";

export interface PandemicSwitcherProps {
    className?: string;
}

export const PandemicSwitcher: React.FC<PandemicSwitcherProps> = ({
    className = "",
}) => {
    const { activePandemicId, setActivePandemicId, allPandemics } =
        useActivePandemic();

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

    return (
        <nav
            aria-label="Chronological Pandemic Dossier Selector"
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[95vw] overflow-x-auto no-scrollbar flex items-center gap-1.5 p-1.5 bg-black/85 border border-white/10 backdrop-blur-md rounded-full shadow-2xl pointer-events-auto font-mono text-xs select-none ${className}`}
        >
            {chronologicalPandemics.map((pandemic) => {
                const isActive = pandemic.id === activePandemicId;
                const isClassified = pandemic.status === "classified_archive";
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
                        className={`px-3 py-1 rounded-full border transition-all duration-200 tracking-wider whitespace-nowrap active:scale-95 flex items-center gap-1.5 ${buttonClass}`}
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
    );
};

export default PandemicSwitcher;
