/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { Component, Prop } from '@stencil/core';
import moment from 'moment';
import { OgDateDecorator } from '../og-calendar/interfaces/og-calendar-date-decorator';

@Component({
  tag: 'og-calendar-group',
  styleUrl: 'og-calendar-group.scss',
  shadow: true
})
export class OgCalendarGroup {
    @Prop({ reflectToAttr: true, mutable: true }) year: number = new Date().getFullYear();
    @Prop({ reflectToAttr: true, mutable: true }) month: number = new Date().getMonth();

    @Prop() showCalendarWeek: boolean = true;
    @Prop() displayedMonths: number = 3;
    @Prop() dateDecorator: OgDateDecorator;

    private m = moment();

    increseMonth() {
        this.m.add(1, 'M');
        this.month = this.m.month();
        this.year = this.m.year();
        console.log(this.month, this.year);
    }

    decreaseMonth() {
        this.m.subtract(1, 'M');
        this.month = this.m.month();
        this.year = this.m.year();
        console.log(this.month, this.year);
    }

    render() {
        this.m.year(this.year);
        this.m.month(this.month);

        const localM = this.m.clone();
        const result = [];
        for (let i = 0; i < this.displayedMonths; i++) {
            result.push(
                <div class="calendar-container">
                    <div class="calendar-header">
                        <span class={ 'change-month' + (i > 0 ? ' hidden' : '') } onClick={ () => this.decreaseMonth() }>&lt;</span>
                        <span>{ localM.format('MMM') } { localM.year() }</span>
                        <span class={ 'change-month' + (i < this.displayedMonths - 1 ? ' hidden' : '') } onClick={ () => this.increseMonth() }>&gt;</span>
                    </div>
                    <og-calendar
                        month={ localM.month() }
                        year={ localM.year() }
                        showCalendarWeek={ this.showCalendarWeek }
                        dateDecorator={ this.dateDecorator }>
                    </og-calendar>
                </div>
            );
            localM.add(1, 'M');
        }
        return result;
    }
}
