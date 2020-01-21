declare type Moment = any;

export interface OgDateDecorator {
  getDateDecoration(moment: Moment): OgDateDecoration;
}

export interface OgDateDecoration {
  class: OgDateDecorationClass;
}

export type OgDateDecorationClass = 'day--disabled' | 'day--highlight' | '';
export type OgCalendarSelectionType = 'none' | 'single'/* | 'multi' | 'range' | 'multi-range'*/;

export interface OgCalendarDate {
  year: number;
  month: number;
  date: number;
}
