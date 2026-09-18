"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useActivePandemic } from "@/context/PandemicContext";
import { useAppStore } from "@/stores/useAppStore";
import { getPathogenConfig, PathogenConfig } from "./pathogenConfig";

// ============================================================================
// 1. Morphological Asset: Yersinia pestis (Shared by Justinian & Black Death)
// ============================================================================
export const YersiniaPestisMorphology: React.FC<{
    themeColor: string;
    haloHex: string;
}> = ({ themeColor, haloHex }) => (
    <svg
        viewBox="0 0 360 360"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <radialGradient id="ypGlowGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={haloHex} stopOpacity="0.75" />
                <stop offset="70%" stopColor={themeColor} stopOpacity="0.15" />
                <stop offset="100%" stopColor={themeColor} stopOpacity="0" />
            </radialGradient>
            <linearGradient
                id="ypCapsuleGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
            >
                <stop offset="0%" stopColor={themeColor} stopOpacity="0.9" />
                <stop offset="28%" stopColor={themeColor} stopOpacity="0.55" />
                <stop offset="50%" stopColor="#090a12" stopOpacity="0.9" />
                <stop offset="72%" stopColor={themeColor} stopOpacity="0.55" />
                <stop offset="100%" stopColor={themeColor} stopOpacity="0.9" />
            </linearGradient>
            <radialGradient id="ypBipolarLeft" cx="35%" cy="50%" r="45%">
                <stop offset="0%" stopColor={themeColor} />
                <stop offset="65%" stopColor={themeColor} stopOpacity="0.75" />
                <stop offset="100%" stopColor="#050509" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="ypBipolarRight" cx="65%" cy="50%" r="45%">
                <stop offset="0%" stopColor={themeColor} />
                <stop offset="65%" stopColor={themeColor} stopOpacity="0.75" />
                <stop offset="100%" stopColor="#050509" stopOpacity="0" />
            </radialGradient>
            <filter id="ypFilter" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>

        {/* Ambient Specimen Field */}
        <circle cx="180" cy="180" r="160" fill="url(#ypGlowGrad)" />

        <g filter="url(#ypFilter)">
            {/* Outer Capsule / Glycocalyx Slime Envelope */}
            <rect
                x="80"
                y="125"
                width="200"
                height="110"
                rx="55"
                ry="55"
                fill="none"
                stroke={themeColor}
                strokeWidth="2.5"
                strokeDasharray="6 3"
                opacity="0.65"
            />

            {/* Inner Peptidoglycan Cell Wall */}
            <rect
                x="85"
                y="130"
                width="190"
                height="100"
                rx="50"
                ry="50"
                fill="url(#ypCapsuleGrad)"
                stroke={themeColor}
                strokeWidth="3"
            />

            {/* Bipolar Terminal Density (Classic "Safety Pin" Wayson's Staining of Y. pestis) */}
            {/* Left Terminal Pole Density */}
            <ellipse
                cx="132"
                cy="180"
                rx="36"
                ry="42"
                fill="url(#ypBipolarLeft)"
            />
            <circle cx="126" cy="176" r="14" fill={themeColor} opacity="0.9" />
            <circle cx="138" cy="188" r="8" fill="#ffffff" opacity="0.4" />

            {/* Right Terminal Pole Density */}
            <ellipse
                cx="228"
                cy="180"
                rx="36"
                ry="42"
                fill="url(#ypBipolarRight)"
            />
            <circle cx="234" cy="176" r="14" fill={themeColor} opacity="0.9" />
            <circle cx="222" cy="188" r="8" fill="#ffffff" opacity="0.4" />

            {/* Clear Central Vacuolated Zone */}
            <ellipse
                cx="180"
                cy="180"
                rx="24"
                ry="38"
                fill="#05060b"
                stroke={themeColor}
                strokeWidth="1"
                strokeDasharray="3 4"
                opacity="0.45"
            />

            {/* Chromosomal DNA Strands in Poles */}
            <path
                d="M 115 170 Q 128 160 135 174 T 125 192"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.5"
                opacity="0.6"
            />
            <path
                d="M 225 170 Q 238 160 245 174 T 235 192"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.5"
                opacity="0.6"
            />

            {/* Micro-pili / Outer membrane fimbriae */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
                <line
                    key={`pili-${idx}`}
                    x1={180 + 95 * Math.cos((angle * Math.PI) / 180)}
                    y1={180 + 50 * Math.sin((angle * Math.PI) / 180)}
                    x2={180 + 106 * Math.cos((angle * Math.PI) / 180)}
                    y2={180 + 58 * Math.sin((angle * Math.PI) / 180)}
                    stroke={themeColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.75"
                />
            ))}
        </g>
    </svg>
);

// ============================================================================
// 2. Morphological Asset: Vibrio cholerae (Curved Comma + Undulating Flagellum)
// ============================================================================
export const VibrioCholeraeMorphology: React.FC<{
    themeColor: string;
    haloHex: string;
}> = ({ themeColor, haloHex }) => (
    <svg
        viewBox="0 0 360 360"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <radialGradient id="vcGlowGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={haloHex} stopOpacity="0.7" />
                <stop offset="100%" stopColor={themeColor} stopOpacity="0" />
            </radialGradient>
            <radialGradient id="vcCore" cx="45%" cy="45%" r="60%">
                <stop offset="0%" stopColor={themeColor} stopOpacity="0.95" />
                <stop offset="70%" stopColor="#064e3b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#022c22" stopOpacity="0.9" />
            </radialGradient>
            <filter id="vcFilter" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>

        {/* Ambient Specimen Field */}
        <circle cx="180" cy="180" r="160" fill="url(#vcGlowGrad)" />

        <g filter="url(#vcFilter)">
            {/* Polar Flagellum Sheath (Tail Whip with Undulation Wave) */}
            <motion.path
                d="M 230 145 C 265 110, 280 170, 310 120 S 335 150, 345 130"
                fill="none"
                stroke={themeColor}
                strokeWidth="3.5"
                strokeLinecap="round"
                animate={{
                    d: [
                        "M 230 145 C 265 110, 280 170, 310 120 S 335 150, 345 130",
                        "M 230 145 C 260 170, 285 110, 315 155 S 330 120, 345 145",
                        "M 230 145 C 265 110, 280 170, 310 120 S 335 150, 345 130",
                    ],
                }}
                transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Secondary Sinuous Wave Tracer */}
            <motion.path
                d="M 230 145 C 265 110, 280 170, 310 120 S 335 150, 345 130"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                opacity="0.65"
                animate={{
                    d: [
                        "M 230 145 C 265 110, 280 170, 310 120 S 335 150, 345 130",
                        "M 230 145 C 260 170, 285 110, 315 155 S 330 120, 345 145",
                        "M 230 145 C 265 110, 280 170, 310 120 S 335 150, 345 130",
                    ],
                }}
                transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Curved Comma-shaped Rod Body (Vibrio Morphology) */}
            <path
                d="M 110 205 C 80 145, 125 90, 185 105 C 215 115, 235 135, 230 155 C 215 200, 155 245, 110 205 Z"
                fill="url(#vcCore)"
                stroke={themeColor}
                strokeWidth="3.5"
            />

            {/* Lipopolysaccharide Surface Membrane Creases */}
            <path
                d="M 125 180 C 135 150, 160 130, 195 135"
                fill="none"
                stroke={themeColor}
                strokeWidth="2"
                opacity="0.6"
            />
            <path
                d="M 140 195 C 150 170, 175 155, 205 160"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1"
                opacity="0.35"
            />

            {/* Polar Insertion Basal Body Disk */}
            <circle cx="230" cy="145" r="5" fill="#ffffff" />
            <circle
                cx="230"
                cy="145"
                r="9"
                fill="none"
                stroke={themeColor}
                strokeWidth="1.5"
            />
        </g>
    </svg>
);

// ============================================================================
// 3. Morphological Asset: H1N1 (Dense Orthomyxovirus Spherical Virion)
// ============================================================================
export const H1N1Morphology: React.FC<{
    themeColor: string;
    haloHex: string;
}> = ({ themeColor, haloHex }) => {
    // 28 dense radial surface spikes (Hemagglutinin trimer & Neuraminidase tetramer)
    const spikeCount = 28;
    const angles = Array.from(
        { length: spikeCount },
        (_, i) => (i * 360) / spikeCount,
    );

    return (
        <svg
            viewBox="0 0 360 360"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <radialGradient id="h1n1GlowGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={haloHex} stopOpacity="0.7" />
                    <stop
                        offset="100%"
                        stopColor={themeColor}
                        stopOpacity="0"
                    />
                </radialGradient>
                <radialGradient id="h1n1Core" cx="40%" cy="40%" r="60%">
                    <stop
                        offset="0%"
                        stopColor={themeColor}
                        stopOpacity="0.95"
                    />
                    <stop offset="70%" stopColor="#78350f" stopOpacity="0.85" />
                    <stop
                        offset="100%"
                        stopColor="#451a03"
                        stopOpacity="0.95"
                    />
                </radialGradient>
                <filter
                    id="h1n1Filter"
                    x="-30%"
                    y="-30%"
                    width="160%"
                    height="160%"
                >
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Ambient Specimen Field */}
            <circle cx="180" cy="180" r="160" fill="url(#h1n1GlowGrad)" />

            <g filter="url(#h1n1Filter)">
                {/* 28 Dense Surface Glycoprotein Protrusions */}
                {angles.map((deg, idx) => {
                    const isNeuraminidase = idx % 3 === 0;
                    const rad = (deg * Math.PI) / 180;
                    const rInner = 82;
                    const rOuter = isNeuraminidase ? 112 : 106;
                    const x1 = 180 + rInner * Math.cos(rad);
                    const y1 = 180 + rInner * Math.sin(rad);
                    const x2 = 180 + rOuter * Math.cos(rad);
                    const y2 = 180 + rOuter * Math.sin(rad);

                    return (
                        <g key={`h1n1-spike-${idx}`}>
                            <line
                                x1={x1}
                                y1={y1}
                                x2={x2}
                                y2={y2}
                                stroke={themeColor}
                                strokeWidth={isNeuraminidase ? "3.5" : "2.5"}
                                strokeLinecap="round"
                            />
                            {isNeuraminidase ? (
                                // Mushroom-shaped NA box head
                                <rect
                                    x={x2 - 5}
                                    y={y2 - 5}
                                    width="10"
                                    height="10"
                                    rx="2.5"
                                    transform={`rotate(${deg} ${x2} ${y2})`}
                                    fill={themeColor}
                                    stroke="#ffffff"
                                    strokeWidth="1"
                                />
                            ) : (
                                // Pointed trimeric HA head
                                <circle
                                    cx={x2}
                                    cy={y2}
                                    r="4.5"
                                    fill="#fef08a"
                                    stroke={themeColor}
                                    strokeWidth="1"
                                />
                            )}
                        </g>
                    );
                })}

                {/* Lipid Bilayer Envelope Core */}
                <circle
                    cx="180"
                    cy="180"
                    r="84"
                    fill="url(#h1n1Core)"
                    stroke={themeColor}
                    strokeWidth="3"
                />

                {/* Matrix Protein (M1) Shell Lining */}
                <circle
                    cx="180"
                    cy="180"
                    r="76"
                    fill="none"
                    stroke={themeColor}
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    opacity="0.6"
                />

                {/* 8 Segmented Viral Ribonucleoprotein (vRNP) Helices */}
                {[-35, -20, -5, 10, 25, -25, 0, 20].map((offset, idx) => (
                    <line
                        key={`rnp-${idx}`}
                        x1={155 + offset}
                        y1={140 + idx * 10}
                        x2={205 + offset}
                        y2={140 + idx * 10}
                        stroke="#fef08a"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="3 3"
                        opacity="0.8"
                    />
                ))}
            </g>
        </svg>
    );
};

// ============================================================================
// 4. Morphological Asset: SARS-CoV-2 (Corona Spikes Virion)
// ============================================================================
export const SARSCoV2Morphology: React.FC<{
    themeColor: string;
    haloHex: string;
}> = ({ themeColor, haloHex }) => {
    // 20 perimeter trimeric S-glycoprotein spikes radiating symmetrically
    const spikeCount = 20;
    const angles = Array.from(
        { length: spikeCount },
        (_, i) => (i * 360) / spikeCount,
    );

    // 3D perspective surface spikes protruding toward the camera viewer
    const surfaceSpikes = [
        { cx: 160, cy: 155, r: 10, angle: -25 },
        { cx: 205, cy: 150, r: 11, angle: 30 },
        { cx: 180, cy: 180, r: 13, angle: 0 },
        { cx: 150, cy: 195, r: 10, angle: -40 },
        { cx: 210, cy: 195, r: 11, angle: 45 },
        { cx: 180, cy: 135, r: 9, angle: 10 },
        { cx: 185, cy: 220, r: 9, angle: -15 },
    ];

    return (
        <svg
            viewBox="0 0 360 360"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <radialGradient id="covGlowGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={haloHex} stopOpacity="0.8" />
                    <stop
                        offset="65%"
                        stopColor={themeColor}
                        stopOpacity="0.2"
                    />
                    <stop
                        offset="100%"
                        stopColor={themeColor}
                        stopOpacity="0"
                    />
                </radialGradient>
                {/* 3D Shaded Spherical Viral Envelope */}
                <radialGradient id="covCore" cx="35%" cy="32%" r="65%">
                    <stop offset="0%" stopColor="#f87171" stopOpacity="0.9" />
                    <stop
                        offset="30%"
                        stopColor={themeColor}
                        stopOpacity="0.95"
                    />
                    <stop offset="65%" stopColor="#7f1d1d" stopOpacity="0.95" />
                    <stop offset="90%" stopColor="#450a0a" stopOpacity="0.98" />
                    <stop offset="100%" stopColor="#1e0a0a" stopOpacity="1" />
                </radialGradient>
                {/* Trimeric S1 Lobe Head Gradient */}
                <radialGradient id="covSpikeHead" cx="40%" cy="35%" r="60%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                    <stop offset="35%" stopColor="#fca5a5" stopOpacity="0.9" />
                    <stop
                        offset="70%"
                        stopColor={themeColor}
                        stopOpacity="0.95"
                    />
                    <stop offset="100%" stopColor="#991b1b" stopOpacity="1" />
                </radialGradient>
                <filter
                    id="covFilter"
                    x="-30%"
                    y="-30%"
                    width="160%"
                    height="160%"
                >
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Ambient Bioluminescent Specimen Halo */}
            <circle cx="180" cy="180" r="165" fill="url(#covGlowGrad)" />

            <g filter="url(#covFilter)">
                {/* 1. Outward-Radiating Trimeric S-Glycoprotein Spikes (Corona Crown) */}
                {angles.map((deg, idx) => {
                    const rad = (deg * Math.PI) / 180;
                    const rInner = 74;
                    const rHead = 114;
                    const xBase = 180 + rInner * Math.cos(rad);
                    const yBase = 180 + rInner * Math.sin(rad);
                    const xHead = 180 + rHead * Math.cos(rad);
                    const yHead = 180 + rHead * Math.sin(rad);

                    return (
                        <g key={`cov-spike-${idx}`}>
                            {/* Stalk: Heptad Repeat Stem (Tapered Rod) */}
                            <line
                                x1={xBase}
                                y1={yBase}
                                x2={xHead}
                                y2={yHead}
                                stroke={themeColor}
                                strokeWidth="3.5"
                                strokeLinecap="round"
                                opacity="0.9"
                            />
                            {/* Inner stalk highlight */}
                            <line
                                x1={xBase}
                                y1={yBase}
                                x2={xHead}
                                y2={yHead}
                                stroke="#fca5a5"
                                strokeWidth="1"
                                strokeLinecap="round"
                                opacity="0.6"
                            />

                            {/* Trimeric Clover/Club Head (Three-lobed S1 Receptor-Binding Domain) */}
                            <g transform={`rotate(${deg} ${xHead} ${yHead})`}>
                                {/* Central primary lobe */}
                                <ellipse
                                    cx={xHead}
                                    cy={yHead - 7}
                                    rx="6.5"
                                    ry="6"
                                    fill="url(#covSpikeHead)"
                                    stroke={themeColor}
                                    strokeWidth="1"
                                />
                                {/* Left secondary lobe */}
                                <ellipse
                                    cx={xHead - 6}
                                    cy={yHead - 2}
                                    rx="5.5"
                                    ry="5"
                                    fill="url(#covSpikeHead)"
                                    stroke={themeColor}
                                    strokeWidth="0.8"
                                />
                                {/* Right secondary lobe */}
                                <ellipse
                                    cx={xHead + 6}
                                    cy={yHead - 2}
                                    rx="5.5"
                                    ry="5"
                                    fill="url(#covSpikeHead)"
                                    stroke={themeColor}
                                    strokeWidth="0.8"
                                />
                                {/* Specular highlight pinprick */}
                                <circle
                                    cx={xHead}
                                    cy={yHead - 8}
                                    r="1.8"
                                    fill="#ffffff"
                                    opacity="0.85"
                                />
                            </g>
                        </g>
                    );
                })}

                {/* 2. Outer Membrane Bilayer Ring */}
                <circle
                    cx="180"
                    cy="180"
                    r="78"
                    fill="none"
                    stroke={themeColor}
                    strokeWidth="2.5"
                    strokeDasharray="4 3"
                    opacity="0.75"
                />

                {/* 3. Spherical Lipid Bilayer Envelope Core */}
                <circle
                    cx="180"
                    cy="180"
                    r="76"
                    fill="url(#covCore)"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeOpacity="0.4"
                />

                {/* 4. Embedded Surface Membrane (M) Protein Dimers & Envelope (E) Proteins */}
                {Array.from({ length: 18 }, (_, i) => {
                    const mAngle = (i * 20 + 10) * (Math.PI / 180);
                    const mx = 180 + 72 * Math.cos(mAngle);
                    const my = 180 + 72 * Math.sin(mAngle);
                    return (
                        <circle
                            key={`m-protein-${i}`}
                            cx={mx}
                            cy={my}
                            r={i % 2 === 0 ? "2.8" : "2"}
                            fill={i % 2 === 0 ? "#fbbf24" : "#f87171"}
                            stroke="#7f1d1d"
                            strokeWidth="0.5"
                            opacity="0.9"
                        />
                    );
                })}

                {/* 5. Internal Coiled +ssRNA Nucleocapsid (N) Protein Spiral */}
                <path
                    d="M 148 180 Q 155 152 180 152 T 208 178 T 180 208 T 156 182 T 180 162 T 198 180 T 180 194"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2.2"
                    strokeDasharray="3 3"
                    strokeLinecap="round"
                    opacity="0.75"
                />
                <path
                    d="M 148 180 Q 155 152 180 152 T 208 178 T 180 208 T 156 182 T 180 162 T 198 180 T 180 194"
                    fill="none"
                    stroke="#fca5a5"
                    strokeWidth="4"
                    strokeLinecap="round"
                    opacity="0.25"
                />

                {/* 6. Foreground 3D Surface Trimeric Spikes Protruding at Viewer */}
                {surfaceSpikes.map((s, idx) => (
                    <g
                        key={`surf-spike-${idx}`}
                        transform={`rotate(${s.angle} ${s.cx} ${s.cy})`}
                    >
                        {/* Shadow on viral surface */}
                        <ellipse
                            cx={s.cx + 2}
                            cy={s.cy + 3}
                            rx={s.r}
                            ry={s.r * 0.7}
                            fill="#1e0a0a"
                            opacity="0.6"
                        />
                        {/* Trimeric head lobes pointing forward */}
                        <circle
                            cx={s.cx}
                            cy={s.cy - 3}
                            r={s.r * 0.5}
                            fill="url(#covSpikeHead)"
                            stroke={themeColor}
                            strokeWidth="0.7"
                        />
                        <circle
                            cx={s.cx - 4}
                            cy={s.cy + 2}
                            r={s.r * 0.45}
                            fill="url(#covSpikeHead)"
                            stroke={themeColor}
                            strokeWidth="0.7"
                        />
                        <circle
                            cx={s.cx + 4}
                            cy={s.cy + 2}
                            r={s.r * 0.45}
                            fill="url(#covSpikeHead)"
                            stroke={themeColor}
                            strokeWidth="0.7"
                        />
                        {/* High-light crown peak */}
                        <circle
                            cx={s.cx}
                            cy={s.cy - 2}
                            r="1.5"
                            fill="#ffffff"
                            opacity="0.9"
                        />
                    </g>
                ))}
            </g>
        </svg>
    );
};

// ============================================================================
// 5. Morphological Asset Selector (Asset Sharing Router)
// ============================================================================
export const PathogenMorphologyRenderer: React.FC<{
    config: PathogenConfig;
}> = ({ config }) => {
    switch (config.assetKey) {
        case "yersinia_pestis":
            // Shared asset logic between Justinian (Purple) and Black Death (Crimson)
            return (
                <motion.div
                    animate={{
                        rotate: [-6, 6, -6],
                        scale: [0.98, 1.02, 0.98],
                        y: [-2, 2, -2],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="w-full h-full flex items-center justify-center"
                >
                    <YersiniaPestisMorphology
                        themeColor={config.themeColor}
                        haloHex={config.haloHex}
                    />
                </motion.div>
            );

        case "vibrio_cholerae":
            return (
                <motion.div
                    animate={{
                        rotate: [0, 4, 0],
                        scale: [1, 1.03, 1],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="w-full h-full flex items-center justify-center"
                >
                    <VibrioCholeraeMorphology
                        themeColor={config.themeColor}
                        haloHex={config.haloHex}
                    />
                </motion.div>
            );

        case "h1n1":
            return (
                <motion.div
                    animate={{
                        rotate: 360,
                        scale: [1, 1.03, 1],
                    }}
                    transition={{
                        rotate: {
                            duration: 32,
                            repeat: Infinity,
                            ease: "linear",
                        },
                        scale: {
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        },
                    }}
                    className="w-full h-full flex items-center justify-center"
                >
                    <H1N1Morphology
                        themeColor={config.themeColor}
                        haloHex={config.haloHex}
                    />
                </motion.div>
            );

        case "sars_cov_2":
        default:
            return (
                <motion.div
                    animate={{
                        rotate: 360,
                        scale: [1, 1.04, 1],
                    }}
                    transition={{
                        rotate: {
                            duration: 24,
                            repeat: Infinity,
                            ease: "linear",
                        },
                        scale: {
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        },
                    }}
                    className="w-full h-full flex items-center justify-center"
                >
                    <SARSCoV2Morphology
                        themeColor={config.themeColor}
                        haloHex={config.haloHex}
                    />
                </motion.div>
            );
    }
};

// ============================================================================
// 6. PathogenHoloLoader Component (Tactical Biometric Hologram HUD)
// ============================================================================
export interface PathogenHoloLoaderProps {
    pandemicId?: string;
    active?: boolean;
}

export const PathogenHoloLoader: React.FC<PathogenHoloLoaderProps> = ({
    pandemicId,
    active,
}) => {
    const locale = useLocale();
    const params = useParams();
    const activeLocale = locale === "id" ? "id" : "en";

    // Dynamic resolution of active pandemic
    const { activePandemicId } = useActivePandemic();
    const { isLoading } = useAppStore();

    const isVisible = active !== undefined ? active : isLoading;

    const routePandemicId =
        (params?.pandemicId as string) || (params?.pandemic as string);

    const resolvedPandemicId =
        pandemicId || activePandemicId || routePandemicId || "covid-19";

    const config = getPathogenConfig(resolvedPandemicId);

    // Staggered Telemetry Readout Ticker
    const [telemetryStep, setTelemetryStep] = useState<number>(0);

    useEffect(() => {
        if (!isVisible) return;

        const t1 = setTimeout(() => setTelemetryStep(1), 300);
        const t2 = setTimeout(() => setTelemetryStep(2), 1200);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            setTelemetryStep(0);
        };
    }, [isVisible]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="pathogen-holo-loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 select-none overflow-hidden"
                >
                    {/* Ambient Dark Specimen Grid Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f12_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f12_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

                    {/* Dynamic Vignette Aura with Epoch Halo Theme */}
                    <div
                        className="absolute inset-0 pointer-events-none transition-colors duration-500"
                        style={{
                            background: `radial-gradient(circle at center, ${config.haloHex} 0%, transparent 55%, black 85%)`,
                        }}
                    />

                    {/* Tactical Corner Brackets */}
                    <div className="absolute inset-6 pointer-events-none hidden sm:block">
                        <div
                            className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2"
                            style={{ borderColor: config.themeColor }}
                        />
                        <div
                            className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2"
                            style={{ borderColor: config.themeColor }}
                        />
                        <div
                            className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2"
                            style={{ borderColor: config.themeColor }}
                        />
                        <div
                            className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2"
                            style={{ borderColor: config.themeColor }}
                        />
                    </div>

                    {/* Central Biometric Microscope / Hologram Container */}
                    <div className="relative flex items-center justify-center">
                        {/* 1. Central Pulsating Reticle Scanner (Slow Dashed Rotation) */}
                        <div className="absolute w-72 h-72 sm:w-88 sm:h-88 rounded-full border border-dashed border-white/20 animate-spin-slow pointer-events-none" />

                        {/* 2. Counter-rotating Epoch Target Ring */}
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{
                                repeat: Infinity,
                                duration: 16,
                                ease: "linear",
                            }}
                            className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full pointer-events-none"
                            style={{
                                border: `1px solid ${config.themeColor}`,
                                borderLeftColor: "transparent",
                                borderRightColor: "transparent",
                                opacity: 0.6,
                            }}
                        />

                        {/* 3. Glowing Pulse Halo Ring */}
                        <motion.div
                            animate={{
                                scale: [1, 1.06, 1],
                                opacity: [0.35, 0.75, 0.35],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 2.4,
                                ease: "easeInOut",
                            }}
                            className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full pointer-events-none"
                            style={{
                                border: `2px solid ${config.themeColor}`,
                                boxShadow: `0 0 35px ${config.haloHex}`,
                            }}
                        />

                        {/* 4. Circular Hologram Specimen Mask */}
                        <div
                            className="relative w-52 h-52 sm:w-64 sm:h-64 rounded-full overflow-hidden border-2 shadow-[inset_0_0_30px_rgba(0,0,0,0.9)] bg-neutral-950 flex items-center justify-center"
                            style={{ borderColor: config.themeColor }}
                        >
                            {/* Holographic Crosshairs */}
                            <div className="absolute inset-0 z-20 pointer-events-none">
                                <div
                                    className="absolute top-1/2 left-0 right-0 h-[1px] opacity-40"
                                    style={{
                                        backgroundColor: config.themeColor,
                                    }}
                                />
                                <div
                                    className="absolute left-1/2 top-0 bottom-0 w-[1px] opacity-40"
                                    style={{
                                        backgroundColor: config.themeColor,
                                    }}
                                />
                                <div
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border opacity-50"
                                    style={{ borderColor: config.themeColor }}
                                />
                            </div>

                            {/* Lens Specular Reflection */}
                            <div className="absolute inset-0 z-10 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

                            {/* Vector Silhouette Graphic Component */}
                            <div className="relative w-full h-full p-2 flex items-center justify-center">
                                <PathogenMorphologyRenderer config={config} />
                            </div>
                        </div>
                    </div>

                    {/* HUD Tactical Labels & Decryption Feedback */}
                    <div className="relative mt-8 sm:mt-10 flex flex-col items-center justify-center text-center px-4 max-w-xl">
                        {/* Epoch Sublabel / Pathogen Classification */}
                        <div
                            className="text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase mb-1.5 flex items-center gap-1.5"
                            style={{ color: config.themeColor }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                            <span>
                                {activeLocale === "id"
                                    ? config.sublabel.id
                                    : config.sublabel.en}
                            </span>
                        </div>

                        {/* Primary Decryption Action Label */}
                        <h2
                            className="font-mono font-black tracking-wider sm:tracking-widest text-sm sm:text-lg text-white uppercase"
                            style={{
                                textShadow: `0 0 16px ${config.haloHex}`,
                            }}
                        >
                            {activeLocale === "id"
                                ? config.label.id
                                : config.label.en}
                        </h2>

                        {/* Scientific Pathogen Identity Pill */}
                        <div className="mt-2.5 px-3 py-1 rounded border border-neutral-800 bg-neutral-950/80 font-mono text-[10.5px] text-neutral-300 flex items-center gap-2">
                            <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: config.themeColor }}
                            />
                            <span>{config.name}</span>
                        </div>

                        {/* Animated Biometric Telemetry Readout Ticker */}
                        <div className="mt-5 space-y-1 font-mono text-[10px] sm:text-[11px] text-left">
                            <div
                                className={`transition-opacity duration-300 flex items-center gap-2 ${
                                    telemetryStep >= 1
                                        ? "opacity-100 text-neutral-300"
                                        : "opacity-25 text-neutral-600"
                                }`}
                            >
                                <span className="text-neutral-500">[1/2]</span>
                                <span>ISOLATING MOLECULAR STRUCTURE...</span>
                                {telemetryStep >= 1 && (
                                    <span
                                        className="font-bold font-mono px-1.5 py-0.2 rounded text-[9px]"
                                        style={{
                                            color: config.themeColor,
                                            border: `1px solid ${config.themeColor}50`,
                                            backgroundColor: `${config.themeColor}15`,
                                        }}
                                    >
                                        OK
                                    </span>
                                )}
                            </div>

                            <div
                                className={`transition-opacity duration-300 flex items-center gap-2 ${
                                    telemetryStep >= 2
                                        ? "opacity-100 text-neutral-300"
                                        : "opacity-25 text-neutral-600"
                                }`}
                            >
                                <span className="text-neutral-500">[2/2]</span>
                                <span>SYNCING EPIDEMIOLOGICAL VECTORS...</span>
                                {telemetryStep >= 2 && (
                                    <span
                                        className="font-bold font-mono px-1.5 py-0.2 rounded text-[9px]"
                                        style={{
                                            color: config.themeColor,
                                            border: `1px solid ${config.themeColor}50`,
                                            backgroundColor: `${config.themeColor}15`,
                                        }}
                                    >
                                        OK
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PathogenHoloLoader;
