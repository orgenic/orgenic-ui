import { newE2EPage, E2EElement, E2EPage } from '@stencil/core/testing';

describe('og-checkbox', () => {
  let page: E2EPage;
  let component: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent('<og-checkbox label="Default Checkbox"></og-checkbox>');
    component = await page.find('og-checkbox');
  });

  it('renders', async () => {
    expect(component).toHaveClass('hydrated');
  });

  it('should render apply checked state correctly', async () => {
    const button: E2EElement = await page.find('og-checkbox >>> input');

    component.setProperty('checked', true);
    await page.waitForChanges();
    expect(await button.getProperty('checked')).toBeTruthy();

    component.setProperty('checked', false);
    await page.waitForChanges();
    expect(await button.getProperty('checked')).toBeFalsy();
  });
  it('render label correctly', async () => {
    const label: E2EElement = await page.find('og-checkbox >>> span');

    expect(label.textContent).toEqual('Default Checkbox');
  });
});
