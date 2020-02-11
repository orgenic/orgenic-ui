/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { h, Element, Component, Prop } from '@stencil/core';

@Component({
  tag: 'og-card',
  styleUrl: 'og-card.scss',
  shadow: true
})
export class OgCard {

  @Element()
  public hostElement: HTMLElement;

  /**
   * The title for this card (optional)
   */
  @Prop()
  public name: string;

  /**
   * Check if a given name exists as a slot inside this component.
   */
  private hasSlot(name: string): boolean {
    const slot = this.hostElement.querySelector(`[slot="${name}"]`);
    return slot !== null;
  }

  public render(): HTMLElement {
    return (
      <div class="og-card">
        {
          (this.hasSlot('header') || this.name) && <div class="og-card__header">
          {
            this.name
              ? <span class="og-card__title">{ this.name }</span>
              : ""
          }
          <slot name="header"></slot>
          </div>
        }
        <div class="og-card__content">
          {/* allow the user to use an unnamed slot instead of always having to assign as "content" */}
          <slot></slot>
          <slot name="content"></slot>
        </div>

        {
          this.hasSlot('footer') && <div class="og-card__footer">
            <slot name="footer"></slot>
          </div>
        }
      </div>
    );
  }
}
