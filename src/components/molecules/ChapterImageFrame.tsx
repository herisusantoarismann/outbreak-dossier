"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Crosshair } from "lucide-react";
import { resolveImagePath } from "@/lib/imageResolver";

export interface ChapterImageFrameProps {
    src: string;
    alt: string;
    priority?: boolean;
    sizes?: string;
    quality?: number;
    className?: string;
}

export const ChapterImageFrame: React.FC<ChapterImageFrameProps> = ({
    src,
    alt,
    priority = false,
    sizes = "(max-width: 768px) 100vw, 50vw",
    quality = 80,
    className = "",
}) => {
    const resolvedSrc = resolveImagePath(src);
    const [currentSrc, setCurrentSrc] = useState(resolvedSrc);
    const [loaded, setLoaded] = useState(false);

    if (resolvedSrc !== currentSrc) {
        setCurrentSrc(resolvedSrc);
        setLoaded(false);
    }

    return (
        <div
            className={`relative w-full h-full bg-[#030712] border border-white/10 overflow-hidden ${className}`}
        >
            {/* Tech-Noir Tactical Skeleton Loader */}
            {!loaded && (
                <div className="absolute inset-0 bg-[#070a12] animate-pulse relative overflow-hidden flex flex-col items-center justify-center gap-3 z-10">
                    {/* Center HUD indicator: faint spinning radar/crosshair and decoding label */}
                    <div className="flex flex-col items-center gap-2.5">
                        <Crosshair className="w-6 h-6 text-neutral-500/70 animate-spin [animation-duration:3s]" />
                        <span className="text-[10px] font-mono tracking-wider text-neutral-400 select-none">
                            [DECODING CHAPTER ASSET...]
                        </span>
                    </div>

                    {/* Subtle tactical corner borders */}
                    <div className="absolute inset-0 pointer-events-none border border-neutral-800/80" />

                    {/* Subtle corner brackets */}
                    <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-neutral-600/60 pointer-events-none" />
                    <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-neutral-600/60 pointer-events-none" />
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-neutral-600/60 pointer-events-none" />
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-neutral-600/60 pointer-events-none" />
                </div>
            )}

            <Image
                src={resolvedSrc}
                alt={alt}
                fill
                sizes={sizes}
                quality={quality}
                priority={priority}
                onLoad={() => setLoaded(true)}
                className={`object-cover transition-opacity duration-500 ease-in-out ${
                    loaded ? "opacity-100" : "opacity-0"
                }`}
            />
        </div>
    );
};

export default ChapterImageFrame;
