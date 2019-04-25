import { Component, Prop, Event, EventEmitter } from '@stencil/core';
import { SVGContent } from '../utils/svg-content';

@Component({
  tag: 'og-success-dialog',
  styleUrl: 'og-success-dialog.scss',
  shadow: true
})
export class OgSuccessDialog {
    /**
     * The title for this modal dialog
     */
    @Prop() name: string;

    @Prop({ mutable: true, reflectToAttr: true }) visible: boolean = false;

    @Prop() svgContent: string = SVGContent.success;

    /**
     * Event is being emitted when value changes.
     */
    @Event() confirmed: EventEmitter<Event>;

    handleConfirm() {
        this.confirmed.emit();
        this.visible = false
    }

    render() {
        return (
            <og-dialog class="og-dialog--success" name={ this.name } svg-content={ this.svgContent } visible={ this.visible }>
                <div slot="content">
                    <slot></slot>
                </div>
                <div slot="footer">
                    <og-button label="OK" onClicked={ _e => this.handleConfirm() }></og-button>
                </div>
            </og-dialog>
        );
    }
}
