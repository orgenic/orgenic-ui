import { newE2EPage } from '@stencil/core/testing';

describe('og-button', () => {
    it('renders', async () => {
        const page = await newE2EPage();

        await page.setContent('<og-button></og-button>');
        const element = await page.find('og-button');
        expect(element).toHaveClass('hydrated');
    });

    it('renders button label', async () => {
        const page = await newE2EPage();

        await page.setContent('<og-button></og-button>');
        const component = await page.find('og-button');
        const button = await page.find('og-button >>> button');

        component.setProperty('label', 'Default Button');
        await page.waitForChanges();
        expect(button.textContent).toEqual(`Default Button`);
    });

    it('emits clicked event', async () => {
        // const page = await newE2EPage();

        // await page.setContent('<og-button></og-button>');
        // const component: E2EElement = await page.find('og-button');
        // const button: E2EElement = await page.find('og-button >>> button');

        // component['handleClick'] = jest.fn();
        // await button.click();
        // expect(component['handleClick']).toHaveBeenCalled();
        // const emitter = {
        //     emit: (e: MouseEvent): CustomEvent<MouseEvent> => { return null; }
        // };
        // const spy1 = jest.spyOn(emitter, 'emit');
        // component.setProperty('clicked', emitter);
        // button.click();
        // expect(spy1).toHaveBeenCalled();
    });
});
