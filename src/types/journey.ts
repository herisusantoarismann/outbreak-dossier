export type PandemicId = "covid-19" | "sars" | "mers" | "ebola";

export type SupportedLocale = "id" | "en";

export type LanguageCode = SupportedLocale;

export interface LocalizedContent {
    id: string;
    en: string;
    zh?: string;
    it?: string;
    hi?: string;
}

export interface VirusProfile {
    code?: string;
    mutationType?: LocalizedContent;
    r0?: string;
    threatLevel?: LocalizedContent;
    clinicalTarget?: LocalizedContent;
    agent?: string;
    vector?: string;
    incubation?: string;
    transmission?: string;
}

export interface SocietalImpact {
    collectiveMemory?: string;
    keyEvent?: string;
    economicShock?: string;
}

export interface Chapter {
    id: string;
    chapterNumber: string | number;
    type: "standard" | "milestone" | "side_story";
    title: LocalizedContent;
    date: LocalizedContent;
    strain?: string;
    flash: LocalizedContent;
    virusProfile: VirusProfile;
    societalImpact?: SocietalImpact;
    description: LocalizedContent;
    image: string;
    beforeImage?: string;
    afterImage?: string;
    location?: string;
    tag?: string;
}

export interface CountrySurveillanceData {
    iso2: string;
    name: LocalizedContent;
    continent: string;
    confirmedCases?: number | string;
    fatalities?: number | string;
    recoveryRate?: string;
    peakWave?: LocalizedContent;
    statusBadge?: LocalizedContent;
    regionName?: LocalizedContent;
    coordinates?: [number, number];
    fatalitiesEstimate?: string;
    peakPeriod?: string;
    notes?: LocalizedContent;
}

export interface GlobalExtremeRecord {
    id: string;
    iso2: string;
    territoryCode?: string;
    metricType: "mortality" | "survival" | "containment" | "density";
    label: LocalizedContent;
    countryName: LocalizedContent;
    value: LocalizedContent | string;
    context: LocalizedContent;
    coordinates?: {
        lat: number;
        lng: number;
    };
}

export interface SceneMedia {
    type: "image" | "video";
    url: string;
    alt: string;
    caption?: string;
}

export interface StatMetric {
    label: string;
    value: string | number;
    change?: string;
    status?: "warning" | "danger" | "critical" | "normal";
}

export interface JourneyScene {
    id: string;
    chapterIndex: number;
    date: string;
    location: string;
    title: string;
    subtitle?: string;
    description: string[];
    media: SceneMedia;
    stats?: StatMetric[];
    tacticalNotes?: string;
}

export interface JourneyData {
    countryCode: string;
    countryName: string;
    pandemicId: PandemicId;
    language: LanguageCode;
    summary: {
        firstIdentified: string;
        totalMilestones: number;
        initialStatus: string;
    };
    scenes: JourneyScene[];
}
