# og-calendar

This component is used by og-datepicker and is currently not intended for stand-alone use.

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute            | Description | Type               | Default                    |
| ------------------ | -------------------- | ----------- | ------------------ | -------------------------- |
| `dateDecorator`    | --                   |             | `OgDateDecorator`  | `undefined`                |
| `loc`              | `loc`                |             | `string`           | `getDefaultLocale()`       |
| `month`            | `month`              |             | `number`           | `new Date().getMonth()`    |
| `selection`        | --                   |             | `OgCalendarDate[]` | `undefined`                |
| `showCalendarWeek` | `show-calendar-week` |             | `boolean`          | `true`                     |
| `year`             | `year`               |             | `number`           | `new Date().getFullYear()` |


## Events

| Event         | Description | Type               |
| ------------- | ----------- | ------------------ |
| `dateClicked` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [og-calendar](../og-calendar)

### Graph
```mermaid
graph TD;
  og-calendar --> og-internal-calendar
  style og-internal-calendar fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
