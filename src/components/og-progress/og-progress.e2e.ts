import { newE2EPage, E2EPage, E2EElement } from '@stencil/core/testing';

describe('og-progress__test', () => {
  let page: E2EPage;
  let component: E2EElement;
  let progress: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage({
      html: '<og-progress style="width: 1000px;" max="200" value="50"></og-progress>'
    });

    await page.waitForChanges();

    component = await page.find('og-progress');
    progress = await page.find('og-progress >>> .og-progress-bar');
  });

  it('renders', async () => {
    expect(component).toHaveClass('hydrated');
  });

  it('sets progress bar width', async (done) => {
    const progressStyle = await progress.getComputedStyle();
    expect(progressStyle.getPropertyValue('width')).toEqual('250px');

    done();
  });

  it('is indeterminate when no properties are set', async (done) => {
    page = await newE2EPage({
      html: '<og-progress></og-progress>'
    });
    await page.waitForChanges();
    component = await page.find('og-progress');
    progress = await page.find('og-progress >>> .og-progress-bar');
    expect(await component.getProperty('indeterminate')).toEqual(true);
    done();
  });

});
