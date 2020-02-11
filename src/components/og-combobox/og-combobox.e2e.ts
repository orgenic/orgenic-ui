import { newE2EPage, E2EPage, E2EElement } from '@stencil/core/testing';

describe('og-combobox', () => {
  let page: E2EPage;
  let component: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent('<og-combobox></og-combobox>');
    component = await page.find('og-combobox');

    component.setProperty('value', 2);
    component.setProperty('items', [{ value: '1', label: 'V1' }, { value: '2', label: 'V2' }]);
    await page.waitForChanges();
  });

  it('renders', async () => {
    expect(component).toHaveClass('hydrated');
  });

  it('should show dropdown when clicking button', async () => {
    const options = await page.find('og-combobox >>> og-combobox-options');
    expect(await options.getProperty('visible')).toBeFalsy();
    component.click();
    await page.waitForChanges();

    expect(await options.getProperty('visible')).toBeTruthy();
  });

  it('should render label correctly for selected input values', async () => {
    const input = await page.find('og-combobox >>> input');

    await page.waitForChanges();
    expect(await input.getProperty('value')).toEqual(`V2`);
  });

  it('should update label when input value changes', async () => {
    const input = await page.find('og-combobox >>> input');

    await page.waitForChanges();
    component.setProperty('value', 1);
    await page.waitForChanges();
    expect(await input.getProperty('value')).toEqual(`V1`);
  });
});
