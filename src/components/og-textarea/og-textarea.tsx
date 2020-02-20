import { h, Component, Prop, Event, EventEmitter, Host } from '@stencil/core';

@Component({
  tag: 'og-textarea',
  styleUrl: 'og-textarea.scss',
  shadow: true
})
export class OgTextarea {
  /**
   * Determines, whether the control is disabled or not.
   */
  @Prop()
  public disabled?: boolean;

  /**
   * The initial value. Can be updated at runtime.
   */
  @Prop({ mutable: true, reflect: true })
  public value: string;
  
  /**
   * Optional autofocus input element.
   */
  @Prop()
  public autofocus?: boolean;

  /**
   * Event is being emitted when value changes.
   */
  @Event()
  public valueChanged: EventEmitter<string>;

  /**
   * Event is being emitted when input gets focus.
   */
  @Event()
  public focusGained: EventEmitter<FocusEvent>;

  /**
   * Event is being emitted when focus gets lost.
   */
  @Event()
  public focusLost: EventEmitter<FocusEvent>;

  public handleChange(e) {
    this.value = e.target.value;
    this.valueChanged.emit(this.value);
  }

  private focus: boolean = false;
  private inputElement: HTMLTextAreaElement;

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

  public render(): HTMLElement {
    return (
      <Host class={{ 'og-form-item__editor': true }}>
        <textarea ref={ el => this.inputElement = el as HTMLTextAreaElement }
          class="og-textarea__textarea"
          value={ this.value }
          disabled={ this.disabled }
          onInput={ (event) => this.handleChange(event) }
          onFocus={ (event) => this.focusGained.emit(event) }
          onBlur={ (event) => this.focusLost.emit(event) }
        ></textarea>
        <div class="og-textarea__indicator"></div>
      </Host>
    );
  }
}
