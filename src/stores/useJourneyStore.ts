import { create } from "zustand";

interface JourneyState {
    activeSceneIndex: number;
    activeSceneId: string | null;
    scrollProgress: number;
    isMediaChanging: boolean;
    setActiveScene: (index: number, id: string) => void;
    setScrollProgress: (progress: number) => void;
    setMediaChanging: (changing: boolean) => void;
    resetJourneyState: () => void;
}

export const useJourneyStore = create<JourneyState>((set) => ({
    activeSceneIndex: 0,
    activeSceneId: null,
    scrollProgress: 0,
    isMediaChanging: false,
    setActiveScene: (index, id) =>
        set({ activeSceneIndex: index, activeSceneId: id }),
    setScrollProgress: (progress) => set({ scrollProgress: progress }),
    setMediaChanging: (isMediaChanging) => set({ isMediaChanging }),
    resetJourneyState: () =>
        set({
            activeSceneIndex: 0,
            activeSceneId: null,
            scrollProgress: 0,
            isMediaChanging: false,
        }),
}));
