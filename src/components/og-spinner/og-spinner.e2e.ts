import { newE2EPage, E2EPage, E2EElement } from '@stencil/core/testing';

describe('og-spinner', () => {
  let page: E2EPage;
  let component: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<og-spinner></og-spinner>');
    component = await page.find('og-spinner');
  });

  it('renders', async () => {
    expect(component).toHaveClass('hydrated');
  });

  const sizes = {
    s: '16px',
    m: '32px',
    l: '48px'
  }

  for (let key in sizes) {

    it(`sets width and height ${key} for svg`, async () => {
      const svg = await page.find('og-spinner >>> svg');
      component.setProperty('size', key);
      await page.waitForChanges();
      expect(svg).toEqualAttribute('width', sizes[key]);
      expect(svg).toEqualAttribute('height', sizes[key]);
    });

  };

  it('should apply disabled state', async () => {
    component.setProperty('disabled', true);
    await page.waitForChanges();

    expect(component.getAttribute('disabled')).not.toBeNull();

    component.setProperty('disabled', false);
    await page.waitForChanges();

    expect(component.getAttribute('disabled')).toBeNull();
  });



});
