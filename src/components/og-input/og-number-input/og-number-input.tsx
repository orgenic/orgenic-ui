import { Component, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
    tag: 'og-number-input',
    styleUrl: 'og-number-input.scss',
    shadow: true
})
export class OgNumberInput {
    /**
     * Optional placeholder text if input is empty.
     */
    @Prop() placeholder?: string;

    /**
     * The initial value. Can be updated at runtime.
     */
    @Prop({ reflectToAttr: true, mutable: true }) value: number;

    /**
     * Increment or decrement steps for the value.
     */
    @Prop() step: number;

    /**
     * Minimum value for this component.
     */
    @Prop() min: number;

    /**
     * Maximum value for this component.
     */
    @Prop() max: number;

    /**
     * Determines, whether the control is disabled or not.
     */
    @Prop() disabled: boolean;

    /**
     * Event is being emitted when value changes.
     */
    @Event() valueChanged: EventEmitter<number>;


    /**
     * Event is being emitted when input gets focus..
     */
    @Event() focusGained: EventEmitter<FocusEvent>;

    /**
     * Event is being emitted when focus gets lost.
     */
    @Event() focusLost: EventEmitter<FocusEvent>;

    handleChange(e) {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            this.value = value;
        }
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
            <input type="number"
                class="og-input__input"
                value={ this.value }
                step={ this.step }
                min={ this.min }
                max={ this.max }
                disabled={ this.disabled }
                onInput={ (event) => this.handleChange(event) }
                onFocus={ (event) => this.focusGained.emit(event) }
                onBlur={ (event) => this.focusLost.emit(event) }
                placeholder={ this.placeholder }
            />,
            <div class="og-input__indicator"></div>
        ];
    }
}
