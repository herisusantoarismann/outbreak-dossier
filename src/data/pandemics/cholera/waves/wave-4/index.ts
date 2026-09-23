import mekData from "./mek.json";
import egyData from "./egy.json";
import gbrData from "./gbr.json";
import usaData from "./usa.json";
import rusData from "./rus.json";
import zanData from "./zan.json";
import samData from "./sam.json";
import { Chapter } from "@/types/journey";

export interface Wave4SectorDataset {
    sectorId: string;
    waveIndex: number;
    sectorName: { id: string; en: string };
    coordinates: [number, number];
    timeRange: { id: string; en: string } | string;
    estimatedFatalities: { id: string; en: string } | string;
    chapters: Chapter[];
}

export const WAVE_4_SECTORS: Record<string, Wave4SectorDataset> = {
    MEK: mekData as unknown as Wave4SectorDataset,
    MEC: mekData as unknown as Wave4SectorDataset, // Backward-compatible alias
    EGY: egyData as unknown as Wave4SectorDataset,
    CAI: egyData as unknown as Wave4SectorDataset, // Backward-compatible alias
    ALX: egyData as unknown as Wave4SectorDataset, // Backward-compatible alias
    GBR: gbrData as unknown as Wave4SectorDataset,
    LON: gbrData as unknown as Wave4SectorDataset, // Backward-compatible alias
    USA: usaData as unknown as Wave4SectorDataset,
    NYC: usaData as unknown as Wave4SectorDataset, // Backward-compatible alias
    RUS: rusData as unknown as Wave4SectorDataset,
    STP: rusData as unknown as Wave4SectorDataset, // Backward-compatible alias
    ZAN: zanData as unknown as Wave4SectorDataset,
    SWA: zanData as unknown as Wave4SectorDataset, // Backward-compatible alias
    SAM: samData as unknown as Wave4SectorDataset,
    PRG: samData as unknown as Wave4SectorDataset, // Backward-compatible alias
    ARG: samData as unknown as Wave4SectorDataset, // Backward-compatible alias
    BRA: samData as unknown as Wave4SectorDataset, // Backward-compatible alias
};

export const WAVE_4_PRIMARY_SECTORS = [
    {
        id: "MEK",
        code: "MEK",
        alias: "MEC",
        label: {
            id: "Sektor 1: MEK / Hijaz (Haji Mekkah 1865: Tragedi Mina, Sumur Zamzam & Al-Wajh)",
            en: "Sector 1: MEK / Hijaz (Mecca Hajj 1865: Mina Tragedy, Zamzam Well & Al-Wajh)",
        },
        shortLabel: "MEK // MEC",
        coordinates: [21.3891, 39.8262] as [number, number],
    },
    {
        id: "EGY",
        code: "EGY",
        alias: "CAI",
        label: {
            id: "Sektor 2: EGY / Iskandariyah (Krisis Terusan Suez, Eksodus Eropa & Konferensi Konstantinopel 1865–1866)",
            en: "Sector 2: EGY / Alexandria (Suez Canal Crisis, European Exodus & Constantinople Conference 1865–1866)",
        },
        shortLabel: "EGY // CAI",
        coordinates: [31.2001, 29.9187] as [number, number],
    },
    {
        id: "GBR",
        code: "GBR",
        alias: "LON",
        label: {
            id: "Sektor 3: GBR / London (Britania Raya: Waduk East London Waterworks & Kemenangan Epidemiologi 1866)",
            en: "Sector 3: GBR / London (Great Britain: East London Waterworks Reservoir & Epidemiological Victory 1866)",
        },
        shortLabel: "GBR // LON",
        coordinates: [51.53, -0.03] as [number, number],
    },
    {
        id: "USA",
        code: "USA",
        alias: "NYC",
        label: {
            id: "Sektor 4: USA / New York (Amerika Serikat & Frontier Barat: New York, Lembah Mississippi & Transkontinental 1865–1873)",
            en: "Sector 4: USA / New York (United States & Western Frontier: New York, Mississippi Valley & Transcontinental 1865–1873)",
        },
        shortLabel: "USA // NYC",
        coordinates: [40.7128, -74.006] as [number, number],
    },
    {
        id: "RUS",
        code: "RUS",
        alias: "STP",
        label: {
            id: "Sektor 5: RUS / St. Petersburg (Kekaisaran Rusia & Eropa Tengah: Bohemia, Warsawa, Volga & St. Petersburg 1866–1873)",
            en: "Sector 5: RUS / St. Petersburg (Russian Empire & Central Europe: Bohemia, Warsaw, Volga & St. Petersburg 1866–1873)",
        },
        shortLabel: "RUS // STP",
        coordinates: [59.9343, 30.3351] as [number, number],
    },
    {
        id: "ZAN",
        code: "ZAN",
        alias: "SWA",
        label: {
            id: "Sektor 6: ZAN / Zanzibar (Afrika Timur & Pantai Swahili: Kesultanan Zanzibar, Danau Besar & Jalur Karavan 1869–1871)",
            en: "Sector 6: ZAN / Zanzibar (East Africa & Swahili Coast: Zanzibar Sultanate, Great Lakes & Caravan Trails 1869–1871)",
        },
        shortLabel: "ZAN // SWA",
        coordinates: [-6.1659, 39.2026] as [number, number],
    },
    {
        id: "SAM",
        code: "SAM",
        alias: "PRG",
        label: {
            id: "Sektor 7: SAM / Río de la Plata (Amerika Selatan: Perang Aliansi Tiga, Lembah Río de la Plata & Paraguay 1867–1869)",
            en: "Sector 7: SAM / Río de la Plata (South America: War of the Triple Alliance, Río de la Plata & Paraguay 1867–1869)",
        },
        shortLabel: "SAM // PRG",
        coordinates: [-27.24, -58.59] as [number, number],
    },
] as const;

export function getWave4Sector(sectorId?: string): Wave4SectorDataset {
    if (!sectorId) return WAVE_4_SECTORS.MEK;
    const key = sectorId.toUpperCase();
    if (key === "MEK" || key === "MEC") return WAVE_4_SECTORS.MEK;
    if (key === "EGY" || key === "CAI" || key === "ALX")
        return WAVE_4_SECTORS.EGY;
    if (key === "GBR" || key === "LON") return WAVE_4_SECTORS.GBR;
    if (key === "USA" || key === "NYC") return WAVE_4_SECTORS.USA;
    if (key === "RUS" || key === "STP") return WAVE_4_SECTORS.RUS;
    if (key === "ZAN" || key === "SWA") return WAVE_4_SECTORS.ZAN;
    if (key === "SAM" || key === "PRG" || key === "ARG" || key === "BRA")
        return WAVE_4_SECTORS.SAM;
    if (key === "WAVE-4" || key === "WAVE4") return WAVE_4_SECTORS.MEK; // Default sector fallback
    return WAVE_4_SECTORS[key] || WAVE_4_SECTORS.MEK;
}

export { mekData, egyData, gbrData, usaData, rusData, zanData, samData };
