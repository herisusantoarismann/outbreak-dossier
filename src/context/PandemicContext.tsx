"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useMemo,
} from "react";
import { useParams } from "next/navigation";
import {
    PANDEMIC_REGISTRY,
    PandemicProfile,
    getPandemicConfig,
    ClinicalProfile,
} from "@/data/pandemicsRegistry";
import { GlobalExtremeRecord, CountrySurveillanceData } from "@/types/journey";

// Pre-imported datasets for instantaneous zero-latency era switching
import covidExtremes from "@/data/pandemics/covid-19/global-extremes.json";
import covidSurveillance from "@/data/pandemics/covid-19/global-surveillance.json";
import blackDeathExtremes from "@/data/pandemics/black-death-1347/extremes.json";
import blackDeathSurveillance from "@/data/pandemics/black-death-1347/surveillance.json";
import spanishFluExtremes from "@/data/pandemics/spanish-flu-1918/extremes.json";
import spanishFluSurveillance from "@/data/pandemics/spanish-flu-1918/surveillance.json";

export interface AboutDrawerContent {
    title: { id: string; en: string };
    overview: { id: string; en: string };
    pathogenName: string;
    clinical: ClinicalProfile;
}

export interface PandemicContextValue {
    activePandemic: PandemicProfile;
    activePandemicId: "black-death-1347" | "spanish-flu-1918" | "covid-19";
    setActivePandemicId: (id: string) => void;
    allPandemics: PandemicProfile[];
    metadata: {
        era: string;
        pathogen: string;
        deathToll: string;
        themeColor: string;
        atmosphereHex: string;
    };
    aboutDrawerContent: AboutDrawerContent;
    extremesData: GlobalExtremeRecord[];
    surveillanceData: Record<string, CountrySurveillanceData>;
    encryptedNotification: string | null;
    triggerEncryptedAlert: () => void;
    dismissNotification: () => void;
}

const PandemicContext = createContext<PandemicContextValue | undefined>(
    undefined,
);

const EXTREMES_CATALOG: Record<string, GlobalExtremeRecord[]> = {
    "black-death-1347": blackDeathExtremes as unknown as GlobalExtremeRecord[],
    "spanish-flu-1918": spanishFluExtremes as unknown as GlobalExtremeRecord[],
    "covid-19": covidExtremes as unknown as GlobalExtremeRecord[],
};

const SURVEILLANCE_CATALOG: Record<
    string,
    Record<string, CountrySurveillanceData>
> = {
    "black-death-1347": blackDeathSurveillance as unknown as Record<
        string,
        CountrySurveillanceData
    >,
    "spanish-flu-1918": spanishFluSurveillance as unknown as Record<
        string,
        CountrySurveillanceData
    >,
    "covid-19": covidSurveillance as unknown as Record<
        string,
        CountrySurveillanceData
    >,
};

export const PandemicProvider: React.FC<{
    children: React.ReactNode;
    initialPandemicId?: string;
}> = ({ children, initialPandemicId }) => {
    const params = useParams();

    const routePandemicId =
        (params?.pandemicId as string) || (params?.pandemic as string);

    const [selectedPandemicId, setSelectedPandemicId] = useState<string | null>(
        null,
    );
    const [encryptedNotification, setEncryptedNotification] = useState<
        string | null
    >(null);

    const activePandemicId = (selectedPandemicId ??
        initialPandemicId ??
        routePandemicId ??
        "covid-19") as "black-death-1347" | "spanish-flu-1918" | "covid-19";

    const triggerEncryptedAlert = useCallback(() => {
        setEncryptedNotification(
            "[ ARCHIVE ENCRYPTED // DECLASSIFICATION IN PROGRESS ]",
        );
    }, []);

    const dismissNotification = useCallback(() => {
        setEncryptedNotification(null);
    }, []);

    // Auto-dismiss notification after 3500ms
    useEffect(() => {
        if (!encryptedNotification) return;
        const timer = setTimeout(() => {
            setEncryptedNotification(null);
        }, 3500);
        return () => clearTimeout(timer);
    }, [encryptedNotification]);

    const activePandemic = useMemo(() => {
        return (
            getPandemicConfig(activePandemicId) ||
            PANDEMIC_REGISTRY.find((p) => p.id === "covid-19") ||
            PANDEMIC_REGISTRY[0]
        );
    }, [activePandemicId]);

    const setActivePandemicId = useCallback(
        (id: string) => {
            const target = getPandemicConfig(id);
            if (!target) return;

            setSelectedPandemicId(target.id);

            if (target.status === "classified_archive") {
                triggerEncryptedAlert();
            }

            // Update browser URL without triggering a full page reload / WebGL scene destruction
            if (typeof window !== "undefined") {
                const currentPath = window.location.pathname;
                const parts = currentPath.split("/").filter(Boolean);
                const locale =
                    parts[0] === "en" || parts[0] === "id" ? parts[0] : "id";
                const newUrl = `/${locale}/globe/${target.id}`;
                if (window.location.pathname !== newUrl) {
                    window.history.pushState(null, "", newUrl);
                }
            }
        },
        [triggerEncryptedAlert],
    );

    const metadata = useMemo(
        () => ({
            era: activePandemic.eraLabel,
            pathogen: activePandemic.pathogenName,
            deathToll: activePandemic.globalFatalities || "~7M+",
            themeColor: activePandemic.themeColor,
            atmosphereHex: activePandemic.atmosphereHex,
        }),
        [activePandemic],
    );

    const aboutDrawerContent = useMemo(
        (): AboutDrawerContent => ({
            title: activePandemic.aboutTitle,
            overview: activePandemic.aboutOverview,
            pathogenName: activePandemic.pathogenName,
            clinical: activePandemic.clinicalProfile || {
                classification: {
                    title: { id: "Klasifikasi", en: "Classification" },
                    text: {
                        id: activePandemic.pathogenName,
                        en: activePandemic.pathogenName,
                    },
                },
                metrics: {
                    incubation: {
                        title: { id: "Inkubasi", en: "Incubation" },
                        value: "N/A",
                        sub: { id: "Standard", en: "Standard" },
                    },
                    receptor: {
                        title: { id: "Reseptor", en: "Receptor" },
                        value: "N/A",
                        sub: { id: "Biologis", en: "Biological" },
                    },
                    family: {
                        title: { id: "Famili", en: "Family" },
                        value: "N/A",
                        sub: { id: "Taksonomi", en: "Taxonomy" },
                    },
                },
                transmission: {
                    title: { id: "Transmisi", en: "Transmission" },
                    text: {
                        id: "Data sedang dideklasifikasi.",
                        en: "Declassification in progress.",
                    },
                },
                symptoms: {
                    title: { id: "Gejala", en: "Symptoms" },
                    text: {
                        id: "Data sedang dideklasifikasi.",
                        en: "Declassification in progress.",
                    },
                },
            },
        }),
        [activePandemic],
    );

    const extremesData = useMemo(() => {
        return EXTREMES_CATALOG[activePandemic.id] || [];
    }, [activePandemic.id]);

    const surveillanceData = useMemo(() => {
        return (
            SURVEILLANCE_CATALOG[activePandemic.id] ||
            SURVEILLANCE_CATALOG["covid-19"] ||
            {}
        );
    }, [activePandemic.id]);

    const value = useMemo(
        () => ({
            activePandemic,
            activePandemicId,
            setActivePandemicId,
            allPandemics: PANDEMIC_REGISTRY,
            metadata,
            aboutDrawerContent,
            extremesData,
            surveillanceData,
            encryptedNotification,
            triggerEncryptedAlert,
            dismissNotification,
        }),
        [
            activePandemic,
            activePandemicId,
            setActivePandemicId,
            metadata,
            aboutDrawerContent,
            extremesData,
            surveillanceData,
            encryptedNotification,
            triggerEncryptedAlert,
            dismissNotification,
        ],
    );

    return (
        <PandemicContext.Provider value={value}>
            {children}
        </PandemicContext.Provider>
    );
};

export function useActivePandemic(): PandemicContextValue {
    const context = useContext(PandemicContext);
    if (!context) {
        const defaultPandemic = PANDEMIC_REGISTRY[2] || PANDEMIC_REGISTRY[0];
        return {
            activePandemic: defaultPandemic,
            activePandemicId: defaultPandemic.id,
            setActivePandemicId: () => {},
            allPandemics: PANDEMIC_REGISTRY,
            metadata: {
                era: defaultPandemic.eraLabel,
                pathogen: defaultPandemic.pathogenName,
                deathToll: defaultPandemic.globalFatalities || "~7M+",
                themeColor: defaultPandemic.themeColor,
                atmosphereHex: defaultPandemic.atmosphereHex,
            },
            aboutDrawerContent: {
                title: defaultPandemic.aboutTitle,
                overview: defaultPandemic.aboutOverview,
                pathogenName: defaultPandemic.pathogenName,
                clinical: defaultPandemic.clinicalProfile!,
            },
            extremesData: EXTREMES_CATALOG["covid-19"] || [],
            surveillanceData: SURVEILLANCE_CATALOG["covid-19"] || {},
            encryptedNotification: null,
            triggerEncryptedAlert: () => {},
            dismissNotification: () => {},
        };
    }
    return context;
}

export default PandemicContext;
