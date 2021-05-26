/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { h, Component, Prop, EventEmitter, Event } from '@stencil/core';
import moment from 'moment';
import { OgDateDecorator, OgCalendarSelectionType, OgCalendarDate } from '../og-internal-calendar/interfaces/og-calendar-date-decorator';
import { CalendarUtils } from '../og-internal-calendar/utils/utils';
import { loadMomentLocale, getDefaultLocale } from '../../utils/moment-locale-loader';

@Component({
  tag: 'og-calendar',
  styleUrl: 'og-calendar.scss',
  shadow: true
})
export class OgCalendar {
  // @Prop({ context: 'resourcesUrl' })
  // public resourcesUrl!: string;

  @Prop({ reflect: true, mutable: true })
  public year: number = new Date().getFullYear();

  @Prop({ reflect: true, mutable: true })
  public month: number = new Date().getMonth();

  @Prop()
  public loc = getDefaultLocale();

  @Prop()
  public showCalendarWeek: boolean = true;

  @Prop()
  public displayedMonths: number = 1;

  @Prop()
  public dateDecorator: OgDateDecorator;

  @Prop()
  public selectionType: OgCalendarSelectionType = 'single';

  @Prop({ reflect: true, mutable: true })
  public selection: OgCalendarDate[] = [];

  @Event()
  public dateClicked: EventEmitter<OgCalendarDate>;

  @Event()
  public selectionChanged: EventEmitter<OgCalendarDate[]>;

  private internalMoment;

  public async componentWillLoad() {
    await loadMomentLocale(this.loc, moment);
    this.internalMoment = moment();
  }

  public handleDateClick(event) {
    event.cancelBubble = true;

    const date = CalendarUtils.moment2CalendarDate(event.detail);
    if (this.selectionType !== 'none') {
      if (this.selectionType === 'single' || !this.selection) {
        this.selection = [date];
      } else {
        // multi
        // todo: implement selection types: range + multi-range
        const index = this.selection.findIndex(s => CalendarUtils.compareCalendarDate(s, date));
        if (index >= 0) {
          this.selection.splice(index, 1);
        } else {
          this.selection.push(date);
        }
        this.selection = [...this.selection];
      }
    }
    this.dateClicked.emit(date);
    this.selectionChanged.emit(this.selection);
  }

  public increaseMonth() {
    this.internalMoment.add(1, 'M');
    this.month = this.internalMoment.month();
    this.year = this.internalMoment.year();
  }

  public decreaseMonth() {
    this.internalMoment.subtract(1, 'M');
    this.month = this.internalMoment.month();
    this.year = this.internalMoment.year();
  }

  public render(): HTMLElement[] {
    this.internalMoment.locale(this.loc);
    this.internalMoment.year(this.year);
    this.internalMoment.month(this.month);

    const localM = this.internalMoment.clone();
    const result: HTMLElement[] = [];
    for (let i = 0; i < this.displayedMonths; i++) {
      result.push(
        <div class="calendar__container">
          <div class="calendar__header">
            <div class="calender__header__prefix">
              <span class={ 'calendar__nav' + (i > 0 ? ' calendar__nav--hidden' : '') } onClick={ () => this.decreaseMonth() }>
                <svg
                  class={ 'calendar__nav__icon' }
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 14 24"
                  preserveAspectRatio="none"
                >
                  <polyline
                    class="og-"
                    points="12,2 2,12 12,24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecaps="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </div>
            <div class="calender__header__main">
              <span class="calender__header__month">{ localM.format('MMM') }</span><span class="calender__header__year">{ localM.year() }</span>
            </div>
            <div class="calender__header__suffix">
              <div class={ 'calendar__nav' + (i < this.displayedMonths - 1 ? ' calendar__nav--hidden' : '') } onClick={ () => this.increaseMonth() }>
                <svg
                  class={ 'calendar__nav__icon' }
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 14 24"
                  preserveAspectRatio="none"
                >
                  <polyline
                    class="og-"
                    points="2,2 12,12 2,24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecaps="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          <og-internal-calendar
            class="calendar__main"
            month={ localM.month() }
            year={ localM.year() }
            loc={ this.loc }
            showCalendarWeek={ this.showCalendarWeek }
            dateDecorator={ this.dateDecorator }
            selection={ this.selection }
            onDateClicked={ e => this.handleDateClick(e) }>
          </og-internal-calendar>
        </div>
      );
      localM.add(1, 'M');
    }
    return result;
  }
}
