export interface GlobeMarker {
    id: string;
    countryCode: string;
    countryName: string;
    lat: number;
    lng: number;
    initialConfirmedDate: string;
    severity: "low" | "medium" | "high" | "critical";
    routeUrl: string;
    summary: string;
    pulseSpeed?: number;
}

export interface GlobeCameraPosition {
    lat: number;
    lng: number;
    altitude: number;
}
