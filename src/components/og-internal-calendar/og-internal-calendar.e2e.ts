import { newE2EPage, E2EElement, E2EPage } from '@stencil/core/testing';

describe('og-internal-calendar', () => {
  let page: E2EPage;
  let component: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
            <og-internal-calendar year="2020" month="1" showCalendarWeek>
            </og-internal-calendar>`);

    component = await page.find('og-internal-calendar');
  });

  it('renders', async () => {
    expect(component).toHaveClass('hydrated');
  });

  it('starts with the right week', async () => {
    const calendarWeek: E2EElement = await page.find(
      'og-internal-calendar >>> .week'
    );
    expect(calendarWeek).toBeDefined();
    expect(calendarWeek).toEqualText('5');
  });

  it('starts with the right day', async () => {
    const calendarWeek: E2EElement = await page.find(
      'og-internal-calendar >>> .day'
    );
    expect(calendarWeek).toBeDefined();
    expect(calendarWeek).toEqualText('26');
  });
});
