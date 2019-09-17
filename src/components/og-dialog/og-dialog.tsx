/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { h, Component, Prop, Listen } from '@stencil/core';
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
  @Prop()
  public name: string;

  /**
   * SVG markup that can be styled by orgenic themes.
   */
  @Prop()
  public svgIcon: string;

  /**
   * Visibility state of this dialog.
   */
  @Prop({ mutable: true, reflectToAttr: true })
  public visible: boolean = false;

  @Listen('wheel', { passive: false, target: 'window' }) // standard
  public handleWheel(ev) {
    this.visible && ScrollHandler.cancelScrolling(ev);
  }

  @Listen('mousewheel', { passive: false, target: 'window' }) // non-standard + deprecated
  public handleMouseWheel(ev) {
    this.visible && ScrollHandler.cancelScrolling(ev);
  }

  @Listen('touchmove', { passive: false, target: 'window' }) // touch events
  public handleTouchMove(ev) {
    this.visible && ScrollHandler.cancelScrolling(ev);
  }

  @Listen('keydown', { passive: false, target: 'window' }) // keyboard scrolling (arrows, page up / down, pos1 / end)
  public handleKeyDown(ev: KeyboardEvent) {
    this.visible && ev.target === document.body && ScrollHandler.cancelScrollingKeyFilter(ev);
  }

  public closeDialog() {
    this.visible = false;
  }

  public render(): HTMLElement {
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
