import { newE2EPage } from '@stencil/core/testing';

describe('og-tab', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<og-tab></og-tab>');
        const element = await page.find('og-tab');
        expect(element).toHaveClass('hydrated');
    });
});
