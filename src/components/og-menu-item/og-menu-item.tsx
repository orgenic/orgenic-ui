/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { h, Component, Element, Event, EventEmitter, Prop } from '@stencil/core';

@Component({
    tag: 'og-menu-item',
    styleUrl: 'og-menu-item.scss',
    shadow: true
})
export class OgMenuItem {
    @Element() el: HTMLElement;

    /**
     * The label of the menu item
     */
    @Prop() label: string;

    /**
     * Determines, whether the menu item is disabled or not
     */
    @Prop() disabled: boolean;

    /**
     * Event is being emitted when value changes.
     */
    @Event() clicked: EventEmitter<any>;

    componentDidLoad() {
        setTimeout(() => {
            const slot = this.el.querySelector('slot') as HTMLSlotElement;
            console.log('slot children', slot.assignedElements);
        });
    }

    handleClick(e: Event) {
        if (!this.disabled) {
            this.clicked.emit(e);
        }
        e.cancelBubble = true;
    }

    render() {
        return [
            this.label &&
            <button class="og-menu-item" onClick={(e) => this.handleClick(e)} disabled={this.disabled}>{this.label}</button>,
            <slot></slot>
        ];
    }
}
