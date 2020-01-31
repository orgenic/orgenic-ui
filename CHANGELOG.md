# [0.5.0](https://github.com/orgenic/orgenic-ui/compare/v0.4.3...v0.5.0) (2020-01-31)

## Features
* new component: spinner
* new component: progress
* og-list: add template handling

## Bug Fixes
* general: momentjs issue in typescript projects
* og-combobox: fixed flyout position issue
* og-datepicker: fixed flyout position issue
* og-list: fixed select handling issues
* og-internal-calendar: fixed skipping of first week on 'en' locale
* og-datepicker: fixed flyout position
* og-card: fixed footer/header not hidding without content
* og-layout-child: fixed overflow issue


# [0.4.3](https://github.com/orgenic/orgenic-ui/compare/v0.4.2...v0.4.3) (2019-12-06)

## Features
* feat: new styling options for og-combobox
* feat: new css vars for og-button
* feat: prevent text wrap by default for og-button

## Bug fixes
* og-combobox: fixed flyout behavior
* og-list: fixed multi-select issue


# [0.4.2](https://github.com/orgenic/orgenic-ui/compare/v0.4.1...v0.4.2) (2019-10-30)

## Features
* og-list: multi-select mode
* og-list-item: shorten text
* og-button: new type "outline"
* og-input: new variable for text-transform

## Enhancements
* general: fixed handling dropdown event
* og-combobox: fixed flyout position
* og-dialog: fixed check event target on keydown
* og-list: fixed item vars


# [0.4.1](https://github.com/orgenic/orgenic-ui/compare/v0.4.0...v0.4.1) (2019-08-22)

## Features
* og-card: scrolling for content

## Bug Fixes
* og-card: hide empty footer
* og-card: fixed card size depends on parent
* og-card: fixed header and sizing
* general: improve browser scroll behavior


# [0.4.0](https://github.com/orgenic/orgenic-ui/compare/v0.3.1...v0.4.0) (2019-06-28)

## Features
* new component: layout container


# [0.3.1](https://github.com/orgenic/orgenic-ui/compare/v0.3.0...v0.3.1) (2019-06-14)

## Bug Fixes
* og-datepicker: fixed parsing dates according to locale
* og-datepicker: fixed empty state handling in og-formitem
* og-datepicker: fixed flyout position in small windows
* og-datepicker: fixed resolving locales


# [0.3.0](https://github.com/orgenic/orgenic-ui/compare/v0.2.1...v0.3.0) (2019-06-12)

## Features
* new component: datepicker


# [0.2.1](https://github.com/orgenic/orgenic-ui/compare/v0.2.0...v0.2.1) (2019-05-27)

## Enhancements
* the content of og-card and og-dialog can be defined without using the named slot 'content'
* documentation of css custom properties now have an additional column with default value
* added basic typography for headings, paragraphs and lists
* og-card: can now be used without headline

## Bug Fixes
* og-number-input: title does not restore when deleting value
* og-datatable: fixed selection highlighting
* theming: fixed missing colors in light and dark theme


# [0.2.0](https://github.com/orgenic/orgenic-ui/compare/v0.1.5...v0.2.0) (2019-05-03)

## Features
* new component: modal dialog

## Enhancements
* handling of scrolling within combobox flyouts
* updated card style
* added license headers in .tsx files

## Bug Fixes
* list item values are only added to the DOM if values are really available
* optimized size of multiline textarea


# [0.1.5](https://github.com/orgenic/orgenic-ui/compare/v0.1.4...v0.1.5) (2019-04-25)

## Bug Fixes
* combobox: prevent dropdown from being cut off due to container style (overflow hidden)
* combobox: ensure dropdown is visible and respecting viewport size
* buildchain: fix travis artifact generation


# [0.1.4](https://github.com/orgenic/orgenic-ui/compare/v0.1.3...v0.1.4) (2019-04-18)

## Bug Fixes
* disabled user-select for component ToggleSwitch

## Features
* added new component: Textarea
* added new component: Expander
* added and fixed module package for CDN (unpkg & jsdelivr)
* added react, vue and plain js example in readme
