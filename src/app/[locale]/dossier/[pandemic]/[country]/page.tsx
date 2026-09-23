import React from "react";
import { notFound } from "next/navigation";
import { ArrowLeft, Globe } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link, routing, Locale } from "@/i18n/routing";
import { ScrollytellingLayout } from "@/components/templates/ScrollytellingLayout";
import { LocaleSwitcher } from "@/components/molecules/LocaleSwitcher";
import {
    getPandemicConfig,
    loadDossier,
    normalizeCountryCode,
} from "@/data/pandemicsRegistry";
import {
    parseCholeraWaveParam,
    inferWaveIndexFromSector,
} from "@/data/pandemics/cholera/waves";
import { t as tLocal } from "@/utils/i18n";
import { SupportedLocale } from "@/types/journey";

interface DossierPageProps {
    params: Promise<{
        locale: string;
        pandemic: string;
        country: string;
    }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export function generateStaticParams() {
    // Statically generate for all currently available dossiers across pandemics
    const availableDossiers: { pandemic: string; countries: string[] }[] = [
        {
            pandemic: "covid-19",
            countries: [
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
            ],
        },
        {
            pandemic: "plague-of-justinian-541",
            countries: ["cpx", "pel", "sas", "rom"],
        },
        {
            pandemic: "black-death-1347",
            countries: ["mes", "par", "lon", "kaf"],
        },
        {
            pandemic: "cholera-series",
            countries: [
                "jes",
                "bat",
                "bso",
                "cal",
                "mus",
                "rus",
                "gbr",
                "fra",
                "usa",
                "mek",
                "mos",
                "lon",
                "par",
                "nyc",
                "mec",
                "ita",
                "ind",
                "lat",
                "sev",
                "flo",
                "pan",
                "crc",
                "egy",
                "cai",
                "alx",
                "stp",
                "zan",
                "swa",
                "sam",
                "prg",
                "arg",
                "bra",
                "ham",
                "deu",
                "aln",
                "bng",
                "bak",
                "tsk",
                "rom",
                "mar",
                "tln",
                "jpn",
                "tok",
                "yok",
                "ngs",
            ],
        },
        {
            pandemic: "cholera-1817",
            countries: ["jes", "bat", "bso", "cal", "mus"],
        },
        {
            pandemic: "cholera-1829",
            countries: [
                "rus",
                "gbr",
                "fra",
                "usa",
                "mek",
                "mos",
                "lon",
                "par",
                "nyc",
                "mec",
            ],
        },
        {
            pandemic: "cholera-1854",
            countries: [
                "gbr",
                "rus",
                "usa",
                "ita",
                "ind",
                "lat",
                "lon",
                "sev",
                "nyc",
                "flo",
                "cal",
                "pan",
            ],
        },
        {
            pandemic: "cholera-1863",
            countries: [
                "mek",
                "egy",
                "gbr",
                "usa",
                "rus",
                "zan",
                "sam",
                "mec",
                "cai",
                "alx",
                "lon",
                "nyc",
                "stp",
                "swa",
                "prg",
                "arg",
                "bra",
            ],
        },
        {
            pandemic: "cholera-1881",
            countries: [
                "ham",
                "egy",
                "ind",
                "rus",
                "ita",
                "fra",
                "jpn",
                "usa",
                "deu",
                "aln",
                "cai",
                "alx",
                "cal",
                "bng",
                "stp",
                "bak",
                "tsk",
                "nap",
                "rom",
                "mar",
                "par",
                "tln",
                "tok",
                "yok",
                "ngs",
                "nyc",
            ],
        },
        {
            pandemic: "cholera-1899",
            countries: [
                "ind",
                "rus",
                "phl",
                "mek",
                "ita",
                "jpn",
                "cal",
                "bng",
                "pet",
                "stp",
                "man",
                "tur",
                "ist",
                "mec",
                "nap",
                "eur",
                "usa",
                "nyc",
                "tok",
                "yok",
            ],
        },
        {
            pandemic: "cholera-1961",
            countries: [
                "idn",
                "ind",
                "per",
                "zwe",
                "hti",
                "yem",
                "mak",
                "jak",
                "bgd",
                "dhk",
                "cal",
                "lma",
                "sam",
                "har",
                "afr",
                "pap",
                "san",
            ],
        },
        {
            pandemic: "spanish-flu-1918",
            countries: [
                "us",
                "usa",
                "fr",
                "fra",
                "es",
                "esp",
                "gb",
                "gbr",
                "uk",
                "in",
                "ind",
                "id",
                "idn",
            ],
        },
    ];

    return routing.locales.flatMap((locale) =>
        availableDossiers.flatMap(({ pandemic, countries }) =>
            countries.map((country) => ({
                locale,
                pandemic,
                country,
            })),
        ),
    );
}

export default async function DossierPage({
    params,
    searchParams,
}: DossierPageProps) {
    const { locale, pandemic, country } = await params;
    const resolvedSearchParams = searchParams ? await searchParams : undefined;
    const rawWave = resolvedSearchParams?.wave;
    const waveStr = Array.isArray(rawWave) ? rawWave[0] : rawWave;

    let waveIndexToUse: number | undefined = undefined;
    if (pandemic === "cholera-series") {
        const parsedWave = parseCholeraWaveParam(waveStr);
        if (parsedWave !== null) {
            waveIndexToUse = parsedWave;
        } else {
            const inferred = inferWaveIndexFromSector(country);
            if (inferred !== null) {
                waveIndexToUse = inferred;
            }
        }
    }

    if (!routing.locales.includes(locale as Locale)) {
        notFound();
    }

    const pandemicConfig = getPandemicConfig(pandemic);
    if (!pandemicConfig) {
        notFound();
    }

    const chapters = await loadDossier(pandemic, country, waveIndexToUse);
    if (!chapters || chapters.length === 0) {
        notFound();
    }

    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "scrollytelling" });

    const normalizedCode = normalizeCountryCode(country).toUpperCase();
    const pandemicName = tLocal(pandemicConfig.name, locale as SupportedLocale);
    const classificationBadge = `DECLASSIFIED INTELLIGENCE // ${pandemicName.toUpperCase()} — SECTOR [${normalizedCode}]`;

    const waveQueryParam =
        pandemic === "cholera-series" && waveIndexToUse !== undefined
            ? `?wave=${waveIndexToUse + 1}`
            : "";
    const returnToGlobeHref = `/globe/${pandemic}${waveQueryParam}`;

    return (
        <div className="relative min-h-screen w-full bg-[#050508] text-neutral-100">
            {/* Fixed Navigation HUD */}
            <nav className="fixed top-4 left-4 sm:top-6 sm:left-6 z-50 flex items-center gap-3">
                <Link
                    href={returnToGlobeHref}
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
                        OUTBREAK DOSSIER // {pandemicConfig.era}
                    </span>
                    <span className="font-mono text-[9px] text-red-400 font-bold tracking-wider truncate max-w-sm">
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
