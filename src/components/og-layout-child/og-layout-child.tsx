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
     * The weight defines the resize behavour. A component with weight 2 will be twice as large as a component with weight 1.. Default: "1"
     */
    @Prop() weight: number = 1;

    /**
     * The minimum size of the layout child. Can be pixel (e.g. 150px) or percent (e.g. 30%).
     */
    @Prop() minSize: string = 'initial';

    /**
     * The maximumg size of the layout child. Can be pixel (e.g. 250px) or percent (e.g. 50%).
     */
    @Prop() maxSize: string = 'initial';

    @Element() private element: HTMLElement;

    componentDidLoad() {
        this.applyValues();
    }

    applyValues() {
        const grow = this.weight.toString();
        const shrink = this.minSize !== 'initial' ? '0' : 'initial';
        const basis: string = '0';
        const order: string = '0';
        const align: string = 'auto';
        this.element.style.setProperty('--og-layout-child--grow', grow);
        this.element.style.setProperty('--og-layout-child--shrink', shrink);
        this.element.style.setProperty('--og-layout-child--basis', basis);
        this.element.style.setProperty('--og-layout-child--order', order);
        this.element.style.setProperty('--og-layout-child--align', align);

        if (this.element.parentElement.getAttribute('orientation') === 'vertical') {
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

    render() {
        return (
            <slot></slot>
        );
    }
}
