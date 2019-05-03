import { newE2EPage, E2EElement, E2EPage } from '@stencil/core/testing';

describe('og-message-dialog', () => {
    let page: E2EPage;
    let component: E2EElement;
    let button: E2EElement;

    beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(`<og-message-dialog name="Testing Success Dialog!" type="success">
            <h1>Success Dialog</h1>
        </og-message-dialog>`)

        component = await page.find('og-message-dialog');
        button = await page.find('og-message-dialog >>> og-button');
    });

    it('renders', async () => {
        expect(component).toHaveClass('hydrated');
    });

    it('has an ok button', async () => {
        expect(button).not.toBeNull();
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

    it('closes when ok button is clicked', async () => {
        component.setProperty('visible', true);
        await page.waitForChanges();

        await button.click();

        expect(component).not.toHaveAttribute('visible');
    });
});
