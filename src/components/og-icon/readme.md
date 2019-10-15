# og-icon



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                        | Type      | Default     |
| ---------- | ---------- | -------------------------------------------------- | --------- | ----------- |
| `disabled` | `disabled` | Determines, whether the control is disabled or not | `boolean` | `undefined` |
| `label`    | `label`    | The label of the icon                            | `string`  | `undefined` |


## Events

| Event     | Description                                | Type               |
| --------- | ------------------------------------------ | ------------------ |
| `clicked` | Event is being emitted when value changes. | `CustomEvent<any>` |


## CSS Custom Properties

| Name                               | Description                                  |
| ---------------------------------- | -------------------------------------------- |
| `--og-icon-Background`           | Main background color of the icon          |
| `--og-icon-Background--active`   | Background color when the icon is clicked  |
| `--og-icon-Background--disabled` | Background color when the icon is disabled |
| `--og-icon-Background--hover`    | Background color when the icon is hovered  |
| `--og-icon-BorderRadius`         | Border radius of the icon                  |
| `--og-icon-Color`                | Text color of the icon label               |
| `--og-icon-Color--active`        | Text color when the icon is clicked        |
| `--og-icon-Color--disabled`      | Text color when the icon is disabled       |
| `--og-icon-Color--hover`         | Text color when the icon is hovered        |


## Dependencies

### Used by

 - [og-confirm-dialog](..\og-dialog\og-confirm-dialog)
 - [og-message-dialog](..\og-dialog\og-message-dialog)

### Graph
```mermaid
graph TD;
  og-confirm-dialog --> og-icon
  og-message-dialog --> og-icon
  style og-icon fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
