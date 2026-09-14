"use client";

import dynamic from "next/dynamic";
import { CinematicLoading } from "@/components/organisms/CinematicLoading";

// Dynamically import GlobeViewer with SSR disabled to prevent window object / WebGL crashes
const GlobeViewer = dynamic(
    () => import("@/components/organisms/GlobeViewer"),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#050508] text-neutral-400 font-mono text-xs gap-3">
                <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(239,68,68,0.4)]" />
                <span className="tracking-widest text-neutral-400">
                    INITIALIZING 3D ORBITAL SIMULATION...
                </span>
            </div>
        ),
    },
);

export default function HomePage() {
    return (
        <main className="relative w-screen h-screen overflow-hidden bg-[#050508] select-none">
            {/* 3D Interactive Hub Globe */}
            <GlobeViewer />

            {/* Cinematic Full-screen Typewriter Loading Overlay */}
            <CinematicLoading />
        </main>
    );
}
