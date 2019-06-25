import { newE2EPage, E2EElement, E2EPage } from '@stencil/core/testing';

describe('og-tab-container', () => {
  let page: E2EPage;
  let component: E2EElement;
  let tabButton: E2EElement[];
  let tabContent: E2EElement[];

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`<og-tab-container>
            <og-tab label="Angular Example">Show here how to use component in Angular</og-tab>
            <og-tab label="React Example" selected>Show here how to use component in React</og-tab>
            <og-tab label="Vue Example">Show here how to use component in Vue</og-tab>
        </og-tab-container>`)

    component = await page.find('og-tab-container');

    await page.waitForChanges();
    tabContent = await component.findAll('og-tab');
  });

  it('renders', async () => {
    expect(component).toHaveClass('hydrated');
  });

  it('renders all tabs', async () => {
    tabButton = await page.findAll('og-tab-container >>> button');

    expect(tabButton.length).toEqual(3);
  });

  it('disables and enables tabs according to container disabled state', async () => {
    component.setProperty('disabled', true);
    await page.waitForChanges();

    tabButton = await page.findAll('og-tab-container >>> button');

    expect(await tabButton[0].getProperty('disabled')).toBeTruthy();
    expect(await tabButton[1].getProperty('disabled')).toBeTruthy();
    expect(await tabButton[2].getProperty('disabled')).toBeTruthy();

    component.setProperty('disabled', false);
    await page.waitForChanges();

    expect(await tabButton[0].getProperty('disabled')).toBeFalsy();
    expect(await tabButton[1].getProperty('disabled')).toBeFalsy();
    expect(await tabButton[2].getProperty('disabled')).toBeFalsy();
  });

  it('should show selected tab content', async () => {
    await component.callMethod('openTab', 1);
    await page.waitForChanges();

    expect(await tabContent[0].getProperty('selected')).toBeFalsy();
    expect(await tabContent[1].getProperty('selected')).toBeTruthy();
    expect(await tabContent[2].getProperty('selected')).toBeFalsy();
  });
});
