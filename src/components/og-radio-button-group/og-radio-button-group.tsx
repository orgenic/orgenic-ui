/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file for more information
 **/

import { Component, Prop, Element, State, Watch, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'og-radio-button-group',
  styleUrl: 'og-radio-button-group.scss',
  shadow: true
})
export class OgRadioButtonGroup {
    @Element() el: HTMLElement;

    @State() radioButtons: HTMLOgRadioButtonElement[] = [];

    /**
     * name for the radiobuttons within this group
     */
    @Prop() name: string;
    @Watch('name') nameChanged() { this.updateButtons(); }

    /**
     * The value of the selected radio button.
     */
    @Prop({ reflectToAttr: true, mutable: true }) value: string;
    @Watch('value') handleValueChange() { this.updateButtons(); }

    /**
     * Determines, whether the control is disabled or not
     */
    @Prop() disabled: boolean;
    @Watch('disabled') disabledChanged() { this.updateButtons(); }

    @Event() valueChanged: EventEmitter<string>;

    componentWillLoad() {
        // Grab radio buttons from this component
        this.radioButtons = Array.from(this.el.querySelectorAll('og-radio-button'));
        if (this.radioButtons.length === 0) {
            throw new Error('[og-radio-button-group] Must have at least one og-radio-button child');
        }
        this.updateButtons();
        this.radioButtons.forEach(radioButton => {
            radioButton.addEventListener('changed', e => this.selectedRadioButtonChanged(e));
        });
    }

    selectedRadioButtonChanged(event) {
        this.value = event.target.value;
        this.valueChanged.emit(this.value);
        event.cancelBubble = true;
    }

    updateButtons() {
        this.radioButtons.forEach(button => {
            button.name = this.name;
            button.groupDisabled = this.disabled;
            button.checked = button.value === this.value;
        })
    }

    render() {
        return (
            <slot></slot>
        );
    }
}
