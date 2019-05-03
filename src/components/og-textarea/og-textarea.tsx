/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { Component, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
    tag: 'og-textarea',
    styleUrl: 'og-textarea.scss',
    shadow: true
})
export class OgTextarea {
    /**
     * Determines, whether the control is disabled or not.
     */
    @Prop() disabled: boolean;

    /**
     * The initial value. Can be updated at runtime.
     */
    @Prop({ mutable: true, reflectToAttr: true }) value: string;

    /**
     * Event is being emitted when value changes.
     */
    @Event() valueChanged: EventEmitter<string>;

    /**
     * Event is being emitted when input gets focus.
     */
    @Event() focusGained: EventEmitter<FocusEvent>;

    /**
     * Event is being emitted when focus gets lost.
     */
    @Event() focusLost: EventEmitter<FocusEvent>;

    handleChange(e) {
        this.value = e.target.value;
        this.valueChanged.emit(this.value);
    }

    hostData() {
        return {
            class: {
                'og-form-item__editor': true
            }
        };
    }

    render() {
        return [
            <textarea
                class="og-textarea__textarea"
                value={ this.value }
                disabled={ this.disabled }
                onInput={ (event) => this.handleChange(event) }
                onFocus={ (event) => this.focusGained.emit(event) }
                onBlur={ (event) => this.focusLost.emit(event) }
            ></textarea>,
            <div class="og-textarea__indicator"></div>
        ];
    }
}
