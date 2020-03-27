/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { h, Component, Prop, Event, EventEmitter, Host, Watch } from '@stencil/core';

@Component({
  tag: 'og-textarea',
  styleUrl: 'og-textarea.scss',
  shadow: true
})
export class OgTextarea {
  /**
   * Determines, whether the control is disabled or not.
   */
  @Prop({ reflect: true })
  public disabled?: boolean;

  /**
   * The initial value. Can be updated at runtime.
   */
  @Prop({ mutable: true, reflect: true })
  public value: string;

  /**
   * Optional placeholder text if textarea is empty.
   */
  @Prop({ reflect: true })
  public placeholder?: string;

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

  private focus: boolean = false;
  private inputElement: HTMLTextAreaElement;

  @Watch('value')
  public handleChange(value: string) {
    this.value = value;
    this.valueChanged.emit(this.value);
  }

  public handleInput(e) {
    this.handleChange(e.target.value);
  }

  public componentWillLoad() {
    if (this.autofocus) {
      this.focus = true;
    }
  }

  public componentDidLoad() {
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
          onInput={ (event) => this.handleInput(event) }
          onFocus={ (event) => this.focusGained.emit(event) }
          onBlur={ (event) => this.focusLost.emit(event) }
          placeholder={ this.placeholder }
        ></textarea>
        <div class="og-textarea__indicator"></div>
      </Host>
    );
  }
}
