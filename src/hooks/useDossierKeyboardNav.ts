"use client";

import { useEffect } from "react";

export interface UseDossierKeyboardNavOptions {
    totalChapters: number;
    currentIndex: number;
    onNavigateChapter?: (index: number) => void;
    onEscape?: () => void;
    enabled?: boolean;
}

/**
 * Universal Dossier Keyboard Navigation & Accessibility Hook
 * Supports arrow navigation for scrollytelling and escape dismissal for overlays/return to globe.
 */
export function useDossierKeyboardNav({
    totalChapters,
    currentIndex,
    onNavigateChapter,
    onEscape,
    enabled = true,
}: UseDossierKeyboardNavOptions): void {
    useEffect(() => {
        if (!enabled) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            // Safety constraint: ignore keyboard events when user is typing in form controls
            const target = e.target as HTMLElement | null;
            if (
                target &&
                (target.tagName === "INPUT" ||
                    target.tagName === "TEXTAREA" ||
                    target.tagName === "SELECT" ||
                    target.isContentEditable ||
                    target.getAttribute("role") === "searchbox" ||
                    target.getAttribute("role") === "slider")
            ) {
                return;
            }

            switch (e.key) {
                // Next chapter navigation
                case "ArrowRight":
                case "ArrowDown":
                case "PageDown": {
                    if (onNavigateChapter && currentIndex < totalChapters - 1) {
                        e.preventDefault();
                        onNavigateChapter(currentIndex + 1);
                    }
                    break;
                }

                // Previous chapter navigation
                case "ArrowLeft":
                case "ArrowUp":
                case "PageUp": {
                    if (onNavigateChapter && currentIndex > 0) {
                        e.preventDefault();
                        onNavigateChapter(currentIndex - 1);
                    }
                    break;
                }

                // Quick Jump: First chapter
                case "Home": {
                    if (onNavigateChapter) {
                        e.preventDefault();
                        onNavigateChapter(0);
                    }
                    break;
                }

                // Quick Jump: Last chapter
                case "End": {
                    if (onNavigateChapter && totalChapters > 0) {
                        e.preventDefault();
                        onNavigateChapter(totalChapters - 1);
                    }
                    break;
                }

                // Modal / HUD Dismissal or Return to Globe
                case "Escape": {
                    if (onEscape) {
                        e.preventDefault();
                        onEscape();
                    }
                    break;
                }

                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [totalChapters, currentIndex, onNavigateChapter, onEscape, enabled]);
}

export default useDossierKeyboardNav;
