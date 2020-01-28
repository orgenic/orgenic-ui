/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { h, Component, Prop, Event, EventEmitter } from '@stencil/core';
import moment, { Moment } from 'moment';
import { OgDateDecorator, OgCalendarDate } from './interfaces/og-calendar-date-decorator';
import { CalendarUtils } from './utils/utils';
import { loadMomentLocale, getDefaultLocale } from '../../utils/moment-locale-loader';

@Component({
  tag: 'og-internal-calendar',
  styleUrl: 'og-internal-calendar.scss',
  shadow: true
})
export class OgInternalCalendar {
  @Prop({ context: 'resourcesUrl' })
  public resourcesUrl!: string;

  @Prop()
  public year: number = new Date().getFullYear();
  @Prop()
  public month: number = new Date().getMonth();

  @Prop()
  public loc = getDefaultLocale();

  @Prop()
  public showCalendarWeek: boolean = true;
  @Prop()
  public dateDecorator: OgDateDecorator;

  @Prop()
  public selection: OgCalendarDate[];

  @Event()
  public dateClicked: EventEmitter; // emits moment object

  private internalMoment: Moment;
  private firstDayOfWeek: number = 0;
  private weekDayArray: number[] = [0, 1, 2, 3, 4, 5, 6];

  public async componentWillLoad() {
    await loadMomentLocale(this.loc, moment);
    this.internalMoment = moment();
  }

  /**
   * Sets the date of the `internalMoment` object to the first weekday
   * and stores the information about the start of the week as `firstDayOfWeek`
   */
  public setFirstDayOfWeek() {
    this.firstDayOfWeek = this.internalMoment.startOf('week').day();
  }

  private calculateDayArray() {
    this.weekDayArray = [0, 1, 2, 3, 4, 5, 6].map(d => {
      return (d + this.firstDayOfWeek) % 7;
    });
  }

  public getClasses(m: Moment) {
    let result = 'day';
    if (m.isSame(new Date(), "day")) {
      result += ' day--today';
    }

    if (m.year() === this.year && m.month() === this.month) {
      result += ' day--same-month';
      if (this.selection && this.selection.find(s => CalendarUtils.compareCalendarDate2Moment(s, m))) {
        result += ' day--selected';
      }
      if (this.dateDecorator) {
        const dd = this.dateDecorator.getDateDecoration(m.clone());
        if (dd.class) {
          result += ` ${dd.class}`;
        }
      }
    } else {
      result += ' day--disabled';
    }
    return result;
  }

  private setUpInternalMoment() {
    this.internalMoment.locale(this.loc);

    this.internalMoment.year(this.year);
    this.internalMoment.month(this.month);
    this.internalMoment.date(1);

    this.setFirstDayOfWeek();
    this.calculateDayArray();
  }

  public render(): HTMLElement[] {
    this.setUpInternalMoment();

    return [
      <table>
        <thead>
          <tr>
            {this.showCalendarWeek && <th></th>}
            {
              this.weekDayArray.map((d): HTMLElement => {
                const localM = this.internalMoment.clone();
                return <th>{localM.day(d).format('dd')}</th>;
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            [0, 1, 2, 3, 4, 5].map((): HTMLElement => {
              return (<tr>
                {this.showCalendarWeek && <td class="week">{this.internalMoment.week()}</td>}
                {
                  this.weekDayArray.map((): HTMLElement => {
                    const localM = this.internalMoment.clone();
                    this.internalMoment.add(1, 'd');
                    return <td
                      class={this.getClasses(localM)}
                      onClick={() => this.dateClicked.emit(localM)}>
                      {localM.date()}
                    </td>;
                  })
                }
              </tr>)
            })
          }
        </tbody>
      </table>
    ];
  }
}
