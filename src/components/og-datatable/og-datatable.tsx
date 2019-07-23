/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { h, Component, Prop, EventEmitter, Event, Method, Watch } from '@stencil/core';
import Tabulator from '../../../node_modules/tabulator-tables';
import {
  OgDatatableConfig,
  OgLazyDataProvider,
  OgDefaultDataProvider,
  OgDataProvider
} from './interfaces/og-datatable-column-def';
import {
  getBasicTableConfig,
  applyCustomTableConfig,
  getColumnConfig,
  applyDataServiceConfig
} from './utils/datatable-utils';

@Component({
  tag: 'og-datatable',
  styleUrl: 'og-datatable.scss',
  shadow: true
})
export class OgDatatable {
  public tableContainer: HTMLElement;
  public table: Tabulator;
  public dataProvider: OgDataProvider;

  /**
   * Table configuration (type OgDatatableConfig)
   */
  @Prop()
  public config: OgDatatableConfig;

  /**
   * Selected row identified by id-property
   */
  @Prop({mutable: true, reflectToAttr: true})
  public selected: any;

  /**
   * Item selection event. Event.detail contains selected item.
   */
  @Event()
  public itemSelected: EventEmitter<any>;

  /**
   * Programatically update selected row by idProperty.
   */
  @Method()
  public async setSelection(id): Promise<void> {
    this.selected = id;
    this.updateRowSelection();
  }

  /**
   * Triggers a reload of the table data.
   */
  @Method()
  public async reloadData() {
    if (this.table) {
      this.table.replaceData();
    }
  }

  @Watch('config')
  public configChanged() {
    this.initTable();
  }

  public async initTable() {
    if (this.table || !this.tableContainer || !this.config) {
      return;
    }

    const tableConfig = getBasicTableConfig();
    if (this.config) {
      applyCustomTableConfig(this.config, tableConfig);
      tableConfig.columns = await getColumnConfig(this.config.columns) as any;
      this.dataProvider = applyDataServiceConfig(this.config.dataService, tableConfig);
    }

    tableConfig.rowClick = (_e, row) => {
      const data = row.getData();
      this.selected = data[this.table.options.index];
      this.itemSelected.emit(data);
    },
    tableConfig.dataLoaded = () => this.updateRowSelection();
    tableConfig.ajaxRequestFunc = async (url, config, params) => this.requestFunc(url, config, params),

    this.table = new Tabulator(this.tableContainer, tableConfig);
  }

  public updateRowSelection() {
    if (!this.table) {
      // console.log('update row selection - no table');
      return;
    }
    if (this.table.getData().findIndex(d => d[this.table.options.index] == this.selected) <= 0) {
      // console.log('update row selection - selection not in table data');
      return;
    }
    this.table.selectRow(this.selected);
  }

  public async requestFunc(_url, _config, params): Promise<any> {
    if (!params.page) {
      return await (this.dataProvider as OgDefaultDataProvider).getData();
    }
    const result = await (this.dataProvider as OgLazyDataProvider).getData(params.page, params.size, params.sorters);
    return {
      // eslint-disable-next-line
      last_page: result.data.length === 0 ? 0 : result.totalRows / result.data.length,
      data: result.data
    };
  }

  public render(): HTMLElement {
    return <div
      ref={ el => { this.tableContainer = el; this.initTable(); } }
      class={ this.config && this.config.dataService && this.config.dataService.type === 'scrolled' ? 'scrolled-table--limited-height' : '' }>
    </div>
  }
}
