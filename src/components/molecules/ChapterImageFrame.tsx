"use client";

import React from "react";
import { ClassifiedImage } from "@/components/atoms/ClassifiedImage";

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
    quality = 85,
    className = "",
}) => {
    return (
        <div
            className={`relative w-full h-full bg-[#030712] border border-white/10 overflow-hidden ${className}`}
        >
            <ClassifiedImage
                src={src}
                alt={alt}
                fill
                sizes={sizes}
                quality={quality}
                priority={priority}
            />
        </div>
    );
};

export default ChapterImageFrame;
