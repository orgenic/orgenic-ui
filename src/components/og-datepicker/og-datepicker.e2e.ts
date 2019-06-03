import { newE2EPage, E2EElement, E2EPage } from '@stencil/core/testing';

describe('og-datepicker', () => {
    let page: E2EPage;
    let component: E2EElement;
    let flyout: E2EElement;
    let header: E2EElement;
    let input: E2EElement;

    beforeEach(async () => {
        page = await newE2EPage();
        // note: the testdate need to have a clickable tomorrow
        await page.setContent(`
            <og-form-item label="Bitte wählen Sie ein Datum">
                <og-datepicker value="30-05-2019" format="DD-MM-YYYY" first-day-of-week="1"></og-datepicker>
                </og-form-item>`);

        component = await page.find('og-datepicker');
        flyout = await page.find('og-datepicker >>> og-calendar-group');
        header = await page.find('og-datepicker >>> .og-datepicker__header');
        input = await page.find('og-datepicker >>> .og-datepicker__input');
    });

    it('renders', async () => {
        expect(component).toHaveClass('hydrated');
        expect(flyout).toHaveClass('hydrated');
    });

    it('is hidden by default', async () => {
        expect(flyout).not.toHaveClass(
            "og-datepicker__flyout__calendar--visible"
        );
    });

    it('is visible when called and hidden after closing', async () => {
        await header.click();
        await page.waitForChanges();

        expect(flyout).toHaveClass(
            'og-datepicker__flyout__calendar--visible'
        );

        await header.click();
        await page.waitForChanges();

        expect(flyout).not.toHaveClass(
            'og-datepicker__flyout__calendar--visible'
        );
    });

    it('displays the date in the right format', async () => {
        expect(await input.getProperty('value')).toEqualText('30-05-2019');
    });

    // todo: fix this
    xit('displays the right date after selection', async () => {
        await header.click();
        await page.waitForChanges();

        // get the field for the next date
        // todo: multiple piercing selectors do not work...
        const dateButton: E2EElement = await page.find('og-datepicker >>> og-calendar-group >>> og-calendar >>> td.--selected + td.day');
        expect(dateButton).toBeDefined();
        expect(dateButton).toEqualText('31');

        await dateButton.click();
        await page.waitForChanges();

        expect(await input.getProperty('value')).toEqualText('31-05-2019');
    });

    it('shows the current date', async () => {
        expect(await component.getProperty('value')).toEqual('30-05-2019');
    });
});
