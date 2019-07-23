/**
 * This interface describes the configuration of an og-datatable
 *
 * @export
 * @interface OgDatatableConfig
 */
export interface OgDatatableConfig {

  /**
   * Gets or sets the id property
   *
   * @type {string}
   * @memberof OgDatatableConfig
   */
  idProperty: string;

  /**
   * Gets or sets the message used to indicate, that no data is available
   *
   * @type {string}
   * @memberof OgDatatableConfig
   */
  noDataMessage: string;

  /**
   * Gets or sets the selection mode
   * 0 = no selection; 1 = single selection; 2+ = multi selection
   *
   * @type {number}
   * @memberof OgDatatableConfig
   */
  selectable: number;


  /**
   * Gets or sets the data service instance used
   *
   * @type {OgDataService}
   * @memberof OgDatatableConfig
   */
  dataService: OgDataService;

  /**
   * Gets or sets the list of columns and their configuration
   *
   * @type {OgDatatableColumnDef[]}
   * @memberof OgDatatableConfig
   */
  columns: OgDatatableColumnDef[];
}

/**
 * This interface describes the column within a og-datatable
 *
 * @export
 * @interface OgDatatableColumnDef
 */
export interface OgDatatableColumnDef {

  /**
   * Gets or sets the property to show
   *
   * @type {string}
   * @memberof OgDatatableColumnDef
   */
  property: string;

  /**
   * Gets or sets the title of the column
   *
   * @type {string}
   * @memberof OgDatatableColumnDef
   */
  title: string;

  /**
   * Gets or sets the width of the column in pixels
   *
   * @type {number}
   * @memberof OgDatatableColumnDef
   */
  width?: number;

  /**
   * Gets or sets the column grow factor
   *
   * @type {number}
   * @memberof OgDatatableColumnDef
   */
  grow?: number;

  /**
   * Gets or sets the formatter string or custom render function.
   *
   * @type {(string | RenderFunction)}
   * @memberof OgDatatableColumnDef
   */
  formatter?: string | RenderFunction;

  /**
   * Gets or sets the sorting function
   *
   * @type {SorterFunction}
   * @memberof OgDatatableColumnDef
   */
  sorter?: SorterFunction;
}

export type DataResponse = any[];
export type DataProviderFunction = () => Promise<DataResponse>;

export interface LazyDataResponse {
  totalRows: number;
  data: DataResponse;
}
export type LazyDataProviderFunction = (page: number, size: number, sorters: Sorter[]) => Promise<LazyDataResponse>;
export interface Sorter {
  dir: string;
  field: string;
}

/**
 * This type defines the function to render a custom cell.
 *
 * @param {any} cell The cell to render
 * @param {any} formatterParams
 * @param {any} onRendered
 */
export type RenderFunction = (cell: any, formatterParams: any, onRendered: any) => string;
export type SorterFunction = (a: any, b: any) => number;

/**
 * This interface describes a basic data service
 *
 * @export
 * @interface OgDataService
 */
export interface OgDataService {

  /**
   * Gets the type of the data service
   *
   * @type {('scrolled' | 'paginated')}
   * @memberof OgDataService
   */
  readonly type: 'scrolled' | 'paginated';


  /**
   * Gets or sets the data provider
   *
   * @type {OgDataProvider}
   * @memberof OgDataService
   */
  provider: OgDataProvider;
}

/**
 * This class represents a data service for scrolled data
 *
 * @export
 * @class OgScrolledDataService
 * @implements {OgDataService}
 */
export class OgScrolledDataService implements OgDataService {

  /**
   * Gets the type
   *
   * @memberof OgScrolledDataService
   */
  public readonly type = 'scrolled';

  /**
   * Creates an instance of OgScrolledDataService.
   *
   * @param {OgScrolledDataOptions} options
   * @param {OgDataProvider} provider
   * @memberof OgScrolledDataService
   */
  public constructor(public options: OgScrolledDataOptions, public provider: OgDataProvider) { }
}

/**
 * This class represents a data service for paginated data
 *
 * @export
 * @class OgPaginatedDataService
 * @implements {OgDataService}
 */
export class OgPaginatedDataService implements OgDataService {

  /**
   * Gets the type of the data service
   *
   * @memberof OgPaginatedDataService
   */
  public readonly type = 'paginated';

  /**
   * Creates an instance of OgPaginatedDataService.
   *
   * @param {OgPaginatedDataOptions} options
   * @param {OgDataProvider} provider
   * @memberof OgPaginatedDataService
   */
  public constructor(public options: OgPaginatedDataOptions, public provider: OgDataProvider) { }
}

/**
 * This interface describes a data provider
 *
 * @export
 * @interface OgDataProvider
 */
export interface OgDataProvider {

  /**
   * Gets or sets the type of the data provider
   *
   * @type {('default' | 'lazy')}
   * @memberof OgDataProvider
   */
  type: 'default' | 'lazy';
}

/**
 * This class represents the default data provider
 *
 * @export
 * @class OgDefaultDataProvider
 * @implements {OgDataProvider}
 */
export class OgDefaultDataProvider implements OgDataProvider {

  /**
   * Gets the type of the data provider
   *
   * @memberof OgDefaultDataProvider
   */
  public readonly type = 'default';

  /**
   * Creates an instance of OgDefaultDataProvider.
   *
   * @param {DataProviderFunction} getData The function which takes care of loading data
   * @memberof OgDefaultDataProvider
   */
  public constructor(public getData: DataProviderFunction) { }
}

/**
 * This class represents a data provider that lazy loads data
 *
 * @export
 * @class OgLazyDataProvider
 * @implements {OgDataProvider}
 */
export class OgLazyDataProvider implements OgDataProvider {

  /**
   * Gets the type of the data provider
   *
   * @memberof OgLazyDataProvider
   */
  public readonly type = 'lazy';

  /**
   * Creates an instance of OgLazyDataProvider.
   *
   * @param {LazyDataProviderFunction} getData The function which takes care of loading data
   * @memberof OgLazyDataProvider
   */
  public constructor(public getData: LazyDataProviderFunction) { }
}

/**
 * This interface describes the options for @see OgScrolledDataService
 *
 * @export
 * @interface OgScrolledDataOptions
 */
export interface OgScrolledDataOptions {

  /**
   * Gets or sets the limit for requested items.
   *
   * @type {number}
   * @memberof OgScrolledDataOptions
   */
  requestLimit?: number;
}

/**
 * This interface describes the options for the @see OgPaginatedDataService
 *
 * @export
 * @interface OgPaginatedDataOptions
 */
export interface OgPaginatedDataOptions {

  /**
   * Gets or sets the number of items on a loaded page
   *
   * @type {number}
   * @memberof OgPaginatedDataOptions
   */
  pageSize: number;
}
