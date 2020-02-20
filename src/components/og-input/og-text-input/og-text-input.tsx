import { h, Component, Prop, Event, EventEmitter, Host } from '@stencil/core';

@Component({
  tag: 'og-text-input',
  styleUrl: 'og-text-input.scss',
  shadow: true
})
export class OgTextInput {
  /**
   * Optional placeholder text if input is empty.
   */
  @Prop()
  public placeholder?: string;

  /**
   * The initial value. Can be updated at runtime.
   */
  @Prop({ mutable: true, reflect: true })
  public value: string;

  /**
   * Determines, whether the control is disabled or not.
   */
  @Prop()
  public disabled?: boolean;

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

  /**
   * Optional autofocus input element.
   */
  @Prop()
  public autofocus?: boolean;

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
    this.value = e.target.value;
    this.valueChanged.emit(this.value);
  }

  public render(): HTMLElement {
    console.log(this.autofocus);

    return (
      <Host class={{ 'og-form-item__editor': true }}>
        <input ref={ el => this.inputElement = el as HTMLInputElement }
          type="text"
          class="og-input__input"
          value={ this.value }
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
