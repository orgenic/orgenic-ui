/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

// Stencil core
import { Component, Element, Prop, Host, h } from '@stencil/core';

// 3rd party libraries
import * as Popper from '@popperjs/core';

// ORGENIC-UI helper classes
// import getTransitionDurationFromElement from '../../utils/get-transition-duration-from-element';
// import ogCustomEvent from '../../utils/custom-event';
// import uuidv4 from '../../utils/uuidv4';


/**
 * This interface describes the configuration of the tooltip.
 *
 * @export
 * @interface OgTooltipOptions
 */
export interface OgTooltipOptions {
}

@Component({
  tag: 'og-tooltip',
  styleUrl: 'og-tooltip.scss',
  shadow: false
})

export class OgTooltip {
  @Element()
  public hostElement: HTMLElement;

  @Prop()
  public for: string;

  @Prop()
  public flyout?: string;

  @Prop()
  public flyoutEvent?: string = "click";

  @Prop()
  public noArrow?: boolean;

  @Prop()
  public boundary?: string;

  @Prop()
  public placement?: string = 'top';

  @Prop()
  public fallbackPlacements?: string = "top bottom right left";

  @Prop()
  public offsetSkidding?: number = 0;

  @Prop()
  public offsetDistance?: number = 8;

  private popperInstance: Popper.Instance = null;
  private refElement: HTMLElement = null;

  public componentDidLoad = (): void => {
    // get reference element
    this.refElement = window.document.getElementById(this.for);

    if (this.refElement) {
      if (this.isFlyout()) {
        // setup event listener for flyout
        this.refElement.addEventListener(this.flyoutEvent, this.showTooltip);
        this.hostElement.querySelector(".tooltip__close").addEventListener("click", this.hideTooltip);
      } else {
        // setup event listener for tooltip
        let showEvents = ['mouseenter', 'focus'];
        let hideEvents = ['mouseleave', 'blur'];
        
        this.addShowEvents(showEvents);
        this.addHideEvents(hideEvents);
      }
    } 
  }

  public componentDidUnload = (): void => {
    this.destroyTooltip();
  }

  public render(): HTMLElement {
    return (
      <Host>
        <div class="tooltip">
          {
            this.isFlyout()
              ? <div class="tooltip__header">
                  <span>{ this.flyout }</span>
                  <svg class="tooltip__close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="m14 0l-6 6-6-6-2 2 6 6-6 6 2 2 6-6 6 6 2-2-6-6 6-6"/></svg>
                </div>
              : ''
          }
          <div class="tooltip__content">
            <slot />
          </div>
        </div>
        {
          !this.noArrow
            ? <div id="arrow" data-popper-arrow></div>
            : ''
        }
      </Host>
    );
  }

  private createTooltip = (): void => {
    let customBoundary = null;

    if (this.boundary.trim().length) {
      customBoundary = document.querySelector(this.boundary) || null;
    }      

    let tooltipOptions: Partial<Popper.Options> = {
      modifiers: [{
        name: 'offset',
        options: {
          offset: [this.offsetSkidding, this.offsetDistance]
        }
      }, {
        name: 'flip',
        options: {
          boundary: customBoundary || "clippingParent",
          fallbackPlacements: this.fallbackPlacements.split(" ")
        }
      }, {
        name: 'preventOverflow',
        options: {
          rootBoundary: "viewport",
          boundary: customBoundary || "clippingParent"
        }
      }],
      placement: this.placement as Popper.Placement
    };

    this.popperInstance = Popper.createPopper(this.refElement, this.hostElement, tooltipOptions);
  }

  private destroyTooltip = (): void => {
    if (this.popperInstance) {
      this.popperInstance.destroy();
      this.popperInstance = null;
    }
  }

  private showTooltip = (): void => {
    if (this.isFlyout()) {
      this.refElement.removeEventListener(this.flyoutEvent, this.showTooltip);
    }
    
    this.hostElement.setAttribute('data-show', '');

    if (!this.popperInstance) {
      this.createTooltip();
    }
  }
  
  private hideTooltip = (): void => {
    this.hostElement.removeAttribute('data-show');
    this.destroyTooltip();
    
    if(this.isFlyout()) {
      this.refElement.addEventListener(this.flyoutEvent, this.showTooltip);
    }    
  }

  private addShowEvents = (events: string[]): void => {
    events.forEach(event => {
      this.refElement.addEventListener(event, this.showTooltip);
    });
  }

  private addHideEvents = (events: string[]): void => {
    events.forEach(event => {
      this.refElement.addEventListener(event, this.hideTooltip);
    });
  }

  private isFlyout = (): boolean => {
    return this.hostElement.hasAttribute("flyout");
  }
}
