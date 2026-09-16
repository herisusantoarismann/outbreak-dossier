import { LocalizedContent, Chapter } from "@/types/journey";

export interface PandemicConfig {
    id: string; // e.g., 'covid-19', 'spanish-flu-1918', 'black-death-1347'
    name: LocalizedContent;
    era: string;
    pathogen: string;
    baseYear: number;
    epicenters: string[]; // ISO-2 codes with full dossiers
    defaultCameraPosition: [number, number, number];
}

export const PANDEMIC_REGISTRY: Record<string, PandemicConfig> = {
    "covid-19": {
        id: "covid-19",
        name: {
            id: "Pandemi COVID-19 (SARS-CoV-2)",
            en: "COVID-19 Pandemic (SARS-CoV-2)",
        },
        era: "2019 - 2023",
        pathogen: "SARS-CoV-2 (Coronaviridae)",
        baseYear: 2019,
        epicenters: ["id", "cn", "it", "us", "in"],
        defaultCameraPosition: [10, 100, 2.3],
    },
    "spanish-flu-1918": {
        id: "spanish-flu-1918",
        name: {
            id: "Pandemi Flu Spanyol 1918 (H1N1)",
            en: "1918 Spanish Flu Pandemic (H1N1)",
        },
        era: "1918 - 1920",
        pathogen: "Influenza A virus subtype H1N1",
        baseYear: 1918,
        epicenters: ["us", "fr", "es", "gb"],
        defaultCameraPosition: [40, -40, 2.3],
    },
    "black-death-1347": {
        id: "black-death-1347",
        name: {
            id: "Wabah Maut Hitam 1347 (Yersinia pestis)",
            en: "The Black Death Pandemic 1347 (Yersinia pestis)",
        },
        era: "1346 - 1353",
        pathogen: "Yersinia pestis (Bacterium)",
        baseYear: 1347,
        epicenters: ["it", "fr", "gb", "cn"],
        defaultCameraPosition: [45, 15, 2.3],
    },
};

/**
 * Retrieve configuration metadata for a registered pandemic.
 */
export function getPandemicConfig(
    pandemicId: string,
): PandemicConfig | undefined {
    return PANDEMIC_REGISTRY[pandemicId.toLowerCase()];
}

/**
 * Normalizes ISO-2 and ISO-3 codes into canonical 2-letter codes.
 */
export function normalizeCountryCode(countryCode: string): string {
    const code = countryCode.toLowerCase().trim();
    if (code === "idn") return "id";
    if (code === "chn") return "cn";
    if (code === "ita") return "it";
    if (code === "usa") return "us";
    if (code === "ind") return "in";
    return code.slice(0, 2);
}

/**
 * Dynamic Dataset Resolver
 * Asynchronously loads declassified chapter intelligence for a given pandemic and country.
 * Returns Chapter[] if available, or null if the dossier does not exist.
 */
export async function loadDossier(
    pandemicId: string,
    countryCode: string,
): Promise<Chapter[] | null> {
    const pId = pandemicId.toLowerCase();
    const cCode = normalizeCountryCode(countryCode);

    try {
        if (pId === "covid-19") {
            switch (cCode) {
                case "id": {
                    const mod =
                        await import("@/data/pandemics/covid-19/id.json");
                    return mod.default as unknown as Chapter[];
                }
                case "cn": {
                    const mod =
                        await import("@/data/pandemics/covid-19/cn.json");
                    return mod.default as unknown as Chapter[];
                }
                case "it": {
                    const mod =
                        await import("@/data/pandemics/covid-19/it.json");
                    return mod.default as unknown as Chapter[];
                }
                case "us": {
                    const mod =
                        await import("@/data/pandemics/covid-19/us.json");
                    return mod.default as unknown as Chapter[];
                }
                case "in": {
                    const mod =
                        await import("@/data/pandemics/covid-19/in.json");
                    return mod.default as unknown as Chapter[];
                }
                default:
                    return null;
            }
        }

        // Support future dynamic pandemic bundles
        return null;
    } catch (err) {
        console.error(
            `[loadDossier] Failed to load dossier for pandemic "${pId}", sector "${cCode}":`,
            err,
        );
        return null;
    }
}
