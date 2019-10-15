/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { h, Component, Element, Prop, Host } from '@stencil/core';

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
  public icon: string = 'home';

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
    const response = await fetch('/orgenic-ui-assets/icons.svg');
    const data = await response.blob();
    this.iconSrc = URL.createObjectURL(data);
  }

  public componentDidRender(): void {
    this.element.style.setProperty('--og-icon--Size', this.size);
  }

  private getSvg(): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="img">
      <use xlink:href="${this.iconSrc}#24_${this.iconStyle}_${this.icon}"/>
    </svg>`;
  }

  public render(): HTMLElement {
    return <Host
      class="og-icon"
    >
      <div
        innerHTML={this.getSvg()}
      >
      </div>
    </Host>;
  }
}
