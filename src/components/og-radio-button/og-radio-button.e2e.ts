import { newE2EPage, E2EPage, E2EElement } from '@stencil/core/testing';

describe('og-radio-button', () => {
  let page: E2EPage;
  let component: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<og-radio-button></og-radio-button>');
    component = await page.find('og-radio-button');
  });

  it('renders', async () => {
    expect(component).toHaveClass('hydrated');
  });

  it('should apply disabled state to input', async () => {
    const input = await page.find('input');

    component.setProperty('disabled', true);
    await page.waitForChanges();

    expect(input.getAttribute('disabled')).not.toBeNull();

    component.setProperty('disabled', false);
    await page.waitForChanges();

    expect(input.getAttribute('disabled')).toBeNull();
  });

  it('should apply group disabled state to input', async () => {
    const input = await page.find('input');

    component.setProperty('groupDisabled', true);
    await page.waitForChanges();

    expect(input.getAttribute('disabled')).not.toBeNull();

    component.setProperty('groupDisabled', false);
    await page.waitForChanges();

    expect(input.getAttribute('disabled')).toBeNull();
  });

  it('should apply name to input', async () => {
    const input = await page.find('input[type=radio]');

    component.setProperty('name', 'group#1');
    await page.waitForChanges();

    expect(input.getAttribute('name')).toEqual('group#1');
  });

  it('should apply checked state to input', async () => {
    const input = await page.find('input[type=radio]');

    component.setProperty('checked', true);
    await page.waitForChanges();

    expect(await input.getProperty('checked')).toBeTruthy();

    component.setProperty('checked', false);
    await page.waitForChanges();

    expect(await input.getProperty('checked')).toBeFalsy();
  });
});
