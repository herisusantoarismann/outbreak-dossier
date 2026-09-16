import { Chapter } from "@/types/journey";
import { EPICENTER_REGISTRY, EpicenterMetadata } from "./countriesConfig";

export interface ClinicalProfile {
    classification: {
        title: { id: string; en: string };
        text: { id: string; en: string };
    };
    metrics: {
        incubation: {
            title: { id: string; en: string };
            value: string;
            sub: { id: string; en: string };
        };
        receptor: {
            title: { id: string; en: string };
            value: string;
            sub: { id: string; en: string };
        };
        family: {
            title: { id: string; en: string };
            value: string;
            sub: { id: string; en: string };
        };
    };
    transmission: {
        title: { id: string; en: string };
        text: { id: string; en: string };
    };
    symptoms: {
        title: { id: string; en: string };
        text: { id: string; en: string };
    };
}

export interface PandemicProfile {
    id: "black-death-1347" | "spanish-flu-1918" | "covid-19";
    year: number;
    eraLabel: string;
    name: { id: string; en: string };
    pathogenName: string;
    aboutTitle: { id: string; en: string };
    aboutOverview: { id: string; en: string };
    tickerExtremesFile: string;
    surveillanceFile: string;
    themeColor: string;
    atmosphereHex: string;
    era?: string;
    pathogen?: string;
    globeAtmosphere?: string;
    globalFatalities?: string;
    status?: "active" | "classified_archive";
    route?: string;
    baseYear?: number;
    epicenters?: string[];
    defaultCameraPosition?: [number, number, number];
    clinicalProfile?: ClinicalProfile;
}

export type PandemicMeta = PandemicProfile;
export type PandemicConfig = PandemicProfile;

export const PANDEMIC_REGISTRY: PandemicProfile[] = [
    {
        id: "black-death-1347",
        year: 1347,
        eraLabel: "1346 – 1353",
        name: { id: "Maut Hitam (Black Death)", en: "The Black Death" },
        pathogenName: "Yersinia pestis (Bakteri Pes)",
        aboutTitle: {
            id: "Mengenal Maut Hitam (1347)",
            en: "Understanding The Black Death (1347)",
        },
        aboutOverview: {
            id: "Pandemi pes bubonik paling mematikan dalam sejarah manusia, menyapu sepertiga hingga separuh populasi Eurasia dan Afrika Utara.",
            en: "The deadliest bubonic plague pandemic in human history, wiping out an estimated 30% to 60% of the Eurasian and North African population.",
        },
        tickerExtremesFile: "black-death-1347/extremes.json",
        surveillanceFile: "black-death-1347/surveillance.json",
        themeColor: "#e11d48",
        atmosphereHex: "#881337",
        era: "1346 – 1353",
        pathogen: "Yersinia pestis",
        globeAtmosphere: "#881337",
        globalFatalities: "~75M - 200M",
        status: "classified_archive",
        route: "/globe/black-death-1347",
        baseYear: 1347,
        epicenters: ["it", "fr", "gb", "cn"],
        defaultCameraPosition: [45, 15, 2.3],
        clinicalProfile: {
            classification: {
                title: {
                    id: "Klasifikasi Biologis & Struktur Patogen",
                    en: "Biological Classification & Pathogen Structure",
                },
                text: {
                    id: "Yersinia pestis adalah basil Gram-negatif, anaerob fakultatif non-motil dari famili Yersiniaceae. Bakteri ini berevolusi dari nenek moyang Yersinia pseudotuberculosis melalui akuisisi plasmid virulensi (pPst/pPCP1 dan pFra/pMT1) yang memungkinkannya bertahan hidup di dalam kutu vektor dan menyerang makrofag mamalia.",
                    en: "Yersinia pestis is a Gram-negative, facultatively anaerobic non-motile coccobacillus of the family Yersiniaceae. It evolved from Yersinia pseudotuberculosis via virulence plasmid acquisition (pPCP1 and pMT1), facilitating survival within flea vectors and evasion of mammalian macrophages.",
                },
            },
            metrics: {
                incubation: {
                    title: { id: "Masa Inkubasi", en: "Incubation Period" },
                    value: "2 – 6 Hari",
                    sub: { id: "Pes Bubonik Akut", en: "Acute Bubonic Plague" },
                },
                receptor: {
                    title: { id: "Vektor Utama", en: "Primary Vector" },
                    value: "X. cheopis",
                    sub: { id: "Kutu Tikus Oriental", en: "Oriental Rat Flea" },
                },
                family: {
                    title: { id: "Famili Bakteri", en: "Bacterial Family" },
                    value: "Yersiniaceae",
                    sub: { id: "Enterobacterales", en: "Enterobacterales" },
                },
            },
            transmission: {
                title: {
                    id: "Vektor & Rute Transmisi",
                    en: "Transmission Vectors",
                },
                text: {
                    id: "Gigitan kutu tikus (Xenopsylla cheopis) yang mengalami penyumbatan proventrikulus akibat biofilm bakteri, memicu muntahan regurgitasi darah ke inang. Pada fase pes pneumonik sekunder, penularan bereskalasi secara aerogen antar-manusia melalui aerosol pernapasan dengan fatalitas mendekati 100% tanpa terapi.",
                    en: "Bites from blocked rat fleas (Xenopsylla cheopis) regurgitating contaminated blood into hosts. In pneumonic plague phases, transmission escalates person-to-person via airborne droplets with near 100% case fatality untreated.",
                },
            },
            symptoms: {
                title: {
                    id: "Manifestasi Klinis Karakteristik",
                    en: "Clinical Manifestations",
                },
                text: {
                    id: "Pembengkakan kelenjar getah bening yang sangat nyeri (bubo) di lipat paha, ketiak, atau leher; demam tinggi mendadak (39°C - 41°C), menggigil hebat, prostrasi, hemoptisis masif (pada tipe pneumonik), dan nekrosis akral kehitaman pada jari-jari akibat koagulasi intravaskular diseminata (DIC).",
                    en: "Excruciatingly painful lymphadenopathy (buboes) in groin, axilla, or neck; acute high fevers (39°C - 41°C), violent rigors, prostration, coughing blood (pneumonic form), and black acral necrosis from disseminated intravascular coagulation.",
                },
            },
        },
    },
    {
        id: "spanish-flu-1918",
        year: 1918,
        eraLabel: "1918 – 1920",
        name: { id: "Flu Spanyol 1918", en: "1918 Spanish Flu" },
        pathogenName: "H1N1 Influenza A Virus",
        aboutTitle: {
            id: "Mengenal Flu Spanyol (1918)",
            en: "Understanding Spanish Flu (1918)",
        },
        aboutOverview: {
            id: "Pandemi flu mematikan yang menyebar di tengah Perang Dunia I, menewaskan puluhan juta jiwa terutama usia muda produktif.",
            en: "A deadly influenza pandemic overlapping World War I troop movements, claiming tens of millions of primarily young adult lives.",
        },
        tickerExtremesFile: "spanish-flu-1918/extremes.json",
        surveillanceFile: "spanish-flu-1918/surveillance.json",
        themeColor: "#f59e0b",
        atmosphereHex: "#b45309",
        era: "1918 – 1920",
        pathogen: "H1N1 Influenza A Virus",
        globeAtmosphere: "#b45309",
        globalFatalities: "~50M+",
        status: "classified_archive",
        route: "/globe/spanish-flu-1918",
        baseYear: 1918,
        epicenters: ["us", "fr", "es", "gb"],
        defaultCameraPosition: [40, -40, 2.3],
        clinicalProfile: {
            classification: {
                title: {
                    id: "Klasifikasi Biologis & Struktur Patogen",
                    en: "Biological Classification & Pathogen Structure",
                },
                text: {
                    id: "Virus Influenza A subtipe H1N1 adalah virus RNA beruntai tunggal (ssRNA) antisense bersegmen 8 dari famili Orthomyxoviridae. Virion beramplop ini mengkodekan glikoprotein permukaan Hemagglutinin (H1) dan Neuraminidase (N1) yang beradaptasi secara ganas pada reseptor saluran napas manusia.",
                    en: "Influenza A virus subtype H1N1 is an enveloped, segmented 8-piece negative-sense single-stranded RNA virus of the Orthomyxoviridae family. Surface glycoproteins Hemagglutinin (H1) and Neuraminidase (N1) possessed exceptionally lethal affinity for human airway receptors.",
                },
            },
            metrics: {
                incubation: {
                    title: { id: "Masa Inkubasi", en: "Incubation Period" },
                    value: "1 – 4 Hari",
                    sub: {
                        id: "Onset Sangat Cepat",
                        en: "Rapid Fulminant Onset",
                    },
                },
                receptor: {
                    title: { id: "Reseptor Seluler", en: "Host Receptor" },
                    value: "Sialic Acid",
                    sub: {
                        id: "Alfa-2,3 / Alfa-2,6",
                        en: "Alpha-2,3 / Alpha-2,6",
                    },
                },
                family: {
                    title: { id: "Famili Virus", en: "Viral Family" },
                    value: "Orthomyxo",
                    sub: { id: "Influenza A", en: "Influenza A Genus" },
                },
            },
            transmission: {
                title: {
                    id: "Vektor & Rute Transmisi",
                    en: "Transmission Vectors",
                },
                text: {
                    id: "Aerosol pernapasan langsung saat batuk, bersin, dan berbicara di ruang padat tanpa ventilasi (barak militer, kapal angkut pasukan PD I, dan gerbong kereta api). Infeksiusitas tinggi didorong oleh mobilitas prajurit global tanpa protokol karantina.",
                    en: "Direct airborne droplet nuclei from coughing and sneezing in overcrowded, poorly ventilated wartime quarters (military camps, troopships, and trains), fueled by worldwide troop demobilization.",
                },
            },
            symptoms: {
                title: {
                    id: "Manifestasi Klinis Karakteristik",
                    en: "Clinical Manifestations",
                },
                text: {
                    id: "Badai sitokin hiper-inflamasi masif yang terutama menyerang orang dewasa muda usia 20–40 tahun. Edema paru berdarah akut (acute hemorrhagic pulmonary edema) menyebabkan heliotrope cyanosis—kulit pasien berubah menjadi biru kehitaman akibat kekurangan oksigen fatal sebelum meninggal karena asfiksia.",
                    en: "Severe cytokine storms paradoxically striking robust young adults aged 20–40. Acute hemorrhagic pulmonary edema rapidly caused heliotrope cyanosis—bluish-purple discoloration of the face as alveoli filled with bloody fluid.",
                },
            },
        },
    },
    {
        id: "covid-19",
        year: 2020,
        eraLabel: "2019 – 2023",
        name: { id: "SARS-CoV-2 (COVID-19)", en: "SARS-CoV-2 (COVID-19)" },
        pathogenName: "SARS-CoV-2 Coronavirus",
        aboutTitle: {
            id: "Mengenal COVID-19 (2020)",
            en: "Understanding COVID-19 (2020)",
        },
        aboutOverview: {
            id: "Krisis kesehatan global era modern yang menguji ketahanan rantai pasok, bioteknologi mRNA, dan tatanan geopolitik internasional.",
            en: "A modern respiratory pandemic testing global biosecurity, mRNA biotechnology, and international public health governance.",
        },
        tickerExtremesFile: "covid-19/global-extremes.json",
        surveillanceFile: "covid-19/global-surveillance.json",
        themeColor: "#06b6d4",
        atmosphereHex: "#0e7490",
        era: "2019 – 2023",
        pathogen: "SARS-CoV-2 Coronavirus",
        globeAtmosphere: "#0e7490",
        globalFatalities: "~7M - 20M+",
        status: "active",
        route: "/globe/covid-19",
        baseYear: 2019,
        epicenters: ["id", "cn", "it", "us", "in"],
        defaultCameraPosition: [10, 100, 2.3],
        clinicalProfile: {
            classification: {
                title: {
                    id: "Klasifikasi Biologis & Struktur Patogen",
                    en: "Biological Classification & Virion Structure",
                },
                text: {
                    id: "SARS-CoV-2 adalah virus RNA beruntai tunggal sense-positif (+ssRNA) beramplop dalam genus Betacoronavirus famili Coronaviridae. Genomnya (~29.9 kb) mengkodekan empat protein struktural utama: Spike (S), Envelope (E), Membrane (M), dan Nucleocapsid (N), dengan situs pembelahan furin unik pada protein S.",
                    en: "SARS-CoV-2 is an enveloped, positive-sense single-stranded RNA (+ssRNA) virus belonging to the genus Betacoronavirus, family Coronaviridae. Its ~29.9 kb genome encodes four core structural proteins: Spike (S), Envelope (E), Membrane (M), and Nucleocapsid (N), characterized by a polybasic furin cleavage site.",
                },
            },
            metrics: {
                incubation: {
                    title: { id: "Masa Inkubasi", en: "Incubation Period" },
                    value: "2 – 14 Hari",
                    sub: { id: "Median 4-5 Hari", en: "Median 4-5 Days" },
                },
                receptor: {
                    title: { id: "Afinitas Reseptor", en: "Target Receptor" },
                    value: "ACE2",
                    sub: {
                        id: "Situs Furin + TMPRSS2",
                        en: "Furin + TMPRSS2 Sites",
                    },
                },
                family: {
                    title: { id: "Famili Virus", en: "Viral Family" },
                    value: "Coronaviridae",
                    sub: { id: "Betacoronavirus", en: "Betacoronavirus" },
                },
            },
            transmission: {
                title: {
                    id: "Vektor & Rute Transmisi",
                    en: "Transmission Vectors",
                },
                text: {
                    id: "Transmisi utama terjadi melalui aerosol droplet mikro (<5 μm) yang melayang di udara tertutup, droplet pernapasan jarak dekat, dan kontak mukosa. Penularan asimtomatik dan presimtomatik berperan masif dalam penyebaran global.",
                    en: "Primary transmission occurs via short-range inhalable respiratory aerosols (<5 μm) suspended in enclosed air spaces, droplets, and fomite mucosal contact. Presymptomatic transmission was a major driver of pandemic speed.",
                },
            },
            symptoms: {
                title: {
                    id: "Manifestasi Klinis Karakteristik",
                    en: "Clinical Manifestations",
                },
                text: {
                    id: "Sindrom Gangguan Pernapasan Akut (ARDS), demam, batuk kering persisten, fatigue berat, anosmia/ageusia akut, infiltrat bilateral 'ground-glass opacities' pada CT paru, dan fenomena desaturasi hipoksia tanpa sesak (silent/happy hypoxia).",
                    en: "Acute Respiratory Distress Syndrome (ARDS), pyrexia, persistent dry cough, profound fatigue, acute anosmia/dysgeusia, bilateral ground-glass opacities on thoracic CT, and silent (happy) arterial hypoxemia.",
                },
            },
        },
    },
];

/**
 * Historical epicenters for 1918 Spanish Flu
 */
export const SPANISH_FLU_EPICENTERS: Record<string, EpicenterMetadata> = {
    US: {
        code: "US",
        iso3: "USA",
        name: { id: "Amerika Serikat (Kansas)", en: "United States (Kansas)" },
        sectorCode: "SECTOR // USA - HASKELL / CAMP FUNSTON",
        coordinates: { lat: 39.0119, lng: -98.4842, altitude: 1.05 },
        beaconColor: "#f59e0b",
        status: {
            id: "ARSIP TERENKRIPSI // SEDANG DIDEKLASIFIKASI",
            en: "CLASSIFIED ARCHIVE // DRAFTING",
        },
        synopsis: {
            id: "Penyebaran awal gelombang pertama di barak militer Camp Funston, Fort Riley, Kansas pada Maret 1918.",
            en: "First wave ground zero across Camp Funston barracks, Fort Riley, Kansas in March 1918.",
        },
        timelinePeriod: {
            id: "Maret 1918 - Mei 1919",
            en: "March 1918 - May 1919",
        },
    },
    FR: {
        code: "FR",
        iso3: "FRA",
        name: { id: "Prancis (Étaples)", en: "France (Étaples)" },
        sectorCode: "SECTOR // FRA - WESTERN FRONT / ÉTAPLES",
        coordinates: { lat: 50.5186, lng: 1.6397, altitude: 1.05 },
        beaconColor: "#f59e0b",
        status: {
            id: "ARSIP TERENKRIPSI // SEDANG DIDEKLASIFIKASI",
            en: "CLASSIFIED ARCHIVE // DRAFTING",
        },
        synopsis: {
            id: "Vektor transmisi masif di kamp militer Étaples dan parit Perang Dunia I front barat.",
            en: "Massive transmission vector across Étaples staging camp and Western Front WW1 trenches.",
        },
        timelinePeriod: {
            id: "April 1918 - November 1918",
            en: "April 1918 - November 1918",
        },
    },
    ES: {
        code: "ES",
        iso3: "ESP",
        name: { id: "Spanyol (Madrid)", en: "Spain (Madrid)" },
        sectorCode: "SECTOR // ESP - MADRID / UNCENSORED PRESS",
        coordinates: { lat: 40.4168, lng: -3.7038, altitude: 1.05 },
        beaconColor: "#f59e0b",
        status: {
            id: "ARSIP TERENKRIPSI // SEDANG DIDEKLASIFIKASI",
            en: "CLASSIFIED ARCHIVE // DRAFTING",
        },
        synopsis: {
            id: "Pemberitaan bebas tanpa sensor masa perang yang membuat pandemi ini dinamai Flu Spanyol.",
            en: "Uncensored wartime reporting of King Alfonso XIII's illness, giving the pandemic its moniker.",
        },
        timelinePeriod: { id: "Mei 1918 - 1920", en: "May 1918 - 1920" },
    },
    GB: {
        code: "GB",
        iso3: "GBR",
        name: { id: "Britania Raya (London)", en: "United Kingdom (London)" },
        sectorCode: "SECTOR // GBR - FLEET TRANSMISSION",
        coordinates: { lat: 55.3781, lng: -3.436, altitude: 1.05 },
        beaconColor: "#f59e0b",
        status: {
            id: "ARSIP TERENKRIPSI // SEDANG DIDEKLASIFIKASI",
            en: "CLASSIFIED ARCHIVE // DRAFTING",
        },
        synopsis: {
            id: "Gelombang kedua mematikan yang melumpuhkan armada kapal perang dan pusat industri Britania.",
            en: "Lethal second wave autumn 1918 paralyzing naval grand fleets and industrial heartlands.",
        },
        timelinePeriod: {
            id: "Mei 1918 - Maret 1919",
            en: "May 1918 - March 1919",
        },
    },
};

/**
 * Historical epicenters for 1347 Black Death
 */
export const BLACK_DEATH_EPICENTERS: Record<string, EpicenterMetadata> = {
    IT: {
        code: "IT",
        iso3: "ITA",
        name: {
            id: "Italia (Sisilia / Messina)",
            en: "Italy (Sicily / Messina)",
        },
        sectorCode: "SECTOR // ITA - MESSINA GROUND ZERO",
        coordinates: { lat: 38.1938, lng: 15.554, altitude: 1.05 },
        beaconColor: "#e11d48",
        status: {
            id: "ARSIP TERENKRIPSI // SEDANG DIDEKLASIFIKASI",
            en: "CLASSIFIED ARCHIVE // DRAFTING",
        },
        synopsis: {
            id: "Dua belas kapal dagang Genoa merapat di pelabuhan Messina membawa awak sekarat dan wabah pes bubonik.",
            en: "Twelve Genoese merchant galleys docked at Messina harbor bearing dying crews and Yersinia pestis.",
        },
        timelinePeriod: {
            id: "Oktober 1347 - 1348",
            en: "October 1347 - 1348",
        },
    },
    FR: {
        code: "FR",
        iso3: "FRA",
        name: { id: "Prancis (Marseille)", en: "France (Marseille)" },
        sectorCode: "SECTOR // FRA - MARSEILLE MARITIME BREACH",
        coordinates: { lat: 43.2965, lng: 5.3698, altitude: 1.05 },
        beaconColor: "#e11d48",
        status: {
            id: "ARSIP TERENKRIPSI // SEDANG DIDEKLASIFIKASI",
            en: "CLASSIFIED ARCHIVE // DRAFTING",
        },
        synopsis: {
            id: "Penyusupan pes melalui dermaga Mediterania menuju Rhone Valley dan Istana Kepausan Avignon.",
            en: "Mediterranean port infiltration spreading inland through Rhône Valley to the Avignon Papacy.",
        },
        timelinePeriod: {
            id: "November 1347 - 1349",
            en: "November 1347 - 1349",
        },
    },
    GB: {
        code: "GB",
        iso3: "GBR",
        name: {
            id: "Inggris (Melcombe Regis)",
            en: "England (Melcombe Regis)",
        },
        sectorCode: "SECTOR // GBR - MELCOMBE REGIS",
        coordinates: { lat: 50.6137, lng: -2.4576, altitude: 1.05 },
        beaconColor: "#e11d48",
        status: {
            id: "ARSIP TERENKRIPSI // SEDANG DIDEKLASIFIKASI",
            en: "CLASSIFIED ARCHIVE // DRAFTING",
        },
        synopsis: {
            id: "Kedatangan kapal dagang di Melcombe Regis Dorset yang memicu kehancuran demografi di seluruh Britania.",
            en: "Arrival of a Gascon vessel at Melcombe Regis, Dorset, sparking devastation across the British Isles.",
        },
        timelinePeriod: { id: "Juni 1348 - 1350", en: "June 1348 - 1350" },
    },
    CN: {
        code: "CN",
        iso3: "CHN",
        name: { id: "Tiongkok (Jalur Sutra)", en: "China (Silk Road)" },
        sectorCode: "SECTOR // CHN - CENTRAL ASIAN CARAVAN VECTOR",
        coordinates: { lat: 34.3416, lng: 108.9398, altitude: 1.05 },
        beaconColor: "#e11d48",
        status: {
            id: "ARSIP TERENKRIPSI // SEDANG DIDEKLASIFIKASI",
            en: "CLASSIFIED ARCHIVE // DRAFTING",
        },
        synopsis: {
            id: "Titik reservoir liar pes pada koloni marmot padang rumput Asia Tengah yang terbawa kafilah Jalur Sutra.",
            en: "Wild marmot rodent reservoir vector transmitted westwards along Mongol Silk Road trade routes.",
        },
        timelinePeriod: { id: "1330-an - 1346", en: "1330s - 1346" },
    },
};

/**
 * Retrieve epicenter registry for any pandemic.
 */
export function getEpicentersForPandemic(
    pandemicId: string,
): Record<string, EpicenterMetadata> {
    const pId = pandemicId.toLowerCase();
    if (pId === "spanish-flu-1918") return SPANISH_FLU_EPICENTERS;
    if (pId === "black-death-1347") return BLACK_DEATH_EPICENTERS;
    return EPICENTER_REGISTRY;
}

/**
 * Retrieve configuration metadata for a registered pandemic.
 */
export function getPandemicConfig(
    pandemicId: string,
): PandemicProfile | undefined {
    return PANDEMIC_REGISTRY.find(
        (p) => p.id.toLowerCase() === pandemicId.toLowerCase(),
    );
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
    if (code === "fra") return "fr";
    if (code === "esp") return "es";
    if (code === "gbr") return "gb";
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

        return null;
    } catch (err) {
        console.error(
            `[loadDossier] Failed to load dossier for pandemic "${pId}", sector "${cCode}":`,
            err,
        );
        return null;
    }
}
