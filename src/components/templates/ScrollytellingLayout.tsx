"use client";

import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
    Suspense,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams, useParams } from "next/navigation";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import { Chapter, SupportedLocale } from "@/types/journey";
import { t } from "@/utils/i18n";
import { useJourneyStore } from "@/stores/useJourneyStore";
import {
    Calendar,
    AlertCircle,
    Compass,
    Radio,
    Dna,
    Activity,
    ChevronDown,
} from "lucide-react";
import { ComparisonSlider } from "@/components/organisms/ComparisonSlider";
import { TimelineScrubber } from "@/components/molecules/TimelineScrubber";
import { ChapterImageFrame } from "@/components/molecules/ChapterImageFrame";
import { useDossierKeyboardNav } from "@/hooks/useDossierKeyboardNav";
import { useChapterPreloader } from "@/hooks/useChapterPreloader";
import { resolveImagePath } from "@/lib/imageResolver";

interface ScrollytellingLayoutProps {
    chapters: Chapter[];
}

interface ChapterCardProps {
    chapter: Chapter;
    index: number;
    total: number;
    isActive: boolean;
    onInView: (index: number) => void;
}

const ChapterCard: React.FC<ChapterCardProps> = ({
    chapter,
    index,
    total,
    isActive,
    onInView,
}) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const tMsg = useTranslations("scrollytelling");
    const locale = useLocale() as SupportedLocale;
    const [isDossierExpanded, setIsDossierExpanded] = useState(true);

    useEffect(() => {
        const element = sectionRef.current;
        if (!element) return;

        // Trigger precisely when chapter crosses vertical center of viewport
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    onInView(index);
                }
            },
            {
                threshold: 0,
                rootMargin: "-50% 0px -50% 0px",
            },
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [index, onInView]);

    const isMilestone = chapter.type === "milestone";
    const isSideStory = chapter.type === "side_story";
    const isVaccine =
        isMilestone &&
        (chapter.id.includes("vaccine") ||
            chapter.id.includes("cold-chain") ||
            Boolean(chapter.strain?.toLowerCase().includes("vaksin")) ||
            Boolean(chapter.strain?.toLowerCase().includes("vaccine")));

    // Dynamic styles based on chapter.type
    let cardContainerStyle = "";
    let cornerAccentColor = "";
    let statusPill = null;
    let flashStyle = "";
    let flashIconStyle = "";
    let strainBadgeStyle = "";
    let dossierBorderStyle = "";
    let dossierHeaderBg = "";
    let dossierAccentColor = "";
    let pulseDotColor = "";

    if (isMilestone) {
        if (isVaccine) {
            // Milestone: Vaccine / Cure (Cyan Glow)
            cardContainerStyle = isActive
                ? "border-cyan-500/60 shadow-[0_0_40px_rgba(6,182,212,0.2)] bg-[#030712]/95"
                : "border-cyan-950/60 bg-[#030712]/70 shadow-none";
            cornerAccentColor = "bg-cyan-500 shadow-[0_0_10px_#06b6d4]";
            flashStyle =
                "bg-cyan-950/80 border-cyan-500/40 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.15)]";
            flashIconStyle = "text-cyan-400";
            strainBadgeStyle =
                "bg-cyan-950/70 border-cyan-700/60 text-cyan-300";
            dossierBorderStyle = "border-cyan-900/40";
            dossierHeaderBg = "bg-cyan-950/30 hover:bg-cyan-950/50";
            dossierAccentColor = "text-cyan-400";
            pulseDotColor = "bg-cyan-400";
            statusPill = (
                <span
                    role="status"
                    aria-label="Critical milestone chapter: Vaccine and medical advance"
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-widest bg-cyan-950/90 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                >
                    <span
                        className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"
                        aria-hidden="true"
                    />
                    [CRITICAL MILESTONE]
                </span>
            );
        } else {
            // Milestone: Delta / Omicron / Turning Points (Intense Red Glow)
            cardContainerStyle = isActive
                ? "border-red-500/70 shadow-[0_0_40px_rgba(239,68,68,0.3)] bg-[#0c0303]/95"
                : "border-red-950/60 bg-[#0c0303]/70 shadow-none";
            cornerAccentColor = "bg-red-500 shadow-[0_0_10px_#ef4444]";
            flashStyle =
                "bg-red-950/80 border-red-500/40 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.15)]";
            flashIconStyle = "text-red-400";
            strainBadgeStyle = "bg-red-950/70 border-red-800/60 text-red-300";
            dossierBorderStyle = "border-red-900/40";
            dossierHeaderBg = "bg-red-950/30 hover:bg-red-950/50";
            dossierAccentColor = "text-red-400";
            pulseDotColor = "bg-red-500";
            statusPill = (
                <span
                    role="status"
                    aria-label="Critical milestone chapter: Peak variant transmission"
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-widest bg-red-950/90 text-red-400 border border-red-500/60 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                >
                    <span
                        className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"
                        aria-hidden="true"
                    />
                    [CRITICAL MILESTONE]
                </span>
            );
        }
    } else if (isSideStory) {
        // Interlude / Cultural Side Story (Warm Amber Dashed Dossier)
        cardContainerStyle = isActive
            ? "border-dashed border-amber-500/50 bg-[#120d04]/90 shadow-[0_0_35px_rgba(245,158,11,0.18)]"
            : "border-dashed border-amber-900/40 bg-[#120d04]/60 shadow-none";
        cornerAccentColor = "bg-amber-500 shadow-[0_0_10px_#f59e0b]";
        flashStyle =
            "bg-amber-950/70 border-amber-500/40 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.15)]";
        flashIconStyle = "text-amber-400";
        strainBadgeStyle = "bg-amber-950/60 border-amber-800/60 text-amber-300";
        dossierBorderStyle = "border-amber-900/40";
        dossierHeaderBg = "bg-amber-950/30 hover:bg-amber-950/50";
        dossierAccentColor = "text-amber-400";
        pulseDotColor = "bg-amber-400";
        statusPill = (
            <span
                role="status"
                aria-label="Archive interlude and societal phenomenon"
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-widest bg-amber-950/80 text-amber-300 border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.2)]"
            >
                <span
                    className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"
                    aria-hidden="true"
                />
                [ARCHIVE INTERLUDE // VIRAL PHENOMENON]
            </span>
        );
    } else {
        // Standard: Clean Tech-Noir Card
        cardContainerStyle = isActive
            ? "border-white/20 bg-black/90 backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.06)]"
            : "border-white/10 bg-black/85 backdrop-blur-md shadow-none";
        cornerAccentColor =
            "bg-neutral-400 shadow-[0_0_8px_rgba(255,255,255,0.3)]";
        flashStyle =
            "bg-neutral-900/90 border-neutral-700/60 text-neutral-300 shadow-[0_0_12px_rgba(0,0,0,0.5)]";
        flashIconStyle = "text-neutral-400";
        strainBadgeStyle = "bg-cyan-950/60 border-cyan-800/60 text-cyan-300";
        dossierBorderStyle = "border-neutral-800/80";
        dossierHeaderBg = "bg-neutral-900/40 hover:bg-neutral-900/60";
        dossierAccentColor = "text-neutral-400";
        pulseDotColor = "bg-neutral-400";
        statusPill = null;
    }

    return (
        <div
            ref={sectionRef}
            id={`chapter-${chapter.id}`}
            className="min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-12 py-20 snap-center"
        >
            <motion.article
                role="region"
                aria-label={`Chapter ${chapter.chapterNumber}: ${t(chapter.title, locale)}`}
                initial={{ opacity: 0.4 }}
                animate={{
                    opacity: isActive ? 1 : 0.45,
                    scale: isActive ? 1 : 0.98,
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`relative p-5 sm:p-7 rounded-xl backdrop-blur-md transition-colors duration-200 border ${cardContainerStyle}`}
            >
                {/* Subtle glowing corner indicator for active chapter */}
                {isActive && (
                    <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden rounded-tr-xl">
                        <div
                            className={`absolute top-0 right-0 w-12 h-1 ${cornerAccentColor}`}
                        />
                        <div
                            className={`absolute top-0 right-0 h-12 w-1 ${cornerAccentColor}`}
                        />
                    </div>
                )}

                {/* 1. Chapter Header Meta Row */}
                <header className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex flex-wrap items-center gap-2">
                        {statusPill}
                        <span
                            className={`font-mono text-xs tracking-widest font-bold px-2.5 py-1 rounded ${
                                isSideStory
                                    ? "bg-amber-950/80 text-amber-400 border border-amber-800/80"
                                    : isVaccine
                                      ? "bg-cyan-950/80 text-cyan-400 border border-cyan-800/80"
                                      : isMilestone
                                        ? "bg-red-950/90 text-red-400 border border-red-800"
                                        : isActive
                                          ? "bg-neutral-800 text-neutral-200 border border-neutral-700"
                                          : "bg-neutral-900 text-neutral-500 border border-neutral-800"
                            }`}
                        >
                            {isSideStory
                                ? chapter.chapterNumber
                                : `${tMsg("chapterPrefix")} ${
                                      chapter.chapterNumber ||
                                      String(index + 1).padStart(2, "0")
                                  } // ${String(total).padStart(2, "0")}`}
                        </span>
                        {isActive && (
                            <span
                                className={`w-2 h-2 rounded-full animate-ping ${
                                    isSideStory
                                        ? "bg-amber-400"
                                        : isVaccine
                                          ? "bg-cyan-400"
                                          : isMilestone
                                            ? "bg-red-500"
                                            : "bg-white"
                                }`}
                            />
                        )}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400">
                        <Calendar
                            className={`w-3.5 h-3.5 ${
                                isSideStory
                                    ? "text-amber-400"
                                    : isVaccine
                                      ? "text-cyan-400"
                                      : isMilestone
                                        ? "text-red-400"
                                        : "text-neutral-400"
                            }`}
                        />
                        <span>{t(chapter.date, locale)}</span>
                    </div>
                </header>

                {/* 2. Top Ambient Warning Ticker */}
                {t(chapter.flash, locale) && (
                    <div
                        className={`mb-3.5 border font-mono text-xs px-3 py-1.5 rounded inline-flex items-center gap-2 w-full ${flashStyle}`}
                    >
                        <Radio
                            className={`w-3.5 h-3.5 shrink-0 ${flashIconStyle} animate-pulse`}
                        />
                        <span className="truncate tracking-wide text-[11px] sm:text-xs">
                            {t(chapter.flash, locale)}
                        </span>
                    </div>
                )}

                {/* 3. Headline & Strain Badge */}
                <div className="mb-3.5">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-mono font-bold text-white mb-2 leading-tight tracking-wide">
                        {t(chapter.title, locale)}
                    </h2>
                    {chapter.strain && (
                        <div
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-mono ${strainBadgeStyle}`}
                        >
                            <Dna className="w-3 h-3" />
                            <span className="tracking-wider">
                                {chapter.strain}
                            </span>
                        </div>
                    )}
                </div>

                {/* 4. Bio-Threat Dossier Box (chapter.virusProfile) */}
                {chapter.virusProfile && (
                    <div
                        className={`mb-4 rounded-lg bg-neutral-950/90 border overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,0.8)] ${dossierBorderStyle}`}
                    >
                        {/* Terminal Header Bar */}
                        <button
                            type="button"
                            onClick={() =>
                                setIsDossierExpanded((prev) => !prev)
                            }
                            className={`w-full flex items-center justify-between p-2.5 transition-colors border-b border-white/5 text-left cursor-pointer ${dossierHeaderBg}`}
                            aria-label="Toggle Bio-Threat Dossier"
                        >
                            <div className="flex items-center gap-2 min-w-0">
                                <span
                                    className={`w-2 h-2 rounded-full shrink-0 animate-pulse ${pulseDotColor}`}
                                />
                                <span
                                    className={`text-[11px] font-mono font-bold tracking-wider uppercase truncate ${dossierAccentColor}`}
                                >
                                    {chapter.virusProfile.code ||
                                        chapter.virusProfile.agent ||
                                        "BIO-SURVEILLANCE DOSSIER"}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                {chapter.virusProfile.threatLevel ? (
                                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-black/60 text-neutral-300 border border-white/10 truncate max-w-[140px] sm:max-w-none">
                                        {t(
                                            chapter.virusProfile.threatLevel,
                                            locale,
                                        )}
                                    </span>
                                ) : chapter.virusProfile.incubation ? (
                                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-black/60 text-purple-300 border border-purple-500/20 truncate max-w-[140px] sm:max-w-none">
                                        INKUBASI:{" "}
                                        {chapter.virusProfile.incubation}
                                    </span>
                                ) : null}
                                <ChevronDown
                                    className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${
                                        isDossierExpanded ? "rotate-180" : ""
                                    }`}
                                />
                            </div>
                        </button>

                        {/* Expandable Grid of Metrics */}
                        {isDossierExpanded && (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-2.5 text-[10px] font-mono">
                                <div className="bg-black/60 p-2 rounded border border-neutral-800/80">
                                    <div className="text-neutral-500 uppercase flex items-center gap-1">
                                        <Activity
                                            className={`w-3 h-3 ${dossierAccentColor}`}
                                        />
                                        <span>
                                            {chapter.virusProfile.transmission
                                                ? "TRANSMISI / RUTE"
                                                : "TRANSMISSION / R₀"}
                                        </span>
                                    </div>
                                    <div
                                        className={`font-bold text-xs mt-0.5 ${dossierAccentColor} line-clamp-2`}
                                        title={
                                            chapter.virusProfile.r0 ||
                                            chapter.virusProfile.transmission
                                        }
                                    >
                                        {chapter.virusProfile.r0 ||
                                            chapter.virusProfile.transmission ||
                                            "-"}
                                    </div>
                                </div>
                                <div className="bg-black/60 p-2 rounded border border-neutral-800/80">
                                    <div className="text-neutral-500 uppercase">
                                        {chapter.virusProfile.vector
                                            ? "VEKTOR SPESIES"
                                            : "MUTATION TYPE"}
                                    </div>
                                    <div
                                        className="text-neutral-300 font-medium text-[11px] mt-0.5 line-clamp-2"
                                        title={
                                            chapter.virusProfile.vector ||
                                            t(
                                                chapter.virusProfile
                                                    .mutationType,
                                                locale,
                                            )
                                        }
                                    >
                                        {chapter.virusProfile.vector ||
                                            t(
                                                chapter.virusProfile
                                                    .mutationType,
                                                locale,
                                            ) ||
                                            "-"}
                                    </div>
                                </div>
                                <div className="bg-black/60 p-2 rounded border border-neutral-800/80">
                                    <div className="text-neutral-500 uppercase">
                                        {chapter.virusProfile.agent
                                            ? "PATOGEN / AGENT"
                                            : "CLINICAL TARGET"}
                                    </div>
                                    <div
                                        className="text-neutral-300 font-medium text-[11px] mt-0.5 line-clamp-2"
                                        title={
                                            chapter.virusProfile.agent ||
                                            t(
                                                chapter.virusProfile
                                                    .clinicalTarget,
                                                locale,
                                            )
                                        }
                                    >
                                        {chapter.virusProfile.agent ||
                                            t(
                                                chapter.virusProfile
                                                    .clinicalTarget,
                                                locale,
                                            ) ||
                                            "-"}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* 5. Narrative Description Body with relaxed leading */}
                <p className="leading-relaxed sm:leading-loose text-sm sm:text-base text-neutral-200 font-sans mb-4">
                    {t(chapter.description, locale)}
                </p>

                {/* Interactive Split-View Comparison Slider for Chapter 06 (PSBB Ghost Town) */}
                {chapter.id.includes("psbb-ghost-town") && (
                    <div className="mb-5 rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950/90 shadow-[0_0_30px_rgba(0,0,0,0.85)]">
                        <div className="bg-neutral-900/80 border-b border-neutral-800/80 px-3.5 py-2 flex items-center justify-between font-mono text-[10px]">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                                <span className="font-bold tracking-wider text-neutral-200 uppercase">
                                    {locale === "en"
                                        ? "ARCHIVE COMPARISON // JALAN JENDERAL SUDIRMAN"
                                        : "KOMPARASI ARSIP // JALAN JENDERAL SUDIRMAN"}
                                </span>
                            </div>
                            <span className="text-neutral-500 hidden xs:inline">
                                DUAL-LAYER SPLIT
                            </span>
                        </div>
                        <ComparisonSlider
                            beforeImage={
                                chapter.beforeImage ||
                                "/assets/images/covid-19/id/03a-jakarta-rush-hour.jpg"
                            }
                            beforeLabel={
                                locale === "en"
                                    ? "PRE-PANDEMIC // RUSH HOUR"
                                    : "PRA-PANDEMI // RUSH HOUR"
                            }
                            afterImage={
                                chapter.afterImage ||
                                "/assets/images/covid-19/id/03b-jakarta-psbb-empty.jpg"
                            }
                            afterLabel={
                                locale === "en"
                                    ? "TOTAL PSBB // DESERTED SUDIRMAN"
                                    : "PSBB TOTAL // SUD MAN KOSONG"
                            }
                            aspectRatio="aspect-[16/9]"
                            className="w-full"
                        />
                    </div>
                )}

                {/* 6. Tactical Footer Badge */}
                <footer className="pt-3 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-1 text-[10px] sm:text-[11px] font-mono text-neutral-500">
                    <span className="flex items-center gap-1.5">
                        <AlertCircle
                            className={`w-3 h-3 ${
                                isSideStory
                                    ? "text-amber-500/70"
                                    : isVaccine
                                      ? "text-cyan-500/70"
                                      : isMilestone
                                        ? "text-red-500/70"
                                        : "text-neutral-500"
                            }`}
                        />
                        {`OUTBREAK DOSSIER © ${new Date().getFullYear()} // DECLASSIFIED EPIDEMIOLOGICAL DATA INTELLIGENCE.`}
                    </span>
                    <span className="text-neutral-600">
                        ID: {chapter.id.toUpperCase()}
                    </span>
                </footer>
            </motion.article>
        </div>
    );
};

function getChapterYear(chapter: Chapter): string {
    const dateStr =
        typeof chapter.date === "string"
            ? chapter.date
            : chapter.date?.id || chapter.date?.en || "";
    if (
        dateStr.includes("2023") ||
        chapter.id.includes("national-debriefing") ||
        chapter.id.includes("ground-zero-epilogue")
    )
        return "2023";
    if (dateStr.includes("2022")) return "2022";
    if (dateStr.includes("2021")) return "2021";
    if (dateStr.includes("2020")) return "2020";
    if (dateStr.includes("2019")) return "2019";
    return "2020";
}

const ScrollytellingLayoutContent: React.FC<ScrollytellingLayoutProps> = ({
    chapters,
}) => {
    const tMsg = useTranslations("scrollytelling");
    const locale = useLocale() as SupportedLocale;
    const router = useRouter();
    const searchParams = useSearchParams();

    // 1. URL-Based Initial Chapter Read
    const chapterQuery = searchParams?.get("chapter") ?? searchParams?.get("c");
    const parsedChapter =
        chapterQuery !== null && chapterQuery !== undefined
            ? parseInt(chapterQuery, 10)
            : NaN;
    const initialIndex =
        !isNaN(parsedChapter) &&
        parsedChapter >= 0 &&
        parsedChapter < chapters.length
            ? parsedChapter
            : 0;

    const [activeIndex, setActiveIndex] = useState(initialIndex);
    const { setActiveScene, setScrollProgress } = useJourneyStore();

    const hasRestoredOnMountRef = useRef(false);

    // 2. Initial Mount Only: restore scroll position if user landed on a specific chapter
    useEffect(() => {
        if (!hasRestoredOnMountRef.current) {
            hasRestoredOnMountRef.current = true;
            if (initialIndex > 0 && chapters[initialIndex]) {
                const targetId = `chapter-${chapters[initialIndex]?.id}`;
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: "auto",
                        block: "center",
                    });
                }
            }
        }
    }, [initialIndex, chapters]);

    // 3. Synchronize Zustand store on chapter change
    useEffect(() => {
        if (chapters[activeIndex]) {
            setActiveScene(activeIndex, chapters[activeIndex].id);
            setScrollProgress((activeIndex + 1) / chapters.length);
        }
    }, [activeIndex, chapters, setActiveScene, setScrollProgress]);

    // 4. Smooth user scrolling handler (updates state & syncs URL silently via replaceState)
    const handleChapterInView = useCallback((index: number) => {
        setActiveIndex(index);

        // Synchronously update URL search parameter without triggering Next.js router re-renders
        if (typeof window !== "undefined") {
            const url = new URL(window.location.href);
            if (url.searchParams.get("chapter") !== String(index)) {
                url.searchParams.set("chapter", String(index));
                url.searchParams.delete("c");
                window.history.replaceState(null, "", url.toString());
            }
        }
    }, []);

    // 5. Accessible programmatic smooth scroll navigation
    const scrollToChapter = useCallback(
        (targetIndex: number) => {
            if (targetIndex >= 0 && targetIndex < chapters.length) {
                const targetElement = document.getElementById(
                    `chapter-${chapters[targetIndex]?.id}`,
                );
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                    });
                }
            }
        },
        [chapters],
    );

    // 6. Sequential chapter asset preloader (N+1, N+2)
    useChapterPreloader(chapters, activeIndex);

    const params = useParams();
    const routePandemic =
        (params?.pandemic as string) ||
        (params?.pandemicId as string) ||
        "covid-19";

    // Synchronize active pandemic to localStorage for persistent state recovery
    useEffect(() => {
        if (routePandemic) {
            try {
                localStorage.setItem("outbreak_active_pandemic", routePandemic);
            } catch {
                // Ignore localStorage errors
            }
        }
    }, [routePandemic]);

    // 7. Accessible hardware keyboard navigation (Arrows, PageUp/Down, Home, End, Escape)
    useDossierKeyboardNav({
        totalChapters: chapters.length,
        currentIndex: activeIndex,
        onNavigateChapter: scrollToChapter,
        onEscape: () => router.push(`/globe/${routePandemic}`),
    });

    const activeChapter = chapters[activeIndex] || chapters[0];

    return (
        <div className="relative flex flex-col md:flex-row h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory bg-[#050508] text-neutral-100">
            {/* Screen Reader Live Region Announcement */}
            <div aria-live="polite" aria-atomic="true" className="sr-only">
                {`Now viewing Chapter ${activeIndex + 1} of ${chapters.length}: ${t(activeChapter.title, locale)}. Year ${getChapterYear(activeChapter)}`}
            </div>

            {/* =========================================================================
          FLOATING HEADER PROGRESSION HUD:
          - Visible on both Desktop & Mobile, tracked in real-time across all 26 chapters
         ========================================================================= */}
            <header
                aria-label="Pandemic Timeline Progression"
                className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 pointer-events-auto"
            >
                <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-black/80 backdrop-blur-md border border-neutral-800 hover:border-neutral-700 transition-colors shadow-[0_0_25px_rgba(0,0,0,0.85)] font-mono text-xs">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-neutral-400 text-[11px] sm:text-xs tracking-wider">
                            {tMsg("chapterPrefix")}{" "}
                            <strong className="text-white font-bold">
                                {String(activeIndex + 1).padStart(2, "0")}
                            </strong>
                            <span className="text-neutral-600 mx-1">/</span>
                            <span className="text-neutral-400">
                                {String(chapters.length).padStart(2, "0")}
                            </span>
                        </span>
                    </div>

                    {/* Timeline Mini Progress Bar */}
                    <div className="hidden xs:block w-16 sm:w-24 h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
                        <div
                            className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-cyan-400 transition-all duration-300 rounded-full"
                            style={{
                                width: `${((activeIndex + 1) / chapters.length) * 100}%`,
                            }}
                        />
                    </div>

                    <span className="text-[10px] text-neutral-400 font-bold hidden sm:inline">
                        {Math.round(
                            ((activeIndex + 1) / chapters.length) * 100,
                        )}
                        %
                    </span>
                </div>
            </header>

            {/* =========================================================================
          SLIM VERTICAL FLOATING SCRUBBER:
          - Fixed on right edge, year-grouped anchors, and active glow ticks
         ========================================================================= */}
            <TimelineScrubber
                chapters={chapters}
                activeIndex={activeIndex}
                onSelectChapter={scrollToChapter}
            />

            {/* =========================================================================
          IMAGE CONTAINER:
          - Mobile: fixed inset-0 w-full h-screen -z-10
          - Desktop (md:): md:sticky md:top-0 md:h-screen md:w-1/2 md:z-0
         ========================================================================= */}
            <div className="fixed inset-0 w-full h-screen -z-10 md:sticky md:top-0 md:h-screen md:w-1/2 md:z-0 bg-[#030712] border-r border-white/10 overflow-hidden">
                {/* Simultaneous crossfade */}
                <AnimatePresence>
                    {activeChapter &&
                        (activeChapter.id.includes("psbb-ghost-town") ? (
                            <motion.div
                                key="psbb-comparison-slider-bg"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    duration: 0.4,
                                    ease: "easeInOut",
                                }}
                                className="absolute inset-0 w-full h-full pointer-events-auto"
                            >
                                <ComparisonSlider
                                    beforeImage={
                                        activeChapter.beforeImage ||
                                        "/assets/images/covid-19/id/03a-jakarta-rush-hour.jpg"
                                    }
                                    beforeLabel={
                                        locale === "en"
                                            ? "PRE-PANDEMIC // RUSH HOUR"
                                            : "PRA-PANDEMI // RUSH HOUR"
                                    }
                                    afterImage={
                                        activeChapter.afterImage ||
                                        "/assets/images/covid-19/id/03b-jakarta-psbb-empty.jpg"
                                    }
                                    afterLabel={
                                        locale === "en"
                                            ? "TOTAL PSBB // DESERTED SUDIRMAN"
                                            : "PSBB TOTAL // SUD MAN KOSONG"
                                    }
                                    className="w-full h-full"
                                />
                            </motion.div>
                        ) : (
                            <motion.div
                                key={activeChapter.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    duration: 0.4,
                                    ease: "easeInOut",
                                }}
                                className="absolute inset-0 w-full h-full bg-[#030712]"
                            >
                                <ChapterImageFrame
                                    src={activeChapter.image}
                                    alt={t(activeChapter.title, locale)}
                                    priority={true}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </motion.div>
                        ))}
                </AnimatePresence>

                {/* Preload adjacent chapter visual (index + 1) invisibly in DOM for zero-lag descent */}
                {chapters[activeIndex + 1] && (
                    <div
                        key={`preload-${chapters[activeIndex + 1].id}`}
                        className="absolute -top-[9999px] -left-[9999px] w-1 h-1 opacity-0 pointer-events-none -z-50 overflow-hidden"
                        aria-hidden="true"
                    >
                        <Image
                            src={resolveImagePath(
                                chapters[activeIndex + 1].image,
                            )}
                            alt=""
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            quality={80}
                            priority={true}
                        />
                    </div>
                )}

                {/* Cinematic Sci-Fi Gradient & Vignette Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-black/40 to-black/60 pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#050508_95%)] pointer-events-none" />
                <div className="absolute inset-0 bg-red-950/10 mix-blend-color-dodge pointer-events-none" />

                {/* Desktop Sticky Media HUD Overlay */}
                <div className="absolute bottom-6 left-6 right-6 hidden md:flex items-end justify-between pointer-events-none z-10">
                    <div className="bg-black/80 backdrop-blur-md border border-neutral-800 p-3 rounded-lg max-w-sm">
                        <div className="text-[10px] font-mono text-red-400 tracking-wider uppercase mb-1 flex items-center gap-1.5">
                            <Compass className="w-3 h-3 text-red-500" />
                            <span>{tMsg("timelineLocation")}</span>
                        </div>
                        <div className="text-xs font-mono font-bold text-white truncate">
                            {t(activeChapter.title, locale)}
                        </div>
                        <div className="text-[10px] font-mono text-neutral-400 mt-0.5">
                            {tMsg("recorded")} {t(activeChapter.date, locale)}
                        </div>
                    </div>

                    {/* Progress Indicators */}
                    <div className="flex flex-col items-end gap-1.5 font-mono text-xs text-neutral-400">
                        <div className="text-right">
                            <span className="text-red-500 font-bold">
                                {String(activeIndex + 1).padStart(2, "0")}
                            </span>
                            <span className="text-neutral-600">
                                {" "}
                                / {String(chapters.length).padStart(2, "0")}
                            </span>
                        </div>
                        <div className="flex flex-wrap max-w-[220px] justify-end gap-1">
                            {chapters.map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-1.5 rounded-full transition-all duration-200 ${
                                        i === activeIndex
                                            ? "w-4 bg-red-500 shadow-[0_0_8px_#ef4444]"
                                            : i < activeIndex
                                              ? "w-1.5 bg-red-950 border border-red-800/60"
                                              : "w-1.5 bg-neutral-800"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* =========================================================================
          TEXT CHAPTERS CONTAINER:
          - Mobile: relative z-10 w-full
          - Desktop (md:): md:w-1/2 md:relative md:z-10
         ========================================================================= */}
            <main className="relative z-10 w-full md:w-1/2 md:relative md:z-10">
                {chapters.map((chapter, index) => (
                    <ChapterCard
                        key={chapter.id}
                        chapter={chapter}
                        index={index}
                        total={chapters.length}
                        isActive={index === activeIndex}
                        onInView={handleChapterInView}
                    />
                ))}
            </main>
        </div>
    );
};

export const ScrollytellingLayout: React.FC<ScrollytellingLayoutProps> = (
    props,
) => {
    return (
        <Suspense fallback={null}>
            <ScrollytellingLayoutContent {...props} />
        </Suspense>
    );
};

export default ScrollytellingLayout;
