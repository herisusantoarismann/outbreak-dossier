import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
    // Supported locales
    locales: ["id", "en", "zh"],

    // Default locale when visiting root or unmatched routes
    defaultLocale: "id",

    // Always prefix the locale to URLs (e.g. /id, /en)
    localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);
