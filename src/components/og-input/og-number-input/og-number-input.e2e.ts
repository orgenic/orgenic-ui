import { E2EPage, E2EElement, newE2EPage } from "@stencil/core/dist/testing";

describe('og-number-input', () => {
    let page: E2EPage;
    let component: E2EElement;

    beforeEach(async () => {
        page = await newE2EPage();

        await page.setContent('<og-number-input></og-number-input>');
        component = await page.find('og-number-input');
    })

    it('renders', async () => {
        expect(component).toHaveClass('hydrated');
    });

    it('renders disabled state on input element', async () => {
        const input = await page.find('og-number-input >>> input');

        component.setProperty('disabled', true);
        await page.waitForChanges();
        expect(input.getAttribute('disabled')).not.toBeNull();

        component.setProperty('disabled', false);
        await page.waitForChanges();
        expect(input.getAttribute('disabled')).toBeNull();
    });

    it('applies value on input element', async () => {
        const input = await page.find('og-number-input >>> input');

        component.setProperty('value', 345);
        await page.waitForChanges();
        expect(await input.getProperty('value')).toEqual('345');
        expect(await component.getProperty('value')).toEqual(345);
    });

    it('represents components value property according to typed input string', async () => {
        const input = await page.find('og-number-input >>> input');
        await input.type('1');
        await input.type('2');
        await input.type('.');
        await input.type('3');
        expect(await input.getProperty('value')).toEqual('12.3');
        expect(await component.getProperty('value')).toEqual(12.3);
    });
});
