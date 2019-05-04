/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { Component, Prop, EventEmitter, Event } from "@stencil/core";

@Component({
    tag: "og-list",
    styleUrl: "og-list.scss",
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
    @Prop() keyProperty: string = "key";

    /**
     * Set the property for the items to define as image url. *Optional* Default: no image
     */
    @Prop() imageUrlProperty?: string;

    /**
     * Set the property for the items to define as label. Default: "label"
     */
    @Prop() labelProperty: string = "label";

    /**
     * Set the property for the items to define as value. *Optional* Default: no value
     */
    @Prop() valueProperty: string;

    /**
     * Set the property for the items to define as disabled. Default: "disabled"
     */
    @Prop() disabledProperty: string = "disabled";

    /**
     * Set the that will be displayed if the items array is empty.
     */
    @Prop() emptyListMessage: string = "No items available";

    /**
     * Determines, whether the control is disabled or not
     */
    @Prop() disabled: boolean;

    /**
     * Event is being emitted when value changes.
     */
    @Event() itemSelected: EventEmitter<any>;

    listItemSelected(item: any): void {
        if (!this.disabled && !this.isItemDisabled(item)) {
            this.selected = item[this.keyProperty] + "";
            this.itemSelected.emit(item);
        }
    }

    private hasValidItems(): boolean {
        return Array.isArray(this.items);
    }

    public isItemSelected(item: any): boolean {
        return !(this.isItemDisabled(item)) && (item[this.keyProperty] + "" === this.selected);
    }

    private isItemDisabled(item: any): boolean {
        return item[this.disabledProperty] || false;
    }

    render(): any {
        return <ul class="og-list">
            {
                !this.hasValidItems()
                    ? <li>{this.emptyListMessage}</li>
                    : this.items.map((item) =>
                        <og-list-item
                            key={item[this.keyProperty]}
                            label={item[this.labelProperty]}
                            show-image={this.imageUrlProperty}
                            image={item[this.imageUrlProperty]}
                            show-value={this.valueProperty}
                            value={item[this.valueProperty]}
                            is-selected={this.isItemSelected(item)}
                            is-disabled={this.isItemDisabled(item)}
                            onClick={() => this.listItemSelected(item)}>
                        </og-list-item>
                    )
            }
        </ul>;
    }
}
