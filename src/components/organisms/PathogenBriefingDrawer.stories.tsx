import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { PathogenBriefingDrawer } from "./PathogenBriefingDrawer";

const PathogenBriefingDrawerWrapper: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="relative min-h-screen w-full bg-[#050508] flex items-center justify-center p-6">
            <button
                onClick={() => setIsOpen(true)}
                className="font-mono text-xs text-neutral-300 border border-white/20 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full hover:border-cyan-400 hover:text-cyan-300 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center gap-1.5"
            >
                <span className="text-cyan-400 font-bold">[!]</span>
                <span>PATHOGEN BRIEF // WHAT IS COVID-19</span>
            </button>

            <PathogenBriefingDrawer
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </div>
    );
};

const meta: Meta<typeof PathogenBriefingDrawerWrapper> = {
    title: "Organisms/PathogenBriefingDrawer",
    component: PathogenBriefingDrawerWrapper,
    parameters: {
        layout: "fullscreen",
    },
};

export default meta;
type Story = StoryObj<typeof PathogenBriefingDrawerWrapper>;

export const DefaultDrawer: Story = {};
