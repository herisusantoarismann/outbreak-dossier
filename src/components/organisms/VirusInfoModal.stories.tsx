import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { VirusInfoModal } from "./VirusInfoModal";

const VirusInfoModalWrapper: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="relative min-h-screen w-full bg-[#050508] flex items-center justify-center p-6">
            <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 rounded bg-neutral-900 border border-neutral-700 text-neutral-200 font-mono text-xs uppercase cursor-pointer"
            >
                OPEN BIO-DOSSIER
            </button>

            <VirusInfoModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    );
};

const meta: Meta<typeof VirusInfoModalWrapper> = {
    title: "Organisms/VirusInfoModal",
    component: VirusInfoModalWrapper,
    parameters: {
        layout: "fullscreen",
    },
};

export default meta;
type Story = StoryObj<typeof VirusInfoModalWrapper>;

export const DefaultDossier: Story = {};
