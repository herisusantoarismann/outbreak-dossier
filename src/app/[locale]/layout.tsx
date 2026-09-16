import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import {
    getMessages,
    getTranslations,
    setRequestLocale,
} from "next-intl/server";
import { routing, Locale } from "@/i18n/routing";
import "../globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "meta" });
    const title = t("title");
    const description = t("description");

    return {
        title: {
            default: title,
            template: "%s | Outbreak Dossier",
        },
        description,
        applicationName: "Outbreak Dossier",
        openGraph: {
            siteName: "Outbreak Dossier",
            locale: locale === "id" ? "id_ID" : "en_US",
            title,
            description,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
        icons: {
            icon: [
                { url: "/icon", sizes: "32x32", type: "image/png" },
                { url: "/icon.svg", type: "image/svg+xml" },
                { url: "/favicon.ico", sizes: "any" },
            ],
            shortcut: "/favicon.ico",
            apple: [
                { url: "/apple-icon", sizes: "180x180", type: "image/png" },
                { url: "/apple-touch-icon.png", sizes: "180x180" },
            ],
        },
    };
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as Locale)) {
        notFound();
    }

    setRequestLocale(locale);
    const messages = await getMessages();

    return (
        <html
            lang={locale}
            className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col bg-[#050508] text-neutral-100 overflow-x-clip select-none">
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
