/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { h, Component, Element, Prop, Host } from '@stencil/core';
import { IconUtils } from './utils/utils'

@Component({
  tag: 'og-icon',
  styleUrl: 'og-icon.scss',
  shadow: true
})
export class OgIcon {
  /**
   * The displayed icon
   *
   * @type {string}
   */
  @Prop({ reflect: true })
  public icon: string;

  /**
   * An optional path to a custom svg-sprite
   *
   * @type {string}
   */
  @Prop({ reflect: true })
  public src: string;

  /**
   * The style of the icon
   *
   * @type {'stroke' | 'solid'}
   */
  @Prop({ reflect: true })
  public iconStyle: 'stroke' | 'solid' = 'stroke';

  /**
   * The size of the icon
   */
  @Prop({ reflect: true })
  public size: string = '16px';

  @Element()
  private element: HTMLElement;

  private iconSrc: string = "";

  public async componentWillLoad(): Promise<void> {
    this.iconSrc = await IconUtils.getInstance().getIconSrc(this.src);
  }

  public componentDidRender(): void {
    this.element.style.setProperty('--og-icon--Size', this.size);
  }

  private getIconId(): string {
    return this.src ? (this.icon ? `#${this.icon}` : '') : `#${ this.iconStyle }_${ this.icon || 'home' }`;
  }

  public render(): HTMLElement {
    return <Host
      class="og-icon"
    >
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" role="img">
        <use xlinkHref={this.iconSrc + this.getIconId()}/>
      </svg>
    </Host>;
  }
}
