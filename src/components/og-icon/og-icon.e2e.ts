import { newE2EPage } from '@stencil/core/testing';

describe('og-icon', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<og-icon></og-icon>');
    const element = await page.find('og-icon');
    expect(element).toHaveClass('hydrated');
  });
});
