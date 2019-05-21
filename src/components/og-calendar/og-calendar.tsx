/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { Component, Prop, Event, EventEmitter } from '@stencil/core';
import moment, { Moment } from 'moment';
import { OgDateDecorator, OgCalendarDate } from './interfaces/og-calendar-date-decorator';
import { CalendarUtils } from './utils/utils';

@Component({
  tag: 'og-calendar',
  styleUrl: 'og-calendar.scss',
  shadow: true
})
export class OgCalendar {
    @Prop() year: number = new Date().getFullYear();
    @Prop() month: number = new Date().getMonth();

    @Prop() showCalendarWeek: boolean = true;
    @Prop() firstDayOfWeek: number = 0;
    @Prop() dateDecorator: OgDateDecorator;

    @Prop() selection: OgCalendarDate[];

    @Event() dateClicked: EventEmitter<Moment>;

    private internalMoment = moment();

    getDayArray() {
        return [0,1,2,3,4,5,6].map(d => {
            return (d + this.firstDayOfWeek) % 7;
        });
    }

    getClasses(m: Moment) {
        let result = 'day';
        if (m.isSame(new Date(), "day")) {
            result += ' today';
        }

        if (m.year() === this.year && m.month() === this.month) {
            result += ' sameMonth';
            if (this.selection && this.selection.find(s => CalendarUtils.compareCalendarDate2Moment(s, m))) {
                result += ' selected';
            }
            if (this.dateDecorator) {
                const dd = this.dateDecorator.getDateDecoration(m.clone());
                if (dd.class) {
                    result += ` ${dd.class}`;
                }
            }
        } else {
            result += ' disabled';
        }
        return result;
    }

    private setUpInternalMoment() {
        this.internalMoment.year(this.year);
        this.internalMoment.month(this.month);
        this.internalMoment.date(1);

        if (this.internalMoment.day() < this.firstDayOfWeek) {
            this.internalMoment.day(this.firstDayOfWeek - 7);
        } else {
            this.internalMoment.day(this.firstDayOfWeek);
        }
    }

    render() {
        this.setUpInternalMoment();

        return (
            <table>
                <thead>
                    <tr>
                        { this.showCalendarWeek && <td>KW</td> }
                        {
                            this.getDayArray().map(d => {
                                return <td>{ moment().day(d).format('dd') }</td>;
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        [0,1,2,3,4,5].map(() => {
                            return (<tr>
                                { this.showCalendarWeek && <td class="week">{ this.internalMoment.week() }</td> }
                                {
                                    [0,1,2,3,4,5,6].map(() => {
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
        );
    }
}
