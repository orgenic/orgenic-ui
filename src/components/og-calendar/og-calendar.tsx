/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { Component, Prop, Event, EventEmitter, State } from '@stencil/core';
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

    private lang = 'de';

    @State()
    private locale: string;

    constructor() {

        setTimeout(() => {
            this.loadLang(this.lang);
        }, 500);

        // moment.locale(`build/moment-locales/${this.lang}.js`);

        // setTimeout(() => {
        //     import(`build/moment-locales/${this.lang}.js`);
        //     console.log(moment.locales());
        // }, 500);
    }

    async loadLang(lang) {
        const url = `/build/moment-locales/${lang}.js`;
        // moment.enableLazyLoading(null);
        // moment.addLocale(url);
        // import url;
        // const module = await import(url);

        // const response = await fetch(url);
        // this.locale = await response.text();
        // moment.updateLocale(lang, eval(this.locale)(moment));

        // moment.updateLocale(lang, {
        //     months : 'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
        //     monthsShort : 'Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.'.split('_'),
        //     monthsParseExact : true,
        //     weekdays : 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
        //     weekdaysShort : 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
        //     weekdaysMin : 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
        //     weekdaysParseExact : true,
        // } as any);

        // import(url).then(() =>
        //     moment.locale(lang)
        // );


        // import * from url;
        // moment.locale(await response.text());
        console.log(url, moment.locales());

        // const scriptContainer = document.getElementById('addHere');
        // const s = document.createElement('script');
        // s.textContent = this.locale;
        // scriptContainer.appendChild(s);
    }

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


        return [
            <div id="addHere"></div>,
            <script innerHTML={this.locale}></script>,
            <table>
                <thead>
                    <tr>
                        { this.showCalendarWeek && <th></th> }
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
        ];
    }
}
