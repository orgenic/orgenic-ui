/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { h, Component, Prop, Method } from '@stencil/core';

@Component({
    tag: 'og-menu',
    styleUrl: 'og-menu.scss',
    shadow: true
})
export class OgMenu {
    /**
     * The name of the menu to be addressed by a trigger
     */
    @Prop({ reflectToAttr: true }) name: string;

    /**
     * Determines, whether the menu is visible or not
     */
    @Prop({ mutable: true, reflectToAttr: true }) visible: boolean;

    /**
     * Method to toggle the visibility of the menu
     */
    @Method()
    async toggleVisibility(visible?: boolean) {
        this.visible = (visible !== null && visible !== undefined) ? visible : !this.visible;
    }

    render() {
        return (
            <div class={`og-menu__container${this.visible ? ' og-menu__container--visible' : ''}`}>
                <slot name="content"></slot>
                <div class="og-menu__footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        );
    }
}
