export type PandemicId = "covid-19" | "sars" | "mers" | "ebola";

export type SupportedLocale = "id" | "en" | "zh";

export type LanguageCode = SupportedLocale;

export interface LocalizedContent {
    id: string;
    en: string;
    zh: string;
}

export interface VirusProfile {
    code: string;
    mutationType: LocalizedContent | string;
    r0: string;
    threatLevel: LocalizedContent | string;
    clinicalTarget: LocalizedContent | string;
}

export interface SocietalImpact {
    collectiveMemory?: string;
    keyEvent?: string;
    economicShock?: string;
}

export interface Chapter {
    id: string;
    chapterNumber: string;
    type: "standard" | "milestone" | "side_story";
    title: LocalizedContent | string;
    date: LocalizedContent | string;
    strain: string;
    flash: LocalizedContent | string;
    virusProfile: VirusProfile;
    societalImpact?: SocietalImpact;
    description: LocalizedContent | string;
    image: string;
    beforeImage?: string;
    afterImage?: string;
    location?: string;
    tag?: string;
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
