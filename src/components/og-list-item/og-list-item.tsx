/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { h, Component, Prop, Host } from '@stencil/core';
import { OgListItemOptions } from './og-list-item.interface';
import { OgListItemInterface } from '../og-list/og-list-item.interface';

@Component({
  tag: 'og-list-item',
  styleUrl: 'og-list-item.scss',
  shadow: true
})
export class OgListItem implements OgListItemInterface {

  /**
   * Current item data
   */
  @Prop()
  public item: any;

  /**
   * Set the flag, if this list item is in selected state.
   *
   * @type {boolean}
   * @memberof OgListItem
   */
  @Prop({reflectToAttr: true})
  public selected: boolean;

  /**
   * Set the flag, it this list item is in disabled state.
   *
   * @type {boolean}
   * @memberof OgListItem
   */
  @Prop()
  public disabled: boolean;

  /**
   * Template options
   *
   * @type {OgListItemOptions}
   * @memberof OgListItem
   */
  @Prop()
  public options: OgListItemOptions;

  public render(): HTMLElement {
    return (
      <Host disabled={this.disabled}>
        <div class="og-list-item">
          <div class={"og-list-item__content" + (this.selected ? " og-list-item__content--selected" : "")}>
            {
              this.options.image &&
              <div class="og-list-item__icon">
                {
                  this.item[this.options.image] &&
                  <img src={this.item[this.options.image]} />
                }
              </div>
            }
            <div class="og-list-item__main">
              {
                this.item[this.options.overline] &&
                <div class="og-list-item__overline">{ this.item[this.options.overline] }</div>
              }
              {
                this.item[this.options.label] &&
                <div class="og-list-item__label">{ this.item[this.options.label] }</div>
              }
              {
                this.item[this.options.subline] &&
                <div class="og-list-item__subline">{ this.item[this.options.subline] }</div>
              }
            </div>
            {
              this.item[this.options.value] &&
              <div class="og-list-item__value">{this.item[this.options.value]}</div>
            }
          </div>
        </div>
      </Host>
    )
  }
}
