import { newE2EPage, E2EPage, E2EElement } from '@stencil/core/testing';

describe('og-list', () => {

  let page: E2EPage;
  let component: E2EElement;

  const items =  [
    { key: "key1", label: "V1", value: 23 },
    { key: "key2", label: "V2", value: 24 },
    { key: "key3", label: "V3", value: 25 }
  ];

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<og-list></og-list>');
    component = await page.find('og-list');
  })

  it('renders list component', async () => {
    expect(component).toHaveClass('hydrated');
  });

  it('renders default list items', async () => {
    component.setProperty('items', items);
    await page.waitForChanges();
    const listItems = await page.findAll('og-list >>> og-list-item')
    expect(listItems.length).toEqual(3);
  });

  it('renders custom list items', async () => {
    component.setProperty('items', items);
    component.setProperty('template', 'my-custom-template');
    await page.waitForChanges();
    const listItems = page.findAll('og-list >>> my-custom-template');
    expect((await listItems).length).toEqual(3);
  });

  it('handles selecting a single item', async() => {
    component.setProperty('items', items);
    await page.waitForChanges();
    const listItem = await page.find('og-list >>> og-list-item');
    listItem.click();
    await page.waitForChanges();
    expect(await (component as any).getProperty('selected')).toEqual('key1');
  })

  it('handles selecting multiple items', async() => {
    component.setProperty('items', items);
    component.setProperty('multiselect', true);
    await page.waitForChanges();
    const listItems = await page.findAll('og-list >>> og-list-item');
    expect(listItems).toHaveLength(3);
    await page.waitForChanges();

    listItems[0].click();
    listItems[1].click();
    await page.waitForChanges();
    expect(await component.getProperty('selected')).toHaveLength(2);
    expect(await component.getProperty('selected')).toContain('key1');
    expect(await component.getProperty('selected')).toContain('key2');
    expect(await component.getProperty('selected')).not.toContain('key3');

    listItems[1].click();
    await page.waitForChanges();
    expect(await component.getProperty('selected')).toHaveLength(1);
    expect(await component.getProperty('selected')).toContain('key1');
    expect(await component.getProperty('selected')).not.toContain('key2');
    expect(await component.getProperty('selected')).not.toContain('key3');
  })

});
