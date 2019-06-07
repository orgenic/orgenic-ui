/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { Component, Element, Prop } from '@stencil/core';

@Component({
  tag: 'og-layout-child',
  styleUrl: 'og-layout-child.scss',
  shadow: true
})
export class OgLayoutChild {
    /*
    * flex-grow behaviour. Default: "1"
    */
    @Prop() grow: string = '1';

    /*
    * flex-shrink behaviour. Default: "1"
    */
    @Prop() shrink: string = '1';

    /*
    * flex-basis behaviour. Default: "0"
    */
    @Prop() basis: string = '0';

    /*
    * Order of the layout children. Default: "0"
    */
    @Prop() order: string = '0';

    /*
    * align-self behaviour. Default: "auto"
    */
    @Prop() align: string = 'auto';

    @Element() private element: HTMLElement;

    componentDidLoad() {
        this.applyValues();
    }

    applyValues() {
        const div = this.element as HTMLElement;
        div.style.setProperty('--og-layout-child--grow', this.grow);
        div.style.setProperty('--og-layout-child--shrink', this.shrink);
        div.style.setProperty('--og-layout-child--basis', this.basis);
        div.style.setProperty('--og-layout-child--order', this.order);
        div.style.setProperty('--og-layout-child--align', this.align);
    }

    render() {
        return (
            <slot></slot>
        );
    }
}
