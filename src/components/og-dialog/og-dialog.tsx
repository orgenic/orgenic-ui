/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { Component, Prop, Listen } from '@stencil/core';
import { ScrollHandler } from '../../utils/scroll-handler';

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
    @Prop() svgIcon: string;

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
    handleKeyDown(ev: KeyboardEvent) {
        this.visible && ScrollHandler.cancelScrollingKeyFilter(ev);
    }

    closeDialog(): void {
        this.visible = false;
    }

    render() {
        return (
            <div class={ 'og-dialog__container ' + (this.visible ? ' og-dialog__container--visible' : '') }>
                <div class="og-dialog__overlay">
                </div>
                <div class="og-dialog__box">
                    <div class="og-dialog__header">
                        {
                            this.svgIcon && <div class="og-dialog__svg-container" innerHTML={this.svgIcon}></div>
                        }
                        <span class="og-dialog__title">{ this.name }</span>
                    </div>
                    <div class="og-dialog__content">
                        {/* allow the user to use an unnamed slot instead of always having to assign as "content" */}
                        <slot></slot>
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
