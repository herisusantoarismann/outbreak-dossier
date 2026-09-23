import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { Chapter } from "@/types/journey";

describe("Exhaustive Bilingual Purity & Integrity Across All Pandemics", () => {
    const pandemicsDir = path.resolve(process.cwd(), "src/data/pandemics");

    interface SectorFile {
        path: string;
        relative: string;
        chapters: Chapter[];
    }

    const sectorFiles: SectorFile[] = [];

    function collectSectorFiles(dir: string) {
        const entries = fs.readdirSync(dir);
        for (const entry of entries) {
            const fullPath = path.join(dir, entry);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                collectSectorFiles(fullPath);
            } else if (
                entry.endsWith(".json") &&
                !entry.includes("extremes.json") &&
                !entry.includes("surveillance.json")
            ) {
                try {
                    const data = JSON.parse(fs.readFileSync(fullPath, "utf8"));
                    if (data.chapters && Array.isArray(data.chapters)) {
                        sectorFiles.push({
                            path: fullPath,
                            relative: path.relative(pandemicsDir, fullPath),
                            chapters: data.chapters,
                        });
                    }
                } catch {
                    // Ignore non-chapter JSONs
                }
            }
        }
    }

    collectSectorFiles(pandemicsDir);

    it("verifies that all sector files (55 datasets, 762 chapters) are collected and scanned", () => {
        expect(sectorFiles.length).toBeGreaterThanOrEqual(50);
        const totalChapters = sectorFiles.reduce(
            (acc, file) => acc + file.chapters.length,
            0,
        );
        expect(totalChapters).toBeGreaterThanOrEqual(700);
    });

    it("enforces strict bilingual title, description, date, and flash parity across every chapter", () => {
        for (const sector of sectorFiles) {
            sector.chapters.forEach((chapter, index) => {
                const context = `[File: ${sector.relative}, Chapter #${index + 1} (${chapter.id})]`;

                // Title check
                expect(chapter.title, `${context} title must be defined`).toBeDefined();
                expect(chapter.title.id?.trim(), `${context} title.id must not be empty`).toBeTruthy();
                expect(chapter.title.en?.trim(), `${context} title.en must not be empty`).toBeTruthy();
                expect(
                    chapter.title.id.trim(),
                    `${context} title.id must not be identical to title.en`,
                ).not.toBe(chapter.title.en.trim());

                // Description check
                expect(chapter.description, `${context} description must be defined`).toBeDefined();
                expect(chapter.description.id?.trim(), `${context} description.id must not be empty`).toBeTruthy();
                expect(chapter.description.en?.trim(), `${context} description.en must not be empty`).toBeTruthy();
                expect(
                    chapter.description.id.trim(),
                    `${context} description.id must not be identical to description.en`,
                ).not.toBe(chapter.description.en.trim());

                // Date check
                expect(chapter.date, `${context} date must be defined`).toBeDefined();
                expect(chapter.date.id?.trim(), `${context} date.id must not be empty`).toBeTruthy();
                expect(chapter.date.en?.trim(), `${context} date.en must not be empty`).toBeTruthy();

                // Flash check
                expect(chapter.flash, `${context} flash must be defined`).toBeDefined();
                expect(chapter.flash.id?.trim(), `${context} flash.id must not be empty`).toBeTruthy();
                expect(chapter.flash.en?.trim(), `${context} flash.en must not be empty`).toBeTruthy();
            });
        }
    });

    it("enforces complete virusProfile bilingual fields for deep epidemiological fidelity", () => {
        for (const sector of sectorFiles) {
            sector.chapters.forEach((chapter, index) => {
                const context = `[File: ${sector.relative}, Chapter #${index + 1} (${chapter.id})]`;
                expect(chapter.virusProfile, `${context} virusProfile must be defined`).toBeDefined();
                expect(chapter.virusProfile.agent, `${context} virusProfile.agent must be defined`).toBeTruthy();
                expect(chapter.virusProfile.vector, `${context} virusProfile.vector must be defined`).toBeTruthy();
                expect(chapter.virusProfile.transmission, `${context} virusProfile.transmission must be defined`).toBeTruthy();

                if (chapter.virusProfile.mutationType) {
                    expect(chapter.virusProfile.mutationType.id?.trim(), `${context} mutationType.id`).toBeTruthy();
                    expect(chapter.virusProfile.mutationType.en?.trim(), `${context} mutationType.en`).toBeTruthy();
                }

                if (chapter.virusProfile.threatLevel) {
                    expect(chapter.virusProfile.threatLevel.id?.trim(), `${context} threatLevel.id`).toBeTruthy();
                    expect(chapter.virusProfile.threatLevel.en?.trim(), `${context} threatLevel.en`).toBeTruthy();
                }

                if (chapter.virusProfile.clinicalTarget) {
                    expect(chapter.virusProfile.clinicalTarget.id?.trim(), `${context} clinicalTarget.id`).toBeTruthy();
                    expect(chapter.virusProfile.clinicalTarget.en?.trim(), `${context} clinicalTarget.en`).toBeTruthy();
                }
            });
        }
    });

    it("validates UI messages localization parity between src/messages/en.json and id.json", () => {
        const enPath = path.resolve(process.cwd(), "src/messages/en.json");
        const idPath = path.resolve(process.cwd(), "src/messages/id.json");

        const enMessages = JSON.parse(fs.readFileSync(enPath, "utf8"));
        const idMessages = JSON.parse(fs.readFileSync(idPath, "utf8"));

        function getLeafKeys(obj: Record<string, unknown>, prefix = ""): string[] {
            let keys: string[] = [];
            for (const [k, v] of Object.entries(obj)) {
                const full = prefix ? `${prefix}.${k}` : k;
                if (typeof v === "object" && v !== null) {
                    keys = keys.concat(getLeafKeys(v as Record<string, unknown>, full));
                } else {
                    keys.push(full);
                }
            }
            return keys;
        }

        const enKeys = new Set(getLeafKeys(enMessages));
        const idKeys = new Set(getLeafKeys(idMessages));

        const missingInId = [...enKeys].filter((k) => !idKeys.has(k));
        const missingInEn = [...idKeys].filter((k) => !enKeys.has(k));

        expect(missingInId, "Keys present in en.json but missing in id.json").toEqual([]);
        expect(missingInEn, "Keys present in id.json but missing in en.json").toEqual([]);

        // Verify meta description is properly translated to Indonesian
        expect(idMessages.meta.title).toContain("Arsip Patogen Global");
        expect(idMessages.meta.description).toContain("Kronik intelijen visual deklasifikasi");
    });
});
