# og-list



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute            | Description                                                                                                                                                                                                          | Type                 | Default                |
| ------------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ---------------------- |
| `disabled`         | `disabled`           | Determines, whether the control is disabled or not                                                                                                                                                                   | `boolean`            | `undefined`            |
| `disabledProperty` | `disabled-property`  | Set the property for the items to define as disabled. Default: 'disabled'                                                                                                                                            | `string`             | `'disabled'`           |
| `emptyListMessage` | `empty-list-message` | Set the text that will be displayed if the items array is empty.                                                                                                                                                     | `string`             | `'No items available'` |
| `imageUrlProperty` | `image-url-property` | Set the property for the items to define as image url. *Optional* Default: no image                                                                                                                                  | `string`             | `undefined`            |
| `items`            | --                   | An array of items to choose from                                                                                                                                                                                     | `any[]`              | `undefined`            |
| `keyProperty`      | `key-property`       | Set the property for the items to define as value. Default: 'key'                                                                                                                                                    | `string`             | `'key'`                |
| `labelProperty`    | `label-property`     | Set the property for the items to define as label. Default: 'label'                                                                                                                                                  | `string`             | `'label'`              |
| `multiselect`      | `multiselect`        | Enables selection of multiple items                                                                                                                                                                                  | `boolean`            | `false`                |
| `required`         | `required`           | Requires a selection of at least one item. If one item is selected it prevents the user from deselecting it                                                                                                          | `boolean`            | `undefined`            |
| `selected`         | `selected`           | Key(s) of the selected list item(s)                                                                                                                                                                                  | `string \| string[]` | `undefined`            |
| `template`         | `template`           | Name of the template (component) we want to use as list item.                                                                                                                                                        | `string`             | `'og-list-item'`       |
| `templateOptions`  | `template-options`   | Contains an Object with options to match template properties.  Mandatory: {key: any}  Default template: {key: any, label: string, subline: string, overline: string, image: string, value: string, disabled: string} | `any`                | `undefined`            |
| `valueProperty`    | `value-property`     | Set the property for the items to define as value. *Optional* Default: no value                                                                                                                                      | `string`             | `undefined`            |


## Events

| Event          | Description                                | Type               |
| -------------- | ------------------------------------------ | ------------------ |
| `itemSelected` | Event is being emitted when value changes. | `CustomEvent<any>` |


## CSS Custom Properties

| Name                                   | Description                                                                   |
| -------------------------------------- | ----------------------------------------------------------------------------- |
| `--og-list-item-Background`            | Background of the list item (shorthand)                                       |
| `--og-list-item-Background--active`    | Background of the list item when selected (shorthand)                         |
| `--og-list-item-Background--highlight` | Background of the list item when hovered (shorthand)                          |
| `--og-list-item-BorderColor`           | Border color of the list item                                                 |
| `--og-list-item-BorderRadius`          | Border radius of the list item                                                |
| `--og-list-item-BorderStyle`           | Border style of the list item                                                 |
| `--og-list-item-BorderWidth`           | Border width of the list item                                                 |
| `--og-list-item-Color`                 | Text color of the list item                                                   |
| `--og-list-item-Cursor`                | Cursor appearance when hovered                                                |
| `--og-list-item-Margin`                | Margin (outer spacing) of the list item                                       |
| `--og-list-item-MinHeight`             | Minimum Height of the content area.                                           |
| `--og-list-item-Opacity`               | Opacity of the list item                                                      |
| `--og-list-item-Opacity--disabled`     | Opacity of the list item when disabled                                        |
| `--og-list-item-PointerEvents`         | Pointer Events of the list item. Will be set to 'none' when item is disabled. |
| `--og-list-item__content-AlignItems`   | Align (flex) items relatively to the baseline.                                |
| `--og-list-item__content-Height`       | Height of the content area.                                                   |
| `--og-list-item__content-Padding`      | Padding (inner spacing) of the content area.                                  |
| `--og-list-item__icon-Width`           | Width of the "prefix" icon.                                                   |
| `--og-list-item__label-FontSize`       | Fontsize of the label.                                                        |
| `--og-list-item__label-LineHeight`     | Lineheight of the label.                                                      |
| `--og-list-item__label-Padding`        | Padding (inner spacing) of the label.                                         |
| `--og-list-item__overline-Color`       | Color of the overline.                                                        |
| `--og-list-item__overline-FontSize`    | Fontsize of the overline.                                                     |
| `--og-list-item__overline-LineHeight`  | Lineheight of the overline.                                                   |
| `--og-list-item__overline-Padding`     | Padding (inner space) of the overline.                                        |
| `--og-list-item__subline-Color`        | Color of the subline.                                                         |
| `--og-list-item__subline-FontSize`     | Fontsize of the subline.                                                      |
| `--og-list-item__subline-Padding`      | Padding (inner space) of the subline.                                         |
| `--og-list-item__value-Padding`        | Padding of the value.                                                         |
| `--og-list-Opacity`                    | Overall opacity of the list                                                   |
| `--og-list-Opacity--disabled`          | Overall opacity of the list when disabled                                     |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
