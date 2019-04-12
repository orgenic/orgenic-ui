import { newE2EPage } from '@stencil/core/testing';

describe('og-form-item', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<og-form-item></og-form-item>');
        const element = await page.find('og-form-item');
        expect(element).toHaveClass('hydrated');
    });
});
