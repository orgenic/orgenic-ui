# og-list



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute            | Description                                                                         | Type      | Default                |
| ------------------ | -------------------- | ----------------------------------------------------------------------------------- | --------- | ---------------------- |
| `disabled`         | `disabled`           | Determines, whether the control is disabled or not                                  | `boolean` | `undefined`            |
| `disabledProperty` | `disabled-property`  | Set the property for the items to define as disabled. Default: "disabled"           | `string`  | `'disabled'`           |
| `emptyListMessage` | `empty-list-message` | Set the that will be displayed if the items array is empty.                         | `string`  | `'No items available'` |
| `imageUrlProperty` | `image-url-property` | Set the property for the items to define as image url. *Optional* Default: no image | `string`  | `undefined`            |
| `items`            | --                   | An array of items to choose from                                                    | `any[]`   | `undefined`            |
| `keyProperty`      | `key-property`       | Set the property for the items to define as value. Default: "key"                   | `string`  | `'key'`                |
| `labelProperty`    | `label-property`     | Set the property for the items to define as label. Default: "label"                 | `string`  | `'label'`              |
| `selected`         | `selected`           | The key of the selected list item                                                   | `string`  | `undefined`            |
| `valueProperty`    | `value-property`     | Set the property for the items to define as value. *Optional* Default: no value     | `string`  | `undefined`            |


## Events

| Event          | Description                                | Type               |
| -------------- | ------------------------------------------ | ------------------ |
| `itemSelected` | Event is being emitted when value changes. | `CustomEvent<any>` |


## CSS Custom Properties

| Name                                    | Description                                           |
| --------------------------------------- | ----------------------------------------------------- |
| `--og-list-Opacity`                     | Overall opacity of the list                           |
| `--og-list__item-Background`            | Background of the list item (shorthand)               |
| `--og-list__item-Background--active`    | Background of the list item when selected (shorthand) |
| `--og-list__item-Background--highlight` | Background of the list item when hovered (shorthand)  |
| `--og-list__item-BorderColor`           | Border color of the list item                         |
| `--og-list__item-BorderRadius`          | Border radius of the list item                        |
| `--og-list__item-BorderStyle`           | Border style of the list item                         |
| `--og-list__item-BorderWidth`           | Border width of the list item                         |
| `--og-list__item-Color`                 | Text color of the list item                           |
| `--og-list__item-Color--disabled`       | Text color of the list item when disabled             |
| `--og-list__item-Margin`                | Margin of the list item                               |
| `--og-list__item-MinHeight`             | Minimum height of the list item                       |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
