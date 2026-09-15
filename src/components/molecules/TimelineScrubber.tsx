"use client";

import React, { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { Chapter, SupportedLocale } from "@/types/journey";
import { t } from "@/utils/i18n";

export interface TimelineScrubberProps {
    chapters: Chapter[];
    activeIndex: number;
    onSelectChapter?: (index: number) => void;
}

interface YearGroup {
    year: string;
    startIndex: number;
    chapters: {
        chapter: Chapter;
        globalIndex: number;
    }[];
}

function parseYear(date: any, id: string): string {
    const dateStr =
        typeof date === "string"
            ? date
            : date?.id || date?.en || date?.zh || "";
    if (
        dateStr.includes("2023") ||
        id.includes("national-debriefing") ||
        id.includes("ground-zero-epilogue")
    )
        return "2023";
    if (dateStr.includes("2022")) return "2022";
    if (dateStr.includes("2021")) return "2021";
    if (dateStr.includes("2020")) return "2020";
    if (dateStr.includes("2019")) return "2019";
    return "2020";
}

export const TimelineScrubber: React.FC<TimelineScrubberProps> = ({
    chapters,
    activeIndex,
    onSelectChapter,
}) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    let locale: SupportedLocale = "id";
    try {
        const intlLocale = useLocale();
        if (intlLocale === "id" || intlLocale === "en" || intlLocale === "zh") {
            locale = intlLocale as SupportedLocale;
        }
    } catch {
        // Fallback for non-next-intl contexts (e.g. Storybook)
    }

    // Group chapters by year anchor (2020, 2021, 2022, 2023)
    const yearGroups = useMemo(() => {
        const groups: YearGroup[] = [];
        const yearMap = new Map<
            string,
            { chapter: Chapter; globalIndex: number }[]
        >();

        chapters.forEach((chapter, index) => {
            const year = parseYear(chapter.date, chapter.id);
            if (!yearMap.has(year)) {
                yearMap.set(year, []);
            }
            yearMap.get(year)!.push({ chapter, globalIndex: index });
        });

        yearMap.forEach((items, year) => {
            groups.push({
                year,
                startIndex: items[0].globalIndex,
                chapters: items,
            });
        });

        return groups;
    }, [chapters]);

    const scrollToChapter = (index: number) => {
        if (onSelectChapter) {
            onSelectChapter(index);
        }
        const targetChapter = chapters[index];
        if (targetChapter) {
            const element = document.getElementById(
                `chapter-${targetChapter.id}`,
            );
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }
    };

    return (
        <nav
            aria-label="Chapter Timeline Navigation"
            className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-1.5 pointer-events-auto select-none"
        >
            <div className="bg-black/85 backdrop-blur-md border border-neutral-800/90 rounded-full py-3 px-1.5 shadow-[0_0_30px_rgba(0,0,0,0.9)] flex flex-col items-center gap-1.5">
                {yearGroups.map((group) => {
                    const isYearActive = group.chapters.some(
                        (c) => c.globalIndex === activeIndex,
                    );

                    return (
                        <div
                            key={group.year}
                            className="flex flex-col items-center gap-1.5 py-0.5"
                        >
                            {/* Year Anchor Button */}
                            <button
                                type="button"
                                onClick={() =>
                                    scrollToChapter(group.startIndex)
                                }
                                className={`text-[9px] font-mono font-bold tracking-tighter px-1 py-0.5 rounded transition-all cursor-pointer ${
                                    isYearActive
                                        ? "text-white scale-110 drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]"
                                        : "text-neutral-500 hover:text-neutral-300"
                                }`}
                                title={`Jump to ${group.year}`}
                                aria-label={`Scroll to year ${group.year}`}
                            >
                                {group.year}
                            </button>

                            {/* Chapter Ticks */}
                            <div className="flex flex-col items-center gap-1">
                                {group.chapters.map(
                                    ({ chapter, globalIndex }) => {
                                        const isActive =
                                            globalIndex === activeIndex;
                                        const isHovered =
                                            hoveredIndex === globalIndex;

                                        // Active tick expands and glows according to chapter.type
                                        let activeStyle =
                                            "w-2 bg-neutral-700 hover:bg-neutral-500";
                                        if (isActive) {
                                            if (chapter.type === "milestone") {
                                                activeStyle =
                                                    "w-5 bg-cyan-400 shadow-[0_0_10px_#06b6d4] scale-y-125";
                                            } else if (
                                                chapter.type === "side_story"
                                            ) {
                                                activeStyle =
                                                    "w-5 bg-amber-400 shadow-[0_0_10px_#f59e0b] scale-y-125";
                                            } else {
                                                // standard
                                                activeStyle =
                                                    "w-5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)] scale-y-125";
                                            }
                                        } else if (isHovered) {
                                            activeStyle =
                                                "w-3.5 bg-neutral-300";
                                        }

                                        return (
                                            <div
                                                key={chapter.id}
                                                className="relative flex items-center justify-center py-0.5"
                                                onMouseEnter={() =>
                                                    setHoveredIndex(globalIndex)
                                                }
                                                onMouseLeave={() =>
                                                    setHoveredIndex(null)
                                                }
                                            >
                                                {/* Clickable Tick Button */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        scrollToChapter(
                                                            globalIndex,
                                                        )
                                                    }
                                                    className={`h-1 rounded-full transition-all duration-200 cursor-pointer block ${activeStyle}`}
                                                    aria-label={`Jump to Chapter ${globalIndex + 1}: ${t(chapter.title, locale)}`}
                                                />

                                                {/* Minimal Hover Tooltip */}
                                                {isHovered && (
                                                    <div
                                                        role="tooltip"
                                                        className="absolute right-full mr-3 top-1/2 -translate-y-1/2 pointer-events-none z-50 whitespace-nowrap"
                                                    >
                                                        <div className="bg-black/90 border border-white/20 text-[10px] font-mono px-2 py-1 rounded shadow-lg flex items-center gap-2 backdrop-blur-md">
                                                            <span
                                                                className={`font-bold ${
                                                                    chapter.type ===
                                                                    "milestone"
                                                                        ? "text-cyan-400"
                                                                        : chapter.type ===
                                                                            "side_story"
                                                                          ? "text-amber-400"
                                                                          : "text-neutral-300"
                                                                }`}
                                                            >
                                                                #
                                                                {String(
                                                                    globalIndex +
                                                                        1,
                                                                ).padStart(
                                                                    2,
                                                                    "0",
                                                                )}
                                                            </span>
                                                            <span className="text-white max-w-[200px] truncate">
                                                                {t(
                                                                    chapter.title,
                                                                    locale,
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    },
                                )}
                            </div>

                            {/* Subtle divider line between years */}
                            {group.year !== "2023" && (
                                <div className="w-1.5 h-px bg-neutral-800 my-0.5" />
                            )}
                        </div>
                    );
                })}
            </div>
        </nav>
    );
};

export default TimelineScrubber;
