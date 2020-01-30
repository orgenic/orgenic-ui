/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { h, Component } from '@stencil/core';

@Component({
  tag: 'og-flyout',
  styleUrl: 'og-flyout.scss',
  shadow: true
})
export class OgFormItem {

  public render(): HTMLElement {
    return (
      // TODO: fix bindings & properties
      // <ul
      //   class='og-combobox__flyout__list'
      //   ref={(el) => this.flyoutList = el}
      // >
      //   {!this.hasValidItems() ? (
      //     <li>No options available</li>
      //   ) : (
      //     this.items.map((item): HTMLElement => (
      //       <li
      //         class={ 'og-combobox__flyout__list__item' + (item[this.itemValueProperty] == this.value ? ' og-combobox__flyout__list__item--active' : '' ) }
      //         onClick={() => this.listItemSelected(item)}
      //       >
      //         {item[this.itemLabelProperty]}
      //       </li>
      //     ))
      //   )}
      // </ul>

      // TODO: remove <slot>
      <slot></slot>
    );
  }
}
