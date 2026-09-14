"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useAppStore } from "@/stores/useAppStore";

// High-detail Inline SVG Biohazard / Coronavirus Graphic Fallback
const VirusSvgIllustration: React.FC = () => (
    <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <radialGradient id="virusCore" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="65%" stopColor="#991b1b" />
                <stop offset="100%" stopColor="#450a0a" />
            </radialGradient>
            <radialGradient id="spikeGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#fca5a5" />
                <stop offset="50%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#7f1d1d" />
            </radialGradient>
            <filter id="virusGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>

        {/* Ambient dark specimen field */}
        <rect width="400" height="400" fill="#07070b" />

        {/* Central Virus Complex */}
        <g filter="url(#virusGlow)">
            {/* Primary Club-shaped Spike Glycoproteins (S) */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
                (angle, i) => (
                    <g
                        key={`spike-main-${i}`}
                        transform={`rotate(${angle} 200 200)`}
                    >
                        <line
                            x1="200"
                            y1="115"
                            x2="200"
                            y2="52"
                            stroke="#ef4444"
                            strokeWidth="5"
                            strokeLinecap="round"
                        />
                        <ellipse
                            cx="200"
                            cy="46"
                            rx="14"
                            ry="9"
                            fill="url(#spikeGrad)"
                        />
                    </g>
                ),
            )}

            {/* Secondary Intermediate Spikes */}
            {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map(
                (angle, i) => (
                    <g
                        key={`spike-sub-${i}`}
                        transform={`rotate(${angle} 200 200)`}
                    >
                        <line
                            x1="200"
                            y1="115"
                            x2="200"
                            y2="70"
                            stroke="#dc2626"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                        />
                        <circle cx="200" cy="66" r="6" fill="#f87171" />
                    </g>
                ),
            )}

            {/* Main Viral Envelope Lipid Bilayer */}
            <circle cx="200" cy="200" r="92" fill="url(#virusCore)" />

            {/* Surface Membrane Protein bumps (M & E proteins) */}
            <circle cx="160" cy="165" r="14" fill="#fca5a5" opacity="0.6" />
            <circle cx="235" cy="175" r="15" fill="#f87171" opacity="0.5" />
            <circle cx="185" cy="235" r="18" fill="#ef4444" opacity="0.7" />
            <circle cx="240" cy="230" r="12" fill="#b91c1c" opacity="0.75" />
            <circle cx="150" cy="220" r="11" fill="#dc2626" opacity="0.65" />
            <circle cx="210" cy="140" r="12" fill="#f87171" opacity="0.55" />

            {/* Inner Coiled Nucleocapsid Helix Indication */}
            <circle
                cx="200"
                cy="200"
                r="86"
                fill="none"
                stroke="#fca5a5"
                strokeWidth="2"
                strokeDasharray="4,6"
                opacity="0.35"
            />
        </g>
    </svg>
);

const CinematicLoadingContent: React.FC = () => {
    const t = useTranslations("loading");
    const [displayText, setDisplayText] = useState("");
    const [stage, setStage] = useState<"isolating" | "identified">("isolating");
    const [imgError, setImgError] = useState(false);

    const firstText = t("isolating");
    const secondText = t("identified");

    useEffect(() => {
        let currentIndex = 0;
        let timer: NodeJS.Timeout;

        const typeFirst = () => {
            if (currentIndex <= firstText.length) {
                setDisplayText(firstText.slice(0, currentIndex));
                currentIndex++;
                timer = setTimeout(typeFirst, 55);
            } else {
                timer = setTimeout(() => {
                    setStage("identified");
                    currentIndex = 0;
                    typeSecond();
                }, 350);
            }
        };

        const typeSecond = () => {
            if (currentIndex <= secondText.length) {
                setDisplayText(secondText.slice(0, currentIndex));
                currentIndex++;
                timer = setTimeout(typeSecond, 50);
            }
        };

        timer = setTimeout(typeFirst, 100);

        return () => {
            clearTimeout(timer);
        };
    }, [firstText, secondText]);

    return (
        <motion.div
            key="cinematic-loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black select-none overflow-hidden"
        >
            {/* Subtle sci-fi ambient grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f10_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f10_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

            {/* Vignette border glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,black_80%)] pointer-events-none" />

            {/* Microscope Viewport Container */}
            <div className="relative flex items-center justify-center">
                {/* Outer Rotating HUD Reticle */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 18,
                        ease: "linear",
                    }}
                    className="absolute w-72 h-72 sm:w-88 sm:h-88 rounded-full border border-dashed border-red-500/20 pointer-events-none"
                />

                {/* Counter-rotating Target Ring */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 12,
                        ease: "linear",
                    }}
                    className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-red-500/30 pointer-events-none"
                    style={{
                        borderLeftColor: "transparent",
                        borderRightColor: "transparent",
                    }}
                />

                {/* Glowing Pulse Ring */}
                <motion.div
                    animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.7, 0.3] }}
                    transition={{
                        repeat: Infinity,
                        duration: 2.2,
                        ease: "easeInOut",
                    }}
                    className="absolute w-60 h-60 sm:w-72 sm:h-72 rounded-full border-2 border-red-600/50 shadow-[0_0_30px_rgba(239,68,68,0.35)] pointer-events-none"
                />

                {/* Center Circular "Microscope" Lens Mask */}
                <div className="relative w-52 h-52 sm:w-64 sm:h-64 rounded-full overflow-hidden border-2 border-red-500/80 shadow-[inset_0_0_25px_rgba(0,0,0,0.9)] bg-neutral-950 flex items-center justify-center">
                    {/* Microscope Crosshairs */}
                    <div className="absolute inset-0 z-20 pointer-events-none">
                        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-red-500/40" />
                        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-red-500/40" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-red-500/60" />
                    </div>

                    {/* Lens Specular Reflection */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-tr from-transparent via-red-500/10 to-transparent pointer-events-none" />

                    {/* The Virus Visual (Guaranteed SVG fallback + optional external image) */}
                    <motion.div
                        animate={{ scale: [1, 1.08, 1], rotate: [0, 4, 0] }}
                        transition={{
                            repeat: Infinity,
                            duration: 8,
                            ease: "easeInOut",
                        }}
                        className="relative w-full h-full flex items-center justify-center"
                    >
                        {/* Always-rendered crisp SVG fallback */}
                        <VirusSvgIllustration />

                        {/* External Image (smoothly superimposed if available, hidden if failed) */}
                        {!imgError && (
                            <Image
                                src="/assets/images/01-loading-virus.jpg"
                                alt="SARS-CoV-2 Specimen under microscope"
                                fill
                                className="object-cover transition-opacity duration-300"
                                priority
                                onError={() => setImgError(true)}
                            />
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Typewriter Text & Status HUD */}
            <div className="relative mt-8 sm:mt-10 flex flex-col items-center justify-center min-h-[4rem] text-center px-4">
                <div className="text-xs font-mono tracking-widest text-red-400/70 uppercase mb-1">
                    {t("surveillanceBadge")}
                </div>

                <div
                    className={`font-mono font-bold tracking-wider sm:tracking-widest text-base sm:text-xl transition-colors duration-300 ${
                        stage === "identified"
                            ? "text-red-500 hud-glow"
                            : "text-neutral-300"
                    }`}
                >
                    {displayText}
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block ml-1 w-2 h-4 sm:h-5 bg-red-500 align-middle"
                    />
                </div>

                <div className="mt-2 flex items-center gap-2 text-[10px] font-mono text-neutral-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span>{t("targetVector")}</span>
                </div>
            </div>
        </motion.div>
    );
};

export const CinematicLoading: React.FC = () => {
    const { isLoading } = useAppStore();

    return (
        <AnimatePresence>
            {isLoading && <CinematicLoadingContent />}
        </AnimatePresence>
    );
};

export default CinematicLoading;
