import type { Meta, StoryObj } from "@storybook/react";
import { TimelineScrubber } from "./TimelineScrubber";
import { Chapter } from "@/types/journey";

const mockChapters: Chapter[] = [
    {
        id: "01-wuhan-spillover",
        chapterNumber: "01",
        type: "milestone",
        title: "Titik Nol: Alarm dari Pasar Huanan",
        date: "Desember 2019 - Januari 2020",
        strain: "SARS-CoV-2 Wild Type",
        flash: "ALARM",
        virusProfile: {
            code: "WILD-TYPE",
            mutationType: "Zoonotik",
            r0: "2.5",
            threatLevel: "GLOBAL",
            clinicalTarget: "Lungs",
        },
        description: "Mock description",
        image: "/assets/images/01-loading-virus.jpg",
    },
    {
        id: "02-evakuasi-natuna",
        chapterNumber: "02",
        type: "standard",
        title: "Karantina Pulau Karang: Evakuasi Natuna",
        date: "Februari 2020",
        strain: "Lineage A/B",
        flash: "EVAKUASI",
        virusProfile: {
            code: "LINEAGE A",
            mutationType: "Border",
            r0: "2.5",
            threatLevel: "BORDER",
            clinicalTarget: "Lungs",
        },
        description: "Mock description",
        image: "/assets/images/16-natuna-quarantine.jpg",
    },
    {
        id: "05-side-herbal-shield",
        chapterNumber: "INTERLUDE I",
        type: "side_story",
        title: "Benteng Herbal, Kalung Kayu Putih",
        date: "Maret - April 2020",
        strain: "Resistensi Kultural",
        flash: "HERBAL",
        virusProfile: {
            code: "FOLKLORE",
            mutationType: "Cultural",
            r0: "Viral",
            threatLevel: "INFO",
            clinicalTarget: "Psychological",
        },
        description: "Mock description",
        image: "/assets/images/11-herbal-disinfectant.jpg",
    },
    {
        id: "12-vaccine-breakthrough",
        chapterNumber: "09",
        type: "milestone",
        title: "Secercah Harapan: Jarum Suntik Perdana",
        date: "13 Januari 2021",
        strain: "CoronaVac",
        flash: "VACCINE",
        virusProfile: {
            code: "IMMUNOLOGICAL",
            mutationType: "Inactivated",
            r0: "Reduced",
            threatLevel: "COUNTER",
            clinicalTarget: "Antibodies",
        },
        description: "Mock description",
        image: "/assets/images/05-vaccine-cure.jpg",
    },
    {
        id: "21-omicron-lightning-wave",
        chapterNumber: "14",
        type: "milestone",
        title: "Serangan Kilat: 30 Mutasi & Gelombang Omicron",
        date: "Februari - Maret 2022",
        strain: "Omicron",
        flash: "OMICRON",
        virusProfile: {
            code: "VOC OMICRON",
            mutationType: "30+ Mutations",
            r0: "10.0",
            threatLevel: "HYPER",
            clinicalTarget: "Bronchus",
        },
        description: "Mock description",
        image: "/assets/images/13-omicron-fever.jpg",
    },
    {
        id: "25-endemic-declaration",
        chapterNumber: "17",
        type: "milestone",
        title: "Garis Akhir: Deklarasi Resmi Endemi",
        date: "21 Juni 2023",
        strain: "Endemic",
        flash: "ENDEMIC",
        virusProfile: {
            code: "ENDEMIC",
            mutationType: "Seasonal",
            r0: "Stable",
            threatLevel: "LOW",
            clinicalTarget: "Upper airway",
        },
        description: "Mock description",
        image: "/assets/images/14-endemic-sunrise.jpg",
    },
];

const meta = {
    title: "Molecules/TimelineScrubber",
    component: TimelineScrubber,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof TimelineScrubber>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        chapters: mockChapters,
        activeIndex: 0,
    },
};

export const ActiveMilestone: Story = {
    args: {
        chapters: mockChapters,
        activeIndex: 3, // 2021 milestone
    },
};
