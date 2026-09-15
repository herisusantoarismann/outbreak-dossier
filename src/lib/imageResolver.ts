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

    // Already correctly namespaced: /assets/images/covid-19/...
    if (src.startsWith(`/assets/images/${pandemicSlug}/`)) {
        return src;
    }

    // Migrate legacy /assets/images/XX... paths to namespaced subdirectories
    if (src.startsWith("/assets/images/")) {
        let filename = src.replace("/assets/images/", "");

        if (filename.startsWith("cn-") || filename.startsWith("cn/")) {
            filename = filename.replace(/^cn\//, "");
            return `/assets/images/${pandemicSlug}/cn/${filename}`;
        }

        if (filename.startsWith("id-") || filename.startsWith("id/")) {
            filename = filename.replace(/^id\//, "");
            return `/assets/images/${pandemicSlug}/id/${filename}`;
        }

        return `/assets/images/${pandemicSlug}/${defaultCountry}/${filename}`;
    }

    return src;
}

export default resolveImagePath;
