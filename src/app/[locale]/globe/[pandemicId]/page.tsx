import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { routing, Locale } from "@/i18n/routing";
import { PANDEMIC_REGISTRY, getPandemicConfig } from "@/data/pandemicsRegistry";
import GlobePageClient from "./GlobePageClient";

interface GlobePageProps {
    params: Promise<{
        locale: string;
        pandemicId: string;
    }>;
}

export function generateStaticParams() {
    return routing.locales.flatMap((locale) =>
        PANDEMIC_REGISTRY.map((pandemic) => ({
            locale,
            pandemicId: pandemic.id,
        })),
    );
}

export async function generateMetadata({
    params,
}: GlobePageProps): Promise<Metadata> {
    const { locale, pandemicId } = await params;
    const config = getPandemicConfig(pandemicId);
    if (!config) return {};

    const name = locale === "id" ? config.name.id : config.name.en;
    return {
        title: `${name} (${config.era})`,
        description: `Temporal 3D Global Bio-Surveillance & Intelligence Chronicle for ${name}. Pathogen: ${config.pathogen}. Global fatalities: ${config.globalFatalities}.`,
    };
}

export default async function GlobePage({ params }: GlobePageProps) {
    const { locale, pandemicId } = await params;

    if (!routing.locales.includes(locale as Locale)) {
        notFound();
    }

    const pandemicConfig = getPandemicConfig(pandemicId);
    if (!pandemicConfig) {
        notFound();
    }

    setRequestLocale(locale);

    return <GlobePageClient initialPandemicId={pandemicConfig.id} />;
}
