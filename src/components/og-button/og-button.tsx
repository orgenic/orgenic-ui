/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file for more information
 **/

import { Component, Prop, EventEmitter, Event } from '@stencil/core';

@Component({
  tag: 'og-button',
  styleUrl: 'og-button.scss',
  shadow: true
})
export class OgButton {
    /**
     * The label of the button
     */
    @Prop() label: string;

    /**
     * Determines, whether the control is disabled or not
     */
    @Prop() disabled: boolean;

    /**
     * Event is being emitted when value changes.
     */
    @Event() clicked: EventEmitter<Event>;

    handleClick(e: Event) {
        if (!this.disabled) {
            this.clicked.emit(e);
        }
        e.cancelBubble = true;
    }

    render() {
        return <button class="og-button" onClick={ (e) => this.handleClick(e) } disabled={ this.disabled }>{this.label}</button>;
    }
}
