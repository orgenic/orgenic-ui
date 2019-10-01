import { newE2EPage } from '@stencil/core/testing';

describe('og-spinner', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<og-spinner></og-spinner>');
    const element = await page.find('og-spinner');
    expect(element).toHaveClass('hydrated');
  });
});
