import { newE2EPage, E2EElement, E2EPage } from '@stencil/core/testing';

describe('og-calendar-group (single month)', () => {
    let page: E2EPage;
    let component: E2EElement;
    let calendarMonth: E2EElement;
    let calendarYear: E2EElement;

    beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(`
            <og-calendar-group year="2019" month="0" loc="en">
            </og-calendar-group>`);

        component = await page.find('og-calendar-group');
        calendarMonth = await page.find(
            'og-calendar-group >>> .calendar__header__month'
        );
        calendarYear = await page.find(
            'og-calendar-group >>> .calendar__header__year'
        );
    });

    it('renders', async () => {
        expect(component).toHaveClass('hydrated');
    });

    it('shows the current month', async () => {
        expect(calendarMonth).toBeDefined();
        expect(calendarMonth).toEqualText('Jan');
    });

    it('shows the current year', async () => {
        expect(calendarYear).toBeDefined();
        expect(calendarYear).toEqualText('2019');
    });

    it('changes month and year on navigation', async () => {
        const prevButton: E2EElement = await page.find(
            'og-calendar-group >>> .calendar__header__prefix span.calendar__nav'
        );
        expect(prevButton).toBeDefined();

        await prevButton.click();
        await page.waitForChanges();

        expect(calendarMonth).toEqualText('Dec');
        expect(calendarYear).toEqualText('2018');
    });
});

describe('og-calendar-group (multiple month)', () => {
    let page: E2EPage;
    let component: E2EElement;
    let calendars: Array<E2EElement>;
    let calendarMonths: Array<E2EElement>;
    let calendarYears: Array<E2EElement>;

    beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(`
            <og-calendar-group year="2019" month="0" displayed-months="3" loc="de">
            </og-calendar-group>`);

        component = await page.find('og-calendar-group');
        calendars = await page.findAll(
            'og-calendar-group >>> og-calendar'
        );
        calendarMonths = await page.findAll(
            'og-calendar-group >>> .calendar__header__month'
        );
        calendarYears = await page.findAll(
            'og-calendar-group >>> .calendar__header__year'
        );
    });

    it('renders', async () => {
        let calendar;

        expect(component).toHaveClass('hydrated');
        for (calendar in calendars) {
            expect(calendars[calendar]).toHaveClass('hydrated');
        }

        // there should be three rendered calendars
        expect(calendar).toEqual("2");
    });

    it('shows the current and following months', async () => {
        expect(calendarMonths).toBeDefined();
        expect(calendarMonths.length).toEqual(3);

        expect(calendarMonths[0]).toEqualText('Jan.');
        expect(calendarMonths[1]).toEqualText('Feb.');
        expect(calendarMonths[2]).toEqualText('März');
    });

    it('shows the current year', async () => {
        expect(calendarYears).toBeDefined();
        expect(calendarYears.length).toEqual(3);

        expect(calendarYears[0]).toEqualText('2019');
        expect(calendarYears[1]).toEqualText('2019');
        expect(calendarYears[2]).toEqualText('2019');
    });

    it('changes month and year on navigation', async () => {
        const prevButton: E2EElement = await page.find(
            'og-calendar-group >>> .calendar__header__prefix span.calendar__nav'
        );
        expect(prevButton).toBeDefined();

        await prevButton.click();
        await page.waitForChanges();

        expect(calendarMonths[0]).toEqualText('Dez.');
        expect(calendarMonths[1]).toEqualText('Jan.');
        expect(calendarMonths[2]).toEqualText('Feb.');

        expect(calendarYears[0]).toEqualText('2018');
        expect(calendarYears[1]).toEqualText('2019');
        expect(calendarYears[2]).toEqualText('2019');
    });
});
