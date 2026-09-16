"use client";

import { useEffect, useRef } from "react";
import { Chapter } from "@/types/journey";
import { resolveImagePath } from "@/lib/imageResolver";

// Global cache Set persisting across re-renders to avoid redundant fetches
const globalPreloadCache = new Set<string>();

/**
 * Sequential Chapter Asset Preloader
 * Prefetches high-resolution assets for upcoming chapters (N+1, N+2)
 * to ensure zero latency during user scrollytelling.
 */
export function useChapterPreloader(
    chapters: Chapter[],
    activeIndex: number,
    lookaheadCount: number = 2,
): void {
    const preloadedUrls = useRef<Set<string>>(globalPreloadCache);

    useEffect(() => {
        if (typeof window === "undefined" || !chapters.length) return;

        for (let offset = 1; offset <= lookaheadCount; offset++) {
            const targetIndex = activeIndex + offset;
            if (targetIndex >= chapters.length) break;

            const chapter = chapters[targetIndex];
            if (!chapter) continue;

            const urls = [
                chapter.image,
                chapter.beforeImage,
                chapter.afterImage,
            ].filter(Boolean) as string[];

            urls.forEach((rawPath) => {
                const resolved = resolveImagePath(rawPath);
                if (resolved && !preloadedUrls.current.has(resolved)) {
                    preloadedUrls.current.add(resolved);

                    // Silently instantiate off-screen Image to cache in browser memory
                    const img = new window.Image();
                    img.src = resolved;
                }
            });
        }
    }, [chapters, activeIndex, lookaheadCount]);
}

export default useChapterPreloader;
