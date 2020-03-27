/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/



import { h,  Component, Prop, EventEmitter, Event } from '@stencil/core';

@Component({
  tag: 'og-icon-button',
  styleUrl: 'og-icon-button.scss',
  shadow: true
})
export class OgIconButton {
  /**
   * The icon of the button
   */
  @Prop()
  public icon: string;

  @Prop()
  public iconStyle: "stroke" | "solid";

  @Prop()
  public iconSrc: string;

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
      class="og-icon-button"
      onClick={ e => this.handleClick(e) }
      disabled={ this.disabled }
    >
      <og-icon icon={this.icon} src={this.iconSrc} iconStyle={this.iconStyle} size="0.8em"></og-icon>
      {
        this.label &&
        <span class="label">{ this.label }</span>
      }
    </button>;
  }
}
