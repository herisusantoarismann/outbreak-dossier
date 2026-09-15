import { notFound } from "next/navigation";
import { routing, Locale } from "@/i18n/routing";
import JourneyPage from "@/app/[locale]/journey/[country]/page";

interface DossierPageProps {
    params: Promise<{
        locale: string;
        pandemic: string;
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
        countries.map((country) => ({
            locale,
            pandemic: "covid-19",
            country,
        })),
    );
}

export default async function DossierPage({ params }: DossierPageProps) {
    const { locale, pandemic, country } = await params;

    if (!routing.locales.includes(locale as Locale)) {
        notFound();
    }

    if (pandemic.toLowerCase() !== "covid-19") {
        notFound();
    }

    return JourneyPage({
        params: Promise.resolve({ locale, country }),
    });
}
