import { newE2EPage } from '@stencil/core/testing';

describe('og-flyout', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<og-flyout></og-flyout>');
    const element = await page.find('og-flyout');
    expect(element).toHaveClass('hydrated');
  });
});
