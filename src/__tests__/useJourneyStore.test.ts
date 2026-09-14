import { describe, it, expect, beforeEach } from "vitest";
import { useJourneyStore } from "@/stores/useJourneyStore";
import { useAppStore } from "@/stores/useAppStore";

describe("useJourneyStore - Global Scrollytelling State", () => {
    beforeEach(() => {
        useJourneyStore.getState().resetJourneyState();
    });

    it("initializes with expected default values", () => {
        const state = useJourneyStore.getState();
        expect(state.activeSceneIndex).toBe(0);
        expect(state.activeSceneId).toBeNull();
        expect(state.scrollProgress).toBe(0);
        expect(state.isMediaChanging).toBe(false);
    });

    it("updates active scene index and ID correctly", () => {
        const { setActiveScene } = useJourneyStore.getState();

        setActiveScene(2, "psbb");

        const state = useJourneyStore.getState();
        expect(state.activeSceneIndex).toBe(2);
        expect(state.activeSceneId).toBe("psbb");
    });

    it("updates scroll progress within 0 to 1 range", () => {
        const { setScrollProgress } = useJourneyStore.getState();

        setScrollProgress(0.65);
        expect(useJourneyStore.getState().scrollProgress).toBe(0.65);

        setScrollProgress(1);
        expect(useJourneyStore.getState().scrollProgress).toBe(1);
    });

    it("toggles media transition state", () => {
        const { setMediaChanging } = useJourneyStore.getState();

        setMediaChanging(true);
        expect(useJourneyStore.getState().isMediaChanging).toBe(true);

        setMediaChanging(false);
        expect(useJourneyStore.getState().isMediaChanging).toBe(false);
    });

    it("resets journey state back to initial values", () => {
        const {
            setActiveScene,
            setScrollProgress,
            setMediaChanging,
            resetJourneyState,
        } = useJourneyStore.getState();

        setActiveScene(4, "medical-panic");
        setScrollProgress(0.8);
        setMediaChanging(true);

        resetJourneyState();

        const state = useJourneyStore.getState();
        expect(state.activeSceneIndex).toBe(0);
        expect(state.activeSceneId).toBeNull();
        expect(state.scrollProgress).toBe(0);
        expect(state.isMediaChanging).toBe(false);
    });
});

describe("useAppStore - Hub & Application State", () => {
    beforeEach(() => {
        useAppStore.setState({
            isLoading: false,
            hasCompletedCinematicIntro: false,
            isAudioMuted: true,
            currentLanguage: "id",
        });
    });

    it("initializes with default application states", () => {
        const state = useAppStore.getState();
        expect(state.isLoading).toBe(false);
        expect(state.hasCompletedCinematicIntro).toBe(false);
        expect(state.isAudioMuted).toBe(true);
        expect(state.currentLanguage).toBe("id");
    });

    it("toggles loading screen state for cinematic transition", () => {
        const { setIsLoading } = useAppStore.getState();

        setIsLoading(true);
        expect(useAppStore.getState().isLoading).toBe(true);

        setIsLoading(false);
        expect(useAppStore.getState().isLoading).toBe(false);
    });

    it("toggles audio mute status", () => {
        const { toggleAudio } = useAppStore.getState();

        toggleAudio();
        expect(useAppStore.getState().isAudioMuted).toBe(false);

        toggleAudio();
        expect(useAppStore.getState().isAudioMuted).toBe(true);
    });

    it("updates language code", () => {
        const { setLanguage } = useAppStore.getState();

        setLanguage("en");
        expect(useAppStore.getState().currentLanguage).toBe("en");

        setLanguage("id");
        expect(useAppStore.getState().currentLanguage).toBe("id");
    });

    it("marks cinematic intro as completed", () => {
        const { setCinematicIntroCompleted } = useAppStore.getState();

        setCinematicIntroCompleted(true);
        expect(useAppStore.getState().hasCompletedCinematicIntro).toBe(true);
    });
});
