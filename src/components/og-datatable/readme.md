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

### `reloadData() => void`

Triggers a reload of the table data.

#### Returns

Type: `void`



### `setSelection(id: any) => void`

Programatically update selected row by idProperty.

#### Parameters

| Name | Type  | Description |
| ---- | ----- | ----------- |
| `id` | `any` |             |

#### Returns

Type: `void`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
