import { Chapter, CountrySurveillanceData } from "@/types/journey";
import { EPICENTER_REGISTRY, EpicenterMetadata } from "./countriesConfig";

import justinianSurveillance from "@/data/pandemics/plague-of-justinian-541/surveillance.json";
import blackDeathSurveillance from "@/data/pandemics/black-death-1347/surveillance.json";
import choleraSurveillance from "@/data/pandemics/cholera-1817/surveillance.json";
import spanishFluSurveillance from "@/data/pandemics/spanish-flu-1918/surveillance.json";
import covidSurveillance from "@/data/pandemics/covid-19/global-surveillance.json";
import { CHOLERA_WAVES } from "@/data/pandemics/cholera/waves";

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
    id:
        | "plague-of-justinian-541"
        | "black-death-1347"
        | "cholera-series"
        | "cholera-1817"
        | "spanish-flu-1918"
        | "covid-19"
        | string;
    year: number;
    eraLabel: string;
    name: { id: string; en: string };
    shortLabel: string;
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
    primaryEpicenters?: string[];
    surveillanceRegions?: string[];
    haloHex?: string;
    cameraInitialPosition?: {
        lat: number;
        lng: number;
        altitude: number;
    };
    defaultCameraPosition?: [number, number, number];
    clinicalProfile?: ClinicalProfile;
}

export type PandemicMeta = PandemicProfile;
export type PandemicConfig = PandemicProfile;

export const PANDEMIC_REGISTRY: PandemicProfile[] = [
    {
        id: "plague-of-justinian-541",
        year: 541,
        eraLabel: "541 – 549 M",
        name: {
            id: "Wabah Yustinianus (541 M)",
            en: "Plague of Justinian (541 AD)",
        },
        shortLabel: "541 // JUSTINIAN",
        pathogenName: "Yersinia pestis",
        aboutTitle: {
            id: "Mengenal Wabah Yustinianus (541 M)",
            en: "Understanding the Plague of Justinian (541 AD)",
        },
        aboutOverview: {
            id: "Pandemi pes pertama yang terdokumentasi dalam sejarah, melumpuhkan Kekaisaran Romawi Timur (Bizantium) dan mengubah peta geopolitik Mediterania kuno.",
            en: "The first historically recorded plague pandemic, devastating the Byzantine Empire and reshaping the ancient Mediterranean geopolitical landscape.",
        },
        tickerExtremesFile: "plague-of-justinian-541/extremes.json",
        surveillanceFile: "plague-of-justinian-541/surveillance.json",
        themeColor: "#a855f7",
        atmosphereHex: "#581c87",
        era: "541 – 549 M",
        pathogen: "Yersinia pestis",
        globeAtmosphere: "#581c87",
        globalFatalities: "~25M - 50M",
        status: "active",
        route: "/globe/plague-of-justinian-541",
        baseYear: 541,
        epicenters: ["CPX", "PEL", "SAS", "ROM"],
        primaryEpicenters: ["CPX", "PEL", "SAS", "ROM"],
        defaultCameraPosition: [0.35, 1.2, 1.8],
        clinicalProfile: {
            classification: {
                title: {
                    id: "Klasifikasi Biologis & Struktur Patogen",
                    en: "Biological Classification & Pathogen Structure",
                },
                text: {
                    id: "Yersinia pestis garis keturunan purba (lineage 0.ANT) adalah bakteri basil kokoid Gram-negatif yang menyusup ke sirkulasi darah melalui gigitan kutu Xenopsylla cheopis yang terbawa muatan gandum dari lembah Sungai Nil.",
                    en: "An ancestral lineage of Yersinia pestis (0.ANT), this Gram-negative coccobacillus entered the human bloodstream via Xenopsylla cheopis fleas transported on grain ships from the Nile valley.",
                },
            },
            metrics: {
                incubation: {
                    title: { id: "Masa Inkubasi", en: "Incubation Period" },
                    value: "2 – 7 Hari",
                    sub: {
                        id: "Pes Bubonik Kuno",
                        en: "Ancient Bubonic Plague",
                    },
                },
                receptor: {
                    title: { id: "Vektor Utama", en: "Primary Vector" },
                    value: "X. cheopis",
                    sub: { id: "Kutu Tikus Nil", en: "Nile Rat Flea" },
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
                    id: "Penyebaran awal melalui kutu tikus hitam yang bersarang di lambung kapal gandum kekaisaran, kemudian bertransisi menjadi aerosol droplet antar-manusia (pes pneumonik) di pemukiman padat Konstantinopel.",
                    en: "Initial propagation via black rat fleas infesting imperial grain galleys, escalating to airborne respiratory droplet transmission in the overcrowded quarters of Constantinople.",
                },
            },
            symptoms: {
                title: {
                    id: "Manifestasi Klinis Karakteristik",
                    en: "Clinical Manifestations",
                },
                text: {
                    id: "Bubo supuratif di paha dan selangkangan, demam intempestif hebat, delirium, halusinasi, hematemesis, dan koma sebelum henti sirkulasi jantung.",
                    en: "Suppurating groin buboes, severe malignant fevers, intense delirium, hallucinations, hematemesis, and lethargic comas preceding terminal collapse.",
                },
            },
        },
    },
    {
        id: "black-death-1347",
        year: 1347,
        eraLabel: "1347 – 1353 M",
        name: {
            id: "Maut Hitam (1347 M)",
            en: "The Black Death (1347 AD)",
        },
        shortLabel: "1347 // BLACK DEATH",
        pathogenName: "Yersinia pestis (Galur Medievalis)",
        aboutTitle: {
            id: "Maut Hitam: Apokalips Abad Pertengahan (1347 – 1353 M)",
            en: "The Black Death: The Medieval Apocalypse (1347 – 1353 AD)",
        },
        aboutOverview: {
            id: "Maut Hitam adalah bencana demografi terbesar dalam sejarah tertulis manusia. Bermula dari stepa Asia Tengah dan jalur perdagangan Pax Mongolica, bakteri pes meledak di Krimea sebelum menembus Mediterania lewat armada dagang Genoa. Pandemi ini meruntuhkan sistem ekonomi manor feodal, mengguncang otoritas absolut Gereja Katolik Roma, dan memicu restrukturisasi radikal atas upah buruh dan tatanan sosial Eropa.",
            en: "The Black Death stands as the single most devastating demographic catastrophe in recorded human history. Originating in the Central Asian steppes along Pax Mongolica trade arteries, the pestilence erupted in Crimea before penetrating the Mediterranean via Genoese merchant galleys. The pandemic dismantled the feudal manorial economy, destabilized the absolute authority of the Roman Catholic Church, and catalyzed radical social restructuring.",
        },
        tickerExtremesFile: "black-death-1347/extremes.json",
        surveillanceFile: "black-death-1347/surveillance.json",
        themeColor: "#e11d48",
        haloHex: "rgba(225, 29, 72, 0.4)",
        atmosphereHex: "#881337",
        era: "1347 – 1353 M",
        pathogen: "Yersinia pestis (Galur Medievalis)",
        globeAtmosphere: "#881337",
        globalFatalities:
            "75.000.000 – 200.000.000 (≈ 30–60% Populasi Eurasia)",
        status: "active",
        cameraInitialPosition: {
            lat: 45.0,
            lng: 35.0,
            altitude: 2.2,
        },
        defaultCameraPosition: [45.0, 35.0, 2.2],
        route: "/globe/black-death-1347",
        baseYear: 1347,
        epicenters: ["KAF", "MES", "LON", "PAR"],
        primaryEpicenters: ["KAF", "MES", "LON", "PAR"],
        surveillanceRegions: ["FLR", "AVN", "VEN", "KRA", "MOS", "CAI"],
        clinicalProfile: {
            classification: {
                title: {
                    id: "Klasifikasi Biologis & Struktur Patogen",
                    en: "Biological Classification & Pathogen Structure",
                },
                text: {
                    id: "Yersinia pestis adalah basil Gram-negatif, anaerob fakultatif non-motil dari famili Yersiniaceae. Bakteri ini berevolusi dari nenek moyang Yersinia pseudotuberculosis melalui akuisisi plasmid virulensi (pPst/pPCP1 dan pFra/pMT1).",
                    en: "Yersinia pestis is a Gram-negative, facultatively anaerobic non-motile coccobacillus of the family Yersiniaceae. It evolved from Yersinia pseudotuberculosis via virulence plasmid acquisition (pPCP1 and pMT1).",
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
                    id: "Gigitan kutu tikus terblokir yang memuntahkan darah ke inang, aerosol pernapasan antar-manusia pada pes pneumonik sekunder, dan kontak cairan jaringan terbuka.",
                    en: "Bites from blocked rat fleas regurgitating contaminated blood into hosts, person-to-person respiratory droplets in pneumonic phases, and contact with infectious tissue fluids.",
                },
            },
            symptoms: {
                title: {
                    id: "Manifestasi Klinis Karakteristik",
                    en: "Clinical Manifestations",
                },
                text: {
                    id: "Pembengkakan kelenjar getah bening (bubo) di ketiak dan selangkangan, demam tinggi mendadak, menggigil hebat, prostrasi, dan nekrosis akral kehitaman pada ekstremitas.",
                    en: "Painful lymphadenopathy (buboes) in axilla and groin, sudden acute pyrexia, violent rigors, prostration, and black acral necrosis from disseminated intravascular coagulation.",
                },
            },
        },
    },
    {
        id: "cholera-series",
        year: 1817,
        eraLabel: "1817 – Sekarang",
        name: {
            id: "Pandemi Kolera (1817 – Sekarang)",
            en: "The Cholera Pandemics (1817 – Present)",
        },
        shortLabel: "1817 – NOW // CHOLERA",
        pathogenName: "Vibrio cholerae (7 Pandemi Global)",
        aboutTitle: {
            id: "Tujuh Pandemi Kolera: Sejarah Global (1817 – Sekarang)",
            en: "The Seven Cholera Pandemics: A Global History (1817 – Present)",
        },
        aboutOverview: {
            id: "Selama lebih dari dua abad, Vibrio cholerae telah memicu tujuh pandemi global terpisah. Dari rawa-rawa Jessore pada 1817, penyelidikan revolusioner Dr. John Snow di London 1854, penemuan basil Robert Koch 1883, hingga munculnya mutasi El Tor di Sulawesi 1961 yang masih bertahan hingga kini, kolera terus menguji ketahanan sanitasi dan ketimpangan peradaban manusia.",
            en: "Over more than two centuries, Vibrio cholerae has sparked seven distinct global pandemics. From the Jessore wetlands in 1817, Dr. John Snow's groundbreaking London 1854 investigation, Robert Koch's 1883 bacillus isolation, to the 1961 Sulawesi El Tor pandemic that persists today, cholera remains the ultimate litmus test of sanitation and human vulnerability.",
        },
        tickerExtremesFile: "cholera/extremes.json",
        surveillanceFile: "cholera/surveillance.json",
        themeColor: "#06b6d4",
        haloHex: "rgba(6, 182, 212, 0.4)",
        atmosphereHex: "#083344",
        era: "1817 – Sekarang",
        pathogen: "Vibrio cholerae (Klasik & El Tor)",
        globeAtmosphere: "#083344",
        globalFatalities: "Puluhan Juta Jiwa (1817 – Sekarang)",
        status: "active",
        cameraInitialPosition: {
            lat: 23.1687,
            lng: 89.2173,
            altitude: 2.2,
        },
        defaultCameraPosition: [23.1687, 89.2173, 2.2],
        route: "/globe/cholera-series",
        baseYear: 1817,
        epicenters: ["JES", "BAT", "BSO"],
        primaryEpicenters: ["JES", "BAT", "BSO"],
        surveillanceRegions: ["BAG", "AST"],
        clinicalProfile: {
            classification: {
                title: {
                    id: "Klasifikasi Biologis & Dua Biotipe Pandemi",
                    en: "Biological Classification & Pandemic Biotypes",
                },
                text: {
                    id: "Vibrio cholerae serogrup O1 terbagi menjadi dua biotipe utama: Klasik (penyebab Gelombang 1 hingga 6) dan El Tor (penyebab Gelombang 7 sejak 1961), memproduksi toksin kolera enteropatogenik.",
                    en: "Vibrio cholerae O1 serogroup encompasses two major biotypes: Classical (responsible for Waves 1–6) and El Tor (driving Wave 7 since 1961), expressing potent enterotoxin (CTX).",
                },
            },
            metrics: {
                incubation: {
                    title: { id: "Masa Inkubasi", en: "Incubation Period" },
                    value: "2 Jam – 5 Hari",
                    sub: { id: "Median 1-2 Hari", en: "Median 1-2 Days" },
                },
                receptor: {
                    title: { id: "Reseptor Enterosit", en: "Target Receptor" },
                    value: "GM1 Ganglioside",
                    sub: { id: "Hipersekresi cAMP", en: "cAMP Secretion" },
                },
                family: {
                    title: { id: "Famili Bakteri", en: "Bacterial Family" },
                    value: "Vibrionaceae",
                    sub: {
                        id: "Gammaproteobacteria",
                        en: "Gammaproteobacteria",
                    },
                },
            },
            transmission: {
                title: {
                    id: "Vektor & Rute Transmisi",
                    en: "Transmission Vectors",
                },
                text: {
                    id: "Penularan fekal-oral melalui air minum dan makanan yang terkontaminasi limbah tinja, estuaria payau, serta penyebaran maritim via air balas kapal niaga.",
                    en: "Fecal-oral transmission through sewage-tainted drinking water, marine estuaries, and maritime ballast water transit.",
                },
            },
            symptoms: {
                title: {
                    id: "Manifestasi Klinis Karakteristik",
                    en: "Clinical Manifestations",
                },
                text: {
                    id: "Diare masif 'air cucian beras' (rice-water stools), muntah mendadak, kram otot ekstrem, dehidrasi hipovolemik kilat, dan asfiksia jaringan kering fatal dalam < 12 jam tanpa rehidrasi.",
                    en: "Profuse painless 'rice-water' diarrhea, vomiting, severe muscle cramps, rapid hypovolemic collapse, and fatal dehydration in < 12 hours without rehydration.",
                },
            },
        },
    },
    {
        id: "spanish-flu-1918",
        year: 1918,
        eraLabel: "1918 – 1920 M",
        name: { id: "Flu Spanyol (1918 M)", en: "Spanish Flu (1918 AD)" },
        shortLabel: "1918 // SPANISH FLU",
        pathogenName: "H1N1 Influenza A Virus",
        aboutTitle: {
            id: "Mengenal Flu Spanyol: Pandemi Influenza 1918 (1918 – 1920 M)",
            en: "Understanding the Spanish Flu: The 1918 Influenza Pandemic (1918 – 1920 AD)",
        },
        aboutOverview: {
            id: "Pandemi Flu 1918 (Flu Spanyol) adalah salah satu bencana biologis paling mematikan dalam sejarah peradaban manusia. Dipicu oleh virus influenza A subtipe H1N1 yang bermutasi ganas di tengah pergolakan Perang Dunia I, virus ini menyebar ke seluruh penjuru bumi melalui kapal angkut pasukan, barak militer yang sesak, dan jalur kereta api. Menyerang secara asimetris populasi dewasa muda berusia 20–40 tahun akibat badai sitokin (edema paru hemoragik), pandemi ini menulari sepertiga populasi dunia dan merenggut 50 hingga 100 juta jiwa, melahirkan disiplin virologi modern serta protokol kesehatan masyarakat berskala global.",
            en: "The 1918 Influenza Pandemic ('Spanish Flu') stands as one of the deadliest biological catastrophes in recorded human history. Driven by a virulent H1N1 Influenza A strain mutating amidst the turmoil of World War I, it circled the globe via troop transports, overcrowded barracks, and wartime railway networks. Uniquely lethal to healthy young adults aged 20–40 due to massive inflammatory cytokine storms and acute pulmonary hemorrhage, it infected approximately 500 million people—one-third of the global population—claiming 50 to 100 million lives and revolutionizing public health epidemiology.",
        },
        tickerExtremesFile: "spanish-flu-1918/extremes.json",
        surveillanceFile: "spanish-flu-1918/surveillance.json",
        themeColor: "#f59e0b",
        haloHex: "rgba(245, 158, 11, 0.45)",
        atmosphereHex: "#b45309",
        era: "1918 – 1920 M",
        pathogen: "H1N1 Influenza A Virus",
        globeAtmosphere: "#b45309",
        globalFatalities: "50.000.000 – 100.000.000 (≈ 3–5% Populasi Dunia)",
        status: "active",
        cameraInitialPosition: {
            lat: 40.0,
            lng: -20.0,
            altitude: 2.2,
        },
        defaultCameraPosition: [40.0, -20.0, 2.2],
        route: "/globe/spanish-flu-1918",
        baseYear: 1918,
        epicenters: ["US", "FR", "ES", "GB", "IN", "ID"],
        primaryEpicenters: ["US", "FR", "ES", "GB", "IN", "ID"],
        surveillanceRegions: [
            "DE",
            "IT",
            "RU",
            "BR",
            "JP",
            "ZA",
            "WS",
            "NZ",
            "CN",
        ],
        clinicalProfile: {
            classification: {
                title: {
                    id: "Klasifikasi Biologis & Struktur Patogen",
                    en: "Biological Classification & Pathogen Structure",
                },
                text: {
                    id: "Virus Influenza A subtipe H1N1 adalah virus RNA beruntai tunggal (ssRNA) antisense bersegmen 8 dari famili Orthomyxoviridae. Memiliki selubung lipid dengan dua glikoprotein permukaan utama: Hemagglutinin trimetrik (H1) untuk perlekatan sel inang dan Neuraminidase tetramerik (N1) untuk pelepasan virion baru.",
                    en: "Influenza A virus subtype H1N1 is an enveloped, negative-sense single-stranded RNA virus with an 8-segmented genome belonging to the Orthomyxoviridae family. Its lipid envelope features trimeric Hemagglutinin (H1) for cellular attachment and tetrameric Neuraminidase (N1) for progeny virion release.",
                },
            },
            metrics: {
                incubation: {
                    title: { id: "Masa Inkubasi", en: "Incubation Period" },
                    value: "1 – 4 Hari",
                    sub: {
                        id: "Median 24 – 48 Jam",
                        en: "Median 24 – 48 Hours",
                    },
                },
                receptor: {
                    title: { id: "Reseptor Seluler", en: "Host Receptor" },
                    value: "Sialic Acid",
                    sub: {
                        id: "Alfa-2,6 (Manusia) & Alfa-2,3 (Unggas)",
                        en: "Alpha-2,6 (Human) & Alpha-2,3 (Avian)",
                    },
                },
                family: {
                    title: { id: "Famili Virus", en: "Viral Family" },
                    value: "Orthomyxoviridae",
                    sub: { id: "Influenzavirus A", en: "Influenzavirus A" },
                },
            },
            transmission: {
                title: {
                    id: "Vektor & Rute Transmisi",
                    en: "Transmission Vectors",
                },
                text: {
                    id: "Penularan aerosol droplet pernapasan langsung saat batuk, bersin, dan berbicara di ruang padat tanpa ventilasi (barak militer, kapal angkut pasukan PD I, dan gerbong kereta api), diperparah oleh mobilisasi massal perang.",
                    en: "Direct airborne respiratory droplet nuclei from coughing, sneezing, and talking in unventilated, high-density environments (military camps, wartime troopships, crowded trains), amplified by global troop movements.",
                },
            },
            symptoms: {
                title: {
                    id: "Manifestasi Klinis Karakteristik",
                    en: "Clinical Manifestations",
                },
                text: {
                    id: "Demam tinggi mendadak, badai sitokin hiper-inflamasi pada dewasa muda, edema paru hemoragik akut (paru-paru terendam cairan berdarah), dan heliotrope cyanosis (kulit wajah dan bibir membiru pekat akibat asfiksia jaringan terminal).",
                    en: "Sudden high fever, devastating hyper-inflammatory cytokine storms in young adults, acute hemorrhagic pulmonary edema (drowning in alveolar transudate), and pathognomonic heliotrope cyanosis (purplish suffocation).",
                },
            },
        },
    },
    {
        id: "covid-19",
        year: 2020,
        eraLabel: "2019 – 2023 M",
        name: { id: "SARS-CoV-2 (COVID-19)", en: "SARS-CoV-2 (COVID-19)" },
        shortLabel: "2020 // COVID-19",
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
        era: "2019 – 2023 M",
        pathogen: "SARS-CoV-2 Coronavirus",
        globeAtmosphere: "#0e7490",
        globalFatalities: "~7M - 20M+",
        status: "active",
        route: "/globe/covid-19",
        baseYear: 2019,
        epicenters: ["id", "cn", "it", "us", "in"],
        primaryEpicenters: ["ID", "US", "CN", "IN", "IT"],
        defaultCameraPosition: [10, 100, 2.3],
        clinicalProfile: {
            classification: {
                title: {
                    id: "Klasifikasi Biologis & Struktur Patogen",
                    en: "Biological Classification & Virion Structure",
                },
                text: {
                    id: "SARS-CoV-2 adalah virus RNA beruntai tunggal sense-positif (+ssRNA) beramplop dalam genus Betacoronavirus famili Coronaviridae dengan situs pembelahan furin unik pada protein Spike.",
                    en: "SARS-CoV-2 is an enveloped, positive-sense single-stranded RNA (+ssRNA) virus belonging to the genus Betacoronavirus, family Coronaviridae with a novel furin cleavage site.",
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
                    id: "Transmisi utama terjadi melalui aerosol droplet mikro (<5 μm) yang melayang di udara tertutup, droplet pernapasan jarak dekat, dan kontak mukosa.",
                    en: "Primary transmission occurs via short-range inhalable respiratory aerosols (<5 μm) in indoor spaces, droplets, and mucosal contact.",
                },
            },
            symptoms: {
                title: {
                    id: "Manifestasi Klinis Karakteristik",
                    en: "Clinical Manifestations",
                },
                text: {
                    id: "Sindrom Gangguan Pernapasan Akut (ARDS), demam, batuk kering persisten, anosmia/ageusia akut, dan desaturasi hipoksia tanpa sesak (silent hypoxia).",
                    en: "Acute Respiratory Distress Syndrome (ARDS), pyrexia, persistent dry cough, acute anosmia/dysgeusia, and silent hypoxemia.",
                },
            },
        },
    },
];

export const pandemics = PANDEMIC_REGISTRY;

/**
 * Historical epicenters for 541 Plague of Justinian
 */
export const JUSTINIAN_EPICENTERS: Record<string, EpicenterMetadata> = {
    CPX: {
        code: "CPX",
        iso3: "TUR",
        name: {
            id: "Konstantinopel (Bizantium)",
            en: "Constantinople (Byzantine)",
        },
        sectorCode: "SECTOR // BYZ - CONSTANTINOPLE GROUND ZERO",
        coordinates: { lat: 41.0082, lng: 28.9784, altitude: 1.05 },
        beaconColor: "#a855f7",
        status: {
            id: "ARSIP AKTIF // DIDEKLASIFIKASI",
            en: "ACTIVE DOSSIER // DECLASSIFIED",
        },
        synopsis: {
            id: "Pusat kekaisaran Yustinianus I; menara benteng dipenuhi jenazah saat korban mencapai 10.000 jiwa per hari.",
            en: "Imperial capital of Justinian I; rampart towers filled with corpses as deaths peaked at 10,000 per day.",
        },
        timelinePeriod: { id: "Musim Semi 542 M", en: "Spring 542 AD" },
    },
    PEL: {
        code: "PEL",
        iso3: "EGY",
        name: { id: "Mesir (Pelusium)", en: "Egypt (Pelusium)" },
        sectorCode: "SECTOR // EGY - PELUSIUM INGRESS",
        coordinates: { lat: 31.05, lng: 32.6, altitude: 1.05 },
        beaconColor: "#eab308",
        status: {
            id: "ARSIP AKTIF // DIDEKLASIFIKASI",
            en: "ACTIVE DOSSIER // DECLASSIFIED",
        },
        synopsis: {
            id: "Titik masuk pes pertama ke wilayah Romawi Timur melalui rute pasokan gandum Sungai Nil pada tahun 541 M.",
            en: "First recorded ingress of plague into Eastern Roman territories via Nile grain fleets in 541 AD.",
        },
        timelinePeriod: { id: "541 M", en: "541 AD" },
    },
    SAS: {
        code: "SAS",
        iso3: "IRN",
        name: {
            id: "Kekaisaran Sasaniyah (Persia)",
            en: "Sasanian Empire (Persia)",
        },
        sectorCode: "SECTOR // SAS - CTESIPHON / MESOPOTAMIA",
        coordinates: { lat: 33.0936, lng: 44.5808, altitude: 1.05 },
        beaconColor: "#ef4444",
        status: {
            id: "ARSIP AKTIF // DIDEKLASIFIKASI",
            en: "ACTIVE DOSSIER // DECLASSIFIED",
        },
        synopsis: {
            id: "Wabah menyeberang perbatasan ke Mesopotamia dan ibu kota Sasaniyah, melumpuhkan rivalitas abadi Romawi Timur.",
            en: "Plague crossed borders into Mesopotamia and the Sasanian capital, crippling Eastern Rome's perpetual rival.",
        },
        timelinePeriod: { id: "542 – 543 M", en: "542 – 543 AD" },
    },
    ROM: {
        code: "ROM",
        iso3: "ITA",
        name: { id: "Italia (Roma / Ravenna)", en: "Italy (Rome / Ravenna)" },
        sectorCode: "SECTOR // ITA - RAVENNA EXARCHATE",
        coordinates: { lat: 41.8902, lng: 12.4922, altitude: 1.05 },
        beaconColor: "#10b981",
        status: {
            id: "ARSIP AKTIF // DIDEKLASIFIKASI",
            en: "ACTIVE DOSSIER // DECLASSIFIED",
        },
        synopsis: {
            id: "Wabah melumpuhkan kekuatan militer Jenderal Belisarius dan menghentikan pemulihan semenanjung Italia.",
            en: "Plague paralyzed General Belisarius' forces, ending the Byzantine reconquest of the Italian peninsula.",
        },
        timelinePeriod: { id: "543 M", en: "543 AD" },
    },
};

/**
 * Historical epicenters for 1817 First Cholera Pandemic
 */
export const CHOLERA_1817_EPICENTERS: Record<string, EpicenterMetadata> = {
    IN: {
        code: "IN",
        iso3: "IND",
        name: {
            id: "India (Benggala / Jessore)",
            en: "India (Bengal / Jessore)",
        },
        sectorCode: "SECTOR // IND - JESSORE DELTA ZERO",
        coordinates: { lat: 23.1667, lng: 89.2167, altitude: 1.05 },
        beaconColor: "#10b981",
        status: {
            id: "ARSIP TERENKRIPSI // SEDANG DIDEKLASIFIKASI",
            en: "CLASSIFIED ARCHIVE // DRAFTING",
        },
        synopsis: {
            id: "Titik spillover kolera asiatik pertama di rawa-rawa Delta Gangga Jessore pada musim hujan Agustus 1817.",
            en: "Asiatic cholera spillover epicenter in the Ganges Delta wetlands of Jessore during the August 1817 monsoon.",
        },
        timelinePeriod: { id: "Agustus 1817", en: "August 1817" },
    },
    ID: {
        code: "ID",
        iso3: "IDN",
        name: {
            id: "Hindia Belanda (Batavia)",
            en: "Dutch East Indies (Batavia)",
        },
        sectorCode: "SECTOR // IDN - BATAVIA HARBOR INGRESS",
        coordinates: { lat: -6.2088, lng: 106.8456, altitude: 1.05 },
        beaconColor: "#f97316",
        status: {
            id: "ARSIP TERENKRIPSI // SEDANG DIDEKLASIFIKASI",
            en: "CLASSIFIED ARCHIVE // DRAFTING",
        },
        synopsis: {
            id: "Penyusupan kapal dagang dari Selat Malaka membawa wabah kolera ke Batavia yang menewaskan 100.000 jiwa di Jawa.",
            en: "Merchant vessels from the Malacca Strait carried cholera to Batavia, causing over 100,000 deaths across Java.",
        },
        timelinePeriod: { id: "April 1821", en: "April 1821" },
    },
    OM: {
        code: "OM",
        iso3: "OMN",
        name: { id: "Oman (Muskat)", en: "Oman (Muscat)" },
        sectorCode: "SECTOR // OMN - MUSCAT GULF TRANSIT",
        coordinates: { lat: 23.588, lng: 58.3829, altitude: 1.05 },
        beaconColor: "#eab308",
        status: {
            id: "ARSIP TERENKRIPSI // SEDANG DIDEKLASIFIKASI",
            en: "CLASSIFIED ARCHIVE // DRAFTING",
        },
        synopsis: {
            id: "Kapal pembawa beras Bombay menginfeksi pelabuhan Muskat, melenyapkan sepertiga populasi kota dalam 10 hari.",
            en: "Bombay rice cargo ships infected Muscat, killing a third of the port population within ten days.",
        },
        timelinePeriod: { id: "1821 M", en: "1821 AD" },
    },
    IR: {
        code: "IR",
        iso3: "IRN",
        name: { id: "Persia (Bushehr)", en: "Persia (Bushehr)" },
        sectorCode: "SECTOR // IRN - BUSHEHR GULF HUB",
        coordinates: { lat: 28.9234, lng: 50.8385, altitude: 1.05 },
        beaconColor: "#06b6d4",
        status: {
            id: "ARSIP TERENKRIPSI // SEDANG DIDEKLASIFIKASI",
            en: "CLASSIFIED ARCHIVE // DRAFTING",
        },
        synopsis: {
            id: "Penyebaran masuk ke Teluk Persia menyapu garnisun militer dan jalur kafilah menuju Shiraz dan Teheran.",
            en: "Persian Gulf ingress advancing along military and trade caravan routes toward Shiraz and Tehran.",
        },
        timelinePeriod: { id: "1821 – 1822 M", en: "1821 – 1822 AD" },
    },
};

/**
 * Historical epicenters for 1347 Black Death
 */
export const BLACK_DEATH_EPICENTERS: Record<string, EpicenterMetadata> = {
    KAF: {
        code: "KAF",
        iso3: "UKR",
        name: {
            id: "Kaffa / Theodosia (Krimea)",
            en: "Kaffa / Theodosia (Crimea)",
        },
        sectorCode: "SECTOR // CRI - KAFFA GROUND ZERO",
        coordinates: { lat: 45.0344, lng: 35.3792, altitude: 1.05 },
        beaconColor: "#e11d48",
        status: {
            id: "ARSIP AKTIF // DIDEKLASIFIKASI",
            en: "ACTIVE DOSSIER // DECLASSIFIED",
        },
        synopsis: {
            id: "Pengepungan benteng Genoa oleh pasukan Mongol Jani Beg; katapel mayat pes memicu infeksi maritim pertama.",
            en: "Siege of the Genoese citadel by Mongol Khan Jani Beg; catapulted plague corpses triggered the first maritime outbreak.",
        },
        timelinePeriod: {
            id: "1346 – 1347 M",
            en: "1346 – 1347 AD",
        },
    },
    MES: {
        code: "MES",
        iso3: "ITA",
        name: {
            id: "Messina (Sisilia / Italia)",
            en: "Messina (Sicily / Italy)",
        },
        sectorCode: "SECTOR // ITA - MESSINA MARITIME BREACH",
        coordinates: { lat: 38.1938, lng: 15.554, altitude: 1.05 },
        beaconColor: "#be123c",
        status: {
            id: "ARSIP AKTIF // DIDEKLASIFIKASI",
            en: "ACTIVE DOSSIER // DECLASSIFIED",
        },
        synopsis: {
            id: "Dua belas kapal dagang Genoa merapat di dermaga Sisilia membawa awak sekarat dan tikus terinfeksi, membuka gerbang pes ke Eropa.",
            en: "Twelve Genoese trade galleys docked with dying crews and infected rats, unsealing the gates of plague into Europe.",
        },
        timelinePeriod: {
            id: "Oktober 1347 – 1348 M",
            en: "October 1347 – 1348 AD",
        },
    },
    LON: {
        code: "LON",
        iso3: "GBR",
        name: {
            id: "London (Kerajaan Inggris)",
            en: "London (Kingdom of England)",
        },
        sectorCode: "SECTOR // GBR - LONDON URBAN COLLAPSE",
        coordinates: { lat: 51.5074, lng: -0.1278, altitude: 1.05 },
        beaconColor: "#9f1239",
        status: {
            id: "ARSIP AKTIF // DIDEKLASIFIKASI",
            en: "ACTIVE DOSSIER // DECLASSIFIED",
        },
        synopsis: {
            id: "Penyusupan pes melalui pelabuhan Thames memusnahkan separuh populasi kota dalam waktu 18 bulan.",
            en: "Plague infiltration via the Thames wharves decimated half of London's population within 18 months.",
        },
        timelinePeriod: {
            id: "Musim Gugur 1348 – 1350 M",
            en: "Autumn 1348 – 1350 AD",
        },
    },
    PAR: {
        code: "PAR",
        iso3: "FRA",
        name: {
            id: "Paris (Kerajaan Prancis)",
            en: "Paris (Kingdom of France)",
        },
        sectorCode: "SECTOR // FRA - PARIS ILE-DE-FRANCE",
        coordinates: { lat: 48.8566, lng: 2.3522, altitude: 1.05 },
        beaconColor: "#881337",
        status: {
            id: "ARSIP AKTIF // DIDEKLASIFIKASI",
            en: "ACTIVE DOSSIER // DECLASSIFIED",
        },
        synopsis: {
            id: "Kematian hingga 800 jiwa sehari di Hôtel-Dieu; keruntuhan demografi terbesar di lembah Sungai Seine.",
            en: "Daily fatalities reached 800 at the Hôtel-Dieu; the greatest demographic collapse in the Seine valley.",
        },
        timelinePeriod: {
            id: "Musim Panas 1348 – 1349 M",
            en: "Summer 1348 – 1349 AD",
        },
    },
};

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
        beaconColor: "#3b82f6",
        status: {
            id: "ARSIP AKTIF // DIDEKLASIFIKASI",
            en: "ACTIVE DOSSIER // DECLASSIFIED",
        },
        synopsis: {
            id: "Penyebaran awal gelombang pertama di barak militer Camp Funston, Fort Riley, Kansas pada Maret 1918.",
            en: "First wave ground zero across Camp Funston barracks, Fort Riley, Kansas in March 1918.",
        },
        timelinePeriod: {
            id: "Maret 1918 – Mei 1919 M",
            en: "March 1918 – May 1919 AD",
        },
    },
    FR: {
        code: "FR",
        iso3: "FRA",
        name: {
            id: "Prancis (Étaples & Front Barat)",
            en: "France (Étaples & Western Front)",
        },
        sectorCode: "SECTOR // FRA - WESTERN FRONT / ÉTAPLES",
        coordinates: { lat: 50.5186, lng: 1.6397, altitude: 1.05 },
        beaconColor: "#ef4444",
        status: {
            id: "ARSIP AKTIF // DIDEKLASIFIKASI",
            en: "ACTIVE DOSSIER // DECLASSIFIED",
        },
        synopsis: {
            id: "Vektor transmisi masif di kamp militer Étaples dan parit Perang Dunia I front barat.",
            en: "Massive transmission vector across Étaples staging camp and Western Front WW1 trenches.",
        },
        timelinePeriod: {
            id: "April 1918 – November 1918 M",
            en: "April 1918 – November 1918 AD",
        },
    },
    ES: {
        code: "ES",
        iso3: "ESP",
        name: {
            id: "Spanyol (Madrid & Pers Netral)",
            en: "Spain (Madrid & Neutral Press)",
        },
        sectorCode: "SECTOR // ESP - MADRID / UNCENSORED PRESS",
        coordinates: { lat: 40.4168, lng: -3.7038, altitude: 1.05 },
        beaconColor: "#eab308",
        status: {
            id: "ARSIP AKTIF // DIDEKLASIFIKASI",
            en: "ACTIVE DOSSIER // DECLASSIFIED",
        },
        synopsis: {
            id: "Pemberitaan bebas tanpa sensor masa perang yang membuat pandemi ini dinamai Flu Spanyol.",
            en: "Uncensored wartime reporting of King Alfonso XIII's illness, giving the pandemic its moniker.",
        },
        timelinePeriod: { id: "Mei 1918 – 1920 M", en: "May 1918 – 1920 AD" },
    },
    GB: {
        code: "GB",
        iso3: "GBR",
        name: {
            id: "Britania Raya (London & Grand Fleet)",
            en: "United Kingdom (London & Grand Fleet)",
        },
        sectorCode: "SECTOR // GBR - FLEET TRANSMISSION",
        coordinates: { lat: 55.3781, lng: -3.436, altitude: 1.05 },
        beaconColor: "#8b5cf6",
        status: {
            id: "ARSIP AKTIF // DIDEKLASIFIKASI",
            en: "ACTIVE DOSSIER // DECLASSIFIED",
        },
        synopsis: {
            id: "Gelombang kedua mematikan yang melumpuhkan armada kapal perang dan pusat industri Britania.",
            en: "Lethal second wave autumn 1918 paralyzing naval grand fleets and industrial heartlands.",
        },
        timelinePeriod: {
            id: "Mei 1918 – Maret 1919 M",
            en: "May 1918 – March 1919 AD",
        },
    },
    IN: {
        code: "IN",
        iso3: "IND",
        name: {
            id: "Kemaharajaan Britania (Bombay & Punjab)",
            en: "British Raj (Bombay & Punjab)",
        },
        sectorCode: "SECTOR // IND - BOMBAY INGRESS & RAILWAYS",
        coordinates: { lat: 18.922, lng: 72.8347, altitude: 1.05 },
        beaconColor: "#06b6d4",
        status: {
            id: "ARSIP AKTIF // DIDEKLASIFIKASI",
            en: "ACTIVE DOSSIER // DECLASSIFIED",
        },
        synopsis: {
            id: "Masuk lewat pelabuhan Bombay Mei 1918, menjalar ke pedalaman via rel kereta api dan merenggut 17,5 juta jiwa.",
            en: "Entered via Bombay harbor in May 1918, radiating along railway networks to claim over 17.5 million lives.",
        },
        timelinePeriod: {
            id: "Mei 1918 – 1920 M",
            en: "May 1918 – 1920 AD",
        },
    },
    ID: {
        code: "ID",
        iso3: "IDN",
        name: {
            id: "Hindia Belanda (Jawa & Kepulauan)",
            en: "Dutch East Indies (Java & Archipelago)",
        },
        sectorCode: "SECTOR // IDN - COLONIAL MARITIME INVASION",
        coordinates: { lat: -7.2575, lng: 112.7521, altitude: 1.05 },
        beaconColor: "#10b981",
        status: {
            id: "ARSIP AKTIF // DIDEKLASIFIKASI",
            en: "ACTIVE DOSSIER // DECLASSIFIED",
        },
        synopsis: {
            id: "Dikenal sebagai 'Pagebluk'; kapal uap SS Singkep membawa gelombang mematikan ke Surabaya dan menjangkiti pedesaan Jawa.",
            en: "Known locally as 'Pagebluk'; steamer SS Singkep introduced the deadly second wave into Surabaya, ravaging Java.",
        },
        timelinePeriod: {
            id: "Juli 1918 – 1920 M",
            en: "July 1918 – 1920 AD",
        },
    },
};

/**
 * Retrieve epicenter registry for any pandemic.
 */
export function getEpicentersForPandemic(
    pandemicId: string,
    waveIndex?: number,
): Record<string, EpicenterMetadata> {
    const pId = pandemicId.toLowerCase();
    if (pId === "plague-of-justinian-541") return JUSTINIAN_EPICENTERS;
    if (pId === "black-death-1347") return BLACK_DEATH_EPICENTERS;
    if (pId === "cholera-1817") return CHOLERA_1817_EPICENTERS;
    if (pId === "cholera-1854") {
        const wave = CHOLERA_WAVES[2];
        return {
            ...wave.primaryEpicenters,
            LON: wave.primaryEpicenters.GBR,
            CAL: wave.primaryEpicenters.IND,
            PAR: wave.primaryEpicenters.ITA,
            NYC: wave.primaryEpicenters.USA,
        };
    }
    if (pId === "cholera-1863") {
        const wave = CHOLERA_WAVES[3];
        return {
            ...wave.primaryEpicenters,
            MEC: wave.primaryEpicenters.MEK,
            CAI: wave.primaryEpicenters.EGY,
            LON: wave.primaryEpicenters.GBR,
            NYC: wave.primaryEpicenters.USA,
            STP: wave.primaryEpicenters.RUS,
            SWA: wave.primaryEpicenters.ZAN,
            PRG: wave.primaryEpicenters.SAM,
            ARG: wave.primaryEpicenters.SAM,
        };
    }
    if (pId === "cholera-1881") {
        const wave = CHOLERA_WAVES[4];
        return {
            ...wave.primaryEpicenters,
            DEU: wave.primaryEpicenters.HAM,
            ALN: wave.primaryEpicenters.HAM,
            CAI: wave.primaryEpicenters.EGY,
            ALX: wave.primaryEpicenters.EGY,
            CAL: wave.primaryEpicenters.IND,
            BNG: wave.primaryEpicenters.IND,
            STP: wave.primaryEpicenters.RUS,
            BAK: wave.primaryEpicenters.RUS,
            TSK: wave.primaryEpicenters.RUS,
            NAP: wave.primaryEpicenters.ITA,
            ROM: wave.primaryEpicenters.ITA,
            MAR: wave.primaryEpicenters.FRA,
            PAR: wave.primaryEpicenters.FRA,
            TLN: wave.primaryEpicenters.FRA,
            TOK: wave.primaryEpicenters.JPN,
            YOK: wave.primaryEpicenters.JPN,
            NGS: wave.primaryEpicenters.JPN,
            NYC: wave.primaryEpicenters.USA,
        };
    }
    if (pId === "cholera-1899" || pId === "wave-6" || pId === "wave6") {
        const wave = CHOLERA_WAVES[5];
        return {
            ...wave.primaryEpicenters,
            CAL: wave.primaryEpicenters.IND,
            BNG: wave.primaryEpicenters.IND,
            MOS: wave.primaryEpicenters.RUS,
            STP: wave.primaryEpicenters.RUS,
            PET: wave.primaryEpicenters.RUS,
            MAN: wave.primaryEpicenters.PHL,
            IST: wave.primaryEpicenters.MEK,
            MEC: wave.primaryEpicenters.MEK,
            TUR: wave.primaryEpicenters.MEK,
            EUR: wave.primaryEpicenters.ITA,
            WAR: wave.primaryEpicenters.ITA,
        };
    }
    if (pId === "cholera-1961" || pId === "wave-7" || pId === "wave7") {
        const wave = CHOLERA_WAVES[6];
        return {
            ...wave.primaryEpicenters,
            MAK: wave.primaryEpicenters.IDN,
            JAK: wave.primaryEpicenters.IDN,
            BGD: wave.primaryEpicenters.IND,
            DHK: wave.primaryEpicenters.IND,
            CAL: wave.primaryEpicenters.IND,
            LMA: wave.primaryEpicenters.PER,
            SAM: wave.primaryEpicenters.PER,
            HAR: wave.primaryEpicenters.ZWE,
            AFR: wave.primaryEpicenters.ZWE,
            PAP: wave.primaryEpicenters.HTI,
            SAN: wave.primaryEpicenters.YEM,
        };
    }
    if (pId === "cholera-series") {
        const wave = CHOLERA_WAVES[waveIndex ?? 0] ?? CHOLERA_WAVES[0];
        if (wave.waveIndex === 2) {
            return {
                ...wave.primaryEpicenters,
                LON: wave.primaryEpicenters.GBR,
                CAL: wave.primaryEpicenters.IND,
                PAR: wave.primaryEpicenters.ITA,
                NYC: wave.primaryEpicenters.USA,
            };
        }
        if (wave.waveIndex === 3) {
            return {
                ...wave.primaryEpicenters,
                MEC: wave.primaryEpicenters.MEK,
                CAI: wave.primaryEpicenters.EGY,
                LON: wave.primaryEpicenters.GBR,
                NYC: wave.primaryEpicenters.USA,
                STP: wave.primaryEpicenters.RUS,
                SWA: wave.primaryEpicenters.ZAN,
                PRG: wave.primaryEpicenters.SAM,
                ARG: wave.primaryEpicenters.SAM,
            };
        }
        if (wave.waveIndex === 4) {
            return {
                ...wave.primaryEpicenters,
                DEU: wave.primaryEpicenters.HAM,
                ALN: wave.primaryEpicenters.HAM,
                CAI: wave.primaryEpicenters.EGY,
                ALX: wave.primaryEpicenters.EGY,
                CAL: wave.primaryEpicenters.IND,
                BNG: wave.primaryEpicenters.IND,
                STP: wave.primaryEpicenters.RUS,
                BAK: wave.primaryEpicenters.RUS,
                TSK: wave.primaryEpicenters.RUS,
                NAP: wave.primaryEpicenters.ITA,
                ROM: wave.primaryEpicenters.ITA,
                MAR: wave.primaryEpicenters.FRA,
                PAR: wave.primaryEpicenters.FRA,
                TLN: wave.primaryEpicenters.FRA,
                TOK: wave.primaryEpicenters.JPN,
                YOK: wave.primaryEpicenters.JPN,
                NGS: wave.primaryEpicenters.JPN,
                NYC: wave.primaryEpicenters.USA,
            };
        }
        if (wave.waveIndex === 5) {
            return {
                ...wave.primaryEpicenters,
                CAL: wave.primaryEpicenters.IND,
                BNG: wave.primaryEpicenters.IND,
                MOS: wave.primaryEpicenters.RUS,
                STP: wave.primaryEpicenters.RUS,
                PET: wave.primaryEpicenters.RUS,
                MAN: wave.primaryEpicenters.PHL,
                IST: wave.primaryEpicenters.MEK,
                MEC: wave.primaryEpicenters.MEK,
                TUR: wave.primaryEpicenters.MEK,
                EUR: wave.primaryEpicenters.ITA,
                WAR: wave.primaryEpicenters.ITA,
            };
        }
        if (wave.waveIndex === 6) {
            return {
                ...wave.primaryEpicenters,
                MAK: wave.primaryEpicenters.IDN,
                JAK: wave.primaryEpicenters.IDN,
                BGD: wave.primaryEpicenters.IND,
                DHK: wave.primaryEpicenters.IND,
                CAL: wave.primaryEpicenters.IND,
                LMA: wave.primaryEpicenters.PER,
                SAM: wave.primaryEpicenters.PER,
                HAR: wave.primaryEpicenters.ZWE,
                AFR: wave.primaryEpicenters.ZWE,
                PAP: wave.primaryEpicenters.HTI,
                SAN: wave.primaryEpicenters.YEM,
            };
        }
        return wave.primaryEpicenters;
    }
    if (pId === "spanish-flu-1918") return SPANISH_FLU_EPICENTERS;
    return EPICENTER_REGISTRY;
}

/**
 * Retrieve the isolated surveillance dataset catalog for an active pandemic.
 */
export function getSurveillanceForPandemic(
    pandemicId: string,
    waveIndex?: number,
): Record<string, CountrySurveillanceData> {
    const pId = pandemicId.toLowerCase();
    if (pId === "plague-of-justinian-541") {
        return justinianSurveillance as unknown as Record<
            string,
            CountrySurveillanceData
        >;
    }
    if (pId === "black-death-1347") {
        return blackDeathSurveillance as unknown as Record<
            string,
            CountrySurveillanceData
        >;
    }
    if (pId === "cholera-1817") {
        return choleraSurveillance as unknown as Record<
            string,
            CountrySurveillanceData
        >;
    }
    if (pId === "cholera-series") {
        const wave = CHOLERA_WAVES[waveIndex ?? 0] ?? CHOLERA_WAVES[0];
        return wave.surveillance;
    }
    if (pId === "spanish-flu-1918") {
        return spanishFluSurveillance as unknown as Record<
            string,
            CountrySurveillanceData
        >;
    }
    return covidSurveillance as unknown as Record<
        string,
        CountrySurveillanceData
    >;
}

export interface CountryInteraction {
    type: "epicenter" | "surveillance";
    code: string;
    epicenter?: EpicenterMetadata;
    surveillance?: CountrySurveillanceData;
}

const JUSTINIAN_TERRITORY_MAP: Record<
    string,
    { code: string; type: "epicenter" | "surveillance" }
> = {
    // Primary Epicenters
    CPX: { code: "CPX", type: "epicenter" },
    TR: { code: "CPX", type: "epicenter" },
    TUR: { code: "CPX", type: "epicenter" },
    GR: { code: "CPX", type: "epicenter" },
    GRC: { code: "CPX", type: "epicenter" },

    PEL: { code: "PEL", type: "epicenter" },
    EG: { code: "PEL", type: "epicenter" },
    EGY: { code: "PEL", type: "epicenter" },

    SAS: { code: "SAS", type: "epicenter" },
    IR: { code: "SAS", type: "epicenter" },
    IRN: { code: "SAS", type: "epicenter" },
    IQ: { code: "SAS", type: "epicenter" },
    IRQ: { code: "SAS", type: "epicenter" },

    ROM: { code: "ROM", type: "epicenter" },
    IT: { code: "ROM", type: "epicenter" },
    ITA: { code: "ROM", type: "epicenter" },

    // Secondary Surveillance Territories
    GAU: { code: "GAU", type: "surveillance" },
    FR: { code: "GAU", type: "surveillance" },
    FRA: { code: "GAU", type: "surveillance" },
    BE: { code: "GAU", type: "surveillance" },
    BEL: { code: "GAU", type: "surveillance" },

    HIS: { code: "HIS", type: "surveillance" },
    ES: { code: "HIS", type: "surveillance" },
    ESP: { code: "HIS", type: "surveillance" },
    PT: { code: "HIS", type: "surveillance" },
    PRT: { code: "HIS", type: "surveillance" },

    BRI: { code: "BRI", type: "surveillance" },
    GB: { code: "BRI", type: "surveillance" },
    GBR: { code: "BRI", type: "surveillance" },
    UK: { code: "BRI", type: "surveillance" },

    AFR: { code: "AFR", type: "surveillance" },
    TN: { code: "AFR", type: "surveillance" },
    TUN: { code: "AFR", type: "surveillance" },
    DZ: { code: "AFR", type: "surveillance" },
    DZA: { code: "AFR", type: "surveillance" },
    LY: { code: "AFR", type: "surveillance" },
    LBY: { code: "AFR", type: "surveillance" },

    LEV: { code: "LEV", type: "surveillance" },
    SY: { code: "LEV", type: "surveillance" },
    SYR: { code: "LEV", type: "surveillance" },
    LB: { code: "LEV", type: "surveillance" },
    LBN: { code: "LEV", type: "surveillance" },
    IL: { code: "LEV", type: "surveillance" },
    ISR: { code: "LEV", type: "surveillance" },
    PS: { code: "LEV", type: "surveillance" },
    PSE: { code: "LEV", type: "surveillance" },
    JO: { code: "LEV", type: "surveillance" },
    JOR: { code: "LEV", type: "surveillance" },
};

const BLACK_DEATH_TERRITORY_MAP: Record<
    string,
    { code: string; type: "epicenter" | "surveillance" }
> = {
    // Primary Epicenters
    KAF: { code: "KAF", type: "epicenter" },
    UA: { code: "KAF", type: "epicenter" },
    UKR: { code: "KAF", type: "epicenter" },
    CRI: { code: "KAF", type: "epicenter" },

    MES: { code: "MES", type: "epicenter" },
    IT: { code: "MES", type: "epicenter" },
    ITA: { code: "MES", type: "epicenter" },

    LON: { code: "LON", type: "epicenter" },
    GB: { code: "LON", type: "epicenter" },
    GBR: { code: "LON", type: "epicenter" },
    UK: { code: "LON", type: "epicenter" },

    PAR: { code: "PAR", type: "epicenter" },
    FR: { code: "PAR", type: "epicenter" },
    FRA: { code: "PAR", type: "epicenter" },

    // Secondary Surveillance Territories
    FLR: { code: "FLR", type: "surveillance" },
    AVN: { code: "AVN", type: "surveillance" },
    VEN: { code: "VEN", type: "surveillance" },
    KRA: { code: "KRA", type: "surveillance" },
    PL: { code: "KRA", type: "surveillance" },
    POL: { code: "KRA", type: "surveillance" },
    MOS: { code: "MOS", type: "surveillance" },
    RU: { code: "MOS", type: "surveillance" },
    RUS: { code: "MOS", type: "surveillance" },
    CAI: { code: "CAI", type: "surveillance" },
    EG: { code: "CAI", type: "surveillance" },
    EGY: { code: "CAI", type: "surveillance" },
};

const SPANISH_FLU_TERRITORY_MAP: Record<
    string,
    { code: string; type: "epicenter" | "surveillance" }
> = {
    // Primary Epicenters
    US: { code: "US", type: "epicenter" },
    USA: { code: "US", type: "epicenter" },

    FR: { code: "FR", type: "epicenter" },
    FRA: { code: "FR", type: "epicenter" },

    ES: { code: "ES", type: "epicenter" },
    ESP: { code: "ES", type: "epicenter" },

    GB: { code: "GB", type: "epicenter" },
    GBR: { code: "GB", type: "epicenter" },
    UK: { code: "GB", type: "epicenter" },

    IN: { code: "IN", type: "epicenter" },
    IND: { code: "IN", type: "epicenter" },

    ID: { code: "ID", type: "epicenter" },
    IDN: { code: "ID", type: "epicenter" },

    // Secondary Surveillance Territories
    DE: { code: "DE", type: "surveillance" },
    DEU: { code: "DE", type: "surveillance" },

    IT: { code: "IT", type: "surveillance" },
    ITA: { code: "IT", type: "surveillance" },

    RU: { code: "RU", type: "surveillance" },
    RUS: { code: "RU", type: "surveillance" },

    BR: { code: "BR", type: "surveillance" },
    BRA: { code: "BR", type: "surveillance" },

    JP: { code: "JP", type: "surveillance" },
    JPN: { code: "JP", type: "surveillance" },

    ZA: { code: "ZA", type: "surveillance" },
    ZAF: { code: "ZA", type: "surveillance" },

    WS: { code: "WS", type: "surveillance" },
    WSM: { code: "WS", type: "surveillance" },

    NZ: { code: "NZ", type: "surveillance" },
    NZL: { code: "NZ", type: "surveillance" },

    CN: { code: "CN", type: "surveillance" },
    CHN: { code: "CN", type: "surveillance" },
};

/**
 * Strict Era-Based Interaction Resolver.
 * Guarantees zero data bleed: only returns interactions for territories
 * belonging to the active pandemic era. Non-relevant countries return null.
 */
export function getCountryInteraction(
    pandemicId: string,
    countryIdentifier: string,
    waveIndex?: number,
): CountryInteraction | null {
    if (!countryIdentifier) return null;
    const pId = pandemicId.toLowerCase();
    const rawId = countryIdentifier.toUpperCase().trim();

    if (pId === "plague-of-justinian-541") {
        const mapping = JUSTINIAN_TERRITORY_MAP[rawId];
        if (!mapping) return null;
        if (mapping.type === "epicenter") {
            const epicenter = JUSTINIAN_EPICENTERS[mapping.code];
            return epicenter
                ? { type: "epicenter", code: mapping.code, epicenter }
                : null;
        } else {
            const survCatalog = getSurveillanceForPandemic(pId);
            const surveillance = survCatalog[mapping.code];
            return surveillance
                ? { type: "surveillance", code: mapping.code, surveillance }
                : null;
        }
    }

    if (pId === "black-death-1347") {
        const mapping = BLACK_DEATH_TERRITORY_MAP[rawId];
        if (!mapping) return null;
        if (mapping.type === "epicenter") {
            const epicenter = BLACK_DEATH_EPICENTERS[mapping.code];
            return epicenter
                ? { type: "epicenter", code: mapping.code, epicenter }
                : null;
        } else {
            const survCatalog = getSurveillanceForPandemic(pId);
            const surveillance = survCatalog[mapping.code];
            return surveillance
                ? { type: "surveillance", code: mapping.code, surveillance }
                : null;
        }
    }

    if (
        pId === "cholera-series" ||
        pId.startsWith("cholera-") ||
        pId.startsWith("wave-") ||
        pId.startsWith("wave")
    ) {
        let computedWaveIndex = waveIndex ?? 0;
        if (pId === "cholera-1817" || pId === "wave-1" || pId === "wave1")
            computedWaveIndex = 0;
        else if (pId === "cholera-1829" || pId === "wave-2" || pId === "wave2")
            computedWaveIndex = 1;
        else if (pId === "cholera-1854" || pId === "wave-3" || pId === "wave3")
            computedWaveIndex = 2;
        else if (pId === "cholera-1863" || pId === "wave-4" || pId === "wave4")
            computedWaveIndex = 3;
        else if (pId === "cholera-1881" || pId === "wave-5" || pId === "wave5")
            computedWaveIndex = 4;
        else if (pId === "cholera-1899" || pId === "wave-6" || pId === "wave6")
            computedWaveIndex = 5;
        else if (pId === "cholera-1961" || pId === "wave-7" || pId === "wave7")
            computedWaveIndex = 6;

        const wave = CHOLERA_WAVES[computedWaveIndex] ?? CHOLERA_WAVES[0];
        const mapping = wave.territoryMap[rawId];
        if (mapping) {
            if (mapping.type === "epicenter") {
                const epicenter = wave.primaryEpicenters[mapping.code];
                return epicenter
                    ? { type: "epicenter", code: mapping.code, epicenter }
                    : null;
            } else {
                const surveillance = wave.surveillance[mapping.code];
                return surveillance
                    ? { type: "surveillance", code: mapping.code, surveillance }
                    : null;
            }
        }
        const normalized = normalizeCountryCode(rawId).toUpperCase();
        const normMapping = wave.territoryMap[normalized];
        if (normMapping) {
            if (normMapping.type === "epicenter") {
                const epicenter = wave.primaryEpicenters[normMapping.code];
                return epicenter
                    ? { type: "epicenter", code: normMapping.code, epicenter }
                    : null;
            } else {
                const surveillance = wave.surveillance[normMapping.code];
                return surveillance
                    ? {
                          type: "surveillance",
                          code: normMapping.code,
                          surveillance,
                      }
                    : null;
            }
        }
        const epi =
            wave.primaryEpicenters[normalized] || wave.primaryEpicenters[rawId];
        if (epi) {
            return { type: "epicenter", code: epi.code, epicenter: epi };
        }
        const surv = wave.surveillance[normalized] || wave.surveillance[rawId];
        if (surv) {
            return {
                type: "surveillance",
                code: surv.iso2,
                surveillance: surv,
            };
        }
        return null;
    }

    if (pId === "cholera-1817") {
        const epicenters = CHOLERA_1817_EPICENTERS;
        const normalized = normalizeCountryCode(rawId).toUpperCase();
        const epi = epicenters[normalized] || epicenters[rawId];
        if (epi) {
            return { type: "epicenter", code: epi.code, epicenter: epi };
        }
        const survCatalog = getSurveillanceForPandemic(pId);
        const surv = survCatalog[normalized] || survCatalog[rawId];
        if (surv) {
            return {
                type: "surveillance",
                code: surv.iso2,
                surveillance: surv,
            };
        }
        return null;
    }

    if (pId === "spanish-flu-1918") {
        const mapping =
            SPANISH_FLU_TERRITORY_MAP[rawId] ||
            SPANISH_FLU_TERRITORY_MAP[
                normalizeCountryCode(rawId).toUpperCase()
            ];
        if (!mapping) return null;
        if (mapping.type === "epicenter") {
            const epicenter = SPANISH_FLU_EPICENTERS[mapping.code];
            return epicenter
                ? { type: "epicenter", code: mapping.code, epicenter }
                : null;
        } else {
            const survCatalog = getSurveillanceForPandemic(pId);
            const surveillance = survCatalog[mapping.code];
            return surveillance
                ? { type: "surveillance", code: mapping.code, surveillance }
                : null;
        }
    }

    // Default: COVID-19
    const epicenters = EPICENTER_REGISTRY;
    const normalized = normalizeCountryCode(rawId).toUpperCase();
    // Historical custom sector codes must not match in covid-19
    if (
        [
            "CPX",
            "PEL",
            "SAS",
            "ROM",
            "GAU",
            "HIS",
            "BRI",
            "AFR",
            "LEV",
            "KAF",
            "MES",
            "LON",
            "PAR",
            "FLR",
            "AVN",
            "VEN",
            "KRA",
            "MOS",
            "CAI",
            "JES",
            "CAL",
            "BAT",
            "MUS",
            "BAG",
            "AST",
            "NYC",
            "STP",
            "BER",
            "MON",
            "HAM",
            "MEC",
            "TOK",
            "NAP",
            "ZAN",
            "IST",
            "VAL",
            "ALN",
            "PET",
            "MAN",
            "WAR",
            "MAK",
            "PAP",
            "YEM",
            "HAR",
            "JAK",
            "LMA",
        ].includes(rawId)
    ) {
        return null;
    }
    const epi =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (epicenters as any)[normalized] || (epicenters as any)[rawId];
    if (epi) {
        return { type: "epicenter", code: epi.code, epicenter: epi };
    }
    const survCatalog = getSurveillanceForPandemic(pId);
    const surv = survCatalog[normalized] || survCatalog[rawId];
    if (surv) {
        return {
            type: "surveillance",
            code: surv.iso2,
            surveillance: surv,
        };
    }
    return null;
}

/**
 * Retrieve configuration metadata for a registered pandemic.
 */
export function getPandemicConfig(
    pandemicId: string,
): PandemicProfile | undefined {
    const p = PANDEMIC_REGISTRY.find(
        (p) => p.id.toLowerCase() === pandemicId.toLowerCase(),
    );
    if (p) return p;

    if (
        pandemicId.toLowerCase().startsWith("cholera-") ||
        pandemicId.toLowerCase().startsWith("wave-") ||
        pandemicId.toLowerCase().startsWith("wave")
    ) {
        const base = PANDEMIC_REGISTRY.find((x) => x.id === "cholera-series");
        if (base) {
            return {
                ...base,
                id: pandemicId,
            };
        }
    }
    return undefined;
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
    if (code === "tur") return "tr";
    if (code === "egy") return "eg";
    if (code === "syr") return "sy";
    if (code === "bgd") return "bd";
    if (code === "omn") return "om";
    if (code === "irn") return "ir";
    if (code === "ukr") return "ua";
    if (code === "pol") return "pl";
    if (code === "rus") return "ru";
    if (code === "deu") return "de";
    if (code === "bra") return "br";
    if (code === "jpn") return "jp";
    if (code === "zaf") return "za";
    if (code === "wsm") return "ws";
    if (code === "nzl") return "nz";

    // Historical 3-letter sectors & surveillance territories
    const historicalCodes = [
        "cpx",
        "pel",
        "sas",
        "rom",
        "gau",
        "his",
        "bri",
        "afr",
        "lev",
        "kaf",
        "mes",
        "lon",
        "par",
        "flr",
        "avn",
        "ven",
        "kra",
        "mos",
        "cai",
        "jes",
        "cal",
        "bat",
        "bso",
        "mus",
        "bag",
        "ast",
        "nyc",
        "stp",
        "ber",
        "mon",
        "ham",
        "deu",
        "aln",
        "mec",
        "tok",
        "nap",
        "zan",
        "ist",
        "val",
        "pet",
        "man",
        "war",
        "mak",
        "pap",
        "yem",
        "har",
        "jak",
        "lma",
        "wave-1",
        "wave1",
        "rus",
        "gbr",
        "fra",
        "usa",
        "mek",
        "wave-2",
        "wave2",
        "ita",
        "ind",
        "lat",
        "sev",
        "flo",
        "pan",
        "crc",
        "cub",
        "wave-3",
        "wave3",
        "egy",
        "alx",
        "swa",
        "sam",
        "prg",
        "arg",
        "bra",
        "wave-4",
        "wave4",
        "bng",
        "bak",
        "tsk",
        "mar",
        "tln",
        "jpn",
        "yok",
        "ngs",
        "wave-5",
        "wave5",
        "phl",
        "wave-6",
        "wave6",
        "bgd",
        "dhk",
        "per",
        "zwe",
        "hti",
        "san",
        "wave-7",
        "wave7",
    ];
    if (historicalCodes.includes(code)) return code;

    return code.slice(0, 2);
}

/**
 * Dynamic Dataset Resolver
 */
export async function loadDossier(
    pandemicId: string,
    countryCode: string,
    waveIndex?: number,
): Promise<Chapter[] | null> {
    const pId = pandemicId.toLowerCase();
    const cCode = normalizeCountryCode(countryCode);

    try {
        if (pId === "plague-of-justinian-541") {
            switch (cCode) {
                case "cpx": {
                    const mod =
                        await import("@/data/pandemics/plague-of-justinian-541/cpx.json");
                    const data = mod.default as unknown as
                        { chapters: Chapter[] } | Chapter[];
                    return Array.isArray(data) ? data : data.chapters;
                }
                case "pel": {
                    const mod =
                        await import("@/data/pandemics/plague-of-justinian-541/pel.json");
                    const data = mod.default as unknown as
                        { chapters: Chapter[] } | Chapter[];
                    return Array.isArray(data) ? data : data.chapters;
                }
                case "sas": {
                    const mod =
                        await import("@/data/pandemics/plague-of-justinian-541/sas.json");
                    const data = mod.default as unknown as
                        { chapters: Chapter[] } | Chapter[];
                    return Array.isArray(data) ? data : data.chapters;
                }
                case "rom": {
                    const mod =
                        await import("@/data/pandemics/plague-of-justinian-541/rom.json");
                    const data = mod.default as unknown as
                        { chapters: Chapter[] } | Chapter[];
                    return Array.isArray(data) ? data : data.chapters;
                }
                default:
                    return null;
            }
        }

        if (pId === "black-death-1347") {
            switch (cCode) {
                case "mes": {
                    const mod =
                        await import("@/data/pandemics/black-death-1347/mes.json");
                    const data = mod.default as unknown as
                        { chapters: Chapter[] } | Chapter[];
                    return Array.isArray(data) ? data : data.chapters;
                }
                case "par": {
                    const mod =
                        await import("@/data/pandemics/black-death-1347/par.json");
                    const data = mod.default as unknown as
                        { chapters: Chapter[] } | Chapter[];
                    return Array.isArray(data) ? data : data.chapters;
                }
                case "lon": {
                    const mod =
                        await import("@/data/pandemics/black-death-1347/lon.json");
                    const data = mod.default as unknown as
                        { chapters: Chapter[] } | Chapter[];
                    return Array.isArray(data) ? data : data.chapters;
                }
                case "kaf": {
                    const mod =
                        await import("@/data/pandemics/black-death-1347/kaf.json");
                    const data = mod.default as unknown as
                        { chapters: Chapter[] } | Chapter[];
                    return Array.isArray(data) ? data : data.chapters;
                }
                default:
                    return null;
            }
        }

        if (
            pId === "cholera-series" ||
            pId === "cholera-1817" ||
            pId === "cholera-1829" ||
            pId === "cholera-1854" ||
            pId === "cholera-1863" ||
            pId === "cholera-1881" ||
            pId === "cholera-1899" ||
            pId === "cholera-1961" ||
            pId === "wave-1" ||
            pId === "wave-2" ||
            pId === "wave-3" ||
            pId === "wave-4" ||
            pId === "wave-5" ||
            pId === "wave-6" ||
            pId === "wave-7" ||
            pId === "wave1" ||
            pId === "wave2" ||
            pId === "wave3" ||
            pId === "wave4" ||
            pId === "wave5" ||
            pId === "wave6" ||
            pId === "wave7"
        ) {
            const isWave7 =
                pId === "cholera-1961" ||
                pId === "wave-7" ||
                pId === "wave7" ||
                (pId === "cholera-series" && waveIndex === 6);

            if (isWave7) {
                switch (cCode) {
                    case "idn":
                    case "id":
                    case "mak":
                    case "jak":
                    case "wave-7":
                    case "wave7": {
                        const mod =
                            await import("@/data/pandemics/cholera/waves/wave-7/idn.json");
                        const data = mod.default as unknown as
                            { chapters: Chapter[] } | Chapter[];
                        return Array.isArray(data) ? data : data.chapters;
                    }
                    case "ind":
                    case "bgd":
                    case "bd":
                    case "dhk":
                    case "cal":
                    case "in": {
                        const mod =
                            await import("@/data/pandemics/cholera/waves/wave-7/ind.json");
                        const data = mod.default as unknown as
                            { chapters: Chapter[] } | Chapter[];
                        return Array.isArray(data) ? data : data.chapters;
                    }
                    case "per":
                    case "pe":
                    case "lma":
                    case "sam": {
                        const mod =
                            await import("@/data/pandemics/cholera/waves/wave-7/per.json");
                        const data = mod.default as unknown as
                            { chapters: Chapter[] } | Chapter[];
                        return Array.isArray(data) ? data : data.chapters;
                    }
                    case "zwe":
                    case "zw":
                    case "har":
                    case "afr": {
                        const mod =
                            await import("@/data/pandemics/cholera/waves/wave-7/zwe.json");
                        const data = mod.default as unknown as
                            { chapters: Chapter[] } | Chapter[];
                        return Array.isArray(data) ? data : data.chapters;
                    }
                    case "hti":
                    case "ht":
                    case "pap": {
                        const mod =
                            await import("@/data/pandemics/cholera/waves/wave-7/hti.json");
                        const data = mod.default as unknown as
                            { chapters: Chapter[] } | Chapter[];
                        return Array.isArray(data) ? data : data.chapters;
                    }
                    case "yem":
                    case "ye":
                    case "san": {
                        const mod =
                            await import("@/data/pandemics/cholera/waves/wave-7/yem.json");
                        const data = mod.default as unknown as
                            { chapters: Chapter[] } | Chapter[];
                        return Array.isArray(data) ? data : data.chapters;
                    }
                }
            }

            const isWave6 =
                pId === "cholera-1899" ||
                pId === "wave-6" ||
                pId === "wave6" ||
                (pId === "cholera-series" && waveIndex === 5);

            if (isWave6) {
                switch (cCode) {
                    case "ind":
                    case "cal":
                    case "bng":
                    case "in":
                    case "wave-6":
                    case "wave6": {
                        const mod =
                            await import("@/data/pandemics/cholera/waves/wave-6/ind.json");
                        const data = mod.default as unknown as
                            { chapters: Chapter[] } | Chapter[];
                        return Array.isArray(data) ? data : data.chapters;
                    }
                    case "rus":
                    case "ru":
                    case "mos":
                    case "stp":
                    case "pet": {
                        const mod =
                            await import("@/data/pandemics/cholera/waves/wave-6/rus.json");
                        const data = mod.default as unknown as
                            { chapters: Chapter[] } | Chapter[];
                        return Array.isArray(data) ? data : data.chapters;
                    }
                    case "phl":
                    case "ph":
                    case "man": {
                        const mod =
                            await import("@/data/pandemics/cholera/waves/wave-6/phl.json");
                        const data = mod.default as unknown as
                            { chapters: Chapter[] } | Chapter[];
                        return Array.isArray(data) ? data : data.chapters;
                    }
                    case "mek":
                    case "mec":
                    case "tur":
                    case "tr":
                    case "ist":
                    case "sa":
                    case "sau": {
                        const mod =
                            await import("@/data/pandemics/cholera/waves/wave-6/mek.json");
                        const data = mod.default as unknown as
                            { chapters: Chapter[] } | Chapter[];
                        return Array.isArray(data) ? data : data.chapters;
                    }
                    case "ita":
                    case "it":
                    case "nap":
                    case "eur":
                    case "usa":
                    case "us":
                    case "nyc": {
                        const mod =
                            await import("@/data/pandemics/cholera/waves/wave-6/ita.json");
                        const data = mod.default as unknown as
                            { chapters: Chapter[] } | Chapter[];
                        return Array.isArray(data) ? data : data.chapters;
                    }
                    case "jpn":
                    case "jp":
                    case "tok":
                    case "yok": {
                        const mod =
                            await import("@/data/pandemics/cholera/waves/wave-6/jpn.json");
                        const data = mod.default as unknown as
                            { chapters: Chapter[] } | Chapter[];
                        return Array.isArray(data) ? data : data.chapters;
                    }
                }
            }

            const isWave5 =
                pId === "cholera-1881" ||
                pId === "wave-5" ||
                pId === "wave5" ||
                (pId === "cholera-series" && waveIndex === 4);

            if (isWave5) {
                switch (cCode) {
                    case "ham":
                    case "de":
                    case "deu":
                    case "aln":
                    case "wave-5":
                    case "wave5": {
                        const mod =
                            await import("@/data/pandemics/cholera/waves/wave-5/ham.json");
                        const data = mod.default as unknown as
                            { chapters: Chapter[] } | Chapter[];
                        return Array.isArray(data) ? data : data.chapters;
                    }
                    case "egy":
                    case "cai":
                    case "alx":
                    case "eg": {
                        const mod =
                            await import("@/data/pandemics/cholera/waves/wave-5/egy.json");
                        const data = mod.default as unknown as
                            { chapters: Chapter[] } | Chapter[];
                        return Array.isArray(data) ? data : data.chapters;
                    }
                    case "ind":
                    case "cal":
                    case "bng":
                    case "in": {
                        const mod =
                            await import("@/data/pandemics/cholera/waves/wave-5/ind.json");
                        const data = mod.default as unknown as
                            { chapters: Chapter[] } | Chapter[];
                        return Array.isArray(data) ? data : data.chapters;
                    }
                    case "rus":
                    case "ru":
                    case "mos":
                    case "stp":
                    case "bak":
                    case "tsk": {
                        const mod =
                            await import("@/data/pandemics/cholera/waves/wave-5/rus.json");
                        const data = mod.default as unknown as
                            { chapters: Chapter[] } | Chapter[];
                        return Array.isArray(data) ? data : data.chapters;
                    }
                    case "ita":
                    case "it":
                    case "nap":
                    case "rom": {
                        const mod =
                            await import("@/data/pandemics/cholera/waves/wave-5/ita.json");
                        const data = mod.default as unknown as
                            { chapters: Chapter[] } | Chapter[];
                        return Array.isArray(data) ? data : data.chapters;
                    }
                    case "fra":
                    case "fr":
                    case "mar":
                    case "par":
                    case "tln": {
                        const mod =
                            await import("@/data/pandemics/cholera/waves/wave-5/fra.json");
                        const data = mod.default as unknown as
                            { chapters: Chapter[] } | Chapter[];
                        return Array.isArray(data) ? data : data.chapters;
                    }
                    case "jpn":
                    case "jp":
                    case "tok":
                    case "yok":
                    case "ngs": {
                        const mod =
                            await import("@/data/pandemics/cholera/waves/wave-5/jpn.json");
                        const data = mod.default as unknown as
                            { chapters: Chapter[] } | Chapter[];
                        return Array.isArray(data) ? data : data.chapters;
                    }
                    case "usa":
                    case "us":
                    case "nyc": {
                        const mod =
                            await import("@/data/pandemics/cholera/waves/wave-5/usa.json");
                        const data = mod.default as unknown as
                            { chapters: Chapter[] } | Chapter[];
                        return Array.isArray(data) ? data : data.chapters;
                    }
                }
            }

            const isWave4 =
                pId === "cholera-1863" ||
                pId === "wave-4" ||
                pId === "wave4" ||
                (pId === "cholera-series" && waveIndex === 3);

            if (isWave4) {
                switch (cCode) {
                    case "mek":
                    case "mec":
                    case "sa":
                    case "sau":
                    case "wave-4":
                    case "wave4": {
                        const mod =
                            await import("@/data/pandemics/cholera/waves/wave-4/mek.json");
                        const data = mod.default as unknown as
                            { chapters: Chapter[] } | Chapter[];
                        return Array.isArray(data) ? data : data.chapters;
                    }
                    case "egy":
                    case "cai":
                    case "alx":
                    case "eg": {
                        const mod =
                            await import("@/data/pandemics/cholera/waves/wave-4/egy.json");
                        const data = mod.default as unknown as
                            { chapters: Chapter[] } | Chapter[];
                        return Array.isArray(data) ? data : data.chapters;
                    }
                    case "gbr":
                    case "gb":
                    case "uk":
                    case "lon": {
                        const mod =
                            await import("@/data/pandemics/cholera/waves/wave-4/gbr.json");
                        const data = mod.default as unknown as
                            { chapters: Chapter[] } | Chapter[];
                        return Array.isArray(data) ? data : data.chapters;
                    }
                    case "usa":
                    case "us":
                    case "nyc": {
                        const mod =
                            await import("@/data/pandemics/cholera/waves/wave-4/usa.json");
                        const data = mod.default as unknown as
                            { chapters: Chapter[] } | Chapter[];
                        return Array.isArray(data) ? data : data.chapters;
                    }
                    case "rus":
                    case "ru":
                    case "mos":
                    case "stp": {
                        const mod =
                            await import("@/data/pandemics/cholera/waves/wave-4/rus.json");
                        const data = mod.default as unknown as
                            { chapters: Chapter[] } | Chapter[];
                        return Array.isArray(data) ? data : data.chapters;
                    }
                    case "zan":
                    case "swa":
                    case "tz":
                    case "tza": {
                        const mod =
                            await import("@/data/pandemics/cholera/waves/wave-4/zan.json");
                        const data = mod.default as unknown as
                            { chapters: Chapter[] } | Chapter[];
                        return Array.isArray(data) ? data : data.chapters;
                    }
                    case "sam":
                    case "prg":
                    case "arg":
                    case "bra":
                    case "py":
                    case "ar":
                    case "br": {
                        const mod =
                            await import("@/data/pandemics/cholera/waves/wave-4/sam.json");
                        const data = mod.default as unknown as
                            { chapters: Chapter[] } | Chapter[];
                        return Array.isArray(data) ? data : data.chapters;
                    }
                }
            }

            const isWave3 =
                pId === "cholera-1854" ||
                pId === "wave-3" ||
                pId === "wave3" ||
                (pId === "cholera-series" && waveIndex === 2);

            if (isWave3) {
                switch (cCode) {
                    case "gbr":
                    case "gb":
                    case "uk":
                    case "lon":
                    case "wave-3":
                    case "wave3": {
                        const mod =
                            await import("@/data/pandemics/cholera/waves/wave-3/gbr.json");
                        const data = mod.default as unknown as
                            { chapters: Chapter[] } | Chapter[];
                        return Array.isArray(data) ? data : data.chapters;
                    }
                    case "rus":
                    case "ru":
                    case "mos":
                    case "sev": {
                        const mod =
                            await import("@/data/pandemics/cholera/waves/wave-3/rus.json");
                        const data = mod.default as unknown as
                            { chapters: Chapter[] } | Chapter[];
                        return Array.isArray(data) ? data : data.chapters;
                    }
                    case "usa":
                    case "us":
                    case "nyc": {
                        const mod =
                            await import("@/data/pandemics/cholera/waves/wave-3/usa.json");
                        const data = mod.default as unknown as
                            { chapters: Chapter[] } | Chapter[];
                        return Array.isArray(data) ? data : data.chapters;
                    }
                    case "ita":
                    case "it":
                    case "flo":
                    case "nap": {
                        const mod =
                            await import("@/data/pandemics/cholera/waves/wave-3/ita.json");
                        const data = mod.default as unknown as
                            { chapters: Chapter[] } | Chapter[];
                        return Array.isArray(data) ? data : data.chapters;
                    }
                    case "ind":
                    case "in":
                    case "cal": {
                        const mod =
                            await import("@/data/pandemics/cholera/waves/wave-3/ind.json");
                        const data = mod.default as unknown as
                            { chapters: Chapter[] } | Chapter[];
                        return Array.isArray(data) ? data : data.chapters;
                    }
                    case "lat":
                    case "crc":
                    case "pan":
                    case "cub":
                    case "hav": {
                        const mod =
                            await import("@/data/pandemics/cholera/waves/wave-3/lat.json");
                        const data = mod.default as unknown as
                            { chapters: Chapter[] } | Chapter[];
                        return Array.isArray(data) ? data : data.chapters;
                    }
                }
            }

            switch (cCode) {
                // Wave 1 Sectors
                case "jes":
                case "cal": {
                    const mod =
                        await import("@/data/pandemics/cholera/waves/wave-1/jes.json");
                    const data = mod.default as unknown as
                        { chapters: Chapter[] } | Chapter[];
                    return Array.isArray(data) ? data : data.chapters;
                }
                case "bat": {
                    const mod =
                        await import("@/data/pandemics/cholera/waves/wave-1/bat.json");
                    const data = mod.default as unknown as
                        { chapters: Chapter[] } | Chapter[];
                    return Array.isArray(data) ? data : data.chapters;
                }
                case "bso":
                case "mus": {
                    const mod =
                        await import("@/data/pandemics/cholera/waves/wave-1/bso.json");
                    const data = mod.default as unknown as
                        { chapters: Chapter[] } | Chapter[];
                    return Array.isArray(data) ? data : data.chapters;
                }
                case "wave-1":
                case "wave1": {
                    // Default Wave 1 sector fallback
                    const mod =
                        await import("@/data/pandemics/cholera/waves/wave-1/jes.json");
                    const data = mod.default as unknown as
                        { chapters: Chapter[] } | Chapter[];
                    return Array.isArray(data) ? data : data.chapters;
                }

                // Wave 2 Sectors
                case "rus":
                case "ru":
                case "mos": {
                    const mod =
                        await import("@/data/pandemics/cholera/waves/wave-2/rus.json");
                    const data = mod.default as unknown as
                        { chapters: Chapter[] } | Chapter[];
                    return Array.isArray(data) ? data : data.chapters;
                }
                case "gbr":
                case "gb":
                case "uk":
                case "lon": {
                    const mod =
                        await import("@/data/pandemics/cholera/waves/wave-2/gbr.json");
                    const data = mod.default as unknown as
                        { chapters: Chapter[] } | Chapter[];
                    return Array.isArray(data) ? data : data.chapters;
                }
                case "fra":
                case "fr":
                case "par": {
                    const mod =
                        await import("@/data/pandemics/cholera/waves/wave-2/fra.json");
                    const data = mod.default as unknown as
                        { chapters: Chapter[] } | Chapter[];
                    return Array.isArray(data) ? data : data.chapters;
                }
                case "usa":
                case "us":
                case "nyc": {
                    const mod =
                        await import("@/data/pandemics/cholera/waves/wave-2/usa.json");
                    const data = mod.default as unknown as
                        { chapters: Chapter[] } | Chapter[];
                    return Array.isArray(data) ? data : data.chapters;
                }
                case "mek":
                case "mec":
                case "sa":
                case "sau": {
                    const mod =
                        await import("@/data/pandemics/cholera/waves/wave-2/mek.json");
                    const data = mod.default as unknown as
                        { chapters: Chapter[] } | Chapter[];
                    return Array.isArray(data) ? data : data.chapters;
                }
                case "wave-2":
                case "wave2": {
                    // Default Wave 2 sector fallback
                    const mod =
                        await import("@/data/pandemics/cholera/waves/wave-2/rus.json");
                    const data = mod.default as unknown as
                        { chapters: Chapter[] } | Chapter[];
                    return Array.isArray(data) ? data : data.chapters;
                }

                // Wave 3 Sectors
                case "ita":
                case "it":
                case "flo":
                case "nap": {
                    const mod =
                        await import("@/data/pandemics/cholera/waves/wave-3/ita.json");
                    const data = mod.default as unknown as
                        { chapters: Chapter[] } | Chapter[];
                    return Array.isArray(data) ? data : data.chapters;
                }
                case "ind":
                case "in": {
                    // Wave 3 Bengal & Indian Subcontinent
                    const mod =
                        await import("@/data/pandemics/cholera/waves/wave-3/ind.json");
                    const data = mod.default as unknown as
                        { chapters: Chapter[] } | Chapter[];
                    return Array.isArray(data) ? data : data.chapters;
                }
                case "lat":
                case "crc":
                case "pan":
                case "cub":
                case "hav": {
                    const mod =
                        await import("@/data/pandemics/cholera/waves/wave-3/lat.json");
                    const data = mod.default as unknown as
                        { chapters: Chapter[] } | Chapter[];
                    return Array.isArray(data) ? data : data.chapters;
                }
                case "sev": {
                    // Sevastopol / Crimean War front in Wave 3
                    const mod =
                        await import("@/data/pandemics/cholera/waves/wave-3/rus.json");
                    const data = mod.default as unknown as
                        { chapters: Chapter[] } | Chapter[];
                    return Array.isArray(data) ? data : data.chapters;
                }
                case "wave-3":
                case "wave3": {
                    // Default Wave 3 sector fallback (Dr. John Snow GBR)
                    const mod =
                        await import("@/data/pandemics/cholera/waves/wave-3/gbr.json");
                    const data = mod.default as unknown as
                        { chapters: Chapter[] } | Chapter[];
                    return Array.isArray(data) ? data : data.chapters;
                }

                // Wave 4 Sectors
                case "egy":
                case "cai":
                case "alx": {
                    const mod =
                        await import("@/data/pandemics/cholera/waves/wave-4/egy.json");
                    const data = mod.default as unknown as
                        { chapters: Chapter[] } | Chapter[];
                    return Array.isArray(data) ? data : data.chapters;
                }
                case "zan":
                case "swa": {
                    const mod =
                        await import("@/data/pandemics/cholera/waves/wave-4/zan.json");
                    const data = mod.default as unknown as
                        { chapters: Chapter[] } | Chapter[];
                    return Array.isArray(data) ? data : data.chapters;
                }
                case "sam":
                case "prg":
                case "arg":
                case "bra": {
                    const mod =
                        await import("@/data/pandemics/cholera/waves/wave-4/sam.json");
                    const data = mod.default as unknown as
                        { chapters: Chapter[] } | Chapter[];
                    return Array.isArray(data) ? data : data.chapters;
                }
                case "wave-4":
                case "wave4": {
                    // Default Wave 4 sector fallback (Mecca Hajj MEK)
                    const mod =
                        await import("@/data/pandemics/cholera/waves/wave-4/mek.json");
                    const data = mod.default as unknown as
                        { chapters: Chapter[] } | Chapter[];
                    return Array.isArray(data) ? data : data.chapters;
                }
                default:
                    return null;
            }
        }

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

        if (pId === "spanish-flu-1918") {
            switch (cCode) {
                case "us":
                case "usa": {
                    const mod =
                        await import("@/data/pandemics/spanish-flu-1918/us.json");
                    const data = mod.default as unknown as
                        { chapters: Chapter[] } | Chapter[];
                    return Array.isArray(data) ? data : data.chapters;
                }
                case "fr":
                case "fra": {
                    const mod =
                        await import("@/data/pandemics/spanish-flu-1918/fr.json");
                    const data = mod.default as unknown as
                        { chapters: Chapter[] } | Chapter[];
                    return Array.isArray(data) ? data : data.chapters;
                }
                case "es":
                case "esp": {
                    const mod =
                        await import("@/data/pandemics/spanish-flu-1918/es.json");
                    const data = mod.default as unknown as
                        { chapters: Chapter[] } | Chapter[];
                    return Array.isArray(data) ? data : data.chapters;
                }
                case "gb":
                case "gbr":
                case "uk": {
                    const mod =
                        await import("@/data/pandemics/spanish-flu-1918/gb.json");
                    const data = mod.default as unknown as
                        { chapters: Chapter[] } | Chapter[];
                    return Array.isArray(data) ? data : data.chapters;
                }
                case "in":
                case "ind": {
                    const mod =
                        await import("@/data/pandemics/spanish-flu-1918/in.json");
                    const data = mod.default as unknown as
                        { chapters: Chapter[] } | Chapter[];
                    return Array.isArray(data) ? data : data.chapters;
                }
                case "id":
                case "idn": {
                    const mod =
                        await import("@/data/pandemics/spanish-flu-1918/id.json");
                    const data = mod.default as unknown as
                        { chapters: Chapter[] } | Chapter[];
                    return Array.isArray(data) ? data : data.chapters;
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
