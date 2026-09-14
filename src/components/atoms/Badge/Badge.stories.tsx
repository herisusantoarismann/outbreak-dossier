import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
    title: "Atoms/Badge",
    component: Badge,
    tags: ["autodocs"],
    argTypes: {
        variant: {
            control: "select",
            options: ["danger", "critical", "warning", "cyan", "neutral"],
        },
        pulse: {
            control: "boolean",
        },
    },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Danger: Story = {
    args: {
        variant: "danger",
        pulse: true,
        children: "ACTIVE BIO-THREAT",
    },
};

export const Critical: Story = {
    args: {
        variant: "critical",
        pulse: true,
        children: "EMERGENCY: DELTA SPIKE",
    },
};

export const Warning: Story = {
    args: {
        variant: "warning",
        pulse: true,
        children: "PSBB LEVEL 4 ACTIVE",
    },
};

export const CyanTelemetry: Story = {
    args: {
        variant: "cyan",
        pulse: true,
        children: "WHO OFFICIAL ARCHIVE",
    },
};

export const Neutral: Story = {
    args: {
        variant: "neutral",
        pulse: false,
        children: "RECORD CLASSIFIED",
    },
};
