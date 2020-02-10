# og-progress



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute       | Description                                                    | Type                | Default                           |
| --------------- | --------------- | -------------------------------------------------------------- | ------------------- | --------------------------------- |
| `bounce`        | `bounce`        | Determines, whether the bounce animation is shown or not       | `boolean`           | `false`                           |
| `buffer`        | `buffer`        | The percent value of the progress buffer (the second bar)      | `number`            | `undefined`                       |
| `hidden`        | `hidden`        | Determines, whether the control is hidden or not               | `boolean`           | `undefined`                       |
| `indeterminate` | `indeterminate` | Determines, whether the control is an indeterminate bar or not | `boolean`           | `!this.value && this.value !== 0` |
| `max`           | `max`           | The max value of the progress                                  | `number`            | `100`                             |
| `query`         | `query`         | Determines, whether the query animation is shown or not        | `boolean`           | `false`                           |
| `size`          | `size`          | The height (s, m , l) of the progress bar                      | `"l" \| "m" \| "s"` | `'m'`                             |
| `stream`        | `stream`        | Determines, whether the stream animation is shown or not       | `boolean`           | `false`                           |
| `value`         | `value`         | The percent value of the progress                              | `number`            | `undefined`                       |


## CSS Custom Properties

| Name                          | Description                                   |
| ----------------------------- | --------------------------------------------- |
| `--og-progress-Background`    | Main background color of the progress element |
| `--og-progress-Color`         | Color of the progress bar                     |
| `--og-progress-Color--buffer` | Color of the progress buffer bar              |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
