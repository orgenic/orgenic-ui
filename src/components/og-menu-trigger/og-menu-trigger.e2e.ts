import { newE2EPage } from '@stencil/core/testing';

describe('og-menu-trigger', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<og-menu-trigger></og-menu-trigger>');
        const element = await page.find('og-menu-trigger');
        expect(element).toHaveClass('hydrated');
    });
});
