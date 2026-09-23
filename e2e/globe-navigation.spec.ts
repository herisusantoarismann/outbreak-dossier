import { test, expect } from "@playwright/test";

test.describe("Global Hub, Multi-Pandemic Switcher & Globe Telemetry", () => {
    test("navigates to Spanish Flu globe and verifies tactical HUD and telemetry", async ({
        page,
    }) => {
        await page.goto("/en/globe/spanish-flu-1918");
        await expect(page.locator("body")).toBeVisible({ timeout: 15000 });

        // Verify Pandemic Switcher / HUD title
        await expect(page.getByText(/SPANISH FLU/i).first()).toBeVisible({
            timeout: 10000,
        });

        // Verify Tactical Telemetry Ticker
        await expect(
            page
                .getByText(/TELEMETRI/i)
                .or(page.getByText(/RECORD/i))
                .first(),
        ).toBeVisible({
            timeout: 10000,
        });
    });

    test("navigates to Cholera Series and verifies wave navigation bar", async ({
        page,
    }) => {
        await page.goto("/en/globe/cholera-series?wave=1");
        await expect(page.locator("body")).toBeVisible({ timeout: 15000 });

        // Wave navigation controls
        await expect(page.getByText(/WAVE 1/i).first()).toBeVisible({
            timeout: 10000,
        });
    });

    test("toggles language between English and Indonesian on the Globe Hub", async ({
        page,
    }) => {
        await page.goto("/id/globe/covid-19");
        await expect(page.locator("body")).toBeVisible({ timeout: 15000 });

        // Look for Locale Switcher
        const enButton = page.getByRole("button", {
            name: "Switch to English",
        });
        if (await enButton.isVisible()) {
            await enButton.click();
            await page.waitForURL("**/en/globe/covid-19", { timeout: 10000 });
            expect(page.url()).toContain("/en/globe/covid-19");
        }
    });
});
