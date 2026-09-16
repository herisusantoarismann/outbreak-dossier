"use client";

import React, { useTransition, Suspense, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { Languages } from "lucide-react";
import { SupportedLocale } from "@/types/journey";
import { useAppStore } from "@/stores/useAppStore";

interface LocaleSwitcherProps {
    className?: string;
    variant?: "default" | "compact";
}

const LocaleSwitcherContent: React.FC<LocaleSwitcherProps> = ({
    className = "",
    variant = "default",
}) => {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (locale && (locale === "id" || locale === "en")) {
            useAppStore.getState().setLanguage(locale as SupportedLocale);
        }
    }, [locale]);

    const switchLocale = (newLocale: SupportedLocale) => {
        if (newLocale === locale) return;

        useAppStore.getState().setLanguage(newLocale);

        startTransition(() => {
            const query =
                typeof window !== "undefined" && window.location.search
                    ? window.location.search.replace(/^\?/, "")
                    : searchParams
                      ? searchParams.toString()
                      : "";
            const target = query ? `${pathname}?${query}` : pathname;
            router.replace(target, { locale: newLocale, scroll: false });
        });
    };

    return (
        <div
            className={`inline-flex items-center gap-1.5 p-1 rounded-lg bg-black/80 border border-neutral-800 backdrop-blur-md font-mono text-xs shadow-[0_0_15px_rgba(0,0,0,0.6)] ${
                isPending ? "opacity-70 pointer-events-none" : ""
            } ${className}`}
            role="region"
            aria-label="Language Selector"
        >
            <div className="flex items-center gap-1 px-1.5 text-neutral-500">
                <Languages className="w-3.5 h-3.5 text-red-500/80" />
                {variant === "default" && (
                    <span className="hidden sm:inline text-[10px] uppercase tracking-wider text-neutral-400">
                        LANG
                    </span>
                )}
            </div>

            <div className="flex items-center gap-1">
                <button
                    onClick={() => switchLocale("id")}
                    className={`px-2 py-1 rounded text-[11px] font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                        locale === "id"
                            ? "bg-red-950/90 text-red-400 border border-red-800/80 shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                            : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900"
                    }`}
                    title="Bahasa Indonesia"
                    aria-label="Switch to Indonesian"
                >
                    ID
                </button>

                <span className="text-neutral-700 text-[10px]">|</span>

                <button
                    onClick={() => switchLocale("en")}
                    className={`px-2 py-1 rounded text-[11px] font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                        locale === "en"
                            ? "bg-red-950/90 text-red-400 border border-red-800/80 shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                            : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900"
                    }`}
                    title="English"
                    aria-label="Switch to English"
                >
                    EN
                </button>
            </div>
        </div>
    );
};

export const LocaleSwitcher: React.FC<LocaleSwitcherProps> = (props) => {
    return (
        <Suspense fallback={null}>
            <LocaleSwitcherContent {...props} />
        </Suspense>
    );
};

export default LocaleSwitcher;
