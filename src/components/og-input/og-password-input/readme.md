# og-password-input



<!-- Auto Generated Below -->


## Properties

| Property                       | Attribute                         | Description                                                                     | Type      | Default     |
| ------------------------------ | --------------------------------- | ------------------------------------------------------------------------------- | --------- | ----------- |
| `disabled`                     | `disabled`                        | Determines, whether the control is disabled or not.                             | `boolean` | `undefined` |
| `passwordVisible`              | `password-visible`                | Define, whether the password is visible or not.                                 | `boolean` | `false`     |
| `placeholder`                  | `placeholder`                     | Optional placeholder text if input is empty.                                    | `string`  | `undefined` |
| `showTogglePasswordVisibility` | `show-toggle-password-visibility` | Define, whether a switch should be visible, to show the password in plain text. | `boolean` | `false`     |
| `value`                        | `value`                           | The initial value. Can be updated at runtime.                                   | `string`  | `undefined` |


## Events

| Event          | Description                                    | Type                      |
| -------------- | ---------------------------------------------- | ------------------------- |
| `focusGained`  | Event is being emitted when input gets focus.. | `CustomEvent<FocusEvent>` |
| `focusLost`    | Event is being emitted when focus gets lost.   | `CustomEvent<FocusEvent>` |
| `valueChanged` | Event is being emitted when value changes.     | `CustomEvent<string>`     |


## Methods

### `togglePasswordVisibility() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
