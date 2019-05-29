# og-calendar-group



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute            | Description | Type                 | Default                    |
| ------------------ | -------------------- | ----------- | -------------------- | -------------------------- |
| `dateDecorator`    | --                   |             | `OgDateDecorator`    | `undefined`                |
| `displayedMonths`  | `displayed-months`   |             | `number`             | `1`                        |
| `locale`           | `locale`             |             | `string`             | `'ru'`                     |
| `month`            | `month`              |             | `number`             | `new Date().getMonth()`    |
| `selection`        | --                   |             | `OgCalendarDate[]`   | `[]`                       |
| `selectionType`    | `selection-type`     |             | `"none" \| "single"` | `'single'`                 |
| `showCalendarWeek` | `show-calendar-week` |             | `boolean`            | `true`                     |
| `year`             | `year`               |             | `number`             | `new Date().getFullYear()` |


## Events

| Event              | Description | Type                            |
| ------------------ | ----------- | ------------------------------- |
| `dateClicked`      |             | `CustomEvent<OgCalendarDate>`   |
| `selectionChanged` |             | `CustomEvent<OgCalendarDate[]>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
