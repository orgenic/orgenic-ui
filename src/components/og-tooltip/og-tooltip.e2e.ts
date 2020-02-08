import { newE2EPage } from '@stencil/core/testing';

describe('og-tooltip', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<og-tooltip></og-tooltip>');
    const element = await page.find('og-tooltip');
    expect(element).toHaveClass('hydrated');
  });
});
