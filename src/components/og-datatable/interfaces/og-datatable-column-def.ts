export interface OgDatatableConfig {
    idProperty: string;
    noDataMessage: string;
    // 0 = no selection; 1 = single selection; 2+ = multi selection
    selectable: number;

    dataService: OgDataService;

    columns: OgDatatableColumnDef[];
}
export interface OgDatatableColumnDef {
    property: string;
    title: string;
    // width in pixel
    width?: number;
    // column grow factor
    grow?: number;
    formatter?: string | RenderFunction;
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

export type RenderFunction = (cell, formatterParams, onRendered) => String;
export type SorterFunction = (a: any, b: any) => number;

export interface OgDataService {
    readonly type: 'scrolled' | 'paginated';
    provider: OgDataProvider;
}

export class OgScrolledDataService implements OgDataService {
    public readonly type = 'scrolled';

    constructor(public options: OgScrolledDataOptions, public provider: OgDataProvider) { }
}

export class OgPaginatedDataService implements OgDataService {
    public readonly type = 'paginated';

    constructor(public options: OgPaginatedDataOptions, public provider: OgDataProvider) { }
}

export interface OgDataProvider {
    type: 'default' | 'lazy';
}

export class OgDefaultDataProvider implements OgDataProvider {
    readonly type = 'default';

    constructor(public getData: DataProviderFunction) { }
}

export class OgLazyDataProvider implements OgDataProvider {
    readonly type = 'lazy';

    constructor(public getData: LazyDataProviderFunction) { }
}

export interface OgScrolledDataOptions {
    requestLimit?: number;
}

export interface OgPaginatedDataOptions {
    pageSize: number;
}
