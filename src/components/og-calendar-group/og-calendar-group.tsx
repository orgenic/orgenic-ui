/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

import { Component, Prop, EventEmitter, Event } from '@stencil/core';
import moment from 'moment';
import { OgDateDecorator, OgCalendarSelectionType, OgCalendarDate } from '../og-calendar/interfaces/og-calendar-date-decorator';
import { CalendarUtils } from '../og-calendar/utils/utils';

@Component({
  tag: 'og-calendar-group',
  styleUrl: 'og-calendar-group.scss',
  shadow: true
})
export class OgCalendarGroup {
    @Prop({ reflectToAttr: true, mutable: true }) year: number = new Date().getFullYear();
    @Prop({ reflectToAttr: true, mutable: true }) month: number = new Date().getMonth();

    @Prop() showCalendarWeek: boolean = true;
    @Prop() firstDayOfWeek: number = 0;
    @Prop() displayedMonths: number = 1;
    @Prop() dateDecorator: OgDateDecorator;

    @Prop() selectionType: OgCalendarSelectionType = 'single';
    @Prop({ reflectToAttr: true, mutable: true }) selection: OgCalendarDate[];

    @Event() dateClicked: EventEmitter<OgCalendarDate>;
    @Event() selectionChanged: EventEmitter<OgCalendarDate[]>;

    private m = moment();

    handleDateClick(event) {
        event.cancelBubble = true;

        const date = CalendarUtils.moment2CalendarDate(event.detail);
        if (!this.selection) {
            this.selection = [date];
        } else{
            const index = this.selection.findIndex(s => CalendarUtils.compareCalendarDate(s, date));
            if (index >= 0) {
                this.selection.splice(index, 1);
            } else {
                this.selection.push(date);
            }
            this.selection = [...this.selection];
        }
        this.dateClicked.emit(date);
        this.selectionChanged.emit(this.selection);
    }

    increseMonth() {
        this.m.add(1, 'M');
        this.month = this.m.month();
        this.year = this.m.year();
    }

    decreaseMonth() {
        this.m.subtract(1, 'M');
        this.month = this.m.month();
        this.year = this.m.year();
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
                        dateDecorator={ this.dateDecorator }
                        firstDayOfWeek={ this.firstDayOfWeek }
                        selection={ this.selection }
                        onDateClicked={ (e) => this.handleDateClick(e) }>
                    </og-calendar>
                </div>
            );
            localM.add(1, 'M');
        }
        return result;
    }
}
