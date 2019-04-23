import { newE2EPage, E2EElement, E2EPage } from '@stencil/core/testing';

describe('og-tab-container', () => {
    let page: E2EPage;
    let component: E2EElement;

    beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(`<og-confirm-dialog name="Testing Card!">
            <h1>card</h1>
        </og-confirm-dialog>`)

        component = await page.find('og-confirm-dialog');
    });

    it('renders', async () => {
        expect(component).toHaveClass('hydrated');
    });
});
