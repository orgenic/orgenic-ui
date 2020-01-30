/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { h, Component, Event, Host, Prop, EventEmitter } from '@stencil/core';

@Component({
  tag: 'og-combobox-options',
  styleUrl: 'og-combobox-options.scss',
  shadow: true
})
export class OgFormItem {

  /**
   * An array of items to choose from
   */
  @Prop()
  public items: any[];

  /**
   * The selected value
   */
  @Prop({ mutable: true })
  public value: string;

  /**
   * Set the property for the items to define as label. Default: "label"
   */
  @Prop()
  public itemLabelProperty: string = 'label';

  /**
   * Set the property for the items to define as value. Default: "value"
   */
  @Prop()
  public itemValueProperty: string = 'value';

  /**
   * Determines, whether the options are disabled or not
   */
  @Prop()
  public disabled: boolean;

  /**
   * Determines, whether the options are visible or not
   */
  @Prop({ mutable: true, reflectToAttr: true })
  public visible: boolean;

  /**
   * Event is being emitted when value changes.
   */
  @Event()
  public itemSelected: EventEmitter<any>;

  private handleItemClick(item) {
    if (!this.disabled) {
      this.value = item[this.itemValueProperty] + '';
      this.itemSelected.emit(item);
    }
  }

  private hasValidItems(): boolean {
    return Array.isArray(this.items);
  }

  public render(): HTMLElement {
    return (
      <Host>
        <ul
          class='og-combobox-options__list'
        >
          {!this.hasValidItems() ? (
            <li>No options available</li>
            ) : (
            this.items.map((item): HTMLElement => (
              <li
                class={'og-combobox-options__list__item' + (item[this.itemValueProperty] == this.value ? ' og-combobox-options__list__item--active' : '')}
                onClick={() => this.handleItemClick(item)}
                >
                  {item[this.itemLabelProperty]}
              </li>
            ))
          )}
        </ul>
      </Host>
    );
  }
}
