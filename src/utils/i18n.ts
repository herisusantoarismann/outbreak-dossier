import { LocalizedContent, SupportedLocale } from "@/types/journey";

export const t = (
    content: LocalizedContent | string | undefined | null,
    locale: SupportedLocale = "id",
): string => {
    if (!content) return "";
    if (typeof content === "string") return content;
    return content[locale] || content["en"] || content["id"] || "";
};

export const resolveText = t;
