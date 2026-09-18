/**
 * Image Path Resolver & Fallback Utility
 * Standardizes image asset references into namespaced directory structure:
 * /assets/images/[pandemic-slug]/[country-code]/filename
 */
export function resolveImagePath(
    src: string | undefined | null,
    defaultCountry: string = "id",
    pandemicSlug: string = "covid-19",
): string {
    if (!src) {
        return `/assets/images/${pandemicSlug}/${defaultCountry}/01-loading-virus.jpg`;
    }

    // External or data URLs
    if (
        src.startsWith("http://") ||
        src.startsWith("https://") ||
        src.startsWith("data:")
    ) {
        return src;
    }

    // If already fully namespaced under /assets/images/ (e.g. /assets/images/plague-of-justinian-541/cpx/...
    // or /assets/images/covid-19/id/...)
    if (src.startsWith("/assets/images/")) {
        const subpath = src.slice("/assets/images/".length);
        const parts = subpath.split("/");

        // Path already contains a namespaced directory structure ([pandemic]/[sector]/[file], etc.)
        if (parts.length >= 2) {
            return src;
        }

        // Migrate legacy flat filenames (e.g. /assets/images/id-01.jpg, /assets/images/01.jpg)
        let filename = parts[0];
        if (filename.startsWith("cn-") || filename.startsWith("cn/")) {
            filename = filename.replace(/^cn[-/]/, "");
            return `/assets/images/${pandemicSlug}/cn/${filename}`;
        }

        if (filename.startsWith("id-") || filename.startsWith("id/")) {
            filename = filename.replace(/^id[-/]/, "");
            return `/assets/images/${pandemicSlug}/id/${filename}`;
        }

        return `/assets/images/${pandemicSlug}/${defaultCountry}/${filename}`;
    }

    return src;
}

export default resolveImagePath;
