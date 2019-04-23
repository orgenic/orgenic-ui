import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'og-dialog',
  styleUrl: 'og-dialog.scss',
  shadow: true
})
export class OgDialog {
    /**
     * The title for this modal dialog
     */
    @Prop() name: string;

    @Prop() imageUrl: string;

    @Prop({ mutable: true, reflectToAttr: true }) visible: boolean = false;

    closeDialog(): void {
        this.visible = false;
    }

    render() {
        return (
            <div class={ 'og-dialog__background' + (this.visible ? '' : ' og-dialog__hidden') }>
                <div class="og-dialog">
                    <div class="og-dialog__header">
                        <span class="og-card__title">{ this.name }</span>
                    </div>
                    <div class="og-card__content">
                        {
                            this.imageUrl && <img src={ this.imageUrl }></img>
                        }
                        <slot name="content"></slot>
                    </div>
                    <div class="og-card__footer">
                        <slot name="footer"></slot>
                    </div>
                </div>
            </div>
        );
    }
}
