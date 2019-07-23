import { newE2EPage, E2EElement, E2EPage } from '@stencil/core/testing';

describe('og-layout-container', () => {
    let page: E2EPage;
    let component: E2EElement;

    beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(`<og-layout-container>
        </og-layout-container>`);

        component = await page.find('og-layout-container');
    });

    it('renders', async () => {
        expect(component).toHaveClass('hydrated');
    });
});
