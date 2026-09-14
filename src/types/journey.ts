export type PandemicId = "covid-19" | "sars" | "mers" | "ebola";

export type LanguageCode = "id" | "en";

export interface VirusProfile {
    code: string;
    mutationType: string;
    r0: string;
    threatLevel: string;
    clinicalTarget: string;
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
    title: string;
    date: string;
    strain: string;
    flash: string;
    virusProfile: VirusProfile;
    societalImpact?: SocietalImpact;
    description: string;
    image: string;
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
