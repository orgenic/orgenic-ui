# og-textarea



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                         | Type      | Default     |
| ------------- | ------------- | --------------------------------------------------- | --------- | ----------- |
| `autofocus`   | `autofocus`   | Optional autofocus input element.                   | `boolean` | `undefined` |
| `disabled`    | `disabled`    | Determines, whether the control is disabled or not. | `boolean` | `undefined` |
| `placeholder` | `placeholder` | Optional placeholder text if textarea is empty.     | `string`  | `undefined` |
| `value`       | `value`       | The initial value. Can be updated at runtime.       | `string`  | `undefined` |


## Events

| Event          | Description                                   | Type                      |
| -------------- | --------------------------------------------- | ------------------------- |
| `focusGained`  | Event is being emitted when input gets focus. | `CustomEvent<FocusEvent>` |
| `focusLost`    | Event is being emitted when focus gets lost.  | `CustomEvent<FocusEvent>` |
| `valueChanged` | Event is being emitted when value changes.    | `CustomEvent<string>`     |


## CSS Custom Properties

| Name                                            | Description                                   |
| ----------------------------------------------- | --------------------------------------------- |
| `--og-textarea-Background`                      | Main background of the textarea container     |
| `--og-textarea-Padding`                         | Main padding of the textarea container        |
| `--og-textarea__indicator-Background`           | Background of the focus indicator (shorthand) |
| `--og-textarea__indicator-Display`              | Box model of the focus indicator              |
| `--og-textarea__indicator-Height`               | Height of the focus indicator                 |
| `--og-textarea__indicator-Width`                | Width of the focus indicator                  |
| `--og-textarea__placeholder-Color`              | Text color of the placeholder                 |
| `--og-textarea__placeholder-Opacity`            | Opacity of the unhidden placeholder           |
| `--og-textarea__textarea-Background`            | Background of the textarea                    |
| `--og-textarea__textarea-BorderColor`           | Border color of the textarea                  |
| `--og-textarea__textarea-BorderColor--disabled` | Border color of the textarea when disabled    |
| `--og-textarea__textarea-BorderWidth`           | Border width of the textarea                  |
| `--og-textarea__textarea-Color`                 | Text color of the textarea                    |
| `--og-textarea__textarea-Color--disabled`       | Text color of the textarea when disabled      |
| `--og-textarea__textarea-FontFamily`            | Font of the textarea                          |
| `--og-textarea__textarea-FontSize`              | Font size of the textarea                     |
| `--og-textarea__textarea-LineHeight`            | Line height of the textarea                   |
| `--og-textarea__textarea-Padding`               | Padding of the textarea                       |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
