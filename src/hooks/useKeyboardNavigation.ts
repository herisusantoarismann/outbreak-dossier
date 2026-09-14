import { useEffect } from "react";

export interface UseKeyboardNavigationOptions {
    totalChapters: number;
    currentIndex: number;
    onNavigate: (index: number) => void;
    enabled?: boolean;
}

export function useKeyboardNavigation({
    totalChapters,
    currentIndex,
    onNavigate,
    enabled = true,
}: UseKeyboardNavigationOptions) {
    useEffect(() => {
        if (!enabled || totalChapters <= 0) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            // Do not intercept if focus is inside an input, textarea, or interactive slider
            const target = e.target as HTMLElement | null;
            if (
                target &&
                (target.tagName === "INPUT" ||
                    target.tagName === "TEXTAREA" ||
                    target.isContentEditable ||
                    target.getAttribute("role") === "slider")
            ) {
                return;
            }

            switch (e.key) {
                case "ArrowDown":
                case "PageDown": {
                    if (currentIndex < totalChapters - 1) {
                        e.preventDefault();
                        onNavigate(currentIndex + 1);
                    }
                    break;
                }
                case "ArrowUp":
                case "PageUp": {
                    if (currentIndex > 0) {
                        e.preventDefault();
                        onNavigate(currentIndex - 1);
                    }
                    break;
                }
                case "Home": {
                    e.preventDefault();
                    onNavigate(0);
                    break;
                }
                case "End": {
                    e.preventDefault();
                    onNavigate(totalChapters - 1);
                    break;
                }
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [totalChapters, currentIndex, onNavigate, enabled]);
}

export default useKeyboardNavigation;
