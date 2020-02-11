import { h, Component, Prop, Event, EventEmitter } from '@stencil/core';
import { SVGContent } from '../utils/svg-content';

@Component({
  tag: 'og-confirm-dialog',
  styleUrl: 'og-confirm-dialog.scss',
  shadow: true
})
export class OgConfirmDialog {
  /**
   * The title for this modal dialog
   */
  @Prop()
  public name: string;

  /**
   * Visibility state of this dialog.
   */
  @Prop({ mutable: true, reflect: true })
  public visible: boolean = false;

  /**
   * Optional SVG Icon as markup.
   */
  @Prop()
  public svgIcon: string = SVGContent['question'];

  /**
   * Label for confirmation button.
   */
  @Prop()
  public confirmLabel: string = 'OK';

  /**
   * Label for cancel button.
   */
  @Prop()
  public cancelLabel: string = 'Cancel';

  /**
   * Event is being emitted when value changes.
   */
  @Event()
  public confirmed: EventEmitter;

  /**
   * Event is being emitted when value changes.
   */
  @Event()
  public cancelled: EventEmitter;

  public handleConfirm() {
    this.confirmed.emit();
    this.visible = false
  }

  public handleCancel() {
    this.cancelled.emit();
    this.visible = false
  }

  public render(): HTMLElement {
    return (
      <og-dialog class="og-dialog--info" name={ this.name } svg-icon={ this.svgIcon } visible={ this.visible }>
        <slot></slot>
        <div slot="footer">
          <og-button label={ this.cancelLabel } onClicked={ () => this.handleCancel() }></og-button>{' '}
          <og-button data-context="workflow" label={ this.confirmLabel } onClicked={ () => this.handleConfirm() }></og-button>
        </div>
      </og-dialog>
    );
  }
}
