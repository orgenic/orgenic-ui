import { newE2EPage } from '@stencil/core/testing';

describe('og-form-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<og-form-item></og-form-item>');
    const element = await page.find('og-form-item');

    expect(element).toHaveClass('hydrated');
  });

  it('shows info and error texts correctly', async () => {
    const page = await newE2EPage();
    await page.setContent('<og-form-item info-text="info" error-message="error"></og-form-item>');

    const footerElement = await page.find('og-form-item >>> .og-form-item__footer');
    expect(footerElement).not.toBeUndefined();
    expect(footerElement).toHaveClass('og-form-item__footer--info-and-error');

    const infoElement = await page.find('og-form-item >>> .og-form-item__info');
    expect(infoElement).not.toBeUndefined();

    const errorElement = await page.find('og-form-item >>> .og-form-item__error');
    expect(errorElement).not.toBeUndefined();
  });

  it('validates required fields', async () => {
    const page = await newE2EPage();
    await page.setContent('<og-form-item required><og-text-input></og-text-input></og-form-item>');
    const element = await page.find('og-form-item');
    const input = await page.find('og-form-item > og-text-input');

    input.setAttribute('value', 'valid');
    await page.waitForChanges();
    expect(element).not.toHaveClass('og-form-item--invalid');

    input.setAttribute('value', '');
    await page.waitForChanges();
    await page.waitForChanges();

    expect(input.getAttribute('value')).toEqual('');
    expect(element).toHaveClass('og-form-item--invalid');
  });

  it('validates with patterns', async () => {
    const page = await newE2EPage();

    await page.setContent('<og-form-item pattern="13{2}7!*"><og-text-input></og-text-input></og-form-item>');
    const element = await page.find('og-form-item');
    const input = await page.find('og-form-item > og-text-input');

    input.setAttribute('value', '1327');
    await page.waitForChanges();
    expect(element).toHaveClass('og-form-item--invalid');

    input.setAttribute('value', '1337');
    await page.waitForChanges();
    expect(element).not.toHaveClass('og-form-item--invalid');

    input.setAttribute('value', '1337!!!!!');
    await page.waitForChanges();
    expect(element).not.toHaveClass('og-form-item--invalid');
  });

  it('validates with custom function', async () => {
    const page = await newE2EPage();

    await page.setContent('<og-form-item><og-text-input></og-text-input></og-form-item>');
    const element = await page.find('og-form-item');
    const input = await page.find('og-form-item > og-text-input');
    element.setProperty('validation', (value) => /13{2}7!*/.test(value))

    input.setAttribute('value', '1327');
    await page.waitForChanges();
    expect(element).toHaveClass('og-form-item--invalid');
    input.setAttribute('value', '1337');
    await page.waitForChanges();
    expect(element).not.toHaveClass('og-form-item--invalid');

    input.setAttribute('value', '1337!!!!!');
    await page.waitForChanges();
    expect(element).not.toHaveClass('og-form-item--invalid');
  });
});
