/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { h, Component, Prop, State } from '@stencil/core';
import { default as UUIDv4 } from 'uuid/v4';

export interface IOgMenuItem {
    itemId?: string;
    label: string;
    subItems?: IOgMenuItem[];
    disabled?: boolean;
    clicked?: Function;
}

@Component({
    tag: 'og-menu-item',
    styleUrl: 'og-menu-item.scss',
    shadow: true
})
export class OgMenuItem {
    /**
     * The unique id of the menu item
     *
     * @type {string}
     * @memberof OgMenuItem
     */
    @Prop() itemId?: string;

    /**
     * The label of the menu item
     *
     * @type {string}
     * @memberof OgMenuItem
     */
    @Prop() label: string;

    /**
     * Subitems of the menu item
     *
     * @type { IOgMenuItem[]}
     * @memberof OgMenuItem
     */
    @Prop() subItems?: IOgMenuItem[];

    /**
     * Determines, whether the menu item is selected or not
     *
     * @type {boolean}
     * @memberof OgMenuItem
     */
    @State() selected: boolean = false;

    /**
     * Determines, whether the menu item is disabled or not
     *
     * @type {boolean}
     * @memberof OgMenuItem
     */
    @Prop() disabled?: boolean;

    /**
     * The method to be called when the menu item is selected
     *
     * @type {Function}
     * @memberof OgMenuItem
     */
    @Prop() clicked?: Function;

    constructor() {
        this.itemId = UUIDv4();
    }

    handleClick = (e: Event): void => {
        if (!this.disabled && this.clicked) {
            this.clicked();
        }
        e.cancelBubble = true;
    }

    menuItemBack = (): void => {
        this.selected = false;
    }

    checkedChanged = (event: any): void => {
        this.selected = event.target.checked;
    }

    render() {
        const renderSubItems = () => {
            if (this.subItems && this.subItems.length) {
                return <ul class="og-menu">
                    <li class="og-menu-item og-menu-item--return" onClick={() => this.menuItemBack()}>&lt; Back to {this.label}</li>
                    {this.subItems.map((subItem) =>
                    <li>
                        <og-menu-item
                            itemId={subItem.itemId}
                            label={subItem.label}
                            disabled={subItem.disabled}
                            clicked={subItem.clicked}
                            subItems={subItem.subItems}></og-menu-item>
                    </li>
                    )}
                </ul>;
            }
        }

        return ([
            (<label class="og-menu-item__label" htmlFor={this.itemId} onClick={(e: Event) => this.handleClick(e)}>{this.label}</label>),
            (<input type="checkbox" id={this.itemId} onChange={(e: Event) => this.checkedChanged(e)} checked={this.selected} disabled={this.disabled} />),
            renderSubItems()
        ]);
    }
}
