import { newE2EPage } from '@stencil/core/testing';

describe('og-progress', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<og-progress></og-progress>');
    const element = await page.find('og-progress');
    expect(element).toHaveClass('hydrated');
  });
});
