import { newE2EPage } from '@stencil/core/testing';

describe('og-menu-item', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<og-menu-item></og-menu-item>');
        const element = await page.find('og-menu-item');
        expect(element).toHaveClass('hydrated');
    });
});
