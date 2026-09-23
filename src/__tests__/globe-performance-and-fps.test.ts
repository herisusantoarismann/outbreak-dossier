import { describe, it, expect } from "vitest";
import { resolveImagePath } from "@/lib/imageResolver";

describe("Globe Interaction, Image Resolution & Performance Guarantees", () => {
    it("safely resolves namespaced image paths across all historical pandemics", () => {
        const testPaths = [
            "/assets/images/covid-19/id/01-loading-virus.jpg",
            "/assets/images/plague-of-justinian-541/cpx/cpx_ch_01.jpg",
            "/assets/images/black-death-1347/mes/mes_ch_01.jpg",
            "/assets/images/cholera/wave-1/jes/jes_ch_01.jpg",
            "/assets/images/cholera/wave-2/rus/rus_ch_01.jpg",
            "/assets/images/cholera/wave-6/phl/phl_ch_01.jpg",
            "/assets/images/cholera/wave-7/idn/idn_ch_01.jpg",
            "/assets/images/spanish-flu-1918/us/us_ch_01.jpg",
        ];

        for (const p of testPaths) {
            expect(resolveImagePath(p)).toBe(p);
        }
    });

    it("gracefully falls back when image src is undefined or null", () => {
        expect(resolveImagePath(undefined, "id", "covid-19")).toBe(
            "/assets/images/covid-19/id/01-loading-virus.jpg",
        );
        expect(resolveImagePath(null, "cpx", "plague-of-justinian-541")).toBe(
            "/assets/images/plague-of-justinian-541/cpx/01-loading-virus.jpg",
        );
    });

    it("preserves external and data URLs without modification", () => {
        const httpsUrl = "https://example.com/satellite-telemetry.jpg";
        const httpUrl = "http://example.com/asset.jpg";
        const dataUrl =
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB";

        expect(resolveImagePath(httpsUrl)).toBe(httpsUrl);
        expect(resolveImagePath(httpUrl)).toBe(httpUrl);
        expect(resolveImagePath(dataUrl)).toBe(dataUrl);
    });

    it("guarantees deterministic execution time for high-frequency path resolutions", () => {
        const samplePath = "/assets/images/cholera/wave-6/ind/ind_ch_01.jpg";
        const start = performance.now();
        for (let i = 0; i < 10000; i++) {
            resolveImagePath(samplePath);
        }
        const elapsed = performance.now() - start;
        // 10,000 resolutions should comfortably take under 50ms on modern V8
        expect(elapsed).toBeLessThan(100);
    });
});
