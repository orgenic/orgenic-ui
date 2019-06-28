import { newE2EPage, E2EPage, E2EElement } from '@stencil/core/testing';

describe('og-combobox', () => {
  let page: E2EPage;
  let component: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent('<og-combobox></og-combobox>');
    component = await page.find('og-combobox');
  });

  it('renders', async () => {
    expect(component).toHaveClass('hydrated');
  });

  it('should render label correctly for selected input values', async () => {
    const input = await page.find('og-combobox >>> input');

    component.setProperty('value', 2);
    component.setProperty('items', [{ value: '1', label: 'V1' }, { value: '2', label: 'V2' }]);
    await page.waitForChanges();
    expect(await input.getProperty('value')).toEqual(`V2`);
  });

  it('should update label when input value changes', async () => {
    const input = await page.find('og-combobox >>> input');

    component.setProperty('value', 2);
    component.setProperty('items', [{ value: '1', label: 'V1' }, { value: '2', label: 'V2' }]);
    await page.waitForChanges();
    component.setProperty('value', 1);
    await page.waitForChanges();
    expect(await input.getProperty('value')).toEqual(`V1`);
  });
});
