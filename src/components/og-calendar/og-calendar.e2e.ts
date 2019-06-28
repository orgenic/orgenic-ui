import { newE2EPage, E2EElement, E2EPage } from '@stencil/core/testing';

describe('og-calendar', () => {
  let page: E2EPage;
  let component: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
            <og-calendar year="2019" month="4">
            </og-calendar>`);

    component = await page.find('og-calendar');
  });

  it('renders', async () => {
    expect(component).toHaveClass('hydrated');
  });

  it('shows the current month', async () => {
    const calendarMonth: E2EElement = await page.find(
      'og-calendar >>> .calender__header__month'
    );
    expect(calendarMonth).toBeDefined();
    expect(calendarMonth).toEqualText('May');
  });
});
