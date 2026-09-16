"use client";

import React from "react";
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

    // Sort strictly chronological by year (earliest to latest: 1347, 1918, 2020)
    const chronologicalPandemics = [...allPandemics].sort(
        (a, b) => a.year - b.year,
    );

    const getChipLabel = (pandemic: PandemicProfile): string => {
        if (pandemic.id === "black-death-1347") {
            return "1347 // THE BLACK DEATH";
        }
        if (pandemic.id === "spanish-flu-1918") {
            return "1918 // SPANISH FLU";
        }
        if (pandemic.id === "covid-19") {
            return "2020 // COVID-19";
        }
        return `${pandemic.year} // ${pandemic.name.en.toUpperCase()}`;
    };

    const getThemeClasses = (
        id: string,
        isActive: boolean,
    ): { buttonClass: string; inlineStyle?: React.CSSProperties } => {
        if (!isActive) {
            return {
                buttonClass:
                    "border border-transparent text-neutral-400 hover:text-neutral-200 hover:border-white/25 bg-transparent",
            };
        }

        switch (id) {
            case "black-death-1347":
                return {
                    buttonClass:
                        "border-rose-600 text-rose-300 shadow-[0_0_14px_rgba(225,29,72,0.45)] bg-rose-950/50 font-bold",
                };
            case "spanish-flu-1918":
                return {
                    buttonClass:
                        "border-amber-500 text-amber-300 shadow-[0_0_14px_rgba(245,158,11,0.45)] bg-amber-950/50 font-bold",
                };
            case "covid-19":
                return {
                    buttonClass:
                        "border-cyan-400 text-cyan-300 shadow-[0_0_14px_rgba(6,182,212,0.45)] bg-cyan-950/50 font-bold",
                };
            default:
                return {
                    buttonClass:
                        "border-cyan-400 text-cyan-300 shadow-[0_0_14px_rgba(6,182,212,0.45)] bg-cyan-950/50 font-bold",
                };
        }
    };

    return (
        <nav
            aria-label="Chronological Pandemic Dossier Selector"
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-black/85 border border-white/10 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-2 shadow-[0_4px_24px_rgba(0,0,0,0.8)] pointer-events-auto font-mono text-xs max-w-[95vw] overflow-x-auto select-none ${className}`}
        >
            {chronologicalPandemics.map((pandemic) => {
                const isActive = pandemic.id === activePandemicId;
                const label = getChipLabel(pandemic);
                const { buttonClass } = getThemeClasses(pandemic.id, isActive);

                return (
                    <button
                        key={pandemic.id}
                        type="button"
                        onClick={() => setActivePandemicId(pandemic.id)}
                        className={`px-3 py-1 rounded-full border transition-all duration-200 cursor-pointer tracking-wider whitespace-nowrap active:scale-95 flex items-center gap-1.5 ${buttonClass}`}
                        title={`${pandemic.name.en} (${pandemic.eraLabel}) — ${pandemic.pathogenName}`}
                    >
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
