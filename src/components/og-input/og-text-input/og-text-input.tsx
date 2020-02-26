import { h, Component, Prop, Event, EventEmitter, Host, State, Method } from '@stencil/core';
import { ValidatorEntry, Validator, defaultValidator, getValidator } from '../../../validators';

@Component({
  tag: 'og-text-input',
  styleUrl: 'og-text-input.scss',
  shadow: true
})
export class OgTextInput {
  @State()
  public validation: {valid: boolean; message?: string} = {valid: true};

  @State()
  public hasFocus: boolean;
  /**
   * Optional placeholder text if input is empty.
   */
  @Prop()
  public placeholder?: string;

  /**
   * The initial value. Can be updated at runtime.
   */
  @Prop({ mutable: true, reflectToAttr: true })
  public value: string;

  /**
   * Determines, whether the control is disabled or not.
   */
  @Prop()
  public disabled: boolean;


  /**
   *
   */
  @Prop()
  validator: Array<string | ValidatorEntry | Validator<string>>;

  @Prop()
  validateOn: string = 'blur';

  /**
   * Event is being emitted when value changes.
   */
  @Event()
  public valueChanged: EventEmitter<string>;

  /**
   * Event is being emitted when input gets focus..
   */
  @Event()
  public focusGained: EventEmitter<FocusEvent>;

  /**
   * Event is being emitted when focus gets lost.
   */
  @Event()
  public focusLost: EventEmitter<FocusEvent>;

  private _validator: Validator<string> = defaultValidator;

  componentWillLoad() {
    this._validator = getValidator<string>(this.validator);
  }

  private async handleChange(e) {
    console.log('HANDLE CHANGE', e.target.validity);

    this.value = e.target ? e.target.value : null;
    if (this.validator && this.validateOn === e.type) {
      await this.validate();
    }
    this.valueChanged.emit(this.value);
  }

  private async handleOnFocus(e) {
    this.hasFocus = true;
    this.focusGained.emit(e);
  }

  private async handleOnBlur(e) {
    this.hasFocus = false;
    if (this.validator && this.validateOn === e.type) {
      await this.validate();
    }
    this.focusLost.emit(e);
  }

  @Method()
  public async validate() {
    if (!this.validator) {
      throw new Error('[og-text-input] needs a validator to process validation.');
    }
    this.validation = {
      valid: this._validator.validate(this.value),
      message: this._validator.errorMessage,
    }
  }

  public render(): HTMLElement {
    return (
      <Host
        class={{
          'og-form-item__editor': true,
          'og-form-item__editor--error': !this.validation.valid
        }}
      >
        {this.hasFocus && !this.validation.valid && this.validation.message ?
          <span class="validation-error">{this.validation.message}</span>
        : null}
        <input type="email"
          class="og-input__input"
          value={ this.value }
          required
          disabled={ this.disabled }
          onInput={ (event) => this.handleChange(event) }
          onFocus={ (event) => this.handleOnFocus(event) }
          onBlur={ (event) => this.handleOnBlur(event) }
          placeholder={ this.placeholder }
        />
        <div class="og-input__indicator"></div>
      </Host>
    );
  }
}
