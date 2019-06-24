import { OgPaginatedDataService, OgDefaultDataProvider, OgDatatableConfig,
  OgDatatableColumnDef, OgDataService, OgScrolledDataService,
  OgLazyDataProvider,
  OgDataProvider} from "../interfaces/og-datatable-column-def";

export function getBasicTableConfig(): Tabulator.Options {
  // fill table space https://github.com/olifolkerd/tabulator/issues/1506
  return {
    layout: 'fitColumns',
    autoResize: true,
    resizableColumns: false,
    responsiveLayout: 'collapse',
    virtualDom: true,
    height: '100%',
    ajaxURL: '/',
  };
}

export function applyCustomTableConfig(config: OgDatatableConfig, tableConfig: Tabulator.Options) {
  tableConfig.index = config.idProperty || 'id';
  tableConfig.placeholder = config.noDataMessage || tableConfig.placeholder;
  tableConfig.selectable = config.selectable;
}

export function getColumnConfig(columns: OgDatatableColumnDef[]) {
  return columns.map(column => {
    const columnDef = {
      title: column.title,
      field: column.property,
      width: column.width,
      widthGrow: column.grow,
      formatter: column.formatter as any,
    } as any;
    if (column.sorter) {
      const sorterFn = column.sorter;
      columnDef.sorter = (a, b) => {
        return sorterFn(a, b);
      };
    }
    return columnDef;
  })
}

export function applyDataServiceConfig(dataService: OgDataService, tableConfig: Tabulator.Options): OgDataProvider {
  let provider: OgDataProvider;

  if (!dataService) {
    console.error('config.dataService must be set');
    return provider;
  }
  if (dataService.type === 'scrolled') {
    const service = dataService as OgScrolledDataService;
    tableConfig.paginationSize = (service.options && service.options.requestLimit) || 100;
    if (service.provider.type === 'default') {
      provider = service.provider as OgDefaultDataProvider;
    } else if (service.provider.type === 'lazy') {
      tableConfig.ajaxSorting = true;
      tableConfig.ajaxProgressiveLoad = 'scroll';
      provider = service.provider as OgLazyDataProvider;
    }
  } else if (dataService.type === 'paginated') { // paginated
    const service = dataService as OgPaginatedDataService;
    tableConfig.paginationSize = (service.options && service.options.pageSize) || 50;
    if (service.provider.type === 'default') {
      tableConfig.pagination = 'local';
      provider = service.provider as OgDefaultDataProvider;
    } else if (service.provider.type === 'lazy') {
      tableConfig.ajaxSorting = true;
      tableConfig.pagination = 'remote';
      provider = service.provider as OgLazyDataProvider;
    }
  } else {
    console.error('unknown dataservice', dataService.type);
  }

  return provider;
}
