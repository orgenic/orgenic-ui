import { newE2EPage, E2EElement, E2EPage } from '@stencil/core/testing';
import moment from 'moment';
import { isNull } from 'util';

describe('og-datepicker', () => {
    let page: E2EPage;
    let component: E2EElement;
    let flyout: E2EElement;

    // enum Month

    beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(`
            <og-calendar-group year="2019" month="4">
            </og-calendar-group>`);

        component = await page.find('og-calendar-group');
    });

    it('renders', async () => {
        expect(component).toHaveClass('hydrated');
    });

    it('shows the current month', async () => {
        const calendarMonth: E2EElement = await page.find(
            'og-calendar-group >>> .calender__header__month'
        );
        expect(calendarMonth).toBeDefined();
        expect(calendarMonth).toEqualText('May');
    });
});
