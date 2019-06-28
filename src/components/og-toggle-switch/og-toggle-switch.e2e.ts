import { newE2EPage, E2EElement } from '@stencil/core/testing';

describe('og-toggle-switch', () => {
  let page;
  let component: E2EElement;
  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent('<og-toggle-switch></og-toggle-switch>');
    component = await page.find('og-toggle-switch');
  });

  it('renders', async () => {
    expect(component).toHaveClass('hydrated');
  });

  it('should render apply value correctly', async () => {
    const button = await page.find('og-toggle-switch >>> input');

    component.setProperty('value', true);
    await page.waitForChanges();
    expect(await button.getProperty('checked')).toBeTruthy();

    component.setProperty('value', false);
    await page.waitForChanges();
    expect(await button.getProperty('checked')).toBeFalsy();
  });
});
