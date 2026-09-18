export interface PathogenConfig {
    name: string;
    morphology:
        "rod_bacillus" | "comma_flagellum" | "dense_orthomyxo" | "corona_spike";
    assetKey: "yersinia_pestis" | "vibrio_cholerae" | "h1n1" | "sars_cov_2";
    themeColor: string;
    haloHex: string;
    label: { id: string; en: string };
    sublabel: { id: string; en: string };
}

export const PATHOGEN_LOADER_CONFIG: Record<string, PathogenConfig> = {
    "plague-of-justinian-541": {
        name: "Yersinia pestis (Galur Antiqua 541 M)",
        morphology: "rod_bacillus",
        assetKey: "yersinia_pestis", // Shared vector asset with Black Death
        themeColor: "#a855f7", // Byzantine Imperial Purple
        haloHex: "rgba(168, 85, 247, 0.4)",
        label: {
            id: "MENDEKRIPSI ARSIP MEDITERANIA // 541 M",
            en: "DECRYPTING MEDITERRANEAN ARCHIVE // 541 AD",
        },
        sublabel: {
            id: "PROFIL MIKROBA: YERSINIA PESTIS (BASIL PES KUNO)",
            en: "PATHOGEN PROFILE: YERSINIA PESTIS (ANCIENT PLAGUE BACILLUS)",
        },
    },
    "black-death-1347": {
        name: "Yersinia pestis (Galur Medievalis 1347 M)",
        morphology: "rod_bacillus",
        assetKey: "yersinia_pestis", // Shared vector asset with Justinian
        themeColor: "#e11d48", // Dried Blood Crimson
        haloHex: "rgba(225, 29, 72, 0.4)",
        label: {
            id: "MEMBUKA REKAM JEJAK JALUR SUTRA // 1347 M",
            en: "UNSEALING SILK ROAD RECORDS // 1347 AD",
        },
        sublabel: {
            id: "PROFIL MIKROBA: YERSINIA PESTIS (VEKTOR PES BUBONIK)",
            en: "PATHOGEN PROFILE: YERSINIA PESTIS (BUBONIC PLAGUE VECTOR)",
        },
    },
    "cholera-1817": {
        name: "Vibrio cholerae",
        morphology: "comma_flagellum",
        assetKey: "vibrio_cholerae",
        themeColor: "#10b981", // Industrial Emerald
        haloHex: "rgba(16, 185, 129, 0.4)",
        label: {
            id: "MEMPROSES TELEMETRI AIR TERKONTAMINASI // 1817 M",
            en: "PROCESSING WATERBORNE TELEMETRY // 1817 AD",
        },
        sublabel: {
            id: "PROFIL MIKROBA: VIBRIO CHOLERAE (BASIL LENGKUNG BERBENTUK KOMA)",
            en: "PATHOGEN PROFILE: VIBRIO CHOLERAE (CURVED COMMA BACILLUS)",
        },
    },
    "spanish-flu-1918": {
        name: "H1N1 Influenza A Virus",
        morphology: "dense_orthomyxo",
        assetKey: "h1n1",
        themeColor: "#f59e0b", // Trench Warfare Amber
        haloHex: "rgba(245, 158, 11, 0.4)",
        label: {
            id: "MEMINDAI DOKUMEN PARIT PERANG DUNIA I // 1918 M",
            en: "SCANNING WWI MILITARY DISPATCHES // 1918 AD",
        },
        sublabel: {
            id: "PROFIL MIKROBA: H1N1 ORTHOMYXOVIRIDAE (DROPLET PERNAPASAN)",
            en: "PATHOGEN PROFILE: H1N1 ORTHOMYXOVIRIDAE (RESPIRATORY DROPLET)",
        },
    },
    "covid-19": {
        name: "SARS-CoV-2",
        morphology: "corona_spike",
        assetKey: "sars_cov_2",
        themeColor: "#ef4444", // Iconic Viral Outbreak Crimson / S-Protein Red
        haloHex: "rgba(239, 68, 68, 0.45)",
        label: {
            id: "MEREKONSTRUKSI DATA SURVEILANS MODERN // 2020 M",
            en: "RECONSTRUCTING MODERN SURVEILLANCE // 2020 AD",
        },
        sublabel: {
            id: "PROFIL PATOGEN: SARS-CoV-2 (KORONAVIRUS DENGAN SPIKE GLIKOPROTEIN)",
            en: "PATHOGEN PROFILE: SARS-CoV-2 (CORONAVIRIDAE SPIKE VIRION)",
        },
    },
};

export function getPathogenConfig(pandemicId?: string): PathogenConfig {
    const key = pandemicId?.toLowerCase() || "covid-19";
    return PATHOGEN_LOADER_CONFIG[key] || PATHOGEN_LOADER_CONFIG["covid-19"];
}
