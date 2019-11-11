import { newE2EPage, E2EPage, E2EElement } from '@stencil/core/testing';

describe('og-datatable', () => {
  let page: E2EPage;
  let component: E2EElement;
  const data = [
    {id: 1000, name: 'Emerald Baird', city: 'Langley', activity: 4},
    {id: 1001, name: 'Pandora Bauer', city: 'Lesve', activity: 5},
    {id: 1002, name: 'Stacy Preston', city: 'Chañaral', activity: 1}
  ];

  const config = {
    noDataMessage: 'No items available',
    selectable: 1,
    columns: [
      {
        property: 'name',
        title: 'Name'
      },
      {
        property: 'city',
        title: 'City'
      },
      {
        property: 'activity',
        title: 'Activity',
        formatter: 'star',
      },
    ],
    dataService: {
      type: 'scrolled',
      options: {},
      provider: {
        type: 'default',
        getData: async () => {
          return data;
        }
      }
    },
  };

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent('<og-datatable></og-datatable>');
    component = await page.find('og-datatable');
  });

  it('renders', async () => {
    await page.waitForChanges();
    expect(component).toHaveClass('hydrated');
  });

  it('should create the table', async () => {
    const table = page.find('.tabulator');
    expect(table).toBeDefined();
  });

  it('should create the table columns according to the configuration', async () => {
    component.setProperty('config', config);
    await page.waitForChanges();

    const header = await page.findAll('og-datatable >>> .tabulator-headers');
    expect(header.length).toEqual(1);

    const columns = await page.findAll('og-datatable >>> .tabulator-col');
    expect(columns.length).toEqual(3);
  });
});
