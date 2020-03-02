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
   */
  @Prop()
  public infoText?: string;

  /**
   * An error message to display underneath the component
   *
   * This will replace the info text, as long as the input is not valid.
   * Should not be longer than two lines.
   * Note, that this will put a margin under the component, even if the message is hidden.
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
   * Determines weather the component can be empty or not
   */
  @Prop({ reflect: true })
  public required: boolean = false;

  /**
   * A regular expression used for field validation
   *
   * The expression has to be provided without surrounding slashes and without flags.
   * The form item is marked as valid, if the pattern matches the given value of the editor.
   * If a more complex validation is needed, a custom validation function should be provided. (See *validation* for more information)
   *
   * DO:
   * ` [a-z]+ `
   *
   * DON'T:
   * ` /[a-z]+/g `
   */
  @Prop()
  public pattern?: string;

  /**
   * A custom function used for field validation
   *
   * This function gets the editors value as parameter of type `string``
   * and returns `true` if the given value is valid.
   *
   * Will be called every time the input of the editor changes.
   */
  @Prop()
  public validation?: (value: string) => boolean;

  /**
   * Determines the validity of a field
   *
   * Always true, if there are no validators
   */
  @State()
  public isValid: boolean = true;

  /**
   * Determines whether or not the slotted editor has the focus
   */
  @State()
  public editorHasFocus: boolean = false;

  /**
   * Determines if the slotted editor is empty
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
      this.el.remove();
      // throw new Error('OgFormItem is unable to resolve editor');
      console.error('OgFormItem is unable to resolve editor');
      return false;
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
      this.editorIsEmpty = this.checkEditorEmpty();
      this.isValid = this.validate(this.editor['value']);
    });

    this.editorIsEmpty = this.checkEditorEmpty();

    // update disabled state of child editor
    if (this.disabled) {
      this.editor.setAttribute('disabled', 'true');
    } else {
      this.editor.removeAttribute('disabled');
    }
  }

  public checkEditorEmpty(): boolean {
    const value = this.editor['value'];
    return (value === null || value === undefined || value.length === 0);
  }

  public validate(value?: string): boolean {
    if (!value) {
      value = this.editor['value'];
    }

    if (this.required && this.editorIsEmpty) {
      return false;
    }

    if (typeof this.validation === 'function') {
      return this.validation(value);
    } else if (this.regEx !== undefined && this.regEx !== null) {
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
      <label class="og-form-item">
        <div class="og-form-item__body">
          {
            this.label &&
            <div class="og-form-item__label">{ this.label }</div>
          }
          <slot></slot>
        </div>
      </label>
      {
        (this.infoText || this.errorMessage) &&
        <div class={{
          'og-form-item__footer': true,
          'og-form-item__footer--info-and-error': (this.infoText !== null && this.infoText !== undefined && this.infoText !== '') && (this.errorMessage !== null && this.errorMessage !== undefined && this.errorMessage !== '')
        }}>
          {
            this.infoText &&
            <div class="og-form-item__info">{ this.infoText }</div>
          }
          {
            this.errorMessage &&
            <div class="og-form-item__error">{this.errorMessage}</div>
          }
        </div>
      }
    </Host>;
  }
}
