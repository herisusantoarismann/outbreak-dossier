import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { CountryTacticalHUD } from "./CountryTacticalHUD";
import {
    EPICENTER_REGISTRY,
    getCountrySurveillanceData,
} from "@/data/countriesConfig";

const CountryTacticalHUDWrapper: React.FC<{
    initialMode?: "epicenter" | "surveillance";
}> = ({ initialMode = "epicenter" }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [mode, setMode] = useState<"epicenter" | "surveillance">(initialMode);

    return (
        <div className="relative min-h-screen w-full bg-[#050508] flex flex-col items-center justify-center p-6 gap-4">
            <div className="flex gap-2">
                <button
                    onClick={() => {
                        setMode("epicenter");
                        setIsOpen(true);
                    }}
                    className="px-3 py-1.5 rounded bg-red-950/80 border border-red-800 text-red-300 font-mono text-xs uppercase cursor-pointer"
                >
                    TEST EPICENTER (IDN)
                </button>
                <button
                    onClick={() => {
                        setMode("surveillance");
                        setIsOpen(true);
                    }}
                    className="px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono text-xs uppercase cursor-pointer"
                >
                    TEST SURVEILLANCE (GBR)
                </button>
            </div>

            <CountryTacticalHUD
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                epicenterData={
                    mode === "epicenter" ? EPICENTER_REGISTRY.ID : null
                }
                surveillanceData={
                    mode === "surveillance"
                        ? getCountrySurveillanceData("GBR", "United Kingdom")
                        : null
                }
                onInitializeDossier={(code) =>
                    alert(`Initializing Dossier: ${code}`)
                }
            />
        </div>
    );
};

const meta: Meta<typeof CountryTacticalHUDWrapper> = {
    title: "Organisms/CountryTacticalHUD",
    component: CountryTacticalHUDWrapper,
    parameters: {
        layout: "fullscreen",
    },
};

export default meta;
type Story = StoryObj<typeof CountryTacticalHUDWrapper>;

export const EpicenterMode: Story = {
    args: {
        initialMode: "epicenter",
    },
};

export const SurveillanceMode: Story = {
    args: {
        initialMode: "surveillance",
    },
};
