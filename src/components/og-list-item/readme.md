# og-list-item



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                                                                           | Type      | Default     |
| ------------ | ------------- | ------------------------------------------------------------------------------------- | --------- | ----------- |
| `image`      | `image`       | Set the url of the image to be shown in the placeholder                               | `string`  | `undefined` |
| `isDisabled` | `is-disabled` | Set the flag, it this list item is in disabled state.                                 | `boolean` | `undefined` |
| `isSelected` | `is-selected` | Set the flag, if this list item is in selected state.                                 | `boolean` | `undefined` |
| `key`        | `key`         | The value is needed for the using @see OgList instance to correctly handle selection. | `any`     | `undefined` |
| `label`      | `label`       | Sets the value of the label.                                                          | `string`  | `undefined` |
| `showImage`  | `show-image`  | Set flag, if place for an image is reserved, whether used or not.                     | `boolean` | `undefined` |
| `showValue`  | `show-value`  | Set flag, if place for a value badge is reserved whether used or not                  | `boolean` | `undefined` |
| `value`      | `value`       | Set the value to be shown in the badge placeholder                                    | `string`  | `undefined` |


## CSS Custom Properties

| Name                           | Description                                           |
| ------------------------------ | ----------------------------------------------------- |
| `--item-Background`            | Background of the list item (shorthand)               |
| `--item-Background--active`    | Background of the list item when selected (shorthand) |
| `--item-Background--highlight` | Background of the list item when hovered (shorthand)  |
| `--item-BorderColor`           | Border color of the list item                         |
| `--item-BorderRadius`          | Border radius of the list item                        |
| `--item-BorderStyle`           | Border style of the list item                         |
| `--item-BorderWidth`           | Border width of the list item                         |
| `--item-Color`                 | Text color of the list item                           |
| `--item-Margin`                | Margin of the list item                               |
| `--item-MinHeight`             | Minimum height of the list item                       |
| `--item-Opacity`               | Opacity of the list item;                             |
| `--item-Opacity--disabled`     | Opacity of the list item;                             |


## Dependencies

### Used by

 - [og-list](..\og-list)

### Graph
```mermaid
graph TD;
  og-list --> og-list-item
  style og-list-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
