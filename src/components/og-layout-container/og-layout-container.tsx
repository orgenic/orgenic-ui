/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { Component, Element, Prop } from '@stencil/core';

@Component({
  tag: 'og-layout-container',
  styleUrl: 'og-layout-container.scss',
  shadow: true
})
export class OgLayoutContainer {
    /*
    * Direction of the layout container. Default: "row"
    */
    @Prop() direction: string = 'row';

    /*
    * Alignment of the main axis. Default: "space-between"
    */
    @Prop() justify: string = 'flex-start';

    /*
    * Alignment of the cross axis. Default: "stretch"
    */
    @Prop() align: string = 'stretch';

    /*
    * Determines, whether the layout items wrap or not. Default: "nowrap"
    */
    @Prop() wrap: string = 'nowrap';

    /*
    * Overflow behaviour of the layout container. Default: "visible"
    */
    @Prop() overflow: string = 'visible';

    @Element() private element: HTMLElement;

    componentDidLoad() {
        this.applyValues();
    }

    applyValues() {
        this.element.style.setProperty('--og-layout-container--direction', this.direction);
        this.element.style.setProperty('--og-layout-container--justify', this.justify);
        this.element.style.setProperty('--og-layout-container--align', this.align);
        this.element.style.setProperty('--og-layout-container--wrap', this.wrap);
        this.element.style.setProperty('--og-layout-container--overflow', this.overflow);
    }

    render() {
        return (
            <slot></slot>
        );
    }
}
