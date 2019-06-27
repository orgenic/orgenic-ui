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

  public async componentWillLoad() {
    await loadMomentLocale(this.loc, moment);
    this.internalMoment = moment();
  }

  public getFirstDayOfWeek() {
    return this.internalMoment.startOf('week').day();
  }

  public getDayArray() {
    return [0,1,2,3,4,5,6].map(d => {
      return (d + this.getFirstDayOfWeek()) % 7;
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

    const firstDayOfWeek = this.getFirstDayOfWeek();

    if (this.internalMoment.day() < firstDayOfWeek) {
      this.internalMoment.day(firstDayOfWeek - 7);
    } else {
      this.internalMoment.day(firstDayOfWeek);
    }
  }

  public render(): HTMLElement[] {
    this.setUpInternalMoment();

    return [
      <table>
        <thead>
          <tr>
            { this.showCalendarWeek && <th></th> }
            {
              this.getDayArray().map((d): HTMLElement => {
                return <th>{ this.internalMoment.day(d).format('dd') }</th>;
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            [0,1,2,3,4,5].map((): HTMLElement => {
              return (<tr>
                { this.showCalendarWeek && <td class="week">{ this.internalMoment.week() }</td> }
                {
                  [0,1,2,3,4,5,6].map((): HTMLElement => {
                    const localM = this.internalMoment.clone();
                    this.internalMoment.add(1, 'd');
                    return <td
                      class={ this.getClasses(localM) }
                      onClick={ () => this.dateClicked.emit(localM) }>
                      { localM.date() }
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
