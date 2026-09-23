import jesData from "./jes.json";
import batData from "./bat.json";
import bsoData from "./bso.json";
import { Chapter } from "@/types/journey";

export interface Wave1SectorDataset {
    sectorId: string;
    waveIndex: number;
    sectorName: { id: string; en: string };
    coordinates: [number, number];
    timeRange: string;
    estimatedFatalities: string;
    chapters: Chapter[];
}

export const WAVE_1_SECTORS: Record<string, Wave1SectorDataset> = {
    JES: jesData as unknown as Wave1SectorDataset,
    CAL: jesData as unknown as Wave1SectorDataset, // Backward-compatible alias
    BAT: batData as unknown as Wave1SectorDataset,
    BSO: bsoData as unknown as Wave1SectorDataset,
    MUS: bsoData as unknown as Wave1SectorDataset, // Backward-compatible alias
};

export const WAVE_1_PRIMARY_SECTORS = [
    {
        id: "JES",
        code: "JES",
        alias: "CAL",
        label: {
            id: "Sektor 1: JES / Kalkuta (Delta Gangga & Episentrum 1817)",
            en: "Sector 1: JES / Calcutta (Bengal Delta Inception 1817)",
        },
        shortLabel: "JES // CAL",
        coordinates: [23.1687, 89.2173] as [number, number],
    },
    {
        id: "BAT",
        code: "BAT",
        alias: null,
        label: {
            id: "Sektor 2: BAT (Batavia & Jawa 1821)",
            en: "Sector 2: BAT (Batavia & Java 1821)",
        },
        shortLabel: "BAT",
        coordinates: [-6.2088, 106.8456] as [number, number],
    },
    {
        id: "BSO",
        code: "BSO",
        alias: "MUS",
        label: {
            id: "Sektor 3: BSO / Muskat (Basra, Teluk Persia & Kaukasus 1821–1824)",
            en: "Sector 3: BSO / Muscat (Basra, Persian Gulf & Caucasus 1821–1824)",
        },
        shortLabel: "BSO // MUS",
        coordinates: [30.5085, 47.7804] as [number, number],
    },
] as const;

export function getWave1Sector(sectorId?: string): Wave1SectorDataset {
    if (!sectorId) return WAVE_1_SECTORS.JES;
    const key = sectorId.toUpperCase();
    if (key === "JES" || key === "CAL") return WAVE_1_SECTORS.JES;
    if (key === "BAT") return WAVE_1_SECTORS.BAT;
    if (key === "BSO" || key === "MUS") return WAVE_1_SECTORS.BSO;
    if (key === "WAVE-1" || key === "WAVE1") return WAVE_1_SECTORS.JES; // Default sector fallback
    return WAVE_1_SECTORS[key] || WAVE_1_SECTORS.JES;
}

export { jesData, batData, bsoData };
