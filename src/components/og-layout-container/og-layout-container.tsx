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
    @Prop() direction: string = 'row';
    @Prop() justify: string = 'space-between';
    @Prop() align: string = 'stretch';
    @Prop() wrap: string = 'nowrap';
    @Prop() overflow: string = 'visible';

    @Element() private element: HTMLElement;

    componentDidLoad() {
        this.applyValues();
    }

    applyValues() {
        const div = this.element as HTMLElement;
        div.style.setProperty('--og-layout-container--direction', this.direction);
        div.style.setProperty('--og-layout-container--justify', this.justify);
        div.style.setProperty('--og-layout-container--align', this.align);
        div.style.setProperty('--og-layout-container--wrap', this.wrap);
        div.style.setProperty('--og-layout-container--overflow', this.overflow);
    }

    render() {
        return (
            <slot></slot>
        );
    }
}
