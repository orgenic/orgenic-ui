import { newE2EPage } from '@stencil/core/testing';

describe('og-menu-group', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<og-menu-group></og-menu-group>');
        const element = await page.find('og-menu-group');
        expect(element).toHaveClass('hydrated');
    });
});
