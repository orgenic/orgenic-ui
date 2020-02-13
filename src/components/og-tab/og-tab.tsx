

import { h, Component, Prop } from '@stencil/core';

@Component({
  tag: 'og-tab',
  styleUrl: 'og-tab.scss',
  shadow: true
})
export class OgTab {
  /**
   * The label of the tab
   */
  @Prop()
  public label: string;

  @Prop({ reflect: true })
  public selected: boolean;

  /**
   * Determines, whether the control is disabled or not
   */
  @Prop({ reflect: true })
  public disabled: boolean;

  public render(): HTMLElement {
    return (
      <div class="og-tab" data-selected={ this.selected }>
        <slot></slot>
      </div>
    );
  }
}
