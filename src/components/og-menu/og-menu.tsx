/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { h, Component, Prop, Method } from '@stencil/core';
import { IOgMenuItem } from '../og-menu-item/og-menu-item';

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

    @Prop() items: IOgMenuItem[];

    /**
     * Method to toggle the visibility of the menu
     */
    @Method()
    async toggleVisibility(visible?: boolean) {
        this.visible = (visible !== null && visible !== undefined) ? visible : !this.visible;
    }

    constructor() {
        this.items = [
            {
                label: 'Foo',
                subItems: [
                    {
                        label: 'Foo Sub 1',
                        subItems: [
                            {
                                label: 'Foo Sub 2'
                            }
                        ]
                    }
                ],
                clicked: () => { console.log('I have been clicked :)'); }
            },
            {
                label: 'Bar'
            }
        ]
    }

    render() {
        return (
            <div class="og-menu-container">
                <div class="og-menus">
                    {this.items &&
                        <ul class="og-menu og-menu--root">
                            {this.items.map((item) =>
                            <li>
                                <og-menu-item
                                    itemId={item.itemId}
                                    label={item.label}
                                    disabled={item.disabled}
                                    clicked={item.clicked}
                                    subItems={item.subItems}></og-menu-item>
                            </li>
                            )}
                        </ul>
                    }
                </div>
                <div class="og-menu-footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        );
    }
}
