/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { h, Component, Element, Prop } from '@stencil/core';

@Component({
  tag: 'og-layout-container',
  styleUrl: 'og-layout-container.scss',
  shadow: true
})
export class OgLayoutContainer {
    /*
    * Direction of the layout container. Default: "row"
    */
    @Prop()
    orientation: 'vertical' | 'horizontal' = 'horizontal';

    /*
    * Direction of the layout container. Default: "row"
    */
    @Prop()
    fill: boolean = true;

    /*
    * Direction of the layout container. Default: "row"
    */
    @Prop()
    autoResponsive: boolean = false;

    @Element() private element: HTMLElement;

    componentDidLoad() {
        this.applyValues();
    }

    applyValues() {
        const direction = this.orientation === 'horizontal' ? 'row' : 'column';
        const justify = 'space-evenly'; // flex-start / center / space-evenly / space-between
        const align = this.fill ? 'stretch' : 'flex-start';
        const wrap = this.autoResponsive ? 'wrap' : 'nowrap';
        const overflow: string = 'visible';
        this.element.style.setProperty('--og-layout-container--direction', direction);
        this.element.style.setProperty('--og-layout-container--justify', justify);
        this.element.style.setProperty('--og-layout-container--align', align);
        this.element.style.setProperty('--og-layout-container--wrap', wrap);
        this.element.style.setProperty('--og-layout-container--overflow', overflow);
    }

    render() {
        return (
            <slot></slot>
        );
    }
}
