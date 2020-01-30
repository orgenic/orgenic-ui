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

  it('should apply hidden state', async () => {
    component.setProperty('hidden', true);
    await page.waitForChanges();

    expect(component.getAttribute('hidden')).not.toBeNull();

    component.setProperty('hidden', false);
    await page.waitForChanges();

    expect(component.getAttribute('hidden')).toBeNull();
  });



});
