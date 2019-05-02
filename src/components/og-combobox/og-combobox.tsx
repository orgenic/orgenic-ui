import {
    Component,
    Prop,
    EventEmitter,
    Event,
    State,
    Element,
    Listen
} from '@stencil/core';

@Component({
    tag: 'og-combobox',
    styleUrl: 'og-combobox.scss',
    shadow: true
})
export class OgCombobox {
    @Element() el: HTMLElement;

    /**
     * Optional placeholder if no value is selected.
     */
    @Prop() placeholder?: string;

    /**
     * The selected value of the combobox
     */
    @Prop({ mutable: true, reflectToAttr: true }) value: string;

    /**
     * An array of items to choose from
     */
    @Prop() items: any[];

    /**
     * Set the property for the items to define as label. Default: "label"
     */
    @Prop() itemLabelProperty: string = 'label';

    /**
     * Set the property for the items to define as value. Default: "value"
     */
    @Prop() itemValueProperty: string = 'value';

    /**
     * Determines, whether the control is disabled or not
     */
    @Prop() disabled: boolean;

    /**
     * Event is being emitted when value changes.
     */
    @Event() itemSelected: EventEmitter<any>;

    @State() dropdownActive: boolean = false;

    @Listen('window:scroll')
    handleScroll(_ev: Event) {
        // close flyout on scroll events
        this.dropdownActive = false;
    }

    @Listen('body:click')
    handleBodyClick(ev: Event) {
        if (!this.dropdownActive || this.el === ev.target) {
            return;
        }
        if (this.dropdownActive) {
            this.dropdownActive = false;
            ev.cancelBubble = true;
        }
    }

    indicatorElement: HTMLElement;
    flyoutList: HTMLElement;

    buttonClicked() {
        if (!this.disabled) {
            this.dropdownActive = !this.dropdownActive;
        }
    }

    listItemSelected(item) {
        if (!this.disabled) {
            this.dropdownActive = false;
            this.value = item[this.itemValueProperty] + '';
            this.itemSelected.emit(item);
        }
    }

    private getSelectedItemLabel(): string {
        if (!this.hasValidItems()) {
            return '';
        }
        const item = this.items.find(
            item => item[this.itemValueProperty] + '' === this.value
        );
        if (!item) {
            return '';
        }
        return item[this.itemLabelProperty];
    }

    private hasValidItems(): boolean {
        return Array.isArray(this.items);
    }

    private isDropdownActive(): boolean {
        return this.dropdownActive && !this.disabled;
    }

    hostData() {
        return {
            class: {
                'is-focused': this.dropdownActive,
                'og-form-item__editor': true
            }
        };
    }

    /**
     * behaviour:
     *   * combobox flyout shows 7 items
     *   * if it does not fit on screen, scale down flyout
     *   * if flyout would be smaller than 4 items, show flyout above combobox
     */
    getFlyoutCss() {
        if (!this.indicatorElement) {
            return {};
        }
        let flyoutTop = (this.indicatorElement.getBoundingClientRect().top + this.indicatorElement.offsetHeight);

        let flyoutHeight = 0;
        let itemHeight = 0;
        // get item height
        const item = this.flyoutList.querySelector('li');
        if (!item) {
            // no items available => return
            return {};
        }

        const itemStyle = window.getComputedStyle(item);
        itemHeight = parseInt(itemStyle.paddingTop) + parseInt(itemStyle.paddingBottom) + parseInt(itemStyle.lineHeight);
        flyoutHeight = itemHeight * this.items.length;

        // get space on screen below combobox
        const spaceBelow = window.innerHeight - flyoutTop - parseInt(itemStyle.paddingBottom);
        // calculate maximum and minimum flyout sizes (for 4 - 7 items)
        const maxHeight = itemHeight * Math.min(7, this.items.length);
        const minHeight = itemHeight * Math.min(4, this.items.length);
        // calculate real flyout size to fit below combobox
        flyoutHeight = Math.min(spaceBelow, Math.min(maxHeight, flyoutHeight));
        // if flyout size is below min size, then show flyout above combobox
        if (flyoutHeight < minHeight) {
            flyoutHeight = maxHeight;
            flyoutTop = this.el.getBoundingClientRect().top - flyoutHeight;
        }

        return {
            top: flyoutTop + 'px',
            width: window.getComputedStyle(this.flyoutList.parentElement).width,
            height: flyoutHeight + 'px'
        }
    }

    render() {
        return [
            <div
                class="og-combobox__header"
                onClick={() => this.buttonClicked()}
            >
                <input
                    type="text"
                    class="og-combobox__input"
                    readonly="true"
                    value={this.getSelectedItemLabel()}
                    placeholder={this.placeholder}
                    disabled={this.disabled}
                />
                <div class="og-combobox__button">
                    <svg
                        class={
                            'og-combobox__button__arrow' +
                            (this.isDropdownActive() ? ' og-combobox__button__arrow--collapsed' : '')
                        }
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
                <div class="og-combobox__indicator" ref={(el) => this.indicatorElement = el} />
            </div>,
            <div class="og-combobox__flyout">
                <ul
                    class={
                        'og-combobox__flyout__list' +
                        (this.isDropdownActive() ? ' og-combobox__flyout__list--visible' : '')
                    }
                    style={ this.getFlyoutCss() }
                    ref={(el) => this.flyoutList = el}
                >
                    {!this.hasValidItems() ? (
                        <li>No options available</li>
                    ) : (
                        this.items.map(item => (
                            <li
                                class={
                                    'og-combobox__flyout__list__item' +
                                    (item[this.itemValueProperty] == this.value ? ' og-combobox__flyout__list__item--active' : '' )
                                }
                                onClick={() => this.listItemSelected(item)}
                            >
                                {item[this.itemLabelProperty]}
                            </li>
                        ))
                    )}
                </ul>
            </div>
        ];
    }
}
