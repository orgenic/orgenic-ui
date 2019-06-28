import { getBasicTableConfig, applyCustomTableConfig, getColumnConfig, applyDataServiceConfig } from "./datatable-utils";
import { OgDatatableColumnDef, OgScrolledDataService, OgDefaultDataProvider, OgPaginatedDataService, OgLazyDataProvider } from "../interfaces/og-datatable-column-def";

it('generates basic table configuration', async () => {
  const config = getBasicTableConfig();
  expect(config.ajaxURL).toEqual('/');
  expect(config.height).toEqual('100%');
});

it('should apply custom table config', () => {
  const config = {} as any;
  const customConfig = {
    idProperty: 'idString',
    noDataMessage: 'this is a placeholder',
    selectable: 1
  } as any;
  applyCustomTableConfig(customConfig, config);
  expect(config.index).toEqual('idString');
  expect(config.placeholder).toEqual('this is a placeholder');
  expect(config.selectable).toEqual(1);
});

it('should generate column configuration', () => {
  const columnDef: OgDatatableColumnDef[] = [
    { title: 'a', property: 'A' },
    { title: 'b', property: 'B', formatter: 'star'},
    { title: 'c', property: 'C', width: 100, grow: 0.5 }
  ];
  const columns = getColumnConfig(columnDef);
  expect(columns.length).toEqual(3);
  expect(columns[0].title).toEqual('a');
  expect(columns[1].field).toEqual('B');
  expect(columns[1].formatter).toEqual('star');
  expect(columns[2].width).toEqual(100);
  expect(columns[2].widthGrow).toEqual(0.5);
});

it('should apply scrolling dataservice configuration', () => {
  const config = {} as any;
  const dataService = new OgScrolledDataService(
    { requestLimit: 6 },
    new OgDefaultDataProvider(async () => [])
  );

  expect(dataService.options.requestLimit).toEqual(6);
  expect(dataService.type).toEqual('scrolled');

  const provider = applyDataServiceConfig(dataService, config);

  expect(config.paginationSize).toEqual(6);
  expect(provider.type).toEqual('default');
});

it('should apply paginated dataservice configuration with lazy data provider', () => {
  const config = {} as any;
  const dataService = new OgPaginatedDataService(
    { pageSize: 7 },
    new OgLazyDataProvider(async () => ({data: [], totalRows: 1}))
  );

  expect(dataService.options.pageSize).toEqual(7);
  expect(dataService.type).toEqual('paginated');

  const provider = applyDataServiceConfig(dataService, config);

  expect(provider).toBeDefined();
  expect(provider.type).toEqual('lazy');
  expect(config.pagination).toEqual('remote');
});
