import { Moment } from "moment";

export interface OgDateDecorator {
    getDateDecoration(moment: Moment): OgDateDecoration
}

export interface OgDateDecoration {
    class: OgDateDecorationClass;
}

export type OgDateDecorationClass = 'disabled' | 'highlight' | '';
