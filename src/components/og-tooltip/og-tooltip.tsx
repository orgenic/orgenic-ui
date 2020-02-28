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
  public flyout?: boolean;

  @Prop()
  public noArrow?: boolean;

  @Prop()
  public boundary?: string;

  @Prop()
  public placement?: string = 'top';

  @Prop()
  public fallbackPlacements?: Array<string> = ['top', 'bottom', 'right', 'left'];

  @Prop()
  public offsetSkidding?: number = 0;

  @Prop()
  public offsetDistance?: number = 8;

  private popperInstance: Popper.Instance = null;
  private refElement: HTMLElement = null;

  // PUBLIC
  public componentWillLoad = (): void => {}

  public componentDidLoad = (): void => {
    let showEvents;
    let hideEvents;

    // get reference element
    this.refElement = window.document.getElementById(this.for);

    if (this.refElement) {
      if (this.flyout) {
        showEvents = ['click'];
        hideEvents = [];
      } else {
        showEvents = ['mouseenter', 'focus'];
        hideEvents = ['mouseleave', 'blur'];
      }

      this.addShowEvents(showEvents);
      this.addHideEvents(hideEvents);
    } else {
      console.log("no reference element found, using VirtualElement", this.for);

      // TODO: is this REALLY necessary?!
      (this.refElement as Popper.VirtualElement) = {
        getBoundingClientRect: () => ({
          width: 0,
          height: 0,
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        })
      };      
    }
  }

  public componentDidUnload = (): void => {
    this.destroyTooltip();
  }

  public render(): HTMLElement {
    return (
      <Host>
        <div class="tooltip__content">
          {
            this.flyout 
              ? ""
              : ""
          }
          <slot />
        </div>
        {
          !this.noArrow
            ? <div id="arrow" data-popper-arrow></div>
            : ""
        }
      </Host>
    );
  }

  // PRIVATE
  private createTooltip = (): void => {
    let customBoundary = null;

    if (this.boundary.trim().length) {
      customBoundary = document.querySelector(this.boundary) || null;
    }      

    console.log(customBoundary);

    let tooltipOptions: Partial<Popper.Options> = {
      modifiers: [{
        name: 'offset',
        options: {
          offset: [this.offsetSkidding, this.offsetDistance]
        }
      }, {
        name: 'flip',
        options: {
          fallbackPlacements: this.fallbackPlacements
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
    this.hostElement.setAttribute('data-show', '');
    this.createTooltip();
  }
  
  private hideTooltip = (): void => {
    this.hostElement.removeAttribute('data-show');
    this.destroyTooltip();
  }

  private addShowEvents = (events: []): void => {
    events.forEach(event => {
      this.refElement.addEventListener(event, this.showTooltip);
    });
  }

  private addHideEvents = (events: []): void => {
    events.forEach(event => {
      this.refElement.addEventListener(event, this.hideTooltip);
    });
  }
}
