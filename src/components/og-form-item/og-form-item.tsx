import { h, Component, Prop, Watch, Element, State, Host } from '@stencil/core';
import { getElement } from '../../utils/dom-utils';
import { OgInputValidator } from '.';

@Component({
  tag: 'og-form-item',
  styleUrl: 'og-form-item.scss',
  shadow: true
})
export class OgFormItem {
  @Element()
  public el: HTMLElement;

  /**
   * Optional label for the form item
   */
  @Prop({ mutable: true, reflect: true })
  public label?: string;

  /**
   * An info text to display underneath the component
   *
   * Must not be longer than a single line!
   * Will be replaced by an error message if given input is invalid.
   * Note, that this will put a margin under the component.
   *
   * TODO:
   * - implement
   */
  @Prop()
  public infoText?: string;

  /**
   * An error message to display underneath the component
   *
   * This will replace the info text, as long as the input is not valid.
   * Should not be longer than two lines.
   * Note, that this will put a margin under the component, even if the message is hidden.
   *
   * TODO:
   * - implement
   */
  @Prop()
  public errorMessage?: string;

  /**
   * Determines weather the component is disabled, or not
   *
   * This option will be transferred to the slotted element
   */
  @Prop({ reflect: true })
  public disabled?: boolean;

  /**
   * The maximum Amount of chars that can be inserted
   *
   * This will add a character counter underneath the component.
   *
   * TODO:
   * - implement
   * - character counter
   * - do "min" as well?
   */
  @Prop()
  public max?: string;

  /**
   * A regular expression used for field validation
   *
   * TODO:
   * - aufbau
   * - funktion
   * - hinweis auf validation fkt
   */
  @Prop()
  public pattern?: string;

  /**
   * A custom function used for field validation
   *
   * TODO:
   * - aufbau
   * - funktion
   */
  @Prop()
  public validation?: OgInputValidator;

  /**
   * TODO:
   * - fill
   */
  @State()
  public isValid: boolean = true;

  /**
   * TODO:
   * - fill
   */
  @State()
  public editorHasFocus: boolean = false;

  /**
   * TODO:
   * - fill
   */
  @State()
  public editorIsEmpty: boolean = false;

  public editor: Element;
  private regEx: RegExp;

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

    if (this.pattern !== undefined && this.pattern !== null) {
      this.regEx = RegExp(this.pattern);
    }

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
      this.isValid = this.validate(event.detail);
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
    this.editorIsEmpty =value === null || value === undefined || value.length === 0;
  }

  public validate(value: string): boolean {
    if (this.validation !== undefined && this.validation !== null && typeof this.validation.method === 'function') {
      // TODO: set error and tip messages if present
      return this.validation.method(value);
    } else if (this.regEx !== undefined && this.regEx !== null) {
      // TODO: set error and tip messages if present
      return this.regEx.test(value);
    }

    return true;
  }

  public render(): HTMLElement {
    return <Host class={{
      'og-form-item--has-label': (this.label !== null && this.label !== undefined && this.label !== ''),
      'og-form-item--invalid': !this.isValid,
      'og-form-item--focused': this.editorHasFocus,
      'og-form-item--empty': this.editorIsEmpty
    }}>
      <label class="og-form-item" htmlFor="input#1">
        <div class="og-form-item__body">
          {
            this.label &&
            <div class="og-form-item__label">{ this.label }</div>
          }
          <slot></slot>
        </div>
      </label>
    </Host>;
  }
}
