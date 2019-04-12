import { newE2EPage, E2EElement, E2EPage } from '@stencil/core/testing';

describe('og-radio-button-group', () => {
    let page: E2EPage;
    let component: E2EElement;

    beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(`<og-radio-button-group>
            <og-radio-button label="Angular Example" value="nglr">Angular</og-radio-button>
            <og-radio-button label="React Example" value="rct">React</og-radio-button>
            <og-radio-button label="Vue Example" value="v">Vue</og-radio-button>
        </og-radio-button-group>`)

        component = await page.find('og-radio-button-group');

    });

    it('renders', async () => {
        expect(component).toHaveClass('hydrated');
    });

    it('renders all radio buttons', async () => {
        const radioButtons = await page.findAll('og-radio-button');

        expect(radioButtons.length).toEqual(3);
    });

    it('should apply group name to all radio buttons', async () => {
        const radioButtons = await page.findAll('og-radio-button');

        component.setProperty('name', 'group#1');
        await page.waitForChanges();

        expect(await radioButtons[0].getProperty('name')).toEqual('group#1');
        expect(await radioButtons[1].getProperty('name')).toEqual('group#1');
        expect(await radioButtons[2].getProperty('name')).toEqual('group#1');
    });

    it('disables and enables tabs according to container disabled state', async () => {
        const radioButtons = await page.findAll('og-radio-button');

        component.setProperty('disabled', true);
        await page.waitForChanges();

        expect(await radioButtons[0].getProperty('groupDisabled')).toBeTruthy();
        expect(await radioButtons[1].getProperty('groupDisabled')).toBeTruthy();
        expect(await radioButtons[2].getProperty('groupDisabled')).toBeTruthy();

        component.setProperty('disabled', undefined);
        await page.waitForChanges();

        expect(await radioButtons[0].getProperty('groupDisabled')).toBeFalsy();
        expect(await radioButtons[1].getProperty('groupDisabled')).toBeFalsy();
        expect(await radioButtons[2].getProperty('groupDisabled')).toBeFalsy();
    });

    it('should set selected state of radio button according to group value', async () => {
        const radioButtons = await page.findAll('og-radio-button');

        component.setProperty('value', 'rct');
        await page.waitForChanges();

        expect(await radioButtons[0].getProperty('checked')).toBeFalsy();
        expect(await radioButtons[1].getProperty('checked')).toBeTruthy();
        expect(await radioButtons[2].getProperty('checked')).toBeFalsy();

        component.setProperty('value', 'v');
        await page.waitForChanges();

        expect(await radioButtons[0].getProperty('checked')).toBeFalsy();
        expect(await radioButtons[1].getProperty('checked')).toBeFalsy();
        expect(await radioButtons[2].getProperty('checked')).toBeTruthy();
    });
});
