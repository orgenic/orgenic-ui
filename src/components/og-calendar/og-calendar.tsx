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

    // private lang = 'de';

    // constructor() {
    //     // this.loadLang('de');

    //     moment.locale(`build/moment-locales/${this.lang}.js`);

    //     setTimeout(() => {
    //         import(`build/moment-locales/${this.lang}.js`);
    //         console.log(moment.locales());
    //     }, 500);
    // }

    // async loadLang(lang) {
    //     const response = await fetch(`build/moment-locales/${lang}.js`);
    //     console.log(await response.text());
    //     // const module = await import(`build/moment-locales/${lang}.js`);
    //     // moment.locale('de');
    //     // console.log('module', module);
    //     moment.locale(await response.text());
    //     console.log(moment.locales());
    // }

    getDayArray() {
        return [0,1,2,3,4,5,6].map(d => {
            return (d + this.firstDayOfWeek) % 7;
        });
    }

    getClasses(m: Moment) {
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
                {/* ( this.lang && <script src={ `build/moment-locales/${this.lang}.js` }></script>) */}
                <thead>
                    <tr>
                        { this.showCalendarWeek && <th>KW</th> }
                        {
                            this.getDayArray().map(d => {
                                return <th>{ moment().day(d).format('dd') }</th>;
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
