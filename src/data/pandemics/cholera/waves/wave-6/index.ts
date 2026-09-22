import indData from "./ind.json";
import rusData from "./rus.json";
import phlData from "./phl.json";
import mekData from "./mek.json";
import itaData from "./ita.json";
import jpnData from "./jpn.json";
import { Chapter } from "@/types/journey";

export interface Wave6SectorDataset {
    sectorId: string;
    waveIndex: number;
    sectorName: { id: string; en: string };
    coordinates: [number, number];
    timeRange: { id: string; en: string } | string;
    estimatedFatalities: { id: string; en: string } | string;
    chapters: Chapter[];
}

export const WAVE_6_SECTORS: Record<string, Wave6SectorDataset> = {
    IND: indData as unknown as Wave6SectorDataset,
    CAL: indData as unknown as Wave6SectorDataset, // Backward-compatible alias
    BNG: indData as unknown as Wave6SectorDataset, // Backward-compatible alias
    RUS: rusData as unknown as Wave6SectorDataset,
    PET: rusData as unknown as Wave6SectorDataset, // Backward-compatible alias
    STP: rusData as unknown as Wave6SectorDataset, // Backward-compatible alias
    PHL: phlData as unknown as Wave6SectorDataset,
    MAN: phlData as unknown as Wave6SectorDataset, // Backward-compatible alias
    MEK: mekData as unknown as Wave6SectorDataset,
    TUR: mekData as unknown as Wave6SectorDataset, // Backward-compatible alias
    IST: mekData as unknown as Wave6SectorDataset, // Backward-compatible alias
    ITA: itaData as unknown as Wave6SectorDataset,
    NAP: itaData as unknown as Wave6SectorDataset, // Backward-compatible alias
    EUR: itaData as unknown as Wave6SectorDataset, // Backward-compatible alias
    USA: itaData as unknown as Wave6SectorDataset, // Backward-compatible alias (NYC quarantine)
    NYC: itaData as unknown as Wave6SectorDataset, // Backward-compatible alias
    JPN: jpnData as unknown as Wave6SectorDataset,
    TOK: jpnData as unknown as Wave6SectorDataset, // Backward-compatible alias
    YOK: jpnData as unknown as Wave6SectorDataset, // Backward-compatible alias
};

export const WAVE_6_PRIMARY_SECTORS = [
    {
        id: "IND",
        code: "IND",
        alias: "CAL",
        label: {
            id: "Sektor 1: IND / India & Delta Benggala (Revolusi Rehidrasi Infus Salin Sir Leonard Rogers, Vaksinasi Massal Haffkine & Pandemi Ganda 1918 // 1899–1923)",
            en: "Sector 1: IND / India & Bengal Delta (Sir Leonard Rogers Saline Infusion, Haffkine Prophylaxis & 1918 Dual Pandemic // 1899–1923)",
        },
        shortLabel: "IND // CAL",
        coordinates: [22.5726, 88.3639] as [number, number],
    },
    {
        id: "RUS",
        code: "RUS",
        alias: "PET",
        label: {
            id: "Sektor 2: RUS / Kekaisaran Rusia & Uni Soviet (Epidemi Neva St. Petersburg 1908, Kereta Kolera Perang Sipil & Doktrin Semashko // 1904–1923)",
            en: "Sector 2: RUS / Russian Empire & Soviet Union (1908 St. Petersburg Neva Outbreak, Civil War Troop Trains & Semashko Doctrine // 1904–1923)",
        },
        shortLabel: "RUS // PET",
        coordinates: [59.9343, 30.3351] as [number, number],
    },
    {
        id: "PHL",
        code: "PHL",
        alias: "MAN",
        label: {
            id: "Sektor 3: PHL / Kepulauan Filipina (Perang Filipina-Amerika, Krisis Sanitasi Manila Dr. Victor Heiser & Reformasi Leding Osmeña // 1902–1916)",
            en: "Sector 3: PHL / Philippine Archipelago (Philippine-American War, Dr. Victor Heiser's Manila Sanitary Cordon & Osmeña Reforms // 1902–1916)",
        },
        shortLabel: "PHL // MAN",
        coordinates: [14.5995, 120.9842] as [number, number],
    },
    {
        id: "MEK",
        code: "MEK",
        alias: "TUR",
        label: {
            id: "Sektor 4: MEK / Kekaisaran Utsmaniyah & Jalur Haji (Stasiun Karantina El-Tor & Camaran, Jalur Kereta Api Hejaz & Garis Parit Çatalca // 1902–1919)",
            en: "Sector 4: MEK / Ottoman Empire & Hajj Routes (El-Tor & Kamaran Quarantine, Hejaz Railway & Çatalca Trench Disaster // 1902–1919)",
        },
        shortLabel: "MEK // TUR",
        coordinates: [21.3891, 39.8262] as [number, number],
    },
    {
        id: "ITA",
        code: "ITA",
        alias: "NAP",
        label: {
            id: "Sektor 5: ITA / Italia Selatan & Koridor Atlantik (Resurgensi Napoli 1910–1911, Skrining Karantina New York Dr. Doty & Revolusi Klorinasi Air Bersih // 1910–1912)",
            en: "Sector 5: ITA / Southern Italy & Atlantic Corridor (1910–1911 Naples Outbreak, Dr. Doty's NY Carrier Screening & Chlorination Revolution // 1910–1912)",
        },
        shortLabel: "ITA // NAP",
        coordinates: [40.8518, 14.2681] as [number, number],
    },
    {
        id: "JPN",
        code: "JPN",
        alias: "TOK",
        label: {
            id: "Sektor 6: JPN / Kekaisaran Jepang (Biosekuriti Perang Rusia-Jepang 1904, Karantina Raksasa Ninoshima & Era Klorinasi Yodobashi // 1902–1922)",
            en: "Sector 6: JPN / Empire of Japan (1904 Russo-Japanese War Biosecurity, Ninoshima Quarantine Sieve & Yodobashi Waterworks // 1902–1922)",
        },
        shortLabel: "JPN // TOK",
        coordinates: [35.6762, 139.6503] as [number, number],
    },
] as const;

export function getWave6Sector(sectorId?: string): Wave6SectorDataset {
    if (!sectorId) return WAVE_6_SECTORS.IND;
    const key = sectorId.toUpperCase();
    if (key === "IND" || key === "CAL" || key === "BNG")
        return WAVE_6_SECTORS.IND;
    if (key === "RUS" || key === "PET" || key === "STP")
        return WAVE_6_SECTORS.RUS;
    if (key === "PHL" || key === "MAN") return WAVE_6_SECTORS.PHL;
    if (key === "MEK" || key === "TUR" || key === "IST")
        return WAVE_6_SECTORS.MEK;
    if (
        key === "ITA" ||
        key === "NAP" ||
        key === "EUR" ||
        key === "USA" ||
        key === "NYC"
    )
        return WAVE_6_SECTORS.ITA;
    if (key === "JPN" || key === "TOK" || key === "YOK")
        return WAVE_6_SECTORS.JPN;
    if (key === "WAVE-6" || key === "WAVE6") return WAVE_6_SECTORS.IND; // Default sector fallback
    return WAVE_6_SECTORS[key] || WAVE_6_SECTORS.IND;
}

export { indData, rusData, phlData, mekData, itaData, jpnData };
