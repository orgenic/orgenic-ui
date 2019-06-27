import { newE2EPage } from "@stencil/core/testing";

describe("og-menu", () => {
    it("renders", async () => {
        const page = await newE2EPage();
        await page.setContent('<og-menu></og-menu>');
        const element = await page.find('og-menu');
        expect(element).toHaveClass('hydrated');
    });
});
