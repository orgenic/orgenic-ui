import { newE2EPage, E2EElement, E2EPage } from '@stencil/core/testing';

describe('og-layout-child', () => {
    let page: E2EPage;
    let component: E2EElement;

    beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(`<og-layout-child>
        </og-layout-child>`);

        component = await page.find('og-layout-child');
    });

    it('renders', async () => {
        expect(component).toHaveClass('hydrated');
    });
});
