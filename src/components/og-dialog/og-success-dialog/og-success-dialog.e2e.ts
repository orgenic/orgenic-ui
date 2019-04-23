import { newE2EPage, E2EElement, E2EPage } from '@stencil/core/testing';

describe('og-success-dialog', () => {
    let page: E2EPage;
    let component: E2EElement;

    beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(`<og-success-dialog name="Testing Success Dialog!">
            <h1>card</h1>
        </og-success-dialog>`)

        component = await page.find('og-success-dialog');
    });

    it('renders', async () => {
        expect(component).toHaveClass('hydrated');
    });
});
