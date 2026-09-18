import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TimelineScrubber } from "@/components/molecules/TimelineScrubber";
import cpxData from "@/data/pandemics/plague-of-justinian-541/cpx.json";
import pelData from "@/data/pandemics/plague-of-justinian-541/pel.json";
import covidIdData from "@/data/pandemics/covid-19/id.json";
import { Chapter } from "@/types/journey";

describe("TimelineScrubber - Dynamic Historical Era Year Grouping", () => {
    it("renders dynamic 6th-century Justinian years (542, 543, 544) for Sector CPX", () => {
        render(
            <TimelineScrubber
                chapters={cpxData.chapters as Chapter[]}
                activeIndex={0}
            />,
        );

        // Year anchor buttons for CPX should be 542, 543, 544
        expect(screen.getByText("542")).toBeDefined();
        expect(screen.getByText("543")).toBeDefined();
        expect(screen.getByText("544")).toBeDefined();

        // Must NOT render hardcoded 2020
        expect(screen.queryByText("2020")).toBeNull();
    });

    it("renders dynamic Justinian years (541, 542) for Sector PEL (Pelusium)", () => {
        render(
            <TimelineScrubber
                chapters={pelData.chapters as Chapter[]}
                activeIndex={0}
            />,
        );

        expect(screen.getByText("541")).toBeDefined();
        expect(screen.getByText("542")).toBeDefined();
        expect(screen.queryByText("2020")).toBeNull();
    });

    it("renders dynamic Justinian years (543, 544, 545, 546, 547, 548, 549) for Sector ROM", async () => {
        const romData =
            await import("@/data/pandemics/plague-of-justinian-541/rom.json");
        render(
            <TimelineScrubber
                chapters={romData.chapters as Chapter[]}
                activeIndex={0}
            />,
        );

        expect(screen.getByText("543")).toBeDefined();
        expect(screen.getByText("544")).toBeDefined();
        expect(screen.getByText("545")).toBeDefined();
        expect(screen.getByText("546")).toBeDefined();
        expect(screen.getByText("547")).toBeDefined();
        expect(screen.getByText("548")).toBeDefined();
        expect(screen.getByText("549")).toBeDefined();
        expect(screen.queryByText("2020")).toBeNull();
    });

    it("renders dynamic Justinian years (542, 543, 544, 545, 546) for Sector SAS", async () => {
        const sasData =
            await import("@/data/pandemics/plague-of-justinian-541/sas.json");
        render(
            <TimelineScrubber
                chapters={sasData.chapters as Chapter[]}
                activeIndex={0}
            />,
        );

        expect(screen.getByText("542")).toBeDefined();
        expect(screen.getByText("543")).toBeDefined();
        expect(screen.getByText("544")).toBeDefined();
        expect(screen.getByText("545")).toBeDefined();
        expect(screen.getByText("546")).toBeDefined();
        expect(screen.queryByText("2020")).toBeNull();
    });

    it("renders modern 2020-2023 years for COVID-19 Indonesia dossier", () => {
        render(
            <TimelineScrubber
                chapters={covidIdData as Chapter[]}
                activeIndex={0}
            />,
        );

        expect(screen.getByText("2020")).toBeDefined();
        expect(screen.getByText("2021")).toBeDefined();
        expect(screen.getByText("2022")).toBeDefined();
        expect(screen.getByText("2023")).toBeDefined();
    });
});
