# og-number-input



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                         | Type      | Default     |
| ------------- | ------------- | --------------------------------------------------- | --------- | ----------- |
| `disabled`    | `disabled`    | Determines, whether the control is disabled or not. | `boolean` | `undefined` |
| `max`         | `max`         | Maximum value for this component.                   | `number`  | `undefined` |
| `min`         | `min`         | Minimum value for this component.                   | `number`  | `undefined` |
| `placeholder` | `placeholder` | Optional placeholder text if input is empty.        | `string`  | `undefined` |
| `step`        | `step`        | Increment or decrement steps for the value.         | `number`  | `undefined` |
| `value`       | `value`       | The initial value. Can be updated at runtime.       | `number`  | `undefined` |


## Events

| Event          | Description                                    | Type                      |
| -------------- | ---------------------------------------------- | ------------------------- |
| `focusGained`  | Event is being emitted when input gets focus.. | `CustomEvent<FocusEvent>` |
| `focusLost`    | Event is being emitted when focus gets lost.   | `CustomEvent<FocusEvent>` |
| `valueChanged` | Event is being emitted when value changes.     | `CustomEvent<number>`     |


## CSS Custom Properties

| Name                                      | Description                                        |
| ----------------------------------------- | -------------------------------------------------- |
| `--og-input-Background`                   | Main background of the input container (shorthand) |
| `--og-input-BorderColor`                  | Main border color of the input container           |
| `--og-input-Padding`                      | Main padding of the input field                    |
| `--og-input__indicator-Background`        | Background of the focus indicator (shorthand)      |
| `--og-input__indicator-Height`            | Height of the focus indicator                      |
| `--og-input__indicator-Width`             | Width of the focus indicator                       |
| `--og-input__input-Background`            | Background of the input field (shorthand)          |
| `--og-input__input-BorderColor`           | Border color of the input field                    |
| `--og-input__input-BorderColor--disabled` | Border color of the input field when disabled      |
| `--og-input__input-Color`                 | Text color of the input field                      |
| `--og-input__input-Color--disabled`       | Text color of the input field when disabled        |
| `--og-input__input-FontFamily`            | Font of the input field                            |
| `--og-input__input-FontSize`              | Font size of the input field                       |
| `--og-input__input-LineHeight`            | Line height of the input field                     |
| `--og-input__input-Padding`               | Padding of the input field                         |
| `--og-input__input-TextTransform`         | Text-transform property of input field             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
