import { newE2EPage, E2EElement, E2EPage } from '@stencil/core/testing';

describe('og-dialog', () => {
    let page: E2EPage;
    let component: E2EElement;

    beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(`<og-dialog name="Testing Dialogs!">
            <div slot="content>
                <h1>Dialog</h1>
            </div>
            <div slot="footer">
                <og-button label="OK"></og-button>
            </div>
        </og-dialog>`)

        component = await page.find('og-dialog');
    });

    it('renders', async () => {
        expect(component).toHaveClass('hydrated');
    });

    it('is hidden by default', async () => {
        expect(component).not.toHaveAttribute('visible');
    });

    it('is visible when called', async () => {
        component.setProperty('visible', true);
        await page.waitForChanges();

        expect(component).toHaveAttribute('visible');
    });

    it('is hidden after closing', async () => {
        component.setProperty('visible', true);
        await page.waitForChanges();

        component.setProperty('visible', false);
        await page.waitForChanges();

        expect(component).not.toHaveAttribute('visible');
    });
});
