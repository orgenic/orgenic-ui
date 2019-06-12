import moment, { Moment } from 'moment';
import { OgCalendarDate } from '../interfaces/og-calendar-date-decorator';

export class CalendarUtils {
    static compareCalendarDate(date1: OgCalendarDate, date2: OgCalendarDate) {
        return date1.year === date2.year && date1.month === date2.month && date1.date === date2.date;
    }

    static compareCalendarDate2Moment(date: OgCalendarDate, moment: Moment) {
        return date.year === moment.get('y') && date.month === moment.get('M') && date.date === moment.get('D');
    }

    static moment2CalendarDate(moment: Moment): OgCalendarDate {
        return { year: moment.get('y'), month: moment.get('M'), date: moment.get('D') };
    }

    static calendarDate2Moment(date: OgCalendarDate, locale?: string): Moment {
        if (!date) {
            return;
        }
        const result = moment();
        if (locale) {
            result.locale(locale);
        }
        return result.year(date.year).month(date.month).date(date.date);
    }
}
