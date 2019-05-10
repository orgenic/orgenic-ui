import { Component, Prop, Event, EventEmitter } from '@stencil/core';
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
    @Prop() name: string;

    /**
     * Visibility state of this dialog.
     */
    @Prop({ mutable: true, reflectToAttr: true }) visible: boolean = false;

    /**
     * Optional SVG Icon as markup.
     */
    @Prop() svgIcon: string = SVGContent['question'];

    /**
     * Label for confirmation button.
     */
    @Prop() confirmLabel: string = 'OK';

    /**
     * Label for cancel button.
     */
    @Prop() cancelLabel: string = 'Cancel';

    /**
     * Event is being emitted when value changes.
     */
    @Event() confirmed: EventEmitter<Event>;

    /**
     * Event is being emitted when value changes.
     */
    @Event() cancelled: EventEmitter<Event>;

    handleConfirm() {
        this.confirmed.emit();
        this.visible = false
    }

    handleCancel() {
        this.cancelled.emit();
        this.visible = false
    }

    render() {
        return (
            <og-dialog class="og-dialog--info" name={ this.name } svg-icon={ this.svgIcon } visible={ this.visible }>
                <slot></slot>
                <div slot="footer">
                    <og-button label={ this.cancelLabel } onClicked={ _e => this.handleCancel() }></og-button>{' '}
                    <og-button data-context="workflow" label={ this.confirmLabel } onClicked={ _e => this.handleConfirm() }></og-button>
                </div>
            </og-dialog>
        );
    }
}
