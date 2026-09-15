/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef, useCallback } from "react";
import { ChevronsLeftRight } from "lucide-react";
import { resolveImagePath } from "@/lib/imageResolver";

export interface ComparisonSliderProps {
    beforeImage: string;
    beforeLabel?: string;
    afterImage: string;
    afterLabel?: string;
    initialPosition?: number; // 0 - 100
    className?: string;
    aspectRatio?: string; // e.g. "aspect-video"
    interactiveHint?: boolean;
}

export const ComparisonSlider: React.FC<ComparisonSliderProps> = ({
    beforeImage,
    beforeLabel = "PRA-PANDEMI // RUSH HOUR",
    afterImage,
    afterLabel = "PSBB TOTAL // SUD MAN KOSONG",
    initialPosition = 50,
    className = "",
    aspectRatio = "",
    interactiveHint = true,
}) => {
    const [sliderPos, setSliderPos] = useState(initialPosition);
    const [isDragging, setIsDragging] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const updatePosition = useCallback((clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setSliderPos(percent);
    }, []);

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        setIsDragging(true);
        setHasInteracted(true);
        updatePosition(e.clientX);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        updatePosition(e.clientX);
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        if (isDragging) {
            try {
                e.currentTarget.releasePointerCapture(e.pointerId);
            } catch {
                // Ignore if pointer capture already released
            }
            setIsDragging(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            setHasInteracted(true);
            setSliderPos((prev) => Math.max(0, prev - 5));
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            setHasInteracted(true);
            setSliderPos((prev) => Math.min(100, prev + 5));
        }
    };

    return (
        <div
            ref={containerRef}
            role="slider"
            aria-label="Image Comparison Slider"
            aria-valuenow={Math.round(sliderPos)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-orientation="horizontal"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={`relative overflow-hidden select-none cursor-ew-resize ${aspectRatio} ${className}`}
            style={{ touchAction: "none" }}
        >
            {/* After Image (Background Base Layer - Empty Sudirman) */}
            <img
                src={resolveImagePath(afterImage, "id")}
                alt={afterLabel}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                draggable={false}
                onError={(e) => {
                    // Fallback to lockdown city image if specific image path is unreachable
                    const target = e.currentTarget;
                    if (!target.src.includes("03-lockdown-city.jpg")) {
                        target.src =
                            "/assets/images/covid-19/id/03-lockdown-city.jpg";
                    }
                }}
            />

            {/* Before Image (Top Layer clipped with clipPath - Rush Hour) */}
            <div
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{
                    clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
                    WebkitClipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
                }}
            >
                <img
                    src={resolveImagePath(beforeImage, "id")}
                    alt={beforeLabel}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    draggable={false}
                    onError={(e) => {
                        // Fallback to rush hour image
                        const target = e.currentTarget;
                        if (!target.src.includes("02-outbreak-spread.jpg")) {
                            target.src =
                                "/assets/images/covid-19/id/02-outbreak-spread.jpg";
                        }
                    }}
                />
            </div>

            {/* Before Overlay Tag (Top-Left) */}
            <div
                className={`absolute top-3 left-3 pointer-events-none z-10 transition-opacity duration-200 ${
                    sliderPos < 15 ? "opacity-0" : "opacity-100"
                }`}
            >
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-amber-500/40 text-amber-300 font-mono text-[10px] sm:text-xs font-bold tracking-wider shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    {beforeLabel}
                </span>
            </div>

            {/* After Overlay Tag (Top-Right) */}
            <div
                className={`absolute top-3 right-3 pointer-events-none z-10 transition-opacity duration-200 ${
                    sliderPos > 85 ? "opacity-0" : "opacity-100"
                }`}
            >
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300 font-mono text-[10px] sm:text-xs font-bold tracking-wider shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    {afterLabel}
                </span>
            </div>

            {/* Center Divider Line */}
            <div
                className="absolute top-0 bottom-0 w-0.5 bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.9)] pointer-events-none z-20"
                style={{ left: `${sliderPos}%` }}
            >
                {/* Tactile Pill Handle */}
                <div
                    className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-transform duration-100 ${
                        isDragging ? "scale-110" : "hover:scale-105"
                    }`}
                >
                    <div className="flex items-center gap-1.5 bg-white/90 text-black text-[10px] font-mono font-bold px-2 py-1 rounded-full shadow-md border border-neutral-300 whitespace-nowrap cursor-ew-resize">
                        <ChevronsLeftRight className="w-3 h-3 text-black" />
                        <span>SPLIT VIEW</span>
                    </div>
                </div>
            </div>

            {/* Subtle Interactive Instruction Hint */}
            {interactiveHint && !hasInteracted && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none z-10 animate-pulse">
                    <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-mono text-neutral-300 border border-white/20 shadow-md">
                        ◀ GESER UNTUK MEMBANDINGKAN ▶
                    </span>
                </div>
            )}
        </div>
    );
};

export default ComparisonSlider;
