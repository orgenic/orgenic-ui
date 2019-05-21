# og-calendar-group



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute            | Description | Type                            | Default                    |
| ------------------ | -------------------- | ----------- | ------------------------------- | -------------------------- |
| `dateDecorator`    | --                   |             | `OgDateDecorator`               | `undefined`                |
| `displayedMonths`  | `displayed-months`   |             | `number`                        | `1`                        |
| `firstDayOfWeek`   | `first-day-of-week`  |             | `number`                        | `0`                        |
| `month`            | `month`              |             | `number`                        | `new Date().getMonth()`    |
| `selection`        | --                   |             | `OgCalendarDate[]`              | `undefined`                |
| `selectionType`    | `selection-type`     |             | `"multi" \| "none" \| "single"` | `'single'`                 |
| `showCalendarWeek` | `show-calendar-week` |             | `boolean`                       | `true`                     |
| `year`             | `year`               |             | `number`                        | `new Date().getFullYear()` |


## Events

| Event              | Description | Type                            |
| ------------------ | ----------- | ------------------------------- |
| `dateClicked`      |             | `CustomEvent<OgCalendarDate>`   |
| `selectionChanged` |             | `CustomEvent<OgCalendarDate[]>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
