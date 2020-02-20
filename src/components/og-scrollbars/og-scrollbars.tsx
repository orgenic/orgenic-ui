/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { h,  Component, Host, Element } from '@stencil/core';
import OverlayScrollbars from '../../../node_modules/overlayscrollbars';

@Component({
  tag: 'og-scrollbars',
  styleUrl: 'og-scrollbars.scss',
  shadow: true
})
export class OgScrollbars {
  /**
   * description...
   *
   * @type {boolean}
   */
  // @Prop({reflect: true})
  // public hidden: boolean = false;

  @Element()
  el: HTMLElement;

  private options = {
    className            : "os-theme-dark",
    resize               : "none",
    sizeAutoCapable      : true,
    clipAlways           : true,
    normalizeRTL         : true,
    paddingAbsolute      : true,
    autoUpdate           : null,
    autoUpdateInterval   : 33, 
    nativeScrollbarsOverlaid : {
      showNativeScrollbars   : false,
      initialize             : true 
    },
    overflowBehavior : {
      x : "scroll",
      y : "scroll"
    },
    scrollbars : {
      visibility       : "auto",
      autoHide         : "never",
      autoHideDelay    : 800,
      dragScrolling    : true,
      clickScrolling   : true,
      touchSupport     : true,
      snapHandle       : false
    },
    textarea : {
      dynWidth       : true,
      dynHeight      : true,
      inheritedAttrs : ["style", "class"]
    },
    callbacks : {
      onInitialized               : null,
      onInitializationWithdrawn   : null,
      onDestroyed                 : null,
      onScrollStart               : null,
      onScroll                    : null,
      onScrollStop                : null,
      onOverflowChanged           : null,
      onOverflowAmountChanged     : null,
      onDirectionChanged          : null,
      onContentSizeChanged        : null,
      onHostSizeChanged           : null,
      onUpdated                   : null
    }
  };

  componentDidLoad() {
    console.log("og-scrollbars did load", this.el);    
    OverlayScrollbars(this.el, this.options);
  }

  public render(): HTMLElement {
    return <Host>
      {/* <div class="og-scrollbars__content">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae, doloribus corporis expedita similique mollitia incidunt enim quas animi non et consequatur! Aspernatur consequatur omnis impedit, dolor quasi quis officiis quam?
      </div> */}
      <slot></slot>
    </Host>;
  }
}
