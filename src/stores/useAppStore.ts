import { create } from "zustand";
import { LanguageCode } from "@/types/journey";

interface AppState {
    isLoading: boolean;
    hasCompletedCinematicIntro: boolean;
    isAudioMuted: boolean;
    currentLanguage: LanguageCode;
    setIsLoading: (loading: boolean) => void;
    setCinematicIntroCompleted: (completed: boolean) => void;
    toggleAudio: () => void;
    setLanguage: (lang: LanguageCode) => void;
}

export const useAppStore = create<AppState>((set) => ({
    isLoading: false,
    hasCompletedCinematicIntro: false,
    isAudioMuted: true,
    currentLanguage: "id",
    setIsLoading: (isLoading) => set({ isLoading }),
    setCinematicIntroCompleted: (hasCompletedCinematicIntro) =>
        set({ hasCompletedCinematicIntro }),
    toggleAudio: () => set((state) => ({ isAudioMuted: !state.isAudioMuted })),
    setLanguage: (currentLanguage) => set({ currentLanguage }),
}));
