/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'og-card',
  styleUrl: 'og-card.scss',
  shadow: true
})
export class OgCard {
    /**
     * The name for this card
     */
    @Prop() name: string;

    handleDivRef(el: HTMLElement) {
        if (!el) {
            return;
        }

        let slot = el.firstChild as HTMLSlotElement;
        el.style.display = slot.assignedNodes().length > 0 ? 'block' : 'none';

        slot.addEventListener('slotchange', () => {
            el.style.display = slot.assignedNodes().length > 0 ? 'block' : 'none';
        })
    }

    render() {
        return (
            <div class="og-card">
                { this.name
                    ?   <div class="og-card__header">
                            <span class="og-card__title">{ this.name }</span>
                        </div>
                    :   ""
                }
                <div class="og-card__content">
                    <slot name="content"></slot>
                </div>
                <div class="og-card__footer" ref={ el => this.handleDivRef(el) }>
                    <slot name="footer"></slot>
                </div>
            </div>
        );
    }
}
