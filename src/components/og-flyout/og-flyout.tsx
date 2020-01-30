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
      <slot></slot>
    );
  }
}
