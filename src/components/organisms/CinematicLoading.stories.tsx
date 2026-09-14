import type { Meta, StoryObj } from "@storybook/react";
import React, { useEffect } from "react";
import { CinematicLoading } from "./CinematicLoading";
import { useAppStore } from "@/stores/useAppStore";

interface StoryWrapperProps {
    active: boolean;
}

const CinematicLoadingWrapper: React.FC<StoryWrapperProps> = ({ active }) => {
    useEffect(() => {
        useAppStore.setState({ isLoading: active });
        return () => {
            useAppStore.setState({ isLoading: false });
        };
    }, [active]);

    return (
        <div className="relative w-screen h-screen bg-black">
            <CinematicLoading />
        </div>
    );
};

const meta: Meta<typeof CinematicLoadingWrapper> = {
    title: "Organisms/CinematicLoading",
    component: CinematicLoadingWrapper,
    parameters: {
        layout: "fullscreen",
    },
    argTypes: {
        active: {
            control: "boolean",
        },
    },
};

export default meta;
type Story = StoryObj<typeof CinematicLoadingWrapper>;

export const IsolatingStrainTypewriter: Story = {
    args: {
        active: true,
    },
};
