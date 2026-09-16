"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Crosshair, AlertTriangle } from "lucide-react";
import { resolveImagePath } from "@/lib/imageResolver";

export interface ClassifiedImageProps {
    src: string;
    alt: string;
    fill?: boolean;
    width?: number;
    height?: number;
    sizes?: string;
    priority?: boolean;
    quality?: number;
    className?: string;
    containerClassName?: string;
}

interface ClassifiedImageContentProps extends ClassifiedImageProps {
    resolvedSrc: string;
}

const ClassifiedImageContent: React.FC<ClassifiedImageContentProps> = ({
    resolvedSrc,
    alt,
    fill = true,
    width,
    height,
    sizes = "(max-width: 768px) 100vw, 50vw",
    priority = false,
    quality = 85,
    className = "",
    containerClassName = "",
}) => {
    const [status, setStatus] = useState<"loading" | "loaded" | "error">(
        "loading",
    );

    return (
        <div
            className={`relative w-full h-full overflow-hidden bg-black/90 ${containerClassName}`}
        >
            {/* 1. Tactical CRT Shimmer / Loading State */}
            {status === "loading" && (
                <div
                    role="status"
                    aria-label="Decrypting classified surveillance asset"
                    className="absolute inset-0 bg-black/90 border border-neutral-800 text-neutral-500 font-mono text-xs flex flex-col items-center justify-center p-6 text-center z-10 select-none animate-pulse"
                >
                    {/* CRT Scanline Simulation Overlay */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-40" />

                    {/* Subtle Tactical Corner Brackets */}
                    <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-amber-500/40 pointer-events-none" />
                    <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-amber-500/40 pointer-events-none" />
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-amber-500/40 pointer-events-none" />
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-amber-500/40 pointer-events-none" />

                    {/* SVG Crosshair Reticle */}
                    <div className="relative mb-3 flex items-center justify-center">
                        <Crosshair className="w-8 h-8 text-amber-400/80 animate-spin [animation-duration:4s]" />
                        <span className="absolute w-2 h-2 rounded-full bg-amber-400/90 animate-ping" />
                    </div>

                    {/* Pulsing Amber Decryption Text */}
                    <span className="text-[11px] font-mono tracking-widest text-amber-400 font-bold uppercase animate-pulse">
                        [ CLASSIFIED SURVEILLANCE ASSET // DECRYPTING... ]
                    </span>
                    <span className="text-[9px] font-mono text-neutral-600 mt-1 uppercase tracking-wider">
                        BUFFERING EPIDEMIOLOGICAL PHOTOGRAMMETRY
                    </span>
                </div>
            )}

            {/* 2. Tactical Error State (Redacted / 404) */}
            {status === "error" && (
                <div
                    role="alert"
                    aria-label="Reconnaissance asset redacted"
                    className="absolute inset-0 bg-black/95 border border-red-900/60 text-neutral-500 font-mono text-xs flex flex-col items-center justify-center p-6 text-center z-10 select-none"
                >
                    {/* Red Scanline Tint */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,0,0,0.03)_50%,rgba(0,0,0,0.65)_50%)] bg-[length:100%_4px]" />

                    {/* Tactical Error Brackets */}
                    <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-red-500/60 pointer-events-none" />
                    <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-red-500/60 pointer-events-none" />
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-red-500/60 pointer-events-none" />
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-red-500/60 pointer-events-none" />

                    <AlertTriangle className="w-8 h-8 text-red-500/80 mb-2.5 animate-pulse" />

                    <span className="text-[11px] font-mono tracking-widest text-red-400 font-bold uppercase">
                        [ RECONNAISSANCE ASSET REDACTED // 404 ]
                    </span>
                    <span className="text-[9px] font-mono text-neutral-600 mt-1.5 uppercase tracking-wider">
                        SECURE CIPHER CORRUPTED OR RECORD DECLASSIFIED
                    </span>
                </div>
            )}

            {/* 3. Native Image with Smooth Fade-In Transition on Load */}
            <Image
                src={resolvedSrc}
                alt={alt}
                fill={fill}
                width={!fill ? width : undefined}
                height={!fill ? height : undefined}
                sizes={sizes}
                quality={quality}
                priority={priority}
                onLoad={() => setStatus("loaded")}
                onError={() => setStatus("error")}
                className={`object-cover transition-opacity duration-500 ease-in-out ${
                    status === "loaded" ? "opacity-100" : "opacity-0"
                } ${className}`}
            />
        </div>
    );
};

export const ClassifiedImage: React.FC<ClassifiedImageProps> = (props) => {
    const resolvedSrc = resolveImagePath(props.src);
    // Keying by resolvedSrc cleanly resets internal loading/error status on source change without effects
    return (
        <ClassifiedImageContent
            key={resolvedSrc}
            resolvedSrc={resolvedSrc}
            {...props}
        />
    );
};

export default ClassifiedImage;
