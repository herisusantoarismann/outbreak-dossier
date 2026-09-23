import gbrData from "./gbr.json";
import rusData from "./rus.json";
import usaData from "./usa.json";
import itaData from "./ita.json";
import indData from "./ind.json";
import latData from "./lat.json";
import { Chapter } from "@/types/journey";

export interface Wave3SectorDataset {
    sectorId: string;
    waveIndex: number;
    sectorName: { id: string; en: string };
    coordinates: [number, number];
    timeRange: string;
    estimatedFatalities: string;
    description: { id: string; en: string };
    chapters: Chapter[];
}

export const WAVE_3_SECTORS: Record<string, Wave3SectorDataset> = {
    GBR: gbrData as unknown as Wave3SectorDataset,
    LON: gbrData as unknown as Wave3SectorDataset, // Backward-compatible alias
    RUS: rusData as unknown as Wave3SectorDataset,
    SEV: rusData as unknown as Wave3SectorDataset, // Backward-compatible alias
    USA: usaData as unknown as Wave3SectorDataset,
    NYC: usaData as unknown as Wave3SectorDataset, // Backward-compatible alias
    ITA: itaData as unknown as Wave3SectorDataset,
    FLO: itaData as unknown as Wave3SectorDataset, // Backward-compatible alias
    NAP: itaData as unknown as Wave3SectorDataset, // Backward-compatible alias
    IND: indData as unknown as Wave3SectorDataset,
    CAL: indData as unknown as Wave3SectorDataset, // Backward-compatible alias
    LAT: latData as unknown as Wave3SectorDataset,
    PAN: latData as unknown as Wave3SectorDataset, // Backward-compatible alias
    CRC: latData as unknown as Wave3SectorDataset, // Backward-compatible alias
};

export const WAVE_3_PRIMARY_SECTORS = [
    {
        id: "GBR",
        code: "GBR",
        alias: "LON",
        label: {
            id: "Sektor 1: GBR / London (Britania Raya: Pompa Air Broad Street Soho & Dr. John Snow 1848–1854)",
            en: "Sector 1: GBR / London (Great Britain: Soho Broad Street Pump & Dr. John Snow 1848–1854)",
        },
        shortLabel: "GBR // LON",
        coordinates: [51.5133, -0.1366] as [number, number],
    },
    {
        id: "RUS",
        code: "RUS",
        alias: "SEV",
        label: {
            id: "Sektor 2: RUS / Sevastopol (Kekaisaran Rusia, Front Krimea & Perang Parit 1847–1856)",
            en: "Sector 2: RUS / Sevastopol (Russian Empire, Crimean War Front & Siege Trenches 1847–1856)",
        },
        shortLabel: "RUS // SEV",
        coordinates: [44.6166, 33.5254] as [number, number],
    },
    {
        id: "USA",
        code: "USA",
        alias: "NYC",
        label: {
            id: "Sektor 3: USA / New York (Amerika Utara: Demam Emas California & Jalur Oregon 1848–1854)",
            en: "Sector 3: USA / New York (North America: California Gold Rush & Oregon Trail 1848–1854)",
        },
        shortLabel: "USA // NYC",
        coordinates: [38.5816, -121.4944] as [number, number],
    },
    {
        id: "ITA",
        code: "ITA",
        alias: "FLO",
        label: {
            id: "Sektor 4: ITA / Florence (Semenanjung Italia: Santa Maria Nuova & Penemuan Filippo Pacini 1854–1855)",
            en: "Sector 4: ITA / Florence (Italian Peninsula: Santa Maria Nuova & Filippo Pacini's Discovery 1854–1855)",
        },
        shortLabel: "ITA // FLO",
        coordinates: [43.7696, 11.2558] as [number, number],
    },
    {
        id: "IND",
        code: "IND",
        alias: "CAL",
        label: {
            id: "Sektor 5: IND / Benggala (Delta Gangga, Kumbh Mela Haridwar & Barak Kolonial 1846–1857)",
            en: "Sector 5: IND / Bengal (Ganges Delta, Haridwar Kumbh Mela & Colonial Cantonments 1846–1857)",
        },
        shortLabel: "IND // CAL",
        coordinates: [22.5726, 88.3639] as [number, number],
    },
    {
        id: "LAT",
        code: "LAT",
        alias: "PAN",
        label: {
            id: "Sektor 6: LAT / Panama (Karibia, Transito Panama & Kampanye Nasional Kosta Rika 1850–1856)",
            en: "Sector 6: LAT / Panama (Caribbean, Panama Transit & Costa Rican National Campaign 1850–1856)",
        },
        shortLabel: "LAT // PAN",
        coordinates: [9.9281, -84.0907] as [number, number],
    },
] as const;

export function getWave3Sector(sectorId?: string): Wave3SectorDataset {
    if (!sectorId) return WAVE_3_SECTORS.GBR;
    const key = sectorId.toUpperCase();
    if (key === "GBR" || key === "LON") return WAVE_3_SECTORS.GBR;
    if (key === "RUS" || key === "SEV") return WAVE_3_SECTORS.RUS;
    if (key === "USA" || key === "NYC") return WAVE_3_SECTORS.USA;
    if (key === "ITA" || key === "FLO" || key === "NAP")
        return WAVE_3_SECTORS.ITA;
    if (key === "IND" || key === "CAL") return WAVE_3_SECTORS.IND;
    if (key === "LAT" || key === "PAN" || key === "CRC")
        return WAVE_3_SECTORS.LAT;
    if (key === "WAVE-3" || key === "WAVE3") return WAVE_3_SECTORS.GBR; // Default sector fallback
    return WAVE_3_SECTORS[key] || WAVE_3_SECTORS.GBR;
}

export { gbrData, rusData, usaData, itaData, indData, latData };
