import { describe, it, expect } from "vitest";
import {
    PATHOGEN_LOADER_CONFIG,
    getPathogenConfig,
} from "@/components/loading/pathogenConfig";

describe("PATHOGEN_LOADER_CONFIG - 5-Epoch Context-Aware Pathogen Hologram Config", () => {
    it("defines configuration for all 5 historical pandemics", () => {
        const expectedPandemics = [
            "plague-of-justinian-541",
            "black-death-1347",
            "cholera-1817",
            "spanish-flu-1918",
            "covid-19",
        ];

        expectedPandemics.forEach((id) => {
            expect(PATHOGEN_LOADER_CONFIG[id]).toBeDefined();
            expect(PATHOGEN_LOADER_CONFIG[id].name).toBeTruthy();
            expect(PATHOGEN_LOADER_CONFIG[id].themeColor).toMatch(
                /^#[0-9a-fA-F]{6}$/,
            );
            expect(PATHOGEN_LOADER_CONFIG[id].label.id).toBeTruthy();
            expect(PATHOGEN_LOADER_CONFIG[id].label.en).toBeTruthy();
            expect(PATHOGEN_LOADER_CONFIG[id].sublabel.id).toBeTruthy();
            expect(PATHOGEN_LOADER_CONFIG[id].sublabel.en).toBeTruthy();
        });
    });

    it("shares 'yersinia_pestis' assetKey between Justinian and Black Death with distinct theme colors", () => {
        const justinian = PATHOGEN_LOADER_CONFIG["plague-of-justinian-541"];
        const blackDeath = PATHOGEN_LOADER_CONFIG["black-death-1347"];

        // Both share the exact same assetKey and morphology
        expect(justinian.assetKey).toBe("yersinia_pestis");
        expect(blackDeath.assetKey).toBe("yersinia_pestis");
        expect(justinian.morphology).toBe("rod_bacillus");
        expect(blackDeath.morphology).toBe("rod_bacillus");

        // Justinian uses Imperial Purple, Black Death uses Crimson
        expect(justinian.themeColor.toLowerCase()).toBe("#a855f7");
        expect(blackDeath.themeColor.toLowerCase()).toBe("#e11d48");
    });

    it("configures Vibrio cholerae with comma_flagellum and industrial emerald theme", () => {
        const cholera = PATHOGEN_LOADER_CONFIG["cholera-1817"];
        expect(cholera.assetKey).toBe("vibrio_cholerae");
        expect(cholera.morphology).toBe("comma_flagellum");
        expect(cholera.themeColor.toLowerCase()).toBe("#10b981");
    });

    it("configures H1N1 with dense_orthomyxo and trench warfare amber theme", () => {
        const spanishFlu = PATHOGEN_LOADER_CONFIG["spanish-flu-1918"];
        expect(spanishFlu.assetKey).toBe("h1n1");
        expect(spanishFlu.morphology).toBe("dense_orthomyxo");
        expect(spanishFlu.themeColor.toLowerCase()).toBe("#f59e0b");
    });

    it("configures SARS-CoV-2 with corona_spike and iconic viral crimson red theme", () => {
        const covid = PATHOGEN_LOADER_CONFIG["covid-19"];
        expect(covid.assetKey).toBe("sars_cov_2");
        expect(covid.morphology).toBe("corona_spike");
        expect(covid.themeColor.toLowerCase()).toBe("#ef4444");
    });

    it("falls back to covid-19 for undefined or unknown pandemic IDs in getPathogenConfig", () => {
        expect(getPathogenConfig("unknown-pandemic")).toEqual(
            PATHOGEN_LOADER_CONFIG["covid-19"],
        );
        expect(getPathogenConfig(undefined)).toEqual(
            PATHOGEN_LOADER_CONFIG["covid-19"],
        );
        expect(getPathogenConfig("PLAGUE-OF-JUSTINIAN-541")).toEqual(
            PATHOGEN_LOADER_CONFIG["plague-of-justinian-541"],
        );
    });
});
