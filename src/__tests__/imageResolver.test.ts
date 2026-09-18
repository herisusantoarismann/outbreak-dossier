import { describe, it, expect } from "vitest";
import { resolveImagePath } from "@/lib/imageResolver";

describe("Image Path Resolver (Multi-Pandemic Asset Routing)", () => {
    it("preserves namespaced assets for Plague of Justinian (541 AD)", () => {
        const cpxPath =
            "/assets/images/plague-of-justinian-541/cpx/cpx_ch_03.jpg";
        expect(resolveImagePath(cpxPath)).toBe(cpxPath);

        const pelPath =
            "/assets/images/plague-of-justinian-541/pel/pel_ch_01.jpg";
        expect(resolveImagePath(pelPath)).toBe(pelPath);
    });

    it("preserves namespaced assets for other pandemics", () => {
        const covidPath = "/assets/images/covid-19/id/01-loading-virus.jpg";
        expect(resolveImagePath(covidPath)).toBe(covidPath);

        const blackDeathPath =
            "/assets/images/black-death-1347/it/it_ch_01.jpg";
        expect(resolveImagePath(blackDeathPath)).toBe(blackDeathPath);

        const choleraPath = "/assets/images/cholera-1817/in/in_ch_01.jpg";
        expect(resolveImagePath(choleraPath)).toBe(choleraPath);

        const spanishFluPath =
            "/assets/images/spanish-flu-1918/us/us_ch_01.jpg";
        expect(resolveImagePath(spanishFluPath)).toBe(spanishFluPath);
    });

    it("migrates legacy flat file paths to namespaced subdirectories", () => {
        expect(resolveImagePath("/assets/images/id-01.jpg")).toBe(
            "/assets/images/covid-19/id/01.jpg",
        );
        expect(resolveImagePath("/assets/images/cn-02.jpg")).toBe(
            "/assets/images/covid-19/cn/02.jpg",
        );
        expect(resolveImagePath("/assets/images/sample.jpg")).toBe(
            "/assets/images/covid-19/id/sample.jpg",
        );
    });

    it("preserves external and data URLs", () => {
        const external = "https://images.unsplash.com/photo-12345";
        expect(resolveImagePath(external)).toBe(external);

        const dataUrl = "data:image/png;base64,iVBORw0KGgo=";
        expect(resolveImagePath(dataUrl)).toBe(dataUrl);
    });

    it("provides fallback for null or undefined input", () => {
        expect(resolveImagePath(null)).toBe(
            "/assets/images/covid-19/id/01-loading-virus.jpg",
        );
        expect(resolveImagePath(undefined)).toBe(
            "/assets/images/covid-19/id/01-loading-virus.jpg",
        );
    });
});
