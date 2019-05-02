import { newE2EPage, E2EElement, E2EPage } from '@stencil/core/testing';

describe('og-card', () => {
    let page: E2EPage;
    let component: E2EElement;

    beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(`<og-card name="Testing Card!">
            <div slot="content>
                <h1>card</h1>
            </div>
            <div slot="footer">
                <og-button label="OK"></og-button>
            </div>
        </og-card>`)

        component = await page.find('og-card');
    });

    it('renders', async () => {
        expect(component).toHaveClass('hydrated');
    });
});
