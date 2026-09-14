import { test, expect } from "@playwright/test";

test.describe("Covid Journey - Bilingual & End-to-End User Experience", () => {
    test("verifies root redirect to default locale (/id) and language toggle to /en", async ({
        page,
    }) => {
        // 1. Visit Root Path -> should redirect to /id
        await page.goto("/");
        await page.waitForURL("**/id", { timeout: 15000 });
        expect(page.url()).toContain("/id");

        // 2. Verify Indonesian UI text
        await expect(page.getByText("PANDEMIC INTELLIGENCE HUB")).toBeVisible({
            timeout: 15000,
        });
        await expect(
            page.getByRole("button", { name: /LUNCURKAN URUTAN DOKUMENTER/i }),
        ).toBeVisible();

        // 3. Switch to English using the tactical LocaleSwitcher
        const enButton = page.getByRole("button", {
            name: "Switch to English",
        });
        await expect(enButton).toBeVisible();
        await enButton.click();

        // 4. Verify route changed to /en
        await page.waitForURL("**/en", { timeout: 10000 });
        expect(page.url()).toContain("/en");

        // 5. Verify English UI text
        await expect(
            page.getByRole("button", {
                name: /LAUNCH DOCUMENTARY SEQUENCE/i,
            }),
        ).toBeVisible();
    });

    test("simulates full journey from English Hub to Scrollytelling Documentary", async ({
        page,
    }) => {
        // 1. Visit English Hub directly
        await page.goto("/en");

        // 2. Verify WHO Global Telemetry card
        await expect(page.getByText("WHO GLOBAL SITREP")).toBeVisible({
            timeout: 15000,
        });
        await expect(page.getByText("~704M+")).toBeVisible();

        // 3. Verify Educational Bio-Data Modal functionality
        const bioDataButton = page.getByRole("button", {
            name: /BIO-DATA: WHAT IS SARS-CoV-2/i,
        });
        await expect(bioDataButton).toBeVisible();
        await bioDataButton.click();

        // Modal should be visible with English text
        const modalHeading = page.getByRole("heading", {
            name: /WHAT IS SARS-CoV-2\?/i,
        });
        await expect(modalHeading).toBeVisible();
        await expect(
            page.getByText("BIOLOGICAL IDENTITY & STRUCTURE"),
        ).toBeVisible();
        await expect(page.getByText("1 - 14 Days")).toBeVisible();

        // Close the modal
        const closeModalButton = page.getByRole("button", {
            name: /RETURN TO HUB/i,
        });
        await closeModalButton.click();
        await expect(modalHeading).not.toBeVisible();

        // 4. Trigger Journey: Launch Documentary Sequence
        const launchButton = page.getByRole("button", {
            name: /LAUNCH DOCUMENTARY SEQUENCE/i,
        });
        await expect(launchButton).toBeVisible();
        await launchButton.click();

        // 5. Verify Cinematic Loading Screen appears with typewriter status
        const feedHeader = page.getByText("[ BIO-THREAT SURVEILLANCE FEED ]");
        await expect(feedHeader).toBeVisible({ timeout: 5000 });

        // 6. Wait for 3-second cinematic transition and route change to /en/journey/id
        await page.waitForURL("**/en/journey/id", { timeout: 15000 });
        expect(page.url()).toContain("/en/journey/id");

        // 7. Verify Scrollytelling Layout loaded
        const backToGlobeLink = page.getByRole("link", {
            name: /RETURN TO GLOBE/i,
        });
        await expect(backToGlobeLink).toBeVisible();

        // Verify First Chapter (Ground Zero Wuhan in EN)
        const chapter0 = page.getByRole("heading", {
            name: /Ground Zero: Zoonotic Spillover in Wuhan/i,
        });
        await expect(chapter0).toBeVisible();

        // 8. Toggle language to Indonesian while in Scrollytelling
        const idButton = page.getByRole("button", {
            name: "Switch to Indonesian",
        });
        await expect(idButton).toBeVisible();
        await idButton.click();

        await page.waitForURL("**/id/journey/id", { timeout: 10000 });
        expect(page.url()).toContain("/id/journey/id");

        // Verify chapter title translated to Indonesian
        await expect(
            page.getByRole("heading", {
                name: /Titik Nol/i,
            }),
        ).toBeVisible();

        // 9. Navigate back to Global Hub
        const backIdLink = page.getByRole("link", {
            name: /KEMBALI KE BOLA DUNIA/i,
        });
        await backIdLink.click();
        await page.waitForURL("**/id", { timeout: 10000 });
        await expect(page.getByText("PANDEMIC INTELLIGENCE HUB")).toBeVisible();
    });
});
