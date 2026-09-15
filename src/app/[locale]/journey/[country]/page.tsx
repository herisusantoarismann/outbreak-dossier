import React from "react";
import { notFound } from "next/navigation";
import { ArrowLeft, Globe } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link, routing, Locale } from "@/i18n/routing";
import { Chapter } from "@/types/journey";
import { ScrollytellingLayout } from "@/components/templates/ScrollytellingLayout";
import { LocaleSwitcher } from "@/components/molecules/LocaleSwitcher";

interface JourneyPageProps {
    params: Promise<{
        locale: string;
        country: string;
    }>;
}

export function generateStaticParams() {
    const countries = [
        "id",
        "idn",
        "cn",
        "chn",
        "it",
        "ita",
        "us",
        "usa",
        "in",
        "ind",
    ];
    return routing.locales.flatMap((locale) =>
        countries.map((country) => ({ locale, country })),
    );
}

export default async function JourneyPage({ params }: JourneyPageProps) {
    const { locale, country } = await params;
    const normalizedCountry = country.toLowerCase();

    if (!routing.locales.includes(locale as Locale)) {
        notFound();
    }

    const isChina = normalizedCountry === "cn" || normalizedCountry === "chn";
    const isIndonesia =
        normalizedCountry === "id" || normalizedCountry === "idn";
    const isItaly = normalizedCountry === "it" || normalizedCountry === "ita";
    const isUS = normalizedCountry === "us" || normalizedCountry === "usa";
    const isIndia = normalizedCountry === "in" || normalizedCountry === "ind";

    if (!isChina && !isIndonesia && !isItaly && !isUS && !isIndia) {
        notFound();
    }

    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: "scrollytelling" });

    let chaptersModule;
    let classificationBadge = "CLASSIFIED RECON ARCHIVE // VOL. 01: COVID-19";

    if (isChina) {
        chaptersModule = await import("@/data/pandemics/covid-19/cn.json");
        classificationBadge =
            "CLASSIFIED RECON ARCHIVE // GROUND ZERO: WUHAN, CHINA";
    } else if (isItaly) {
        chaptersModule = await import("@/data/pandemics/covid-19/it.json");
        classificationBadge =
            "CLASSIFIED RECON ARCHIVE // EUROPEAN GROUND ZERO: ITALY";
    } else if (isUS) {
        chaptersModule = await import("@/data/pandemics/covid-19/us.json");
        classificationBadge =
            "CLASSIFIED RECON ARCHIVE // TRANSMISSION SPIKE: UNITED STATES";
    } else if (isIndia) {
        chaptersModule = await import("@/data/pandemics/covid-19/in.json");
        classificationBadge = "CLASSIFIED RECON ARCHIVE // DELTA SURGE: INDIA";
    } else {
        chaptersModule = await import("@/data/pandemics/covid-19/id.json");
        classificationBadge =
            "CLASSIFIED RECON ARCHIVE // SOUTHEAST ASIA: INDONESIA";
    }
    const chapters: Chapter[] = chaptersModule.default as unknown as Chapter[];

    return (
        <div className="relative min-h-screen w-full bg-[#050508] text-neutral-100">
            {/* Fixed Navigation HUD */}
            <nav className="fixed top-4 left-4 sm:top-6 sm:left-6 z-50 flex items-center gap-3">
                <Link
                    href="/"
                    className="group inline-flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-black/75 hover:bg-black/95 text-neutral-300 hover:text-white border border-neutral-800 hover:border-red-500/60 backdrop-blur-md font-mono text-xs tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.8)] hover:shadow-[0_0_20px_rgba(239,68,68,0.25)]"
                >
                    <ArrowLeft className="w-3.5 h-3.5 text-red-500 transition-transform duration-200 group-hover:-translate-x-1" />
                    <span className="flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-neutral-400 group-hover:text-red-400 transition-colors" />
                        <span className="hidden sm:inline">
                            {t("returnToGlobe")}
                        </span>
                        <span className="sm:hidden">{t("returnShort")}</span>
                    </span>
                </Link>

                {/* Persistent Outbreak Dossier Brand & Classification Badge */}
                <div className="hidden md:flex flex-col justify-center px-3 py-1 rounded-lg bg-black/80 border border-neutral-800 backdrop-blur-md">
                    <span className="font-mono tracking-widest text-xs font-bold text-neutral-100">
                        OUTBREAK DOSSIER
                    </span>
                    <span className="font-mono text-[9px] text-red-400 font-bold tracking-wider">
                        {classificationBadge}
                    </span>
                </div>

                {/* Tactical Locale Switcher */}
                <LocaleSwitcher variant="compact" />
            </nav>

            {/* Scrollytelling Engine Layout */}
            <ScrollytellingLayout chapters={chapters} />
        </div>
    );
}
