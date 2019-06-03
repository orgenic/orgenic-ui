# og-expander



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                                                            | Type      | Default     |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | ----------- |
| `expanded` | `expanded` | Sets or unsets the expanded state.                                                                                                                     | `boolean` | `false`     |
| `group`    | `group`    | Optional group identifier for this expander. Expanders with same group will behave like an accordion, opening one expander will close other expanders. | `string`  | `undefined` |
| `name`     | `name`     | The name for this expander                                                                                                                             | `string`  | `undefined` |


## Methods

### `toggleExpandedState() => Promise<void>`

Use this method to toggle expanded state. Group property is respected when calling this method.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
