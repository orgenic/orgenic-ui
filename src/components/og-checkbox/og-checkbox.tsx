/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { h, Component, Prop, EventEmitter, Event, Host } from '@stencil/core';

@Component({
  tag: 'og-checkbox',
  styleUrl: 'og-checkbox.scss',
  shadow: true
})
export class OgCheckbox {
  /**
   * The value of the checkbox
   */
  @Prop({ mutable: true, reflectToAttr: true })
  public checked: boolean;

  /**
   * The label of the checkbox
   */
  @Prop()
  public label: string;

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
      this.checked = e.target.checked;
      this.changed.emit(e.target.checked);
    }
  }

  public render(): HTMLElement {
    return (
      <Host class={{
        'og-checkbox--checked' : this.checked,
        'og-checkbox--disabled' : this.disabled
      }}>
        <input
          class="og-checkbox__input"
          type="checkbox"
          id={ this.internalId }
          checked={ this.checked }
          disabled={ this.disabled }
          onChange={(event) => this.handleChange(event)}
        />
        <label
          class="og-checkbox__label"
          htmlFor={ this.internalId }
        >
          { this.label && <span class="og-checkbox__label__content">{ this.label }</span> }
        </label>
      </Host>
    )
  }
}
