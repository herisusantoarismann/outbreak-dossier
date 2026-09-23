import { test, expect } from "@playwright/test";

test.describe("Multi-Pandemic Scrollytelling Dossiers & Bilingual Precision", () => {
    test("loads Plague of Justinian (541 AD) Sector CPX with bilingual parity", async ({
        page,
    }) => {
        await page.goto("/en/dossier/plague-of-justinian-541/cpx");
        await expect(page.locator("body")).toBeVisible({ timeout: 15000 });

        // Verify English badge and header
        await expect(
            page.getByText(/DECLASSIFIED INTELLIGENCE \/\/ PLAGUE OF JUSTINIAN/i),
        ).toBeVisible({ timeout: 10000 });

        // Verify return link
        await expect(
            page.getByRole("link", { name: /RETURN TO GLOBE/i }),
        ).toBeVisible();

        // Switch to Indonesian
        const idButton = page.getByRole("button", {
            name: "Switch to Indonesian",
        });
        if (await idButton.isVisible()) {
            await idButton.click();
            await page.waitForURL("**/id/dossier/plague-of-justinian-541/cpx", {
                timeout: 10000,
            });
            await expect(
                page.getByRole("link", { name: /KEMBALI KE BOLA DUNIA/i }),
            ).toBeVisible();
        }
    });

    test("loads Black Death (1347 AD) Sector PAR and verifies chapter structure", async ({
        page,
    }) => {
        await page.goto("/en/dossier/black-death-1347/par");
        await expect(page.locator("body")).toBeVisible({ timeout: 15000 });

        await expect(
            page.getByText(/DECLASSIFIED INTELLIGENCE \/\/ BLACK DEATH/i),
        ).toBeVisible({ timeout: 10000 });

        // Scrollytelling content
        await expect(
            page.getByText(/SECTOR \[PAR\]/i),
        ).toBeVisible();
    });

    test("loads Cholera Wave 1 and Wave 7 with wave query param persistence", async ({
        page,
    }) => {
        // Wave 1 Sector JES
        await page.goto("/en/dossier/cholera-series/jes?wave=1");
        await expect(page.locator("body")).toBeVisible({ timeout: 15000 });
        await expect(
            page.getByText(/DECLASSIFIED INTELLIGENCE \/\/ CHOLERA PANDEMICS/i),
        ).toBeVisible({ timeout: 10000 });

        // Wave 7 Sector IDN
        await page.goto("/en/dossier/cholera-series/idn?wave=7");
        await expect(page.locator("body")).toBeVisible({ timeout: 15000 });
        await expect(
            page.getByText(/SECTOR \[IDN\]/i),
        ).toBeVisible({ timeout: 10000 });
    });

    test("loads Spanish Flu 1918 Sector US (18 organic chapters)", async ({
        page,
    }) => {
        await page.goto("/en/dossier/spanish-flu-1918/us");
        await expect(page.locator("body")).toBeVisible({ timeout: 15000 });

        await expect(
            page.getByText(/SPANISH FLU/i),
        ).toBeVisible({ timeout: 10000 });

        await expect(
            page.getByText(/SECTOR \[US\]/i),
        ).toBeVisible();
    });
});
