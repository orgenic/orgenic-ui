import { h, Component, Prop, Event, EventEmitter, Host } from '@stencil/core';

@Component({
  tag: 'og-number-input',
  styleUrl: 'og-number-input.scss',
  shadow: true
})
export class OgNumberInput {
  /**
   * Optional placeholder text if input is empty.
   */
  @Prop()
  public placeholder?: string;

  /**
   * The initial value. Can be updated at runtime.
   */
  @Prop({ reflect: true, mutable: true })
  public value: number;

  /**
   * Increment or decrement steps for the value.
   */
  @Prop()
  public step: number;

  /**
   * Minimum value for this component.
   */
  @Prop()
  public min: number;

  /**
   * Maximum value for this component.
   */
  @Prop()
  public max: number;

  /**
   * Determines, whether the control is disabled or not.
   */
  @Prop()
  public disabled?: boolean;

  /**
   * Optional autofocus input element.
   */
  @Prop()
  public autofocus?: boolean;

  /**
   * Event is being emitted when value changes.
   */
  @Event()
  public valueChanged: EventEmitter<number>;

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

  private focus: boolean = false;
  private inputElement: HTMLInputElement;

  componentWillLoad() {
    if (this.autofocus) {
      this.focus = true;
    } 
  }
  
  componentDidLoad() {
    if (this.autofocus && this.focus) {
      setTimeout(() => {
        this.inputElement.focus();
        this.focus = false;
      });
    } 
  }

  public handleChange(e) {
    const value = parseFloat(e.target.value);

    if (!isNaN(value)) {
      this.value = value;
    } else {
      this.value = null;
    }

    this.valueChanged.emit(this.value);
  }

  public render(): HTMLElement {
    return (
      <Host class={{ 'og-form-item__editor': true }}>
        <input ref={ el => this.inputElement = el as HTMLInputElement }
          type="number"
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
        />
        <div class="og-input__indicator"></div>
      </Host>
    );
  }
}
