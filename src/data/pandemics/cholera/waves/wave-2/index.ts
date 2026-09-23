import rusData from "./rus.json";
import gbrData from "./gbr.json";
import fraData from "./fra.json";
import usaData from "./usa.json";
import mekData from "./mek.json";
import { Chapter } from "@/types/journey";

export interface Wave2SectorDataset {
    sectorId: string;
    waveIndex: number;
    sectorName: { id: string; en: string };
    coordinates: [number, number];
    timeRange: string;
    estimatedFatalities: string;
    chapters: Chapter[];
}

export const WAVE_2_SECTORS: Record<string, Wave2SectorDataset> = {
    RUS: rusData as unknown as Wave2SectorDataset,
    MOS: rusData as unknown as Wave2SectorDataset, // Backward-compatible alias
    GBR: gbrData as unknown as Wave2SectorDataset,
    LON: gbrData as unknown as Wave2SectorDataset, // Backward-compatible alias
    FRA: fraData as unknown as Wave2SectorDataset,
    PAR: fraData as unknown as Wave2SectorDataset, // Backward-compatible alias
    USA: usaData as unknown as Wave2SectorDataset,
    NYC: usaData as unknown as Wave2SectorDataset, // Backward-compatible alias
    MEK: mekData as unknown as Wave2SectorDataset,
    MEC: mekData as unknown as Wave2SectorDataset, // Backward-compatible alias
};

export const WAVE_2_PRIMARY_SECTORS = [
    {
        id: "RUS",
        code: "RUS",
        alias: "MOS",
        label: {
            id: "Sektor 1: RUS / Moskow (Kekaisaran Rusia, Volga, & Kerusuhan Sennaya 1829–1831)",
            en: "Sector 1: RUS / Moscow (Russian Empire, Volga, & Sennaya Riots 1829–1831)",
        },
        shortLabel: "RUS // MOS",
        coordinates: [55.7558, 37.6173] as [number, number],
    },
    {
        id: "GBR",
        code: "GBR",
        alias: "LON",
        label: {
            id: "Sektor 2: GBR / London (Britania Raya: Sunderland & Thames 1831–1832)",
            en: "Sector 2: GBR / London (Great Britain: Sunderland & Thames 1831–1832)",
        },
        shortLabel: "GBR // LON",
        coordinates: [54.9069, -1.3838] as [number, number],
    },
    {
        id: "FRA",
        code: "FRA",
        alias: "PAR",
        label: {
            id: "Sektor 3: FRA / Paris (Prancis: Karnaval Mi-Carême & Sungai Seine 1832)",
            en: "Sector 3: FRA / Paris (France: Mi-Carême Carnival & River Seine 1832)",
        },
        shortLabel: "FRA // PAR",
        coordinates: [48.8566, 2.3522] as [number, number],
    },
    {
        id: "USA",
        code: "USA",
        alias: "NYC",
        label: {
            id: "Sektor 4: USA / New York (Amerika Utara: Quebec, Kanal Erie, & Five Points 1832–1834)",
            en: "Sector 4: USA / New York (North America: Quebec, Erie Canal, & Five Points 1832–1834)",
        },
        shortLabel: "USA // NYC",
        coordinates: [40.7128, -74.006] as [number, number],
    },
    {
        id: "MEK",
        code: "MEK",
        alias: "MEC",
        label: {
            id: "Sektor 5: MEK / Mekkah (Hijaz Utsmaniyah: Koridor Jamaah Haji & Arafah 1831 & 1846)",
            en: "Sector 5: MEK / Mecca (Ottoman Hijaz: Hajj Pilgrimage Corridors & Arafat 1831 & 1846)",
        },
        shortLabel: "MEK // MEC",
        coordinates: [21.4225, 39.8262] as [number, number],
    },
] as const;

export function getWave2Sector(sectorId?: string): Wave2SectorDataset {
    if (!sectorId) return WAVE_2_SECTORS.RUS;
    const key = sectorId.toUpperCase();
    if (key === "RUS" || key === "MOS") return WAVE_2_SECTORS.RUS;
    if (key === "GBR" || key === "LON") return WAVE_2_SECTORS.GBR;
    if (key === "FRA" || key === "PAR") return WAVE_2_SECTORS.FRA;
    if (key === "USA" || key === "NYC") return WAVE_2_SECTORS.USA;
    if (key === "MEK" || key === "MEC") return WAVE_2_SECTORS.MEK;
    if (key === "WAVE-2" || key === "WAVE2") return WAVE_2_SECTORS.RUS; // Default sector fallback
    return WAVE_2_SECTORS[key] || WAVE_2_SECTORS.RUS;
}

export { rusData, gbrData, fraData, usaData, mekData };
