import { describe, it, expect } from "vitest";
import { t } from "@/utils/i18n";
import covidExtremes from "@/data/pandemics/covid-19/global-extremes.json";
import justinianExtremes from "@/data/pandemics/plague-of-justinian-541/extremes.json";
import blackDeathExtremes from "@/data/pandemics/black-death-1347/extremes.json";
import choleraExtremes from "@/data/pandemics/cholera-1817/extremes.json";
import spanishFluExtremes from "@/data/pandemics/spanish-flu-1918/extremes.json";
import { GlobalExtremeRecord } from "@/types/journey";

describe("Global Extremes Statistical Telemetry Bilingual Verification", () => {
    const datasetMap: Record<string, GlobalExtremeRecord[]> = {
        "covid-19": covidExtremes as unknown as GlobalExtremeRecord[],
        "plague-of-justinian-541":
            justinianExtremes as unknown as GlobalExtremeRecord[],
        "black-death-1347":
            blackDeathExtremes as unknown as GlobalExtremeRecord[],
        "cholera-1817": choleraExtremes as unknown as GlobalExtremeRecord[],
        "spanish-flu-1918":
            spanishFluExtremes as unknown as GlobalExtremeRecord[],
    };

    Object.entries(datasetMap).forEach(([era, records]) => {
        describe(`Era: ${era}`, () => {
            it("contains non-empty records", () => {
                expect(records.length).toBeGreaterThan(0);
            });

            it("has bilingual values with both id and en locales", () => {
                records.forEach((record) => {
                    const val = record.value;
                    expect(val).toBeDefined();

                    const idVal = t(val, "id");
                    const enVal = t(val, "en");

                    expect(idVal).toBeTruthy();
                    expect(enVal).toBeTruthy();
                });
            });

            it("has bilingual labels and countryNames", () => {
                records.forEach((record) => {
                    expect(t(record.label, "id")).toBeTruthy();
                    expect(t(record.label, "en")).toBeTruthy();
                    expect(t(record.countryName, "id")).toBeTruthy();
                    expect(t(record.countryName, "en")).toBeTruthy();
                });
            });
        });
    });

    it("verifies specific translations for Justinian and COVID-19", () => {
        const justinianRecords = datasetMap["plague-of-justinian-541"];
        const cpx = justinianRecords.find((r) => r.id === "cpx-mortality-peak");
        expect(cpx).toBeDefined();
        expect(t(cpx!.value, "id")).toBe("5.000 – 10.000 Jiwa / Hari");
        expect(t(cpx!.value, "en")).toBe("5,000 – 10,000 Souls / Day");

        const covidRecords = datasetMap["covid-19"];
        const us = covidRecords.find((r) => r.id === "extreme-us-fatalities");
        expect(us).toBeDefined();
        expect(t(us!.value, "id")).toBe("1.180.000+ Fatalitas");
        expect(t(us!.value, "en")).toBe("1,180,000+ Fatalities");

        const idRecord = covidRecords.find(
            (r) => r.id === "extreme-id-delta-peak",
        );
        expect(idRecord).toBeDefined();
        expect(t(idRecord!.value, "id")).toBe("2.069 Korban Jiwa / 24 Jam");
        expect(t(idRecord!.value, "en")).toBe("2,069 Fatalities / 24 Hours");
    });
});
