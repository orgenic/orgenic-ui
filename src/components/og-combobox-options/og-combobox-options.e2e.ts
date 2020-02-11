import { newE2EPage } from '@stencil/core/testing';

describe('og-flyout', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<og-combobox-options></og-combobox-options>');
    const element = await page.find('og-combobox-options');
    expect(element).toHaveClass('hydrated');
  });
});
