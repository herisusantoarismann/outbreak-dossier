import hamData from "./ham.json";
import egyData from "./egy.json";
import indData from "./ind.json";
import rusData from "./rus.json";
import itaData from "./ita.json";
import fraData from "./fra.json";
import jpnData from "./jpn.json";
import usaData from "./usa.json";
import { Chapter } from "@/types/journey";

export interface Wave5SectorDataset {
    sectorId: string;
    waveIndex: number;
    sectorName: { id: string; en: string };
    coordinates: [number, number];
    timeRange: { id: string; en: string } | string;
    estimatedFatalities: { id: string; en: string } | string;
    chapters: Chapter[];
}

export const WAVE_5_SECTORS: Record<string, Wave5SectorDataset> = {
    HAM: hamData as unknown as Wave5SectorDataset,
    DEU: hamData as unknown as Wave5SectorDataset, // Backward-compatible alias
    ALN: hamData as unknown as Wave5SectorDataset, // Backward-compatible alias
    EGY: egyData as unknown as Wave5SectorDataset,
    CAI: egyData as unknown as Wave5SectorDataset, // Backward-compatible alias
    ALX: egyData as unknown as Wave5SectorDataset, // Backward-compatible alias
    IND: indData as unknown as Wave5SectorDataset,
    CAL: indData as unknown as Wave5SectorDataset, // Backward-compatible alias
    BNG: indData as unknown as Wave5SectorDataset, // Backward-compatible alias
    RUS: rusData as unknown as Wave5SectorDataset,
    STP: rusData as unknown as Wave5SectorDataset, // Backward-compatible alias
    BAK: rusData as unknown as Wave5SectorDataset, // Backward-compatible alias
    TSK: rusData as unknown as Wave5SectorDataset, // Backward-compatible alias
    ITA: itaData as unknown as Wave5SectorDataset,
    NAP: itaData as unknown as Wave5SectorDataset, // Backward-compatible alias
    ROM: itaData as unknown as Wave5SectorDataset, // Backward-compatible alias
    FRA: fraData as unknown as Wave5SectorDataset,
    MAR: fraData as unknown as Wave5SectorDataset, // Backward-compatible alias
    PAR: fraData as unknown as Wave5SectorDataset, // Backward-compatible alias
    TLN: fraData as unknown as Wave5SectorDataset, // Backward-compatible alias
    JPN: jpnData as unknown as Wave5SectorDataset,
    TOK: jpnData as unknown as Wave5SectorDataset, // Backward-compatible alias
    YOK: jpnData as unknown as Wave5SectorDataset, // Backward-compatible alias
    NGS: jpnData as unknown as Wave5SectorDataset, // Backward-compatible alias
    USA: usaData as unknown as Wave5SectorDataset,
    NYC: usaData as unknown as Wave5SectorDataset, // Backward-compatible alias
};

export const WAVE_5_PRIMARY_SECTORS = [
    {
        id: "HAM",
        code: "HAM",
        alias: "DEU",
        label: {
            id: "Sektor 1: HAM / Hamburg (Kekaisaran Jerman: Hamburg, Sungai Elbe & Eksperimen Pettenkofer // 1892–1893)",
            en: "Sector 1: HAM / Hamburg (German Empire: Hamburg, Elbe River & Pettenkofer Experiment // 1892–1893)",
        },
        shortLabel: "HAM // DEU",
        coordinates: [53.5511, 9.9937] as [number, number],
    },
    {
        id: "EGY",
        code: "EGY",
        alias: "ALX",
        label: {
            id: "Sektor 2: EGY / Mesir (Delta Nil & Aleksandria: Damietta, Ekspedisi Robert Koch & Martir Louis Thuillier // 1883)",
            en: "Sector 2: EGY / Egypt (Nile Delta & Alexandria: Damietta, Robert Koch Expedition & Martyrdom of Louis Thuillier // 1883)",
        },
        shortLabel: "EGY // ALX",
        coordinates: [31.2001, 29.9187] as [number, number],
    },
    {
        id: "IND",
        code: "IND",
        alias: "CAL",
        label: {
            id: "Sektor 3: IND / Kalkuta (Kemaharajaan Britania: Isolasi Biakan Murni Vibrio & Uji Coba Vaksin Lapangan Haffkine // 1883–1895)",
            en: "Sector 3: IND / Kolkata (British Raj: Pure Vibrio Culture Isolation & Haffkine's Mass Vaccine Trials // 1883–1895)",
        },
        shortLabel: "IND // CAL",
        coordinates: [22.5726, 88.3639] as [number, number],
    },
    {
        id: "RUS",
        code: "RUS",
        alias: "BAK",
        label: {
            id: "Sektor 4: RUS / Baku & Kaspia (Kekaisaran Rusia: Rel Transkaspia, Minyak Baku, Kerusuhan Tashkent & Volga // 1892–1893)",
            en: "Sector 4: RUS / Baku & Caspian (Russian Empire: Transcaspian Rail, Baku Oil, Tashkent Cholera Riots & Volga // 1892–1893)",
        },
        shortLabel: "RUS // BAK",
        coordinates: [40.4093, 49.8671] as [number, number],
    },
    {
        id: "ITA",
        code: "ITA",
        alias: "NAP",
        label: {
            id: "Sektor 5: ITA / Napoli (Kerajaan Italia: Napoli, Fondaco Bawah Tanah, Eksodus Massal & Kebangkitan Risanamento // 1884–1889)",
            en: "Sector 5: ITA / Naples (Kingdom of Italy: Naples, Subterranean Fondaci, Mass Exodus & The Risanamento // 1884–1889)",
        },
        shortLabel: "ITA // NAP",
        coordinates: [40.8518, 14.2681] as [number, number],
    },
    {
        id: "FRA",
        code: "FRA",
        alias: "MAR",
        label: {
            id: "Sektor 6: FRA / Prancis (Mediterania Barat: Toulon, Marseille, Paris & Revolusi Bakteriologi Pasteur // 1884–1893)",
            en: "Sector 6: FRA / France (Western Mediterranean: Toulon, Marseille, Paris & Pasteur's Bacteriological Revolution // 1884–1893)",
        },
        shortLabel: "FRA // MAR",
        coordinates: [43.1242, 5.928] as [number, number],
    },
    {
        id: "JPN",
        code: "JPN",
        alias: "TOK",
        label: {
            id: "Sektor 7: JPN / Kekaisaran Jepang (Era Meiji: Nagasaki, Yokohama, Tokyo & Revolusi Sanitasi Eisei // 1882–1895)",
            en: "Sector 7: JPN / Imperial Japan (Meiji Era: Nagasaki, Yokohama, Tokyo & The Eisei Sanitary Revolution // 1882–1895)",
        },
        shortLabel: "JPN // TOK",
        coordinates: [35.4437, 139.638] as [number, number],
    },
    {
        id: "USA",
        code: "USA",
        alias: "NYC",
        label: {
            id: "Sektor 8: USA / New York (Amerika Serikat: Pelabuhan New York, Swinburne Island & Laboratorium Dr. Hermann Biggs // 1892–1893)",
            en: "Sector 8: USA / New York (United States: New York Harbor, Swinburne Island & Dr. Hermann Biggs's Laboratory // 1892–1893)",
        },
        shortLabel: "USA // NYC",
        coordinates: [40.7128, -74.006] as [number, number],
    },
] as const;

export function getWave5Sector(sectorId?: string): Wave5SectorDataset {
    if (!sectorId) return WAVE_5_SECTORS.HAM;
    const key = sectorId.toUpperCase();
    if (key === "HAM" || key === "DEU" || key === "ALN")
        return WAVE_5_SECTORS.HAM;
    if (key === "EGY" || key === "CAI" || key === "ALX")
        return WAVE_5_SECTORS.EGY;
    if (key === "IND" || key === "CAL" || key === "BNG")
        return WAVE_5_SECTORS.IND;
    if (key === "RUS" || key === "STP" || key === "BAK" || key === "TSK")
        return WAVE_5_SECTORS.RUS;
    if (key === "ITA" || key === "NAP" || key === "ROM")
        return WAVE_5_SECTORS.ITA;
    if (key === "FRA" || key === "MAR" || key === "PAR" || key === "TLN")
        return WAVE_5_SECTORS.FRA;
    if (key === "JPN" || key === "TOK" || key === "YOK" || key === "NGS")
        return WAVE_5_SECTORS.JPN;
    if (key === "USA" || key === "NYC") return WAVE_5_SECTORS.USA;
    if (key === "WAVE-5" || key === "WAVE5") return WAVE_5_SECTORS.HAM; // Default sector fallback
    return WAVE_5_SECTORS[key] || WAVE_5_SECTORS.HAM;
}

export {
    hamData,
    egyData,
    indData,
    rusData,
    itaData,
    fraData,
    jpnData,
    usaData,
};
