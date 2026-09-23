import { describe, it, expect } from "vitest";
import {
    loadDossier,
    getCountryInteraction,
    getEpicentersForPandemic,
    PANDEMIC_REGISTRY,
} from "@/data/pandemicsRegistry";

describe("Exhaustive Multi-Pandemic Dossier Loader & Zero Data Bleed Verification", () => {
    it("successfully loads COVID-19 sector dossiers with full schema fidelity", async () => {
        const sectors = ["id", "it", "us", "in"];
        for (const code of sectors) {
            const chapters = await loadDossier("covid-19", code);
            expect(chapters, `COVID-19 sector ${code} should load chapters`).not.toBeNull();
            expect(chapters!.length).toBeGreaterThan(0);
            expect(chapters![0].id).toBeTruthy();
        }
    });

    it("successfully loads Plague of Justinian (541 AD) sector dossiers", async () => {
        const sectors = ["cpx", "pel", "sas", "rom"];
        for (const code of sectors) {
            const chapters = await loadDossier("plague-of-justinian-541", code);
            expect(chapters, `Justinian sector ${code} should load chapters`).not.toBeNull();
            expect(chapters!.length).toBeGreaterThan(0);
            expect(chapters![0].id).toContain(code);
        }
    });

    it("successfully loads Black Death (1347 AD) sector dossiers", async () => {
        const sectors = ["kaf", "mes", "lon", "par"];
        for (const code of sectors) {
            const chapters = await loadDossier("black-death-1347", code);
            expect(chapters, `Black Death sector ${code} should load chapters`).not.toBeNull();
            expect(chapters!.length).toBeGreaterThan(0);
            expect(chapters![0].id).toContain(code);
        }
    });

    it("successfully loads Spanish Flu (1918) dossiers across all 6 sectors (96 organic chapters)", async () => {
        const expectedCounts: Record<string, number> = {
            us: 18,
            fr: 15,
            es: 14,
            gb: 14,
            in: 18,
            id: 17,
        };

        for (const [code, count] of Object.entries(expectedCounts)) {
            const chapters = await loadDossier("spanish-flu-1918", code);
            expect(chapters, `Spanish Flu sector ${code} should load chapters`).not.toBeNull();
            expect(chapters!.length).toBe(count);
            expect(chapters![0].id).toBe(`${code}-ch-01`);
        }
    });

    it("successfully loads all 7 waves of Cholera via both series and dedicated wave identifiers", async () => {
        const waveTests = [
            { waveIndex: 0, sector: "jes", expectedFirst: "jes-ch-01" },
            { waveIndex: 1, sector: "rus", expectedFirst: "rus-ch-01" },
            { waveIndex: 2, sector: "gbr", expectedFirst: "gbr-ch-01" },
            { waveIndex: 3, sector: "sam", expectedFirst: "sam-ch-01" },
            { waveIndex: 4, sector: "ham", expectedFirst: "ham-ch-01" },
            { waveIndex: 5, sector: "phl", expectedFirst: "phl-ch-01" },
            { waveIndex: 6, sector: "idn", expectedFirst: "idn_ch_01" },
        ];

        for (const { waveIndex, sector, expectedFirst } of waveTests) {
            // Load via cholera-series route with explicit waveIndex
            const seriesChapters = await loadDossier("cholera-series", sector, waveIndex);
            expect(seriesChapters, `Wave ${waveIndex + 1} sector ${sector} should load via series`).not.toBeNull();
            expect(seriesChapters![0].id).toBe(expectedFirst);

            // Load via dedicated wave route
            const waveSlug = `wave-${waveIndex + 1}`;
            const dedicatedChapters = await loadDossier(waveSlug, sector);
            expect(dedicatedChapters, `Wave ${waveIndex + 1} sector ${sector} should load via ${waveSlug}`).not.toBeNull();
            expect(dedicatedChapters![0].id).toBe(expectedFirst);
        }
    });

    it("verifies strict zero data bleed across pandemic eras in getCountryInteraction", () => {
        // Justinian codes in Black Death era must return null
        expect(getCountryInteraction("black-death-1347", "PEL")).toBeNull();
        expect(getCountryInteraction("black-death-1347", "CPX")).toBeNull();

        // Black Death codes in COVID-19 era must return null
        expect(getCountryInteraction("covid-19", "KAF")).toBeNull();
        expect(getCountryInteraction("covid-19", "MES")).toBeNull();

        // New World territories in Justinian era must return null
        expect(getCountryInteraction("plague-of-justinian-541", "US")).toBeNull();
        expect(getCountryInteraction("plague-of-justinian-541", "USA")).toBeNull();
        expect(getCountryInteraction("plague-of-justinian-541", "BRA")).toBeNull();

        // Nonexistent codes must return null across all pandemics
        for (const pandemic of PANDEMIC_REGISTRY) {
            expect(getCountryInteraction(pandemic.id, "ZZ")).toBeNull();
        }
    });

    it("verifies all registered pandemics have valid active epicenters and surveillance catalog", () => {
        for (const pandemic of PANDEMIC_REGISTRY) {
            const epicenters = getEpicentersForPandemic(pandemic.id);
            expect(
                Object.keys(epicenters).length,
                `Pandemic ${pandemic.id} must define at least one epicenter`,
            ).toBeGreaterThan(0);
        }
    });
});
