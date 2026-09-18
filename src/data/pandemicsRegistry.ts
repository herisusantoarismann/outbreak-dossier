import { Chapter, CountrySurveillanceData } from "@/types/journey";
import { EPICENTER_REGISTRY, EpicenterMetadata } from "./countriesConfig";

import justinianSurveillance from "@/data/pandemics/plague-of-justinian-541/surveillance.json";
import blackDeathSurveillance from "@/data/pandemics/black-death-1347/surveillance.json";
import choleraSurveillance from "@/data/pandemics/cholera-1817/surveillance.json";
import spanishFluSurveillance from "@/data/pandemics/spanish-flu-1918/surveillance.json";
import covidSurveillance from "@/data/pandemics/covid-19/global-surveillance.json";

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
        eraLabel: "1346 – 1353 M",
        name: { id: "Maut Hitam (Black Death)", en: "The Black Death" },
        shortLabel: "1347 // BLACK DEATH",
        pathogenName: "Yersinia pestis",
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
        era: "1346 – 1353 M",
        pathogen: "Yersinia pestis",
        globeAtmosphere: "#881337",
        globalFatalities: "~75M - 200M",
        status: "classified_archive",
        route: "/globe/black-death-1347",
        baseYear: 1347,
        epicenters: ["it", "fr", "gb", "cn"],
        primaryEpicenters: ["IT", "FR", "GB", "CN"],
        defaultCameraPosition: [45, 15, 2.3],
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
        id: "cholera-1817",
        year: 1817,
        eraLabel: "1817 – 1824 M",
        name: { id: "Pandemi Kolera Pertama", en: "First Cholera Pandemic" },
        shortLabel: "1817 // CHOLERA",
        pathogenName: "Vibrio cholerae",
        aboutTitle: {
            id: "Mengenal Pandemi Kolera Pertama (1817)",
            en: "Understanding the First Cholera Pandemic (1817)",
        },
        aboutOverview: {
            id: "Wabah kolera asiatik pertama yang meletus dari Delta Sungai Gangga di Jessore, menyebar melalui rute perdagangan tentara kolonial ke seluruh Asia dan Timur Tengah.",
            en: "The first global Asiatic cholera pandemic emerging from the Ganges River Delta in Jessore, propagating along colonial trade and troop routes across Asia and the Middle East.",
        },
        tickerExtremesFile: "cholera-1817/extremes.json",
        surveillanceFile: "cholera-1817/surveillance.json",
        themeColor: "#10b981",
        atmosphereHex: "#064e3b",
        era: "1817 – 1824 M",
        pathogen: "Vibrio cholerae",
        globeAtmosphere: "#064e3b",
        globalFatalities: "~1M - 2M+",
        status: "classified_archive",
        route: "/globe/cholera-1817",
        baseYear: 1817,
        epicenters: ["in", "bd", "id", "om"],
        primaryEpicenters: ["IN", "BD", "ID", "OM"],
        defaultCameraPosition: [22, 88, 2.3],
        clinicalProfile: {
            classification: {
                title: {
                    id: "Klasifikasi Biologis & Struktur Patogen",
                    en: "Biological Classification & Pathogen Structure",
                },
                text: {
                    id: "Vibrio cholerae adalah bakteri Gram-negatif berbentuk koma dengan flagela tunggal polar. Patogen ini memproduksi toksin kolera (CTX) yang mengikat reseptor GM1 ganglioside di enterosit usus halus, memicu sekresi air dan elektrolit masif.",
                    en: "Vibrio cholerae is a comma-shaped, highly motile Gram-negative bacterium with a single polar flagellum. It produces cholera enterotoxin (CTX) binding GM1 gangliosides, precipitating massive cyclic-AMP mediated intestinal fluid hypersecretion.",
                },
            },
            metrics: {
                incubation: {
                    title: { id: "Masa Inkubasi", en: "Incubation Period" },
                    value: "2 Jam – 5 Hari",
                    sub: {
                        id: "Onset Dehidrasi Akut",
                        en: "Acute Dehydration Onset",
                    },
                },
                receptor: {
                    title: { id: "Reseptor Seluler", en: "Target Receptor" },
                    value: "GM1 Ganglioside",
                    sub: {
                        id: "Toksin Kolera A-B",
                        en: "A-B Cholera Enterotoxin",
                    },
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
                    id: "Rute fekal-oral melalui air minum, sungai, dan makanan yang terkontaminasi limbah tinja penderita. Diperparah oleh perpindahan batalion serdadu East India Company dan kafilah ziarah di lembah Benggala.",
                    en: "Fecal-oral route through sewage-contaminated drinking water supplies and river estuaries, intensified by troop movements of the East India Company and regional pilgrim corridors.",
                },
            },
            symptoms: {
                title: {
                    id: "Manifestasi Klinis Karakteristik",
                    en: "Clinical Manifestations",
                },
                text: {
                    id: "Diare cair tanpa nyeri menyerupai air cucian beras ('rice-water stool') hingga 20 liter per hari, muntah profus, kram otot parah, hipotensi cepat, sianosis asfiksia kering, dan syok hipovolemik fatal dalam hitungan jam.",
                    en: "Painless voluminous watery diarrhea ('rice-water stools') up to 20 liters/day, profuse emesis, agonizing muscle cramps, sunken eyes, wrinkling washerwoman hands, and rapid terminal hypovolemic shock.",
                },
            },
        },
    },
    {
        id: "spanish-flu-1918",
        year: 1918,
        eraLabel: "1918 – 1920 M",
        name: { id: "Flu Spanyol 1918", en: "1918 Spanish Flu" },
        shortLabel: "1918 // SPANISH FLU",
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
        era: "1918 – 1920 M",
        pathogen: "H1N1 Influenza A Virus",
        globeAtmosphere: "#b45309",
        globalFatalities: "~50M+",
        status: "classified_archive",
        route: "/globe/spanish-flu-1918",
        baseYear: 1918,
        epicenters: ["us", "fr", "es", "gb"],
        primaryEpicenters: ["US", "FR", "ES", "GB"],
        defaultCameraPosition: [40, -40, 2.3],
        clinicalProfile: {
            classification: {
                title: {
                    id: "Klasifikasi Biologis & Struktur Patogen",
                    en: "Biological Classification & Pathogen Structure",
                },
                text: {
                    id: "Virus Influenza A subtipe H1N1 adalah virus RNA beruntai tunggal (ssRNA) antisense bersegmen 8 dari famili Orthomyxoviridae dengan glikoprotein Hemagglutinin (H1) dan Neuraminidase (N1).",
                    en: "Influenza A virus subtype H1N1 is an enveloped, segmented negative-sense ssRNA virus of the Orthomyxoviridae family with surface Hemagglutinin (H1) and Neuraminidase (N1).",
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
                    id: "Aerosol pernapasan langsung saat batuk, bersin, dan berbicara di ruang padat tanpa ventilasi (barak militer, kapal angkut pasukan PD I, dan gerbong kereta api).",
                    en: "Direct airborne droplet nuclei from coughing and sneezing in overcrowded wartime quarters (military camps, troopships, and trains).",
                },
            },
            symptoms: {
                title: {
                    id: "Manifestasi Klinis Karakteristik",
                    en: "Clinical Manifestations",
                },
                text: {
                    id: "Badai sitokin hiper-inflamasi pada dewasa muda, edema paru berdarah akut, dan heliotrope cyanosis (kulit wajah kebiruan karena asfiksia jaringan fatal).",
                    en: "Severe cytokine storms in young adults, acute hemorrhagic pulmonary edema, and heliotrope cyanosis (deep purplish-blue facial suffocation).",
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
        beaconColor: "#8b5cf6",
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
        beaconColor: "#f59e0b",
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
        beaconColor: "#06b6d4",
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
        beaconColor: "#ef4444",
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
        beaconColor: "#eab308",
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
        beaconColor: "#8b5cf6",
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
 * Retrieve epicenter registry for any pandemic.
 */
export function getEpicentersForPandemic(
    pandemicId: string,
): Record<string, EpicenterMetadata> {
    const pId = pandemicId.toLowerCase();
    if (pId === "plague-of-justinian-541") return JUSTINIAN_EPICENTERS;
    if (pId === "black-death-1347") return BLACK_DEATH_EPICENTERS;
    if (pId === "cholera-1817") return CHOLERA_1817_EPICENTERS;
    if (pId === "spanish-flu-1918") return SPANISH_FLU_EPICENTERS;
    return EPICENTER_REGISTRY;
}

/**
 * Retrieve the isolated surveillance dataset catalog for an active pandemic.
 */
export function getSurveillanceForPandemic(
    pandemicId: string,
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

/**
 * Strict Era-Based Interaction Resolver.
 * Guarantees zero data bleed: only returns interactions for territories
 * belonging to the active pandemic era. Non-relevant countries return null.
 */
export function getCountryInteraction(
    pandemicId: string,
    countryIdentifier: string,
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
        const epicenters = BLACK_DEATH_EPICENTERS;
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
        const epicenters = SPANISH_FLU_EPICENTERS;
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
    if (code === "tur") return "tr";
    if (code === "egy") return "eg";
    if (code === "syr") return "sy";
    if (code === "bgd") return "bd";
    if (code === "omn") return "om";
    if (code === "irn") return "ir";
    if (code === "cpx") return "cpx";
    if (code === "pel") return "pel";
    if (code === "sas") return "sas";
    if (code === "rom") return "rom";
    return code.slice(0, 2);
}

/**
 * Dynamic Dataset Resolver
 */
export async function loadDossier(
    pandemicId: string,
    countryCode: string,
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
