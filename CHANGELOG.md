# [0.2.1](https://github.com/orgenic/orgenic-ui/compare/v0.2.0...v0.2.1) (2019-05-27)

### Enhancements
* the content of og-card and og-dialog can be defined without using the named slot 'content'
* documentation of css costom properties now have an additional column with default value
* added basic typography for headings, paragraphs and lists
* og-card: can now be used without headline

### Bug Fixes
* og-number-input: title does not restore when deleting value
* og-datatable: fixed selection highlighting
* theming: fixed missing colors in light and dark theme

# [0.2.0](https://github.com/orgenic/orgenic-ui/compare/v0.1.5...v0.2.0) (2019-05-03)

### Features
* new component: modal dialog

### Enhancements
* handling of scrolling within combobox flyouts
* updated card style
* added license headers in .tsx files

### Bug Fixes
* list item values are only added to the DOM if values are really available
* optimized size of multiline textarea

# [0.1.5](https://github.com/orgenic/orgenic-ui/compare/v0.1.4...v0.1.5) (2019-04-25)

### Bug Fixes
* combobox: prevent dropdown from being cut off due to container style (overflow hidden)
* combobox: ensure dropdown is visible and respecting viewport size
* buildchain: fix travis artifact generation

# [0.1.4](https://github.com/orgenic/orgenic-ui/compare/v0.1.3...v0.1.4) (2019-04-18)

### Bug Fixes
* disabled user-select for component ToggleSwitch

### Features
* added new component: Textarea
* added new component: Expander
* added and fixed module package for CDN (unpkg & jsdelivr)
* added react, vue and plain js example in readme