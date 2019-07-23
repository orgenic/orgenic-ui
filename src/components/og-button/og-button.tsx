/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { h,  Component, Prop, EventEmitter, Event } from '@stencil/core';

@Component({
  tag: 'og-button',
  styleUrl: 'og-button.scss',
  shadow: true
})
export class OgButton {
  /**
   * The label of the button
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
  public clicked: EventEmitter;

  public handleClick(e: MouseEvent) {
    if (!this.disabled) {
      this.clicked.emit(e);
    }
    e.cancelBubble = true;
  }

  public render(): HTMLElement {
    return <button
      class="og-button"
      onClick={ e => this.handleClick(e) }
      disabled={ this.disabled }
    >
      {this.label}
    </button>;
  }
}
