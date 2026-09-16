import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs/config";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        formats: ["image/avif", "image/webp"],
        qualities: [25, 50, 75, 80, 85, 90, 100], // added 80 here
        minimumCacheTTL: 2592000,
        unoptimized: true,
    },
};

export default withSentryConfig(withNextIntl(nextConfig), {
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
    authToken: process.env.SENTRY_AUTH_TOKEN,

    // Suppress logs in non-CI environments
    silent: !process.env.CI,

    // Upload a larger set of source maps for prettier stack traces
    widenClientFileUpload: true,
});
