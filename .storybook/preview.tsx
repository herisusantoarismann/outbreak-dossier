import React from "react";
import type { Preview } from "@storybook/nextjs-vite";
import { NextIntlClientProvider } from "next-intl";
import idMessages from "../src/messages/id.json";
import "../src/app/globals.css";

const preview: Preview = {
    decorators: [
        (Story) => (
            <NextIntlClientProvider locale="id" messages={idMessages}>
                <Story />
            </NextIntlClientProvider>
        ),
    ],
    parameters: {
        backgrounds: {
            default: "dark",
            values: [
                { name: "dark", value: "#050508" },
                { name: "black", value: "#000000" },
            ],
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        a11y: {
            test: "todo",
        },
    },
};

export default preview;
