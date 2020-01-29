# [0.4.4-beta.0](https://github.com/orgenic/orgenic-ui/compare/v0.4.3...v0.4.4-beta.0) (2019-12-16)

### Enhancements
* feat: templates for og-list

# [0.4.3](https://github.com/orgenic/orgenic-ui/compare/v0.4.2...v0.4.3) (2019-12-06)

### Enhancements
* fix: og-combobox flyout behavior
* feat: new styling options for og-combobox
* feat: new css vars for og-button
* feat: prevent text wrap by default for og-button
* fix: multi-select for og-list
* chore: security updates

# [0.4.2](https://github.com/orgenic/orgenic-ui/compare/v0.4.1...v0.4.2) (2019-10-30)

### Features
* new button type "outline"
* multi-select for og-list

### Enhancements
* feat: new variable for text-transform in og-input
* feat: shorten text of og-list-items
* fix: handling dropdown event
* fix: combobox flyout position
* fix: check event target on og-dialog keydown
* fix: item vars of og-list
* chore: security updates
* style: minor cleanups

# [0.4.1](https://github.com/orgenic/orgenic-ui/compare/v0.4.0...v0.4.1) (2019-08-22)

### Enhancements
* feat: scrolling for card content
* fix: hide empty footer  …
* fix: card size depends on parent
* fix: og-card header and sizing
* fix: improve browser scroll behavior

# [0.4.0](https://github.com/orgenic/orgenic-ui/compare/v0.3.1...v0.4.0) (2019-06-28)

### Features
* added new component: layout container

### Enhancements
* added linting rules to improve code quality

# [0.3.1](https://github.com/orgenic/orgenic-ui/compare/v0.3.0...v0.3.1) (2019-06-14)

### Bug Fixes
* datepicker: fix parsing dates according to locale
* datepicker: fix empty state handling in og-formitem
* datepicker: fix flyout position in small windows
* datepicker: fix resolving locales

# [0.3.0](https://github.com/orgenic/orgenic-ui/compare/v0.2.1...v0.3.0) (2019-06-12)

### Features
* new component: datepicker

### Enhancements
* update stencil to 1.0.2 (previously 0.18.1)

# [0.2.1](https://github.com/orgenic/orgenic-ui/compare/v0.2.0...v0.2.1) (2019-05-27)

### Enhancements
* the content of og-card and og-dialog can be defined without using the named slot 'content'
* documentation of css custom properties now have an additional column with default value
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
