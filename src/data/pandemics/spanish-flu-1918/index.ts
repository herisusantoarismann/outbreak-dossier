import usData from "./us.json";
import frData from "./fr.json";
import esData from "./es.json";
import gbData from "./gb.json";
import inData from "./in.json";
import idData from "./id.json";
import { Chapter } from "@/types/journey";

export interface SpanishFluSectorDataset {
    sectorId: string;
    sectorName: { id: string; en: string };
    coordinates: [number, number];
    timeRange: { id: string; en: string } | string;
    estimatedFatalities: { id: string; en: string } | string;
    chapters: Chapter[];
}

export const SPANISH_FLU_SECTORS: Record<string, SpanishFluSectorDataset> = {
    US: usData as unknown as SpanishFluSectorDataset,
    USA: usData as unknown as SpanishFluSectorDataset, // Backward-compatible alias
    FR: frData as unknown as SpanishFluSectorDataset,
    FRA: frData as unknown as SpanishFluSectorDataset, // Backward-compatible alias
    ES: esData as unknown as SpanishFluSectorDataset,
    ESP: esData as unknown as SpanishFluSectorDataset, // Backward-compatible alias
    GB: gbData as unknown as SpanishFluSectorDataset,
    GBR: gbData as unknown as SpanishFluSectorDataset, // Backward-compatible alias
    UK: gbData as unknown as SpanishFluSectorDataset, // Backward-compatible alias
    IN: inData as unknown as SpanishFluSectorDataset,
    IND: inData as unknown as SpanishFluSectorDataset, // Backward-compatible alias
    ID: idData as unknown as SpanishFluSectorDataset,
    IDN: idData as unknown as SpanishFluSectorDataset, // Backward-compatible alias
};

export const SPANISH_FLU_PRIMARY_SECTORS = [
    {
        id: "US",
        code: "US",
        alias: "USA",
        label: {
            id: "Sektor 1: US / Amerika Serikat (Haskell County, Barak Militer Camp Funston, & Tragedi Parade Philadelphia // 1918–1919)",
            en: "Sector 1: US / United States (Haskell County Ground Zero, Camp Funston Barracks, & Philadelphia Parade Catastrophe // 1918–1919)",
        },
        shortLabel: "US // KANSAS",
        coordinates: [39.0119, -98.4842] as [number, number],
        beaconColor: "#3b82f6",
    },
    {
        id: "FR",
        code: "FR",
        alias: "FRA",
        label: {
            id: "Sektor 2: FR / Prancis (Kamp Transit Étaples, Parit Front Barat, & Pendaratan Brest // 1918–1919)",
            en: "Sector 2: FR / France (Étaples Staging Camp, Western Front Trenches, & Brest Landings // 1918–1919)",
        },
        shortLabel: "FR // ÉTAPLES",
        coordinates: [50.5186, 1.6397] as [number, number],
        beaconColor: "#ef4444",
    },
    {
        id: "ES",
        code: "ES",
        alias: "ESP",
        label: {
            id: "Sektor 3: ES / Spanyol (Madrid, Infeksi Raja Alfonso XIII, & Lahirnya Julukan 'Flu Spanyol' // 1918–1919)",
            en: "Sector 3: ES / Spain (Madrid, King Alfonso XIII's Infection, & Birth of the 'Spanish Flu' Moniker // 1918–1919)",
        },
        shortLabel: "ES // MADRID",
        coordinates: [40.4168, -3.7038] as [number, number],
        beaconColor: "#eab308",
    },
    {
        id: "GB",
        code: "GB",
        alias: "GBR",
        label: {
            id: "Sektor 4: GB / Britania Raya (Pangkalan Laut Scapa Flow, Pabrik Mesiu Midlands, & Krisis London // 1918–1919)",
            en: "Sector 4: GB / United Kingdom (Scapa Flow Grand Fleet, Midlands Munitions Works, & London Crisis // 1918–1919)",
        },
        shortLabel: "GB // LONDON",
        coordinates: [55.3781, -3.436] as [number, number],
        beaconColor: "#8b5cf6",
    },
    {
        id: "IN",
        code: "IN",
        alias: "IND",
        label: {
            id: "Sektor 5: IN / Kemaharajaan Britania (Pelabuhan Bombay, Vektor Rel Kereta Api, & Tragedi 17,5 Juta Jiwa // 1918–1919)",
            en: "Sector 5: IN / British Raj (Bombay Docks, Imperial Railway Vectors, & The 17.5 Million Catastrophe // 1918–1919)",
        },
        shortLabel: "IN // BOMBAY",
        coordinates: [18.922, 72.8347] as [number, number],
        beaconColor: "#06b6d4",
    },
    {
        id: "ID",
        code: "ID",
        alias: "IDN",
        label: {
            id: "Sektor 6: ID / Hindia Belanda (Tanjung Perak Surabaya, Jalur Kereta Staatsspoorwegen, & Teror Pagebluk Jawa // 1918–1919)",
            en: "Sector 6: ID / Dutch East Indies (Tanjung Perak Surabaya, Staatsspoorwegen Railway, & Java's Pagebluk Terror // 1918–1919)",
        },
        shortLabel: "ID // SURABAYA",
        coordinates: [-7.2575, 112.7521] as [number, number],
        beaconColor: "#10b981",
    },
];

export function getSpanishFluSector(
    identifier: string,
): SpanishFluSectorDataset | null {
    if (!identifier) return null;
    const normalized = identifier.toUpperCase().trim();
    return SPANISH_FLU_SECTORS[normalized] || null;
}
