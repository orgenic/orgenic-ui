/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

// Stencil core
import {
  Component,
  Element,
  h,
  Method,
  Prop,
  State,
  Watch
} from '@stencil/core';

// 3rd party libraries
import _ from 'lodash';
import Popper from 'popper.js';

// ORGENIC-UI helper classes
import addClass from '../../utils/add-class';
import getTransitionDurationFromElement from '../../utils/get-transition-duration-from-element';
import hasClass from '../../utils/has-class';
import ogCustomEvent from '../../utils/custom-event';
import removeClass from '../../utils/remove-class';
import uuidv4 from '../../utils/uuidv4';

/**
 * This interface describes the configuration of tooltip´s delay time for its
 * appearance and disappearance.
 *
 * @export
 * @interface OgTooltipDelay
 */
export interface OgTooltipDelay {
  /**
   * The delay value to show the tooltip (in ms).
   *
   * @type {number}
   * @memberof OgTooltipDelay
   */
  show: number;

  /**
   * The delay value to hide the tooltip (in ms).
   *
   * @type {number}
   * @memberof OgTooltipDelay
   */
  hide: number;
}

/**
 * This interface describes the configuration of the tooltip.
 *
 * @export
 * @interface OgTooltipConfig
 */
export interface OgTooltipConfig {
  /**
   * Whether or not to apply a CSS fade transition to the tooltip.
   *
   * @type {boolean}
   * @memberof OgTooltipConfig
   */
  animation: boolean;

  /**
   * Overflow constraint boundary of the tooltip. Accepts the values of
   * `viewport`, `window` or `scrollParent`. For more information refer to
   * Popper.js's preventOverflow docs
   * https://popper.js.org/docs/v1/#modifiers..preventOverflow
   *
   * @type {Popper.Boundary | Element}
   * @memberof OgTooltipConfig
   */
  boundary: Popper.Boundary | Element;

  /**
   * Appends the tooltip to a specific element. Example: `container: 'body'`.
   * This option is particularly useful in that it allows you to position the
   * tooltip in the flow of the document near the triggering element - which
   * will prevent the tooltip from floating away from the triggering element
   * during a window resize.
   *
   * @type {any}
   * @memberof OgTooltipConfig
   */
  container: any;

  /**
   * Delay showing and hiding the tooltip (ms) - does not apply to `manual`
   * trigger type. If a number is supplied, delay is applied to both `hide` and
   * `show`. Object structure is: `delay: { "show": 500, "hide": 100 }`
   *
   * @type {number | OgTooltipDelay}
   * @memberof OgTooltipConfig
   */
  delay: number | OgTooltipDelay;

  /**
   * Delay removing the tooltip element from the DOM (ms).
   *
   * @type {number}
   * @memberof OgTooltipConfig
   */
  disposeTimeToWait: number;

  /**
   * Allow HTML in the tooltip. If `true`, HTML tags in the tooltip's title will
   * be rendered in the tooltip. If `false`, .innerText method will be used to
   * insert content into the DOM. Use text if you're worried about XSS attacks.
   *
   * @type {boolean}
   * @memberof OgTooltipConfig
   */
  html: boolean;

  /**
   * Offset of the tooltip relative to its target. For more information refer to
   * Popper.js's offset docs https://popper.js.org/docs/v1/#modifiers..offset
   *
   * @type {number}
   * @memberof OgTooltipConfig
   */
  offset: number;

  /**
   * Allow to specify which position Popper will use on fallback. For more
   * information refer to Popper.js's behavior doc
   * https://popper.js.org/docs/v1/#modifiers..flip.behavior
   *
   * @type {'flip' | 'clockwise' | 'counterclockwise' | Popper.Position[]}
   * @memberof OgTooltipConfig
   */
  fallbackPlacement: 'flip' | 'clockwise' | 'counterclockwise' | Popper.Position[];

  /**
   * How to position the tooltip. `auto|top|bottom|left|right(-start/-end)`.
   * When `auto` is specified, it will dynamically position the tooltip. When a
   * function is used to determine the placement, it is called with the tooltip
   * DOM node as its first argument and the triggering element DOM node as its
   * second argument. The this context is set to the tooltip instance.
   *
   * @type {Popper.Placement | Function}
   * @memberof OgTooltipConfig
   */
  placement: Popper.Placement | Function;

  /**
   * Base HTML to use when creating the tooltip. The tooltip's title will be
   * injected into the `.og-tooltip__inner`. `og-tooltip__arrow` will become the
   * tooltip's arrow. The outermost wrapper element should have the
   * `.og-tooltip` class and `role="tooltip"`.
   *
   * @type {string}
   * @memberof OgTooltipConfig
   */
  template: string;

  /**
   * Default title value if `title` attribute isn't present. If a function is
   * given, it will be called with its reference set to the element that the
   * tooltip is attached to.
   *
   * @type {string | Element | Function}
   * @memberof OgTooltipConfig
   */
  title: string | Element | Function;

  /**
   * How the tooltip is triggered (e.g. `hover`, `focus`). Accepts a whitespace
   * separated list of strings.
   *
   * @type {string}
   * @memberof OgTooltipConfig
   */
  trigger: string;
}

@Component({
  tag: 'og-tooltip',
  styleUrl: 'og-tooltip.scss',
  shadow: false
})

export class OgTooltip {
  @Element() public tooltipEl: HTMLElement;

  /**
   * Name of the event that fires immediately when the show instance method is
   * called.
   */
  @Prop({ mutable: true }) public showEventName: string = 'og.tooltip.show';

  /**
   * Name of the event that is fired when the tooltip has been made visible to
   * the user (will wait for CSS transitions to complete).
   */
  @Prop({ mutable: true }) public shownEventName: string = 'og.tooltip.shown';

  /**
   * Name of the event that event is fired immediately when the hide instance
   * method has been called.
   */
  @Prop({ mutable: true }) public hideEventName: string = 'og.tooltip.hide';

  /**
   * Name of the event that is fired when the tooltip has finished being hidden
   * from the user (will wait for CSS transitions to complete).
   */
  @Prop({ mutable: true }) public hiddenEventName: string = 'og.tooltip.hidden';

  /**
   * Name of the event that is fired after the `og.tooltip.show` event when the
   * tooltip template has been added to the DOM.
   */
  @Prop({ mutable: true }) public insertedEventName: string = 'og.tooltip.inserted';

  /**
   * Name of the event that fires immediately when a tooltip is first enabled.
   * If .defaultPrevented() is used on the event then the tooltip will not be
   * enabled.
   */
  @Prop({ mutable: true }) public enableEventName: string = 'og.tooltip.enable';

  /**
   * Name of the event that is fired when a tooltip has finished being enabled.
   */
  @Prop({ mutable: true }) public enabledEventName: string = 'og.tooltip.enabled';

  /**
   * Name of the event that fires immediately when a tooltip is first disabled.
   * If .defaultPrevented() is used on the event then the tooltip will not be
   * disabled.
   */
  @Prop({ mutable: true }) public disableEventName: string = 'og.tooltip.disable';

  /**
   * Name of the event that is fired when a tooltip has finished being disabled.
   */
  @Prop({ mutable: true }) public disabledEventName: string = 'og.tooltip.disabled';

  /**
   * The config property allows for overriding the tooltip´s default
   * configuration.
   */
  @Prop({ mutable: true }) public config: Partial<OgTooltipConfig> = {};

  /**
   * When set to `true` the tooltip will be disabled.
   */
  @Prop({ mutable: true }) public disabled: boolean = false;

  /**
   * It will override any other `title` settings and use this for the tooltip
   * title. The value is watched so that it will update dynamically.
   */
  @Prop({ mutable: true }) public ogTitle: string = '';

  /**
   * When set to `true`, the `og-tooltip` will toggle open.
   */
  @Prop({ mutable: true }) public showTooltip: boolean = false;

  /**
   * When tabindex is set to a negative value (smaller than `0`), the tooltip
   * will work on hover, but it will not appear via keyboard raised focus.
   */
  @Prop({ mutable: true, reflectToAttr: true }) public tabindex: string | number = '0';

  // States
  @State() public activeTrigger: any;
  @State() public disposeTimeout: any;
  @State() public hoverState: 'in' | 'out';
  @State() public isEnabled: boolean;
  @State() public popperHandle: Popper;
  @State() public showHideTimeout: any;
  @State() public tip: HTMLElement;
  @State() public tooltipId: string;

  private tooltipDefaultConfig: OgTooltipConfig = {
    animation: true,
    boundary: 'scrollParent',
    container: false,
    delay: 0,
    disposeTimeToWait: 0,
    fallbackPlacement: 'flip',
    html: false,
    offset: 0,
    placement: 'top',
    template: '<div class="og-tooltip" role="tooltip"><div class="og-tooltip__arrow"></div><div class="og-tooltip__inner"></div></div>',
    title: '',
    trigger: 'hover focus'
  }

  private tooltipAppliedPopperPlacementClasses: string[] = [];
  private tooltipBaseClass: string = 'og-tooltip';
  private tooltipFadeClass: string = 'fade';
  private tooltipShowClass: string = 'show';

  /**
   * `.tooltip(Partial<OgTooltipConfig>)` attaches a tooltip handler to a
   * <og-tooltip> element.
   * `.tooltip('show')` reveals an element´s tooltip.
   * `.tooltip('hide')` hides an element´s tooltip.
   * `.tooltip('toggle')` toggles an element´s tooltip.
   * `.tooltip('enable')` gives an element’s tooltip the ability to be shown.
   * `.tooltip('disable')` removes the ability for an element´s tooltip to be
   * shown. The tooltip will only be able to be shown if it is re-enabled..
   * `.tooltip('toggleEnabled')` toggles the ability for an element´s tooltip to
   * be shown or hidden.
   * `.tooltip('update')` updates the position of an element´s tooltip.
   */
  @Method()
  public async tooltip(tooltipOptions: string | Partial<OgTooltipConfig>): Promise<boolean | HTMLElement> {
    return this.setupMethod(tooltipOptions);
  }



  // Public methods
  // ---------------------------------------------------------------------------
  public componentWillLoad() {
    if (this.tabindex === '-1') {
      this.tabindex = -1;
    }

    if (this.disabled) {
      this.disableTooltip();
      return;
    }

    if (!this.isEnabled) {
      this.enableTooltip();
    }

    if (this.showTooltip === true) {
      this.setInitialOpenState();
    }
  }

  public componentDidUnload() {
    this.disableTooltip();
    this.config = {};
  }

  public render(): HTMLElement {
    return (<slot />);
  }



  // Watches
  // ---------------------------------------------------------------------------
  @Watch('ogTitle')
  public handleWatchOgTitle(newValue: string) {
    if (!this.isEnabled) {
      return;
    }

    if (this.config.title !== newValue) {
      this.config.title = newValue;
    }

    if (this.isWithActiveTrigger() || this.tooltipHtmlElementHasClass(this.tooltipShowClass) || this.hoverState === 'in') {
      const tooltipElement = this.getTooltipHtmlElement();
      const tooltipContentPlaceholder = tooltipElement.querySelector('.og-tooltip__inner');
      if (tooltipContentPlaceholder) {
        this.setElementContent(tooltipContentPlaceholder, this.getTitle());
        if (this.popperHandle && this.popperHandle.scheduleUpdate) {
          this.popperHandle.scheduleUpdate();
        }
      }
    }
  }

  @Watch('disabled')
  public handleDisabledWatch(newValue: boolean) {
    if (this.disabled === newValue && !this.isEnabled === newValue) {
      return;
    }

    if (newValue === true) {
      this.disableTooltip();
      return;
    }

    this.enableTooltip();
  }

  @Watch('showTooltip')
  public handleShowTooltipWatch(newValue: boolean) {
    if (!this.isEnabled) {
      return;
    }

    if (newValue === true) {
      this.enter();
      return;
    }

    this.leave();
  }



  // Init
  // ---------------------------------------------------------------------------
  private setInitialOpenState() {
    if (!this.isEnabled ) {
      return;
    }

    const hasAnimation = this.config.animation;
    if (hasAnimation) {
      this.setConfig({ animation: false });
    }

    // Listen to the defined triggers.
    this.tooltipEl.addEventListener(this.shownEventName, () => {
      if (_.includes(this.config.trigger, 'hover') && !_.includes(this.config.trigger, 'manual')) {
        this.activeTrigger.hover = true;
        this.hoverState = 'in';
      } else if (_.includes(this.config.trigger, 'focus') && !_.includes(this.config.trigger, 'manual')) {
        this.activeTrigger.focus = true;
      }
      if (hasAnimation) {
        this.setConfig();
        const tipEl = this.tip || this.createTooltipHtmlElement();
        addClass(tipEl, this.tooltipFadeClass);
      }
    }, { once: true });
    this.enter();
  }



  // Event handing
  // ---------------------------------------------------------------------------
  private handleMouseEnter = (event) => {
    this.enter(event);
  }

  private handleFocusIn = (event) => {
    this.enter(event);
  }

  private handleMouseLeave = (event) => {
    this.leave(event);
  }

  private handleFocusOut = (event) => {
    this.leave(event);
  }

  private handlePopperOnCreate = (data: Popper.Data) => {
    if (data.originalPlacement !== data.placement) {
      this.handlePopperPlacementChange(data);
    }
  }

  private handlePopperOnUpdate = (data: Popper.Data) => {
    this.handlePopperPlacementChange(data);
  }

  private handlePopperPlacementChange(popperData: Popper.Data) {
    const popperInstance = popperData.instance;
    this.tip = popperInstance.popper as HTMLElement;
    this.cleanTooltipHtmlElementClasses();
    this.addAttachmentClassToTooltipHtmlElement(popperData.placement);
  }

  private setListeners() {
    const triggers = _.split(_.toLower(this.config.trigger), ' ');

    if (_.includes(triggers, 'manual')) {
      // hover and focus events are ignored if `manual` is included.
      return;
    }

    if (_.includes(triggers, 'hover')) {
      this.ogAddEventListener('mouseenter', this.handleMouseEnter);
      this.ogAddEventListener('mouseleave', this.handleMouseLeave);
    }
    if (_.includes(triggers, 'focus')) {
      this.ogAddEventListener('focusin', this.handleFocusIn);
      this.ogAddEventListener('focusout', this.handleFocusOut);
    }
  }



  // Config
  // ---------------------------------------------------------------------------
  private setConfig(overrideConfig: Partial<OgTooltipConfig> = {}) {
    this.config = {};
    const config: any = {};

    if (_.has(overrideConfig, 'animation')) {
      config.animation = this.getConfigBoolean(overrideConfig.animation);
    } else if (_.has(this.tooltipEl.dataset, 'animation')) {
      config.animation = this.getConfigBoolean(this.tooltipEl.dataset.animation);
    } else {
      config.animation = this.tooltipDefaultConfig.animation;
    }

    if (_.has(overrideConfig, 'trigger')) {
      config.trigger = overrideConfig.trigger;
    } else if (_.has(this.tooltipEl.dataset, 'trigger')) {
      config.trigger = this.tooltipEl.dataset.trigger;
    } else {
      config.trigger = this.tooltipDefaultConfig.trigger;
    }

    const titleAttribute = this.tooltipEl.getAttribute('title');
    let newConfigTitle;
    if (_.size(this.ogTitle) > 0) {
      newConfigTitle = this.ogTitle;
    } else if (titleAttribute) {
      newConfigTitle = titleAttribute;
    } else if (_.has(overrideConfig, 'title')) {
      if (typeof overrideConfig.title === 'object' && overrideConfig.title.nodeValue) {
        newConfigTitle = overrideConfig.title.nodeValue;
      } else {
        newConfigTitle = overrideConfig.title;
      }
    } else if (_.has(this.tooltipEl.dataset, 'title')) {
      newConfigTitle = this.tooltipEl.dataset.title;
    } else {
      newConfigTitle = this.tooltipDefaultConfig.title;
    }
    if (_.isNumber(config.title)) {
      newConfigTitle = _.toString(config.title);
    }
    config.title = newConfigTitle;

    let newConfigDelay;
    if (_.has(overrideConfig, 'delay')) {
      newConfigDelay = overrideConfig.delay;
    } else if (_.has(this.tooltipEl.dataset, 'delay')) {
      newConfigDelay = this.tooltipEl.dataset.delay;
    }
    if (_.isInteger(newConfigDelay)) {
      config.delay = {
        show: newConfigDelay,
        hide: newConfigDelay,
      };
    } else if (_.isObject(newConfigDelay)) {
      config.delay = {
        show: _.get(newConfigDelay, 'show', this.tooltipDefaultConfig.delay),
        hide: _.get(newConfigDelay, 'hide', this.tooltipDefaultConfig.delay),
      };
    } else if (_.isString(newConfigDelay) && _.size(newConfigDelay) > 0) {
      const configDelayInteger = _.toInteger(newConfigDelay);
      if (!_.isNaN(configDelayInteger)) {
        config.delay = {
          show: configDelayInteger,
          hide: configDelayInteger,
        };
      } else {
        const configDelayObj = JSON.parse(newConfigDelay);
        config.delay = {
          show: _.get(configDelayObj, 'show', this.tooltipDefaultConfig.delay),
          hide: _.get(configDelayObj, 'hide', this.tooltipDefaultConfig.delay),
        };
      }
    } else {
      config.delay = {
        show: this.tooltipDefaultConfig.delay,
        hide: this.tooltipDefaultConfig.delay,
      };
    }

    if (_.has(overrideConfig, 'html')) {
      config.html = this.getConfigBoolean(overrideConfig.html);
    } else if (_.has(this.tooltipEl.dataset, 'html')) {
      config.html = this.getConfigBoolean(this.tooltipEl.dataset.html);
    } else {
      config.html = this.tooltipDefaultConfig.html;
    }

    if (_.has(overrideConfig, 'placement')) {
      config.placement = overrideConfig.placement;
    } else if (_.has(this.tooltipEl.dataset, 'placement')) {
      config.placement = this.tooltipEl.dataset.placement;
    } else {
      config.placement = this.tooltipDefaultConfig.placement;
    }

    if (_.has(overrideConfig, 'offset')) {
      config.offset = _.toInteger(overrideConfig.offset);
    } else if (_.has(this.tooltipEl.dataset, 'offset')) {
      config.offset = _.toInteger(this.tooltipEl.dataset.offset);
    } else {
      config.offset = this.tooltipDefaultConfig.offset;
    }
    if (_.isNaN(config.offset)) {
      config.offset = this.tooltipDefaultConfig.offset;
    }

    if (_.has(overrideConfig, 'container')) {
      config.container = this.getConfigBoolean(overrideConfig.container);
    } else if (_.has(this.tooltipEl.dataset, 'container')) {
      config.container = this.getConfigBoolean(this.tooltipEl.dataset.container);
    } else {
      config.container = this.tooltipDefaultConfig.container;
    }

    if (_.has(overrideConfig, 'fallbackPlacement')) {
      config.fallbackPlacement = overrideConfig.fallbackPlacement;
    } else if (_.has(this.tooltipEl.dataset, 'fallbackPlacement')) {
      config.fallbackPlacement = this.tooltipEl.dataset.fallbackPlacement;
    } else {
      config.fallbackPlacement = this.tooltipDefaultConfig.fallbackPlacement;
    }

    if (_.has(overrideConfig, 'boundary')) {
      config.boundary = overrideConfig.boundary;
    } else if (_.has(this.tooltipEl.dataset, 'boundary')) {
      config.boundary = this.tooltipEl.dataset.boundary;
    } else {
      config.boundary = this.tooltipDefaultConfig.boundary;
    }

    if (_.has(overrideConfig, 'disposeTimeToWait')) {
      config.disposeTimeToWait = _.toInteger(overrideConfig.disposeTimeToWait);
    } else if (_.has(this.tooltipEl.dataset, 'disposeTimeToWait')) {
      config.disposeTimeToWait = _.toInteger(this.tooltipEl.dataset.disposeTimeToWait);
    } else {
      config.disposeTimeToWait = this.tooltipDefaultConfig.disposeTimeToWait;
    }
    if (_.isNaN(config.disposeTimeToWait)) {
      config.disposeTimeToWait = this.tooltipDefaultConfig.disposeTimeToWait;
    }

    if (_.has(overrideConfig, 'template')) {
      config.template = overrideConfig.template;
    } else if (_.has(this.tooltipEl.dataset, 'template')) {
      config.template = this.tooltipEl.dataset.template;
    } else {
      config.template = this.tooltipDefaultConfig.template;
    }

    this.config = config;
  }

  private setupMethod(tooltipOptions: string | Partial<OgTooltipConfig>): boolean | HTMLElement {
    if (_.size(tooltipOptions) === 0) {
      if (!this.isEnabled) {
        this.enableTooltip();
        return true;
      }
      return this.tooltipEl;
    }

    if (tooltipOptions === 'enable') {
      this.enableTooltip();
      return true;
    }

    if (tooltipOptions === 'disable') {
      this.disableTooltip();
      return true;
    }

    if (tooltipOptions === 'toggleEnabled') {
      if (this.isEnabled) {
        this.disableTooltip();
      } else {
        this.enableTooltip();
      }
      return true;
    }

    if (tooltipOptions === 'show') {
      if (!this.isEnabled) {
        return null;
      }
      this.enter();
      return true;
    }

    if (tooltipOptions === 'hide') {
      this.activeTrigger = {};
      if (!this.isEnabled) {
        return null;
      }
      this.leave();
      return true;
    }

    if (tooltipOptions === 'toggle') {
      if (!this.isEnabled) {
        return null;
      }
      this.toggle();
      return true;
    }

    if (tooltipOptions === 'update') {
      if (this.popperHandle && this.popperHandle.scheduleUpdate) {
        this.popperHandle.scheduleUpdate();
        return true;
      }
      return false;
    }

    if (typeof tooltipOptions === 'object') {
      if (this.isEnabled) {
        this.disableTooltip();
      }
      this.setConfig(tooltipOptions);
      this.enableTooltip();
      return true;
    }

    if (typeof tooltipOptions === 'string') {
      throw new Error(`No method named "${tooltipOptions}"`);
    }
    return null;

  }



  // Tip HTMLElement
  // ---------------------------------------------------------------------------
  private createTooltipHtmlElement(): HTMLElement {
    const tipAlreadyPresentInDom = document.getElementById(this.tooltipId);
    if (tipAlreadyPresentInDom) {
      return tipAlreadyPresentInDom;
    }

    const container = !this.config.container ? document.body : document.querySelector(this.config.container);
    const template = document.createElement('div');
    template.innerHTML = _.trim(this.config.template);
    const innerTemplateTooltip = template.firstChild;
    const newTip = container.appendChild(innerTemplateTooltip);
    newTip.setAttribute('id', this.tooltipId);
    return newTip;
  }

  private removeTooltipHtmlElementFromDom() {
    if (this.tip && this.tip.parentNode && this.hoverState !== 'in') {
      this.tip.parentNode.removeChild(this.tip);
      this.tip = null;
    }
  }

  private getTooltipHtmlElement(): HTMLElement {
    clearTimeout(this.disposeTimeout);
    this.tip = this.tip || this.createTooltipHtmlElement();
    return this.tip;
  }

  private addAttachmentClassToTooltipHtmlElement(attachment: string) {
    const tooltipAttachmentClass = `${this.tooltipBaseClass}-${attachment}`;
    if (!_.includes(this.tooltipAppliedPopperPlacementClasses, tooltipAttachmentClass)) {
      this.tooltipAppliedPopperPlacementClasses.push(tooltipAttachmentClass);
    }
    addClass(this.getTooltipHtmlElement(), tooltipAttachmentClass);
  }

  private cleanTooltipHtmlElementClasses() {
    const tip = this.getTooltipHtmlElement();
    const classesToRemove = _.intersection(this.tooltipAppliedPopperPlacementClasses, tip.classList);
    classesToRemove.forEach(className => {
      removeClass(tip, className);
    });
  }

  private tooltipHtmlElementHasClass(className: string): boolean {
    if (!this.tip) {
      return false;
    }

    return hasClass(this.tip, className);
  }

  private setContent() {
    const tip = this.getTooltipHtmlElement();
    const tooltipTitleEl = tip.querySelector('.og-tooltip__inner');
    if (tooltipTitleEl) {
      this.setElementContent(tooltipTitleEl, this.getTitle());
    }
    removeClass(tip, this.tooltipFadeClass);
    removeClass(tip, this.tooltipShowClass);
  }



  // Enable/Disable tooltip
  // ---------------------------------------------------------------------------
  private enableTooltip() {
    if (this.disabled === true) {
      return;
    }

    const enableEvent = ogCustomEvent(this.tooltipEl, this.enableEventName);
    if (enableEvent.defaultPrevented) {
      return;
    }

    this.isEnabled = true;
    this.activeTrigger = {};
    this.hoverState = null;
    this.tooltipId = uuidv4();
    this.tooltipEl.dataset.bsId = this.tooltipId;
    this.tip = null;
    if (_.size(this.config) === 0) {
      this.setConfig();
    }
    this.fixTitle();
    this.setListeners();
    window.requestAnimationFrame(() => { // trick to ensure all page updates are completed before running code
      window.requestAnimationFrame(() => { // discussed here:  https://www.youtube.com/watch?v=aCMbSyngXB4&t=11m
        setTimeout(() => {
          ogCustomEvent(this.tooltipEl, this.enabledEventName);
        }, 0);
      });
    });
  }

  private disableTooltip() {
    const disableEvent = ogCustomEvent(this.tooltipEl, this.disableEventName);
    if (disableEvent.defaultPrevented) {
      return;
    }

    this.isEnabled = false;
    clearTimeout(this.showHideTimeout);
    this.ogRemoveEventListener('mouseenter', this.handleMouseEnter);
    this.ogRemoveEventListener('mouseleave', this.handleMouseLeave);
    this.ogRemoveEventListener('focusin', this.handleFocusIn);
    this.ogRemoveEventListener('focusout', this.handleFocusOut);

    const { originalTitle } = this.tooltipEl.dataset;
    if (_.size(originalTitle) > 0) {
      this.tooltipEl.title = originalTitle;
    }
    this.activeTrigger = {};
    this.hoverState = null;
    clearTimeout(this.disposeTimeout);
    this.removeTooltipHtmlElementFromDom();
    if (this.popperHandle && this.popperHandle.destroy) {
      this.popperHandle.destroy();
      this.popperHandle = null;
    }
    window.requestAnimationFrame(() => { // trick to ensure all page updates are completed before running code
      window.requestAnimationFrame(() => { // discussed here:  https://www.youtube.com/watch?v=aCMbSyngXB4&t=11m
        setTimeout(() => {
          ogCustomEvent(this.tooltipEl, this.disabledEventName);
        }, 0);
      });
    });
  }



  // Enter/Leave
  // ---------------------------------------------------------------------------
  private enter(event: Event = null) {
    // Determine the active trigger
    if (event) {
      if (event.type === 'focusin') {
        this.activeTrigger.focus = true;
      } else {
        this.activeTrigger.hover = true;
      }
    }

    if (this.tooltipHtmlElementHasClass(this.tooltipShowClass) || this.hoverState === 'in') {
      this.hoverState = 'in';
      return;
    }

    clearTimeout(this.showHideTimeout);

    this.hoverState = 'in';

    if (!this.config.delay || !this.config.delay.hasOwnProperty['show']) {
      this.show();
      return;
    }

    let showDelay = 0;
    if (this.config.delay) {
      if (this.config.delay.hasOwnProperty('show')) {
        showDelay = this.config.delay['show'];
      } else {
        showDelay = this.config.delay as number;
      }
    }
    this.showHideTimeout = setTimeout(() => {
      if (this.hoverState === 'in') {
        this.show();
      }
    }, showDelay);
  }

  private leave(event: any = null) {
    if (event) {
      if (event.type === 'focusout') {
        this.activeTrigger.focus = false;
      } else {
        this.activeTrigger.hover = false;
      }
    }

    if (this.isWithActiveTrigger()) {
      return;
    }

    clearTimeout(this.showHideTimeout);
    this.hoverState = 'out';

    if (!this.config.delay || !this.config.delay.hasOwnProperty['hide']) {
      this.hide();
      return;
    }

    let hideDelay = 0;
    if (this.config.delay) {
      if (this.config.delay.hasOwnProperty('hide')) {
        hideDelay = this.config.delay['hide'];
      } else {
        hideDelay = this.config.delay as number;
      }
    }
    this.showHideTimeout = setTimeout(() => {
      if (this.hoverState === 'out') {
        this.hide();
      }
    }, hideDelay);
  }

  private toggle(event: any = null) {
    if (!this.isEnabled) {
      return;
    }
    if (event) {
      this.activeTrigger.click = !this.activeTrigger.click;
      if (this.isWithActiveTrigger()) {
        this.enter();
      } else {
        this.leave();
      }
    } else if (this.tooltipHtmlElementHasClass(this.tooltipShowClass)) {
      this.leave();
    } else {
      this.enter();
    }
  }



  // Show/Hide tooltip
  // ---------------------------------------------------------------------------
  private tooltipCanBeShown(): boolean {
    if (!this.isEnabled) {
      return false;
    }

    const title = this.getTitle();
    if (title && _.isString(title) && title.toString().length > 0) {
      return true;
    }

    if (title && title instanceof Element) {
      return true;
    }

    return false;
  }

  private show() {
    if (this.tooltipEl.style.display === 'none') {
      throw new Error('Please use show on visible elements');
    }
    if (this.tooltipCanBeShown()) {
      const showEvent = ogCustomEvent(this.tooltipEl, this.showEventName);
      this.tooltipEl.setAttribute('aria-describedby', this.tooltipId);
      const isInTheDom = this.tooltipEl.ownerDocument.documentElement.contains(this.tooltipEl);
      if (showEvent.defaultPrevented || !isInTheDom) {
        return;
      }

      const tip = this.getTooltipHtmlElement();
      this.setContent();
      if (this.config.animation) {
        addClass(tip, this.tooltipFadeClass);
      }
      const placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.tooltipEl) : this.config.placement;
      this.addAttachmentClassToTooltipHtmlElement(placement);
      // the point of inserted event is to know when the tip is in the DOM but before it has been placed using popper
      ogCustomEvent(this.tooltipEl, this.insertedEventName);
      this.popperHandle = new Popper(this.tooltipEl, tip, {
        placement: placement,
        modifiers: {
          offset: {
            offset: this.config.offset,
          },
          flip: {
            behavior: this.config.fallbackPlacement,
          },
          arrow: {
            element: '.arrow',
          },
          preventOverflow: {
            boundariesElement: this.config.boundary,
          },
        },
        onCreate: this.handlePopperOnCreate,
        onUpdate: this.handlePopperOnUpdate,
      });
      addClass(tip, this.tooltipShowClass);

      if (hasClass(tip, this.tooltipFadeClass)) {
        const transitionDuration = getTransitionDurationFromElement(tip);
        setTimeout(() => {
          this.showComplete();
        }, transitionDuration);
      } else {
        this.showComplete();
      }
    }
  }

  private showComplete() {
    if (this.config.animation) {
      this.fixTransition();
    }

    const previousHoverState = this.hoverState;
    this.hoverState = null;

    window.requestAnimationFrame(() => { // trick to ensure all page updates are completed before running code
      window.requestAnimationFrame(() => { // discussed here:  https://www.youtube.com/watch?v=aCMbSyngXB4&t=11m
        setTimeout(() => {
          ogCustomEvent(this.tooltipEl, this.shownEventName);
        }, 0);
      });
    });

    if (previousHoverState === 'out') {
      this.leave();
    }
  }

  private hide(callback: any = () => { }) {
    const tip = this.getTooltipHtmlElement();
    const hideEvent = ogCustomEvent(this.tooltipEl, this.hideEventName);
    if (hideEvent.defaultPrevented) {
      return;
    }

    removeClass(tip, this.tooltipShowClass);

    // If this is a touch-enabled device we remove the extra
    // empty mouseover listeners we added for iOS support
    // if ('ontouchstart' in document.documentElement) {
    //   $$$1(document.body).children().off('mouseover', null, $$$1.noop);
    // }

    this.activeTrigger.click = false;
    this.activeTrigger.focus = false;
    this.activeTrigger.hover = false;
    this.tooltipEl.removeAttribute('aria-describedby');

    if (hasClass(tip, this.tooltipFadeClass)) {
      const transitionDuration = getTransitionDurationFromElement(tip);
      setTimeout(() => {
        this.hideComplete(callback);
      }, transitionDuration);
    } else {
      this.hideComplete();
    }
    this.hoverState = null;
  }

  private hideComplete(callback: any = () => { }) {
    this.cleanTooltipHtmlElementClasses();

    if (this.popperHandle && this.popperHandle.destroy) {
      this.popperHandle.destroy();
    }

    this.disposeTimeout = setTimeout(() => {
      this.removeTooltipHtmlElementFromDom();
    }, this.config.disposeTimeToWait);

    window.requestAnimationFrame(() => { // trick to ensure all page updates are completed before running code
      window.requestAnimationFrame(() => { // discussed here:  https://www.youtube.com/watch?v=aCMbSyngXB4&t=11m
        setTimeout(() => {
          ogCustomEvent(this.tooltipEl, this.hiddenEventName);
        }, 0);
      });
    });

    callback();
  }

  // Title
  // ---------------------------------------------------------------------------
  private getTitle(): string | Element {
    if (this.config.title) {
      if (typeof this.config.title === 'function') {
        const newTitle = this.config.title.call(this.tooltipEl);
        return newTitle;
      }
      return this.config.title;
    }

    if (this.tooltipEl.dataset.originalTitle) {
      return this.tooltipEl.dataset.originalTitle;
    }

    return '';
  }

  private fixTitle() {
    if (_.size(this.tooltipEl.title) > 0) {
      this.tooltipEl.dataset.originalTitle = this.tooltipEl.title || '';
      this.tooltipEl.title = '';
    }
  }



  // Helpers
  // ---------------------------------------------------------------------------
  private ogAddEventListener(eventName, listenerFunction) {
    this.ogRemoveEventListener(eventName, listenerFunction, () => {
      this.tooltipEl.addEventListener(eventName, listenerFunction);
    });
  }

  private ogRemoveEventListener(eventName, listenerFunction, callback = () => {}) {
    this.tooltipEl.removeEventListener(eventName, listenerFunction);
    callback();
  }

  private fixTransition() {
    const tip = this.getTooltipHtmlElement();
    const initConfigAnimation = this.config.animation;

    if (tip.getAttribute('x-placement') !== null) {
      return;
    }

    removeClass(tip, this.tooltipFadeClass);
    this.config.animation = false;
    this.hide();
    this.show();
    this.config.animation = initConfigAnimation;
  }

  private getConfigBoolean(configValue: any): boolean {
    if (configValue === true ||
        _.toLower(configValue) === 'true' ||
        configValue === 1 ||
        configValue === '1') {
      return true;
    }

    return false;
  }

  private isWithActiveTrigger(): boolean {
    const activeTriggerKeys = Object.keys(this.activeTrigger);
    return activeTriggerKeys.some((triggerKey) => {
      this.activeTrigger[triggerKey];
    });
  }

  private setElementContent(el: Element, content: Element | string) {
    let castedContent;

    if (this.config.html) {
      if (content instanceof Element) {
        castedContent = content as Element;
        el.appendChild(castedContent);
        return;
      }
      castedContent = content as string;
      el.innerHTML = castedContent;
    } else {
      if (content instanceof Element) {
        castedContent = content as Element;
        el.textContent = castedContent.innerText;
        return;
      }
      castedContent = content as string;
      el.textContent = castedContent;
    }
  }

}
