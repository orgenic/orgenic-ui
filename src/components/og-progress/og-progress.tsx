/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { h, Component, Prop, Host } from '@stencil/core';

@Component({
  tag: 'og-progress',
  styleUrl: 'og-progress.scss',
  shadow: true
})
export class OgProgress {
  /**
   * The percent value of the progress
   */
  @Prop({ reflectToAttr: true })
  public value: number;

  /**
   * The percent value of the progress buffer (the second bar)
   */
  @Prop({ reflectToAttr: true })
  public buffer: number;

  /**
   *  The height (s, m , l) of the progress bar
   */
  @Prop({ reflectToAttr: true })
  public size: 's' | 'm' | 'l' = 'm';

  /**
   * The max value of the progress
   */
  @Prop({ reflectToAttr: true })
  public max: number = 100;

  /**
   * Determines, whether the control is hidden or not
   */
  @Prop({ reflectToAttr: true })
  public hidden: boolean;

  /**
   * Determines, whether the control is an indeterminate bar or not
   */
  @Prop({ reflectToAttr: true })
  public indeterminate: boolean = !this.value && this.value !== 0;

  /**
   * Determines, whether the stream animation is shown or not
   */
  @Prop({ reflectToAttr: true })
  public stream: boolean = false;

  /**
   * Determines, whether the query animation is shown or not
   */
  @Prop({ reflectToAttr: true })
  public query: boolean = false;

  /**
   * Determines, whether the bounce animation is shown or not
   */
  @Prop({ reflectToAttr: true })
  public bounce: boolean = false;

  public render(): HTMLElement {
    return <Host>
      <div class="og-progress-bar"
        style={{
          '--og-progress-bar-Width': (this.value / this.max) * 100 + '%',
        }}
      >
      </div>
      <div class="og-progress-buffer"
        style={(!this.indeterminate && !this.query && !this.bounce) ? {
          '--og-progress-buffer-Width': (this.buffer / this.max) * 100 + '%'
        } : {}}
      >
      </div>
      <div class="og-progress-stream"
        style={(!this.indeterminate && !this.query && !this.bounce) ? {
          '--og-progress-stream-Width': 100 - ((Math.max(this.buffer, this.value) / this.max) * 100) + '%'
        } : {}}
      >
      </div>
    </Host>;
  }
}
