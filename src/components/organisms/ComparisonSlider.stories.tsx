import type { Meta, StoryObj } from "@storybook/react";
import { ComparisonSlider } from "./ComparisonSlider";

const meta = {
    title: "Organisms/ComparisonSlider",
    component: ComparisonSlider,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        initialPosition: {
            control: { type: "range", min: 0, max: 100, step: 1 },
        },
    },
} satisfies Meta<typeof ComparisonSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        beforeImage: "/assets/images/03a-jakarta-rush-hour.jpg",
        beforeLabel: "PRA-PANDEMI // RUSH HOUR",
        afterImage: "/assets/images/03b-jakarta-psbb-empty.jpg",
        afterLabel: "PSBB TOTAL // SUD MAN KOSONG",
        initialPosition: 50,
        aspectRatio: "aspect-video",
        className: "w-[600px] max-w-full rounded-xl border border-neutral-800",
    },
};

export const Fullbleed: Story = {
    args: {
        beforeImage: "/assets/images/03a-jakarta-rush-hour.jpg",
        beforeLabel: "PRA-PANDEMI // RUSH HOUR",
        afterImage: "/assets/images/03b-jakarta-psbb-empty.jpg",
        afterLabel: "PSBB TOTAL // SUD MAN KOSONG",
        initialPosition: 30,
        className: "w-[800px] h-[450px] rounded-xl border border-neutral-800",
    },
};
