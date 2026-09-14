import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Outbreak Dossier // Global Declassified Pathogen Archives",
        short_name: "Outbreak Dossier",
        description:
            "An interactive, declassified visual intelligence chronicle documenting global pandemics, viral mutations, and human resilience across modern history.",
        start_url: "/",
        display: "standalone",
        background_color: "#05070e",
        theme_color: "#05070e",
        icons: [
            {
                src: "/icon",
                sizes: "32x32",
                type: "image/png",
            },
            {
                src: "/apple-icon",
                sizes: "180x180",
                type: "image/png",
            },
        ],
    };
}
