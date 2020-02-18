import { newE2EPage } from '@stencil/core/testing';

describe('og-icon-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<og-icon-button></og-icon-button>');
    const element = await page.find('og-icon-button');
    expect(element).toHaveClass('hydrated');
  });

  it('renders button label', async () => {
    const page = await newE2EPage();

    await page.setContent('<og-icon-button></og-icon-button>');
    const component = await page.find('og-icon-button');
    const button = await page.find('og-icon-button >>> button');

    component.setProperty('label', 'Default Button');
    await page.waitForChanges();
    expect(button.textContent).toEqual(`Default Button`);
  });
});
