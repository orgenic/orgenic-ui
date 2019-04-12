import { Component, Prop, EventEmitter, Event, Method, Watch } from '@stencil/core';
import { OgDatatableConfig, OgLazyDataProvider, OgDefaultDataProvider,
    OgDataProvider} from './interfaces/og-datatable-column-def';

import Tabulator from '../../../node_modules/tabulator-tables';
import { getBasicTableConfig, applyCustomTableConfig, getColumnConfig,
    applyDataServiceConfig } from './utils/datatable-utils';

@Component({
    tag: 'og-datatable',
    styleUrl: 'og-datatable.scss',
    shadow: true
})
export class OgDatatable {
    /**
     * Table configuration (type OgDatatableConfig)
     */
    @Prop() config: OgDatatableConfig;
    @Watch('config') configChanged() {
        this.initTable();
    }

    /**
     * Selected row identified by id-property
     */
    @Prop({ mutable: true, reflectToAttr: true }) selected: any;

    /**
     * Item selection event. Event.detail contains selected item.
     */
    @Event() itemSelected: EventEmitter<any>

    /**
     * Programatically update selected row by idProperty.
     */
    @Method() setSelection(id) {
        this.selected = id;
        this.updateRowSelection();
    }

    /**
     * Triggers a reload of the table data.
     */
    @Method() reloadData() {
        if (this.table) {
            this.table.replaceData();
        }
    }

    tableContainer: HTMLElement;
    table: Tabulator;

    dataProvider: OgDataProvider;

    initTable() {
        if (this.table || !this.tableContainer || !this.config) {
            return;
        }

        const tableConfig = getBasicTableConfig();
        if (this.config) {
            applyCustomTableConfig(this.config, tableConfig);
            tableConfig.columns = getColumnConfig(this.config.columns)
            this.dataProvider = applyDataServiceConfig(this.config.dataService, tableConfig);
        }

        tableConfig.rowClick = (_e, row) => {
            const data = row.getData();
            this.selected = data[this.table.options.index];
            this.itemSelected.emit(data);
        },
        tableConfig.dataLoaded = () => this.updateRowSelection();
        tableConfig.ajaxRequestFunc = (url, config, params) => this.requestFunc(url, config, params),

        this.table = new Tabulator(this.tableContainer, tableConfig);
    }


    updateRowSelection() {
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

    async requestFunc(_url, _config, params): Promise<any> {
        if (!params.page) {
            return await (this.dataProvider as OgDefaultDataProvider).getData();
        }
        const result = await (this.dataProvider as OgLazyDataProvider).getData(params.page, params.size, params.sorters);
        return {
            last_page: result.data.length === 0 ? 0 : result.totalRows / result.data.length,
            data: result.data
        };
    }

    render() {
        return <div
            ref={ el => { this.tableContainer = el; this.initTable(); } }
            class={ this.config && this.config.dataService && this.config.dataService.type === 'scrolled' ? 'scrolled-table--limited-height' : '' }>
        </div>
    }
}
