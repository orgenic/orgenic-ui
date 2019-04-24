import { Component, Prop, Listen } from '@stencil/core';
import { ScrollHandler } from './utils/scroll-handler';

@Component({
  tag: 'og-dialog',
  styleUrl: 'og-dialog.scss',
  shadow: true
})
export class OgDialog {
    /**
     * The title for this modal dialog.
     */
    @Prop() name: string;

    /**
     * SVG markup that can be styled by orgenic themes.
     */
    @Prop() svgContent: string;

    /**
     * Visibility state of this dialog.
     */
    @Prop({ mutable: true, reflectToAttr: true }) visible: boolean = false;

    @Listen('window:wheel', { passive: false }) // standard
    handleWheel(ev: Event) {
        this.visible && ScrollHandler.cancelScrolling(ev);
    }

    @Listen('window:mousewheel', { passive: false }) // non-standard + deprecated
    handleMouseWheel(ev: Event) {
        this.visible && ScrollHandler.cancelScrolling(ev);
    }

    @Listen('window:touchmove', { passive: false }) // touch events
    handleTouchMove(ev: Event) {
        this.visible && ScrollHandler.cancelScrolling(ev);
    }

    @Listen('window:keydown', { passive: false }) // keyboard scrolling (arrows, page up / down, pos1 / end)
    handleKeyDown(ev: Event) {
        this.visible && ScrollHandler.cancelScrollingKeyFilter(ev);
    }

    closeDialog(): void {
        this.visible = false;
    }

    render() {
        return (
            <div class={ this.visible ? '' : ' og-dialog__hidden' }>
                <div class="og-dialog__background">
                </div>
                <div class="og-dialog">
                    <div class="og-dialog__header">
                        <span class="og-dialog__title">{ this.name }</span>
                    </div>
                    <div class="og-dialog__content">
                        <div class="og-dialog__svg-container" innerHTML={this.svgContent}></div>
                        <slot name="content"></slot>
                    </div>
                    <div class="og-dialog__footer">
                        <slot name="footer"></slot>
                    </div>
                </div>
            </div>
        );
    }
}
