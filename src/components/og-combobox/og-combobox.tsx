

import {
  h,
  Component,
  Prop,
  EventEmitter,
  Event,
  State,
  Element,
  Listen,
  Host,
  Watch
} from '@stencil/core';

@Component({
  tag: 'og-combobox',
  styleUrl: 'og-combobox.scss',
  shadow: true
})
export class OgCombobox {
  @Element()
  public el: HTMLElement;

  /**
   * Optional placeholder if no value is selected.
   */
  @Prop()
  public placeholder?: string;

  /**
   * The selected value of the combobox
   */
  @Prop({ mutable: true, reflect: true })
  public value: string;

  /**
   * An array of items to choose from
   */
  @Prop()
  public items: any[] = [];

  /**
   * Set the property for the items to define as label. Default: "label"
   */
  @Prop()
  public itemLabelProperty: string = 'label';

  /**
   * Set the property for the items to define as value. Default: "value"
   */
  @Prop()
  public itemValueProperty: string = 'value';

  /**
   * Determines, whether the control is disabled or not
   */
  @Prop()
  public disabled: boolean;

  /**
   * User can type custom options if enabled
   */
  @Prop()
  public customOption: boolean = false;

  /**
   * Event is being emitted when value changes.
   */
  @Event()
  public itemSelected: EventEmitter<any>;

  /**
   * Event is being emitted when input gets focus
   */
  @Event()
  public focusGained: EventEmitter<FocusEvent>;

  /**
   * Event is being emitted when focus gets lost
   */
  @Event()
  public focusLost: EventEmitter<FocusEvent>;

  @State()
  public dropdownActive: boolean = false;

  public comboboxHeaderElement: HTMLElement;
  public comboboxOptions: HTMLElement;

  @Listen('scroll', { target: 'body', capture: true })
  @Listen('scroll', { target: 'window', capture: true })
  public handleWindowScroll(ev) {
    if (!this.dropdownActive || this.el === ev.target || this.comboboxOptions === ev.target) {
      return;
    }

    // close options on scroll events
    this.dropdownActive = false;
    this.focusLost.emit();
  }

  @Listen('resize', {target: 'window', capture: true})
  public handleWindowResize() {
    if (this.dropdownActive) {
      this.comboboxOptions.style.cssText = this.getOptionsCss();
    }
  }

  @Listen('click', { target: 'body' })
  public handleBodyClick(ev) {
    if (!this.dropdownActive || this.el === ev.target) {
      return;
    }
    if (this.dropdownActive) {
      this.dropdownActive = false;
      ev.cancelBubble = true;
      this.focusLost.emit();
    }
  }

  public componentDidLoad() {
    this.comboboxOptions.addEventListener('wheel', (_ev) => {
      if (this.comboboxOptions.scrollTop === 0 && _ev.deltaY < 0) {
        _ev.cancelBubble = true;
        _ev.preventDefault();
      }
      if (this.comboboxOptions.scrollTop + this.comboboxOptions.offsetHeight === this.comboboxOptions.scrollHeight && _ev.deltaY > 0) {
        _ev.cancelBubble = true;
        _ev.preventDefault();
      }
    });
  }

  public disconnectedCallback() {
    this.removeOptionsFromBody();
  }

  public buttonClicked(e: Event) {
    if (!this.disabled) {
      this.dropdownActive = !this.dropdownActive;
      if (this.dropdownActive) {
        this.focusGained.emit();
        this.moveOptionsToBody();
        this.comboboxOptions.style.cssText = this.getOptionsCss();
      } else {
        this.focusLost.emit();
      }
      e.preventDefault();
      e.stopPropagation();
    }
  }

  public listItemSelected(item) {
    if (!this.disabled) {
      this.dropdownActive = false;
      this.value = item[this.itemValueProperty] + '';
      this.itemSelected.emit(item);
      this.focusLost.emit();
    }
  }

  @Watch('value')
  public handleChange(value: string) {
    if (!this.disabled && this.customOption) {
      const item = {};
      item[this.itemLabelProperty] = value;
      item[this.itemValueProperty] = value;
      this.itemSelected.emit(item);
    }
  }

  public inputChanged(eventTarget) {
    if (!this.disabled && this.customOption) {
      this.handleChange(eventTarget.value || '');
      eventTarget.blur();

      if (this.dropdownActive) {
        this.dropdownActive = false;
      }
      this.focusLost.emit();
    }
  }

  private getSelectedItemLabel(): string {
    if (!this.hasValidItems()) {
      return this.value || '';
    }
    const item = this.items.find(
      item => item[this.itemValueProperty] + '' === this.value
    );
    if (!item) {
      return this.value || '';
    }
    return item[this.itemLabelProperty];
  }

  private moveOptionsToBody() {
    this.comboboxOptions && document.body.appendChild(this.comboboxOptions);
  }

  private removeOptionsFromBody() {
    this.comboboxOptions && this.comboboxOptions.remove();
  }

  private hasValidItems(): boolean {
    return Array.isArray(this.items) && this.items.length > 0;
  }

  private isDropdownActive(): boolean {
    return this.dropdownActive && !this.disabled;
  }

  /**
   * behavior:
   *   * combobox options shows 7 items
   *   * if it does not fit on screen, scale down options
   *   * if options would be smaller than 4 items, show options above combobox
   */
  public getOptionsCss(): string {
    if (!this.comboboxHeaderElement) {
      return "";
    }

    const comboboxHeaderStyle = window.getComputedStyle(this.comboboxHeaderElement);

    // if there are no items in the list, there is still an "item" saying "no options available"
    const itemCount = Math.max(this.items.length, 1);
    let optionsTop = (this.comboboxHeaderElement.getBoundingClientRect().top + parseInt(comboboxHeaderStyle.height) + parseInt(comboboxHeaderStyle.marginBottom));
    let optionsHeight = 0;
    let itemHeight = 0;

    // get item height
    const item = this.comboboxOptions.shadowRoot.querySelector('li');

    if (!item) {
      // no items available => return
      return "";
    }

    const itemStyle = window.getComputedStyle(item);
    const lineHeight = parseInt(itemStyle.lineHeight) || parseInt(itemStyle.height) || parseInt(itemStyle.fontSize) * 1.5;
    itemHeight = parseInt(itemStyle.paddingTop) + parseInt(itemStyle.paddingBottom) + lineHeight;
    optionsHeight = itemHeight * itemCount;

    // get space on screen below combobox
    const spaceBelow = window.innerHeight - optionsTop - parseInt(itemStyle.paddingBottom);

    // calculate maximum and minimum options sizes (for 4 - 7 items)
    const maxHeight = itemHeight * Math.min(7, itemCount);
    const minHeight = itemHeight * Math.min(4, itemCount);

    // calculate real options size to fit below combobox
    optionsHeight = Math.min(spaceBelow, Math.min(maxHeight, optionsHeight));

    // if options size is below min size, then show options above combobox
    if (optionsHeight < minHeight) {
      optionsHeight = maxHeight;
      optionsTop = this.comboboxHeaderElement.getBoundingClientRect().top - optionsHeight - parseInt(comboboxHeaderStyle.marginTop) - parseInt(comboboxHeaderStyle.marginBottom);
    }

    return `top: ${optionsTop}px;
      left: ${this.comboboxHeaderElement.getBoundingClientRect().left - parseInt(comboboxHeaderStyle.marginLeft)}px;
      width: ${this.comboboxHeaderElement.getBoundingClientRect().width + parseInt(comboboxHeaderStyle.marginLeft) + parseInt(comboboxHeaderStyle.marginRight)}px;
      height: ${optionsHeight}px;`;
  }

  public render(): HTMLElement {
    return (
      <Host class={{
        'is-focused': this.dropdownActive,
        'og-form-item__editor': true
      }}>
        <div
          class="og-combobox__header"
          onClick={(e) => this.buttonClicked(e)}
          ref={(el) => this.comboboxHeaderElement = el}
        >
          <input
            type="text"
            class="og-combobox__input"
            readonly={!this.customOption}
            value={this.getSelectedItemLabel()}
            placeholder={this.placeholder}
            disabled={this.disabled}
            onChange={(event) => this.inputChanged(event.target)}
          />
          <div class="og-combobox__button">
            <svg
              class={ 'og-combobox__button__arrow' + (this.isDropdownActive() ? ' og-combobox__button__arrow--collapsed' : '') }
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 24 12"
              preserveAspectRatio="none"
            >
              <polyline
                class="og-combobox__button__arrow__line"
                points="0,0 12,12 24,0"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecaps="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="og-combobox__indicator"/>
        </div>
        <og-combobox-options
          ref={(el) => this.comboboxOptions = el}
          visible={this.isDropdownActive()}
          items={this.items}
          onItemSelected={(event) => this.listItemSelected(event.detail)}
          value={this.value}
        >
        </og-combobox-options>
      </Host>
    );
  }
}
