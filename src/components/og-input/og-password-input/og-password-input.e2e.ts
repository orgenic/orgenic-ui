import { E2EPage, E2EElement, newE2EPage } from "@stencil/core/dist/testing";

describe('og-password-input', () => {
    let page: E2EPage;
    let component: E2EElement;

    beforeEach(async () => {
        page = await newE2EPage();

        await page.setContent('<og-password-input></og-password-input>');
        component = await page.find('og-password-input');
    })

    it('renders', async () => {
        expect(component).toHaveClass('hydrated');
    });

    it('shows password visibility button if property set', async () => {
        let togglePwButton = await page.find('og-password-input >>> .og-input__visibility-button');
        expect(togglePwButton).toBeNull();

        component.setProperty('showTogglePasswordVisibility', true);
        await page.waitForChanges();
        togglePwButton = await page.find('og-password-input >>> .og-input__visibility-button');
        expect(togglePwButton).not.toBeNull();
    });

    it('changes input type from password to text if visibility changes', async () => {
        const input = await page.find('og-password-input >>> input');
        expect(input.getAttribute('type')).toEqual('password');

        await component.callMethod('togglePasswordVisibility');
        await page.waitForChanges();

        expect(input.getAttribute('type')).toEqual('text');
    });

    it('renders disabled state on input element', async () => {
        const input = await page.find('og-password-input >>> input');

        component.setProperty('disabled', true);
        await page.waitForChanges();
        expect(input.getAttribute('disabled')).not.toBeNull();

        component.setProperty('disabled', false);
        await page.waitForChanges();
        expect(input.getAttribute('disabled')).toBeNull();
    });

    it('applies value on input element', async () => {
        const input = await page.find('og-password-input >>> input');

        component.setProperty('value', 'orgenic-ui');
        await page.waitForChanges();
        expect(await input.getProperty('value')).toEqual('orgenic-ui');
    });

    it('represents components value property according to typed input string', async () => {
        const input = await page.find('og-password-input >>> input');
        await input.type('o');
        await input.type('r');
        await input.type('g');
        expect(await component.getProperty('value')).toEqual('org');
    });
});
