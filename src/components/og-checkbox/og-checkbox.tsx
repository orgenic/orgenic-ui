/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { Component, Prop, EventEmitter, Event } from '@stencil/core';

@Component({
  tag: 'og-checkbox',
  styleUrl: 'og-checkbox.scss',
  shadow: true
})
export class OgCheckbox {
    /**
     * The value of the checkbox
     */
    @Prop({ mutable: true, reflectToAttr: true }) checked: boolean;

    /**
     * The label of the checkbox
     */
    @Prop() label: string;

    /**
     * Determines, whether the control is disabled or not
     */
    @Prop() disabled: boolean;

    /**
     * Event is being emitted when value changes.
     */
    @Event() changed: EventEmitter<MouseEvent>;

    private internalId = Math.random().toString(18).substring(2, 8) + Math.random().toString(18).substring(2, 8);

    handleChange(e) {
        if (!this.disabled) {
            this.checked = e.target.checked;
            this.changed.emit(e.target.checked);
        }
    }

    hostData() {
        return {
          class : {
            'og-checkbox--checked' : this.checked,
            'og-checkbox--disabled' : this.disabled,
          }
        }
      }

    render() {
        return [
            <input
                class="og-checkbox__input"
                type="checkbox"
                id={ this.internalId }
                checked={ this.checked }
                disabled={ this.disabled }
                onChange={(event) => this.handleChange(event)}
            />,
            <label
                class="og-checkbox__label"
                htmlFor={ this.internalId }
            >
                { this.label && <span class="og-checkbox__label__content">{ this.label }</span> }
            </label>
        ]
    }
}
