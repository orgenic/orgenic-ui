/**
 * ORGENIC-UI
 * @license MIT
 * See LICENSE file at https://github.com/orgenic/orgenic-ui/blob/master/LICENSE
 **/

export interface OgListItemInterface {
  disabled: boolean;
  item: any;
  selected: boolean;
  options: OgListItemOptions;
}

export interface OgListItemOptions {
  image?: string;
  disabled?: string;
  key: any;
  label?: string;
  overline?: string;
  subline?: string;
  value?: string;
}
