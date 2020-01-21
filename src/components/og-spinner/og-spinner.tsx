/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { h,  Component, Prop, Host } from '@stencil/core';

const sizes = {
  s: '16px',
  m: '32px',
  l: '48px'
}

@Component({
  tag: 'og-spinner',
  styleUrl: 'og-spinner.scss',
  shadow: true
})
export class OgSpinner {
  /**
   * Determines, whether the control is disabled or not
   *
   * @type {boolean}
   */
  @Prop()
  public disabled: boolean;

  /**
   * The size of the spinner (s/m/l)
   *
   * @type {'s' | 'm' | 'l'}
   */
  @Prop({reflectToAttr: true})
  public size: 's' | 'm' | 'l' = 'm';

  public render(): HTMLElement {
    return <Host
      class="og-spinner"
      size={ this.size }
      disabled={ this.disabled }
    >
      <svg width={sizes[this.size]} height={sizes[this.size]} viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle class="circle-edge" fill="none" stroke-width="8" cx="33" cy="33" r="29"></circle>
        <circle class="circle-dash" stroke-linecap="round" fill="none" stroke-width="8" cx="33" cy="33" r="29"></circle>
      </svg>
    </Host>;
  }
}
