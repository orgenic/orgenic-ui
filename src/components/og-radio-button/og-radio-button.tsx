/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file for more information
 **/

import { Component, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'og-radio-button',
  styleUrl: 'og-radio-button.scss',
  // shadow dom off since we can't create button groups if each radio button is in it's own shadow dom
  shadow: false
})
export class OgRadioButton {
    /**
     * The name of the radio button. All radio buttons with the same name belong to one group.
     */
    @Prop({ reflectToAttr: true }) name: string;

    /**
     * The label of the radio button
     */
    @Prop() label: string;

    /**
     * The value of the radio button that is set to the parent group if radio button is selected
     */
    @Prop() value: string;

    /**
     * Determines, whether the radio button is checked or not
     */
    @Prop({ reflectToAttr: true }) checked: boolean;

    /**
     * Determines, whether the control is disabled or not
     */
    @Prop({ reflectToAttr: true }) disabled: boolean;

    /**
     * Determines, whether the control is disabled from the parent group
     */
    @Prop() groupDisabled: boolean;

    @Event() changed: EventEmitter<MouseEvent>;

    private internalId = Math.random().toString(18).substring(2, 8) + Math.random().toString(18).substring(2, 8);

    eventInputChanged(event) {
        this.changed.emit(event.target.value);
    }

    hostData() {
        return {
            class : {
                'og-radio-button--checked' : this.checked,
                'og-radio-button--disabled' : this.disabled || this.groupDisabled,
            }
        }
    }

    render() {
        return [
            <input
                type="radio"
                id={ this.internalId }
                name={ this.name }
                checked={ this.checked }
                disabled={ this.disabled || this.groupDisabled }
                class="og-radio-button__input"
                onChange={ (e) => this.eventInputChanged(e) }/>,
            <label
                class="og-radio-button__label"
                htmlFor={ this.internalId }>
                { this.label && <span class="og-radio-button__label__content">{ this.label }</span> }
            </label>
        ];
    }
}
