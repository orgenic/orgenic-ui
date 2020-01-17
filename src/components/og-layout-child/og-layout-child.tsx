/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { h, Component, Element, Prop } from '@stencil/core';

@Component({
  tag: 'og-layout-child',
  styleUrl: 'og-layout-child.scss',
  shadow: true
})
export class OgLayoutChild {
  /**
   * The weight defines the resize behavior. A component with weight 2 will be twice as large as a component with weight 1. Default: "1"
   */
  @Prop()
  public weight: number = 1;

  /**
   * The minimum size of the layout child. Can be pixel (e.g. 150px) or percent (e.g. 30%).
   */
  @Prop()
  public minSize: string = 'initial';

  /**
   * The maximum size of the layout child. Can be pixel (e.g. 250px) or percent (e.g. 50%).
   */
  @Prop()
  public maxSize: string = 'initial';

  @Element()
  private element: HTMLElement;

  public componentDidLoad() {
    this.applyValues();
  }

  public applyValues() {
    const grow = this.weight.toString();
    const shrink = this.minSize !== 'initial' ? '0' : '1';
    const parentElement = this.element.parentElement;
    const parentOrientationIsVertical = parentElement && parentElement.nodeName.toLowerCase() === 'og-layout-container' && parentElement.getAttribute('orientation') === 'vertical';

    this.element.style.setProperty('--og-layout-child--grow', grow);
    this.element.style.setProperty('--og-layout-child--shrink', shrink);

    if (parentOrientationIsVertical) {
      // height
      this.element.style.setProperty('--og-layout-child--min-width', 'initial');
      this.element.style.setProperty('--og-layout-child--max-width', 'initial');
      this.element.style.setProperty('--og-layout-child--min-height', this.minSize);
      this.element.style.setProperty('--og-layout-child--max-height', this.maxSize);
    } else {
      // width
      this.element.style.setProperty('--og-layout-child--min-width', this.minSize);
      this.element.style.setProperty('--og-layout-child--max-width', this.maxSize);
      this.element.style.setProperty('--og-layout-child--min-height', 'initial');
      this.element.style.setProperty('--og-layout-child--max-height', 'initial');
    }
  }

  public render(): HTMLElement {
    return (
      <slot></slot>
    );
  }
}
