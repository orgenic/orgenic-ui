/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { Component, Prop, Watch, Element, State } from '@stencil/core';

@Component({
    tag: 'og-form-item',
    styleUrl: 'og-form-item.scss',
    shadow: true
})
export class OgFormItem {
    @Element() el: HTMLElement;

    /**
     * The label for the form item
     */
    @Prop() label: string;

    @Prop() disabled: boolean;
    @Watch('disabled') disabledChanged(newValue) {
        this.editor.setAttribute('disabled', newValue);
    }

    @State() editorHasFocus: boolean = false;
    @State() editorIsEmpty: boolean = false;
    editor: HTMLElement;

    constructor() {
    }

    hostData() {
        return {
            class: {
                'og-form-item--focused': this.editorHasFocus,
                'og-form-item--empty': this.editorIsEmpty
            }
        };
    }

    componentDidLoad() {
        this.editor = this.el.querySelector('.og-form-item__editor');
        if (!this.editor) {
            return;
        }

        this.editor.addEventListener('focusGained', () => {
            this.editorHasFocus = true;
        });

        this.editor.addEventListener('focusLost', () => {
            this.editorHasFocus = false;
        });

        this.editor.addEventListener('valueChanged', (event: CustomEvent) => {
            this.editorIsEmpty = event.detail.length === 0;
        });

        this.editorIsEmpty = !this.editor['value'] || this.editor['value'].length === 0;

        // update disabled state of child editor
        if (this.disabled) {
            this.editor.setAttribute('disabled', 'true');
        } else {
            this.editor.removeAttribute('disabled');
        }
    }

    render() {
        return <label class="og-form-item" htmlFor="input#1">
            <div class="og-form-item__body">
                <div class="og-form-item__label">{ this.label }</div>
                <slot></slot>
            </div>
        </label>;
    }
}
