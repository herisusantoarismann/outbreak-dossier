import type { Meta, StoryObj } from "@storybook/react";
import { LocaleSwitcher } from "./LocaleSwitcher";

const meta: Meta<typeof LocaleSwitcher> = {
    title: "Molecules/LocaleSwitcher",
    component: LocaleSwitcher,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
};

export default meta;
type Story = StoryObj<typeof LocaleSwitcher>;

export const Default: Story = {
    args: {
        variant: "default",
    },
};

export const Compact: Story = {
    args: {
        variant: "compact",
    },
};
