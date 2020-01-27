/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import {
  Component,
  h,
  Host,
  State
} from '@stencil/core';

@Component({
  tag: 'og-form-item-container',
  styleUrl: 'og-form-item-container.scss',
  shadow: true
})

export class OgFormItemContainer {

  @State()
  public isInline: boolean = false;

  public render(): HTMLElement {
    return <Host class={{
      'is-inline': this.isInline
    }}>
      <slot></slot>
    </Host>;
  }
}
