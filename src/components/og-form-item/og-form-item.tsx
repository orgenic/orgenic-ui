

import { h, Component, Prop, Watch, Element, State, Host } from '@stencil/core';
import { getElement } from '../../utils/dom-utils';

@Component({
  tag: 'og-form-item',
  styleUrl: 'og-form-item.scss',
  shadow: true
})
export class OgFormItem {
  @Element()
  public el: HTMLElement;

  /**
   * The label for the form item
   */
  @Prop()
  public label: string;

  @Prop()
  public disabled: boolean;

  @State()
  public editorHasFocus: boolean = false;

  @State()
  public editorIsEmpty: boolean = false;

  public editor: Element;

  @Watch('disabled')
  public disabledChanged(newValue) {
    this.editor.setAttribute('disabled', newValue);
  }

  public async componentDidLoad() {
    this.editor = await getElement(this.el, '.og-form-item__editor', 1000);

    if (!this.editor) {
      return console.error('OgFormItem is unable to resolve editor');
    }

    this.editor.addEventListener('focusGained', () => {
      this.editorHasFocus = true;
    });

    this.editor.addEventListener('focusLost', () => {
      this.editorHasFocus = false;
    });

    // TODO: for 1.0.0 unify value change event names
    let valueChangeEvent = 'valueChanged';
    switch (this.editor.tagName.toLowerCase()) {
      case 'og-combobox':
        valueChangeEvent = 'itemSelected';
        break;
      case 'og-datepicker':
        valueChangeEvent = 'dateSelected';
        break;
      default:
    }
    this.editor.addEventListener(valueChangeEvent, (event: CustomEvent) => {
      this.checkEditorEmpty(event.detail);
    });

    this.checkEditorEmpty(this.editor['value']);

    // update disabled state of child editor
    if (this.disabled) {
      this.editor.setAttribute('disabled', 'true');
    } else {
      this.editor.removeAttribute('disabled');
    }
  }

  public checkEditorEmpty(value) {
    this.editorIsEmpty = (typeof value === 'object' && value === null) || value === undefined || value.length === 0;
  }

  public render(): HTMLElement {
    return <Host class={{
      'og-form-item--focused': this.editorHasFocus,
      'og-form-item--empty': this.editorIsEmpty
    }}>
      <label class="og-form-item" htmlFor="input#1">
        <div class="og-form-item__body">
          <div class="og-form-item__label">{ this.label }</div>
          <slot></slot>
        </div>
      </label>
    </Host>;
  }
}
