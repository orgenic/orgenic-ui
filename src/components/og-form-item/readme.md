# og-form-item



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                                                                                                                                                                                                                                                                                                                     | Type                         | Default     |
| -------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ----------- |
| `disabled`     | `disabled`      | Determines weather the component is disabled, or not  This option will be transferred to the slotted element                                                                                                                                                                                                                                                                                    | `boolean`                    | `undefined` |
| `errorMessage` | `error-message` | An error message to display underneath the component  This will replace the info text, as long as the input is not valid. Should not be longer than two lines. Note, that this will put a margin under the component, even if the message is hidden.                                                                                                                                            | `string`                     | `undefined` |
| `infoText`     | `info-text`     | An info text to display underneath the component  Must not be longer than a single line! Will be replaced by an error message if given input is invalid. Note, that this will put a margin under the component.                                                                                                                                                                                 | `string`                     | `undefined` |
| `label`        | `label`         | Optional label for the form item                                                                                                                                                                                                                                                                                                                                                                | `string`                     | `undefined` |
| `pattern`      | `pattern`       | A regular expression used for field validation  The expression has to be provided without surrounding slashes and without flags. The form item is marked as valid, if the pattern matches the given value of the editor. If a more complex validation is needed, a custom validation function should be provided. (See *validation* for more information)  DO: ` [a-z]+ `  DON'T: ` /[a-z]+/g ` | `string`                     | `undefined` |
| `required`     | `required`      | Determines weather the component can be empty or not                                                                                                                                                                                                                                                                                                                                            | `boolean`                    | `false`     |
| `validation`   | --              | A custom function used for field validation  This function gets the editors value as parameter of type `string`` and returns `true` if the given value is valid.  Will be called every time the input of the editor changes.                                                                                                                                                                    | `(value: string) => boolean` | `undefined` |


## CSS Custom Properties

| Name                                  | Description                                                           |
| ------------------------------------- | --------------------------------------------------------------------- |
| `--og-form-item-Color--Error`         | Error color to use for displaying invalid state of the form item      |
| `--og-form-item__body-Background`     | Background of the form item container (shorthand values)              |
| `--og-form-item__body-Padding`        | Padding of the form item container (shorthand values)                 |
| `--og-form-item__error-Opacity`       | Opacity of the error message (should not be changed)                  |
| `--og-form-item__footer-Color`        | Text color of the info text and error messages                        |
| `--og-form-item__footer-LineHeight`   | LineHeight of the the info text and error messages (shorthand values) |
| `--og-form-item__footer-Padding`      | Padding of the the info text and error messages (shorthand values)    |
| `--og-form-item__info-Opacity`        | Opacity of the info text (should not be changed)                      |
| `--og-form-item__label-Color`         | Text color of the label                                               |
| `--og-form-item__label-Color--active` | Text color of the label when selected                                 |
| `--og-form-item__label-Color--hover`  | Text color of the label when hovered                                  |
| `--og-form-item__label-FontSize`      | Font size of the label                                                |
| `--og-form-item__label-FontWeight`    | Font weight of the label                                              |
| `--og-form-item__label-Left`          | Left position of the label                                            |
| `--og-form-item__label-Top`           | Top position of the label                                             |
| `--og-form-item__required-Color`      | Color to use for the required indicator                               |
| `--og-form-item__required-Content`    | Content to use for the required indicator                             |
| `--og-form-item__required-FontWeight` | Font weight to use for the required indicator                         |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
