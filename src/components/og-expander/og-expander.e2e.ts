import { newE2EPage, E2EElement, E2EPage } from '@stencil/core/testing';

describe('og-expander', () => {
    let page: E2EPage;
    let component: E2EElement;

    beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(`<og-expander name="ORGENIC Expander">
            <p>Some very interesting information about ORGENIC UI is [...]. And that's why we [...] all the things!</p>
        </og-expander>`)

        component = await page.find('og-expander');
    });

    it('renders', async () => {
        expect(component).toHaveClass('hydrated');
    });

    it('handles expanded state correctly', async () => {
        expect(await component.getProperty('expanded')).toBeFalsy();
        component.setAttribute('expanded', true);
        await page.waitForChanges();
        expect(await component.getProperty('expanded')).toBeTruthy();
    });

    it('handles expanded state changed using method', async () => {
        expect(await component.getProperty('expanded')).toBeFalsy();
        await component.callMethod('toggleExpandedState');
        await page.waitForChanges();
        expect(await component.getProperty('expanded')).toBeTruthy();
    });
});
