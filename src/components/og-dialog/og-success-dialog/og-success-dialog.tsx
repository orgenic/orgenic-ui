import { Component, Prop } from '@stencil/core';

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

    render() {
        return (
            <og-dialog name={ this.name } visible={ this.visible }>
                <div slot="content">
                    <slot></slot>
                </div>
                <div slot="footer">
                    <og-button label="OK" onClicked={ _e => this.visible = false }></og-button>
                </div>
            </og-dialog>
        );
    }
}
