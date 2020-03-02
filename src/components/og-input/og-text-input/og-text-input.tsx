import { h, Component, Prop, Event, EventEmitter, Host, Watch } from '@stencil/core';

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
   * Determines, whether the control automatically grows downwards
   * if the inserted text gets to big.
   */
  @Prop()
  public multiLine: boolean = false;

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
  private inputElement: HTMLTextAreaElement;
  private inputSizer: HTMLElement;
  private inputIndicator: HTMLElement;

  public componentWillLoad() {
    if (this.autofocus) {
      this.focus = true;
    }
  }

  public componentDidLoad() {
    if (this.multiLine) {
      this.inputSizer.textContent = this.value || this.placeholder;
    }

    if (this.autofocus && this.focus) {
      setTimeout(() => {
        this.inputElement.focus();
        this.focus = false;
      });
    }
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  }

  private handleFocus(e: FocusEvent) {
    this.focusGained.emit(e);
    this.inputIndicator.classList.add('focus');
  }

  private handleBlur(e: FocusEvent) {
    this.focusLost.emit(e);
    this.inputIndicator.classList.remove('focus');
  }

  private handleInput(e) {
    this.handleChange(e.target.value);
  }

  @Watch('value')
  public handleChange(value: string) {
    this.value = value;
    this.valueChanged.emit(this.value);

    if (this.multiLine) {
      this.inputSizer.textContent = this.value || this.placeholder;
    }
  }

  public render(): HTMLElement {
    return (
      <Host class={{ 'og-form-item__editor': true }}>
        <div class="og-input__wrapper">
          <textarea
            ref={ el => this.inputElement = el as HTMLTextAreaElement }
            class="og-input__input"
            value={ this.value }
            disabled={ this.disabled }
            onInput={(event) => this.handleInput(event)}
            onFocus={ (event) => this.handleFocus(event) }
            onBlur={ (event) => this.handleBlur(event) }
            onKeyDown={ (event) => this.handleKeyDown(event) }
            placeholder={ this.placeholder }
          ></textarea>
          <div
            class="og-input__sizer"
            ref={(el) => this.inputSizer = el}
          ></div>
        </div>
        <div
          class="og-input__indicator"
          ref={(el) => this.inputIndicator = el}
        ></div>
      </Host>
    );
  }
}
