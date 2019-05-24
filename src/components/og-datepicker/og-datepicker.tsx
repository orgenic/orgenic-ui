/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import {
    Component,
    Prop,
    EventEmitter,
    Event,
    State,
    Element,
    Listen,
    Watch
} from '@stencil/core';
import { OgCalendarDate, OgDateDecorator } from '../og-calendar/interfaces/og-calendar-date-decorator';
import { CalendarUtils } from '../og-calendar/utils/utils';
import moment from 'moment';

@Component({
    tag: 'og-datepicker',
    styleUrl: 'og-datepicker.scss',
    shadow: true
})
export class OgDatepicker {
    @Element() el: HTMLElement;

    /**
     * Optional placeholder if no value is selected.
     */
    @Prop() placeholder?: string;

    /**
     * The selected value of the combobox
     */
    @Prop({ mutable: true, reflectToAttr: true }) value: string;
    @Watch('value') setValue(newValue: string) {
        if (typeof newValue === 'string') {
            this.internalValue = CalendarUtils.moment2CalendarDate(moment(newValue, this.format));
        }
    }

    @Prop() format: string = 'DD.MM.YYYY';
    @Watch('format') setFormat() {
        this.setValue(this.value);
    }

    @Prop() firstDayOfWeek: number = 0;

    @Prop() dateDecorator: OgDateDecorator;

    /**
     * Determines, whether the control is disabled or not
     */
    @Prop() disabled: boolean;

    /**
     * Event is being emitted when value changes.
     */
    @Event() dateSelected: EventEmitter<any>;

    @State() dropdownActive: boolean = false;

    @Listen('window:scroll')
    handleWindowScroll(_ev: Event) {
        // close flyout on scroll events
        this.dropdownActive = false;
    }

    @Listen('body:scroll')
    handleBodyScroll(_ev: Event) {
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

    @State()
    private internalValue: OgCalendarDate = CalendarUtils.moment2CalendarDate(moment(this.value));

    indicatorElement: HTMLElement;
    flyoutCalendar: HTMLElement;

    componentDidLoad() {
        this.setValue(this.value);
    }

    buttonClicked() {
        if (!this.disabled) {
            this.dropdownActive = !this.dropdownActive;
        }
    }

    handleDateClicked(event) {
        event.cancelBubble = true;

        if (!this.disabled) {
            const date: OgCalendarDate = event.detail;

            this.dropdownActive = false;
            this.internalValue = date;
            this.value = CalendarUtils.calendarDate2Moment(date).format(this.format);
            this.dateSelected.emit(CalendarUtils.calendarDate2Moment(date).toDate());
        }
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

        this.flyoutCalendar.style.display = 'block';
        let flyoutHeight = this.flyoutCalendar.getBoundingClientRect().height;
        this.flyoutCalendar.style.display = '';

        if (flyoutTop + flyoutHeight > window.innerHeight) {
            flyoutTop = this.el.getBoundingClientRect().top - flyoutHeight;
        }

        return {
            top: flyoutTop + 'px',
        }
    }

    render() {
        return [
            <div
                class="og-datepicker__header"
                onClick={() => this.buttonClicked()}
            >
                <input
                    type="text"
                    class="og-datepicker__input"
                    readonly="true"
                    value={ CalendarUtils.calendarDate2Moment(this.internalValue).format(this.format) }
                    placeholder={this.placeholder}
                    disabled={this.disabled}
                />
                <div class="og-datepicker__button">
                    <svg
                        class={
                            'og-datepicker__button__arrow' +
                            (this.isDropdownActive() ? ' og-datepicker__button__arrow--collapsed' : '')
                        }
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 24 12"
                        preserveAspectRatio="none"
                    >
                        <polyline
                            class="og-datepicker__button__arrow__line"
                            points="0,0 12,12 24,0"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecaps="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </div>
                <div class="og-datepicker__indicator" ref={(el) => this.indicatorElement = el} />
            </div>,
            <div class="og-datepicker__flyout">
                <og-calendar-group
                    class={
                        'og-datepicker__flyout__calendar' +
                        (this.isDropdownActive() ? ' og-datepicker__flyout__calendar--visible' : '')
                    }
                    style={ this.getFlyoutCss() }
                    ref={(el) => this.flyoutCalendar = el}
                    year={ this.internalValue.year }
                    month={ this.internalValue.month }
                    dateDecorator={ this.dateDecorator }
                    firstDayOfWeek={ this.firstDayOfWeek }
                    selection={ [ this.internalValue ] }
                    selectionType="single"
                    onDateClicked={ (e) => this.handleDateClicked(e) }>
                </og-calendar-group>
            </div>
        ];
    }
}
