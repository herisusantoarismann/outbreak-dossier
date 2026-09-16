import { redirect } from "@/i18n/routing";

interface GlobeRedirectPageProps {
    params: Promise<{
        locale: string;
    }>;
}

export default async function GlobeRedirectPage({
    params,
}: GlobeRedirectPageProps) {
    const { locale } = await params;
    redirect({ href: "/globe/covid-19", locale });
}
