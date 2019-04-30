/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file for more information
 **/

import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'og-tab',
  styleUrl: 'og-tab.scss',
  shadow: true
})
export class OgTab {
    /**
     * The label of the tab
     */
    @Prop() label: string;

    @Prop({ reflectToAttr: true }) selected: boolean;

    /**
     * Determines, whether the control is disabled or not
     */
    @Prop({ reflectToAttr: true }) disabled: boolean;

    render() {
        return (
            <div class="og-tab" data-selected={ this.selected }>
                <slot></slot>
            </div>
        );
    }
}
