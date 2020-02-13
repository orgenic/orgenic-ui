

import { h, Component, Prop, EventEmitter, Event } from '@stencil/core';

@Component({
  tag: 'og-toggle-switch',
  styleUrl: 'og-toggle-switch.scss',
  shadow: true
})
export class OgToggleSwitch {
  /**
   * The value of the toggle-switch
   */
  @Prop({ mutable: true })
  public value: boolean;

  /**
   * Determines, whether the control is disabled or not
   */
  @Prop()
  public disabled: boolean;

  /**
   * Event is being emitted when value changes.
   */
  @Event()
  public changed: EventEmitter<MouseEvent>;

  private internalId = Math.random().toString(18).substring(2, 8) + Math.random().toString(18).substring(2, 8);

  public handleChange(e) {
    if (!this.disabled) {
      this.changed.emit(e.target.checked);
    }
  }

  public render(): HTMLElement[] {
    return [
      <input
        type="checkbox"
        id={ this.internalId }
        class="og-toggle-switch__input"
        checked={ this.value }
        disabled={ this.disabled }
        onChange={(event) => this.handleChange(event)} />,
      <label
        class="og-toggle-switch__toggle"
        htmlFor={ this.internalId }
        tabindex="0"></label>
    ]
  }
}
