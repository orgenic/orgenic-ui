import { newE2EPage } from '@stencil/core/testing';

describe('og-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<og-button></og-button>');
    const element = await page.find('og-button');
    expect(element).toHaveClass('hydrated');
  });

  it('renders button label', async () => {
    const page = await newE2EPage();

    await page.setContent('<og-button></og-button>');
    const component = await page.find('og-button');
    const button = await page.find('og-button >>> button');

    component.setProperty('label', 'Default Button');
    await page.waitForChanges();
    expect(button.textContent).toEqual(`Default Button`);
  });
});
