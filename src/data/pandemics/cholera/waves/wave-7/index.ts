import idnData from "./idn.json";
import indData from "./ind.json";
import perData from "./per.json";
import zweData from "./zwe.json";
import htiData from "./hti.json";
import yemData from "./yem.json";
import { Chapter } from "@/types/journey";

export interface Wave7SectorDataset {
    sectorId: string;
    waveIndex: number;
    sectorName: { id: string; en: string };
    coordinates: [number, number];
    timeRange: { id: string; en: string } | string;
    estimatedFatalities: { id: string; en: string } | string;
    chapters: Chapter[];
}

export const WAVE_7_SECTORS: Record<string, Wave7SectorDataset> = {
    IDN: idnData as unknown as Wave7SectorDataset,
    MAK: idnData as unknown as Wave7SectorDataset, // Backward-compatible alias (Makassar)
    JAK: idnData as unknown as Wave7SectorDataset, // Backward-compatible alias (Jakarta)
    IND: indData as unknown as Wave7SectorDataset,
    BGD: indData as unknown as Wave7SectorDataset, // Backward-compatible alias (Bangladesh/Dhaka)
    DHK: indData as unknown as Wave7SectorDataset, // Backward-compatible alias
    CAL: indData as unknown as Wave7SectorDataset, // Backward-compatible alias (Calcutta)
    PER: perData as unknown as Wave7SectorDataset,
    LMA: perData as unknown as Wave7SectorDataset, // Backward-compatible alias (Lima)
    SAM: perData as unknown as Wave7SectorDataset, // Backward-compatible alias (South America)
    ZWE: zweData as unknown as Wave7SectorDataset,
    HAR: zweData as unknown as Wave7SectorDataset, // Backward-compatible alias (Harare)
    AFR: zweData as unknown as Wave7SectorDataset, // Backward-compatible alias (Sub-Saharan Africa)
    HTI: htiData as unknown as Wave7SectorDataset,
    PAP: htiData as unknown as Wave7SectorDataset, // Backward-compatible alias (Port-au-Prince)
    YEM: yemData as unknown as Wave7SectorDataset,
    SAN: yemData as unknown as Wave7SectorDataset, // Backward-compatible alias (Sana'a)
};

export const WAVE_7_PRIMARY_SECTORS = [
    {
        id: "IDN",
        code: "IDN",
        alias: "MAK",
        label: {
            id: "Sektor 1: IDN / Makassar & Kepulauan Indonesia (Ground Zero Biotipe El Tor 1961, Penyebaran Phinisi, Kontroversi ISR WHO & Proyek Inpres // 1961–1970)",
            en: "Sector 1: IDN / Makassar & Indonesian Archipelago (1961 El Tor Biotype Ground Zero, Phinisi Maritime Spread, WHO ISR Revision & Inpres Waterworks // 1961–1970)",
        },
        shortLabel: "IDN // MAK",
        coordinates: [-5.1477, 119.4327] as [number, number],
    },
    {
        id: "IND",
        code: "IND",
        alias: "BGD",
        label: {
            id: "Sektor 2: IND / Benggala & Bangladesh (Laboratorium Riset Kolera Dhaka, Revolusi Penemuan ORS Bongaon 1971, Ekologi Zooplankton Dr. Rita Colwell & Mutasi O139 // 1963–1993)",
            en: "Sector 2: IND / Bengal & Bangladesh (Dhaka Cholera Research Lab, 1971 Bongaon War ORS Miracle, Dr. Rita Colwell's Zooplankton Paradigm & O139 Mutation // 1963–1993)",
        },
        shortLabel: "IND // BGD",
        coordinates: [23.8103, 90.4125] as [number, number],
    },
    {
        id: "PER",
        code: "PER",
        alias: "LMA",
        label: {
            id: "Sektor 3: PER / Pesisir Peru & Lembah Pasifik (Invasi Kejutan Amerika Latin 1991, Krisis Ceviche, Ketimpangan Pueblos Jóvenes & Rekor Mortalitas Terendah ORS // 1991–1993)",
            en: "Sector 3: PER / Coastal Peru & Pacific Rim (1991 Latin American Incursion, The Ceviche Dilemma, Pueblos Jóvenes Inequity & Sub-1% ORS Triage Miracle // 1991–1993)",
        },
        shortLabel: "PER // LMA",
        coordinates: [-12.0464, -77.0428] as [number, number],
    },
    {
        id: "ZWE",
        code: "ZWE",
        alias: "HAR",
        label: {
            id: "Sektor 4: ZWE / Harare & Afrika Sub-Sahara (Keruntuhan Utilitas Morton Jaffray 2008, Episentrum Budiriro, Mogok Medis Hiperinflasi & Tumpahan Sungai Limpopo // 2008–2009)",
            en: "Sector 4: ZWE / Harare & Sub-Saharan Africa (2008 Morton Jaffray Waterworks Collapse, Budiriro Epicenter, Hyperinflation Medical Strike & Limpopo Spillover // 2008–2009)",
        },
        shortLabel: "ZWE // HAR",
        coordinates: [-17.8252, 31.0335] as [number, number],
    },
    {
        id: "HTI",
        code: "HTI",
        alias: "PAP",
        label: {
            id: "Sektor 5: HTI / Lembah Artibonite & Port-au-Prince (Tragedi Spillover Kamp MINUSTAH 2010, Investigasi Genomik Nepal, Permintaan Maaf PBB & Resurgensi Cité Soleil // 2010–2019)",
            en: "Sector 5: HTI / Artibonite Valley & Port-au-Prince (2010 MINUSTAH Base Spillover, Nepalese Clonal Tracking, Historic UN Apology & Cité Soleil Resurgence // 2010–2019)",
        },
        shortLabel: "HTI // PAP",
        coordinates: [18.5944, -72.3074] as [number, number],
    },
    {
        id: "YEM",
        code: "YEM",
        alias: "SAN",
        label: {
            id: "Sektor 6: YEM / Sana'a & Al-Hudaydah (Wabah Terbesar Sejarah Modern 2016–Sekarang, Kehancuran Listrik Pompa Perang, Sinergi Malnutrisi Akut SAM & Blokade Pelabuhan // 2016–Sekarang)",
            en: "Sector 6: YEM / Sana'a & Al-Hudaydah (2016–Present Modern Super-Outbreak, Wartime Desalination Destruction, Severe Malnutrition Synergy & Port Siege // 2016–Present)",
        },
        shortLabel: "YEM // SAN",
        coordinates: [15.3694, 44.191] as [number, number],
    },
] as const;

export function getWave7Sector(sectorId?: string): Wave7SectorDataset {
    if (!sectorId) return WAVE_7_SECTORS.IDN;
    const key = sectorId.toUpperCase();
    if (key === "IDN" || key === "MAK" || key === "JAK" || key === "ID")
        return WAVE_7_SECTORS.IDN;
    if (
        key === "IND" ||
        key === "BGD" ||
        key === "DHK" ||
        key === "CAL" ||
        key === "IN"
    )
        return WAVE_7_SECTORS.IND;
    if (key === "PER" || key === "LMA" || key === "SAM" || key === "PE")
        return WAVE_7_SECTORS.PER;
    if (key === "ZWE" || key === "HAR" || key === "AFR" || key === "ZW")
        return WAVE_7_SECTORS.ZWE;
    if (key === "HTI" || key === "PAP" || key === "HT")
        return WAVE_7_SECTORS.HTI;
    if (key === "YEM" || key === "SAN" || key === "YE")
        return WAVE_7_SECTORS.YEM;
    if (key === "WAVE-7" || key === "WAVE7") return WAVE_7_SECTORS.IDN; // Default sector fallback
    return WAVE_7_SECTORS[key] || WAVE_7_SECTORS.IDN;
}

export { idnData, indData, perData, zweData, htiData, yemData };
