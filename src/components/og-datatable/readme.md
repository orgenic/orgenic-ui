# og-list



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                  | Type                | Default     |
| ---------- | ---------- | -------------------------------------------- | ------------------- | ----------- |
| `config`   | --         | Table configuration (type OgDatatableConfig) | `OgDatatableConfig` | `undefined` |
| `selected` | `selected` | Selected row identified by id-property       | `any`               | `undefined` |


## Events

| Event          | Description                                                | Type               |
| -------------- | ---------------------------------------------------------- | ------------------ |
| `itemSelected` | Item selection event. Event.detail contains selected item. | `CustomEvent<any>` |


## Methods

### `reloadData() => Promise<void>`

Triggers a reload of the table data.

#### Returns

Type: `Promise<void>`



### `setSelection(id: any) => Promise<void>`

Programatically update selected row by idProperty.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
