/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file for more information
 **/

import { Component, Prop, EventEmitter, Event } from '@stencil/core';

@Component({
  tag: 'og-list',
  styleUrl: 'og-list.scss',
  shadow: true
})
export class OgList {
    /**
     * The key of the selected list item
     */
    @Prop({ mutable: true }) selected: string;

    /**
     * An array of items to choose from
     */
    @Prop() items: any[];

    /**
     * Set the property for the items to define as value. Default: "key"
     */
    @Prop() keyProperty: string = 'key';

    /**
     * Set the property for the items to define as image url. *Optional* Default: no image
     */
    @Prop() imageUrlProperty?: string;

    /**
     * Set the property for the items to define as label. Default: "label"
     */
    @Prop() labelProperty: string = 'label';

    /**
     * Set the property for the items to define as value. *Optional* Default: no value
     */
    @Prop() valueProperty: string;

    /**
     * Set the property for the items to define as disabled. Default: "disabled"
     */
    @Prop() disabledProperty: string = 'disabled';

    /**
     * Set the that will be displayed if the items array is empty.
     */
    @Prop() emptyListMessage: string = 'No items available';

    /**
     * Determines, whether the control is disabled or not
     */
    @Prop() disabled: boolean;

    /**
     * Event is being emitted when value changes.
     */
    @Event() itemSelected: EventEmitter<any>;

    listItemSelected(item) {
        if (!this.disabled && !this.isItemDisabled(item)) {
            this.selected = item[this.keyProperty] + '';
            this.itemSelected.emit(item);
        }
    }

    private hasValidItems(): boolean {
        return Array.isArray(this.items);
    }

    private isItemSelected(item: any): boolean {
        return !(this.isItemDisabled(item)) && (item[this.keyProperty] + '' === this.selected);
    }

    private isItemDisabled(item: any): boolean {
        return item[this.disabledProperty] || false;
    }

    render() {
        return <ul class="og-list">
            {
                !this.hasValidItems()
                    ? <li>{ this.emptyListMessage }</li>
                    : this.items.map((item) =>
                        <li onClick={ () => this.listItemSelected(item) }
                            class={ 'og-list__item' + (this.isItemDisabled(item) ? ' og-list__item--disabled' : '') }>

                            <div class={ 'og-list__item__content' + (this.isItemSelected(item) ? ' og-list__item__content--selected' : '') }>
                                { this.imageUrlProperty && <div class="og-list__item__icon">
                                    { item[this.imageUrlProperty] && <img src={ item[this.imageUrlProperty] }/> }
                                </div> }
                                <div class="og-list__item__label">
                                    { item[this.labelProperty] }
                                </div>
                                { this.valueProperty && <div class="og-list__item__value">{ item[this.valueProperty] }</div> }
                            </div>
                        </li>
                    )
            }
            </ul>
    }
}
