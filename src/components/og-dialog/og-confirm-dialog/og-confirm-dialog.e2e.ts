import { newE2EPage, E2EElement, E2EPage } from '@stencil/core/testing';

describe('og-confirm-dialog', () => {
  let page: E2EPage;
  let component: E2EElement;
  let buttons: E2EElement[];

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`<og-confirm-dialog name="Testing Card!">
            <h1>card</h1>
        </og-confirm-dialog>`)

    component = await page.find('og-confirm-dialog');
    buttons = await page.findAll('og-confirm-dialog >>> og-button');
  });

  it('renders', async () => {
    expect(component).toHaveClass('hydrated');
  });

  it('has two buttons', async () => {
    expect(buttons).not.toBeNull();
    expect(buttons.length).toBe(2);
  });

  it('is hidden by default', async () => {
    expect(component).not.toHaveAttribute('visible');
  });

  it('is visible when called', async () => {
    component.setProperty('visible', true);
    await page.waitForChanges();

    expect(component).toHaveAttribute('visible');
  });

  it('is hidden after closing', async () => {
    component.setProperty('visible', true);
    await page.waitForChanges();

    component.setProperty('visible', false);
    await page.waitForChanges();

    expect(component).not.toHaveAttribute('visible');
  });

  it('closes when ok or cancel button is clicked', async () => {
    // first button
    component.setProperty('visible', true);
    await page.waitForChanges();

    await buttons[0].click();

    expect(component).not.toHaveAttribute('visible');

    // second button
    component.setProperty('visible', true);
    await page.waitForChanges();

    await buttons[1].click();

    expect(component).not.toHaveAttribute('visible');
  });


});
