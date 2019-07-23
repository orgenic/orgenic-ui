/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { h, Component, Prop } from '@stencil/core';

@Component({
  tag: 'og-card',
  styleUrl: 'og-card.scss',
  shadow: true
})
export class OgCard {
  /**
   * The title for this card (optional)
   */
  @Prop()
  public name: string;

  public handleDivRef(el: HTMLElement) {
    if (!el) {
      return;
    }

    const slot = el.firstChild as HTMLSlotElement;
    if (!slot) {
      return;
    }

    el.style.display = slot.assignedNodes().length > 0 ? 'block' : 'none';

    slot.addEventListener('slotchange', () => {
      el.style.display = slot.assignedNodes().length > 0 ? 'block' : 'none';
    })
  }

  public render(): HTMLElement {
    return (
      <div class="og-card">
        { this.name
          ?   <div class="og-card__header">
            <span class="og-card__title">{ this.name }</span>
          </div>
          :   ""
        }
        <div class="og-card__content">
          {/* allow the user to use an unnamed slot instead of always having to assign as "content" */}
          <slot></slot>
          <slot name="content"></slot>
        </div>
        <div class="og-card__footer" ref={ el => this.handleDivRef(el) }>
          <slot name="footer"></slot>
        </div>
      </div>
    );
  }
}

