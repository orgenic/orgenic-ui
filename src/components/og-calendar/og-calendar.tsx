/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { Component, Prop } from '@stencil/core';
import moment, { Moment } from 'moment';
import { OgDateDecorator } from './interfaces/og-calendar-date-decorator';

@Component({
  tag: 'og-calendar',
  styleUrl: 'og-calendar.scss',
  shadow: true
})
export class OgCalendar {
    @Prop() year: number = new Date().getFullYear();
    @Prop() month: number = new Date().getMonth();

    @Prop() showCalendarWeek: boolean = true;
    @Prop() dateDecorator: OgDateDecorator;

    // todo
    // @Prop() selectionType: 'single' | 'multi' | 'range';

    private firstDayOfWeek = 0;
    private m = moment();

    getClasses(m: Moment) {
        let result = '';
        if (m.isSame(new Date(), "day")) {
            result += 'today ';
        }
        if (m.year() === this.year && m.month() === this.month) {
            result += 'sameMonth ';

            if (this.dateDecorator) {
                const dd = this.dateDecorator.getDateDecoration(m.clone());
                if (dd.class) {
                    result += dd.class + ' ';
                }
            }
        } else {
            result += 'disabled ';
        }
        return result;
    }

    getDayArray() {
        return [0,1,2,3,4,5,6].map(d => {
            return (d + this.firstDayOfWeek) % 7;
        });
    }

    render() {
        this.m.year(this.year);
        this.m.month(this.month);
        this.m.date(1);
        this.m.day(this.firstDayOfWeek); // last monday
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
                                { this.showCalendarWeek && <td class="week">{ this.m.week() }</td> }
                                {
                                    [0,1,2,3,4,5,6].map(() => {
                                        const result = <td class={ this.getClasses(this.m) }>{ this.m.date() }</td>;
                                        this.m.add(1, 'd');
                                        return result;
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
