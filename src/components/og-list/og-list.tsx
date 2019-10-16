/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { h, Component, Prop, EventEmitter, Event } from '@stencil/core';

@Component({
  tag: 'og-list',
  styleUrl: 'og-list.scss',
  shadow: true
})
export class OgList {
  
  /**
   * The key of the selected list item
   */  
  @Prop({ mutable: true })
  public selected;

  /**
   * An array of items to choose from
   */
  @Prop()
  public items: any[];

  /**
   * Set the property for the items to define as value. Default: 'key'
   */
  @Prop()
  public keyProperty: string = 'key';

  /**
   * Set the property for the items to define as image url. *Optional* Default: no image
   */
  @Prop()
  public imageUrlProperty?: string;

  /**
   * Set the property for the items to define as label. Default: 'label'
   */
  @Prop()
  public labelProperty: string = 'label';

  /**
   * Set the property for the items to define as value. *Optional* Default: no value
   */
  @Prop()
  public valueProperty: string;

  /**
   * Set the property for the items to define as disabled. Default: 'disabled'
   */
  @Prop()
  public disabledProperty: string = 'disabled';

  /**
   * Set the text that will be displayed if the items array is empty.
   */
  @Prop()
  public emptyListMessage: string = 'No items available';

  /**
   * Enables selection of multiple items
   */
  @Prop()
  public multiselect: boolean;

  /**
   * Determines, whether the control is disabled or not
   */
  @Prop()
  public disabled: boolean;

  /**
   * Event is being emitted when value changes.
   */
  @Event()
  public itemSelected: EventEmitter<any>;

  public listItemSelected(item: any): void {
    if (!this.disabled && !this.isItemDisabled(item)) {
      if (this.isItemSelected(item)) {
        this.selected.delete(item[this.keyProperty] + '');
      } else {
        if (!this.multiselect) {
          this.selected.clear();
        }
        this.selected.add(item[this.keyProperty] + '');
        this.itemSelected.emit(item);
      }
      this.selected = new Set(this.selected.values());
    }
  }

  private hasValidItems(): boolean {
    return Array.isArray(this.items);
  }

  public isItemSelected(item: any): boolean {
    return this.selected.has(item[this.keyProperty]);
  }

  private isItemDisabled(item: any): boolean {
    return item[this.disabledProperty] || false;
  }

  public render(): HTMLElement {
    if (typeof this.selected === "string") {
      let selection = this.selected.trim().split(" ");
      
      this.selected = new Set();      
      selection.forEach(el => {
        this.selected.add(el);
      });
    }

    if (typeof this.selected === "undefined") {
      this.selected = new Set();
    }

    return <ul class="og-list">
      {
        !this.hasValidItems()
          ? <li>{this.emptyListMessage}</li>
          : this.items.map((item): HTMLElement =>
            <og-list-item
              key={item[this.keyProperty]}
              label={item[this.labelProperty]}
              show-image={!!this.imageUrlProperty}
              image={item[this.imageUrlProperty]}
              show-value={!!this.valueProperty}
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
