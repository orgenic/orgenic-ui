import { Component, Prop, Event, EventEmitter } from '@stencil/core';

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

    @Prop({ mutable: true, reflectToAttr: true }) visible: boolean = false;

    @Prop() svgIcon: string;

    @Prop() confirmText: string = 'OK';
    @Prop() cancelText: string = 'Cancel';

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
            <og-dialog class="og-dialog--warning" name={ this.name } svg-icon={ this.svgIcon } visible={ this.visible }>
                <div slot="content">
                    <slot></slot>
                </div>
                <div slot="footer">
                    <og-button label={ this.cancelText } onClicked={ _e => this.handleCancel() }></og-button>{' '}
                    <og-button label={ this.confirmText } onClicked={ _e => this.handleConfirm() }></og-button>
                </div>
            </og-dialog>
        );
    }
}
