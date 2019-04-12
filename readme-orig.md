# ORGENIC-UI

ORGENIC UI is an MIT-licensed open source project for creating strong user interfaces with high quality web components. http://orgenic.org

<div style="text-align: center">
  <a href="https://orgenic.org/">
    <img src="https://orgenic.org/ui/assets/img/orgenic-ui-logo@2x.png" alt="ORGENIC UI logo" width="358" height="72">
  </a>
</div>

## Getting Started

Running basic example:

```bash
npm install
npm start
```

To build the component for production, run:

```bash
npm run build
```

To run the unit tests for the components, run:

```bash
npm test
```

## Naming Components

### Node Modules
- Run `npm install orgenic-ui --save`
- Put a script tag similar to this `<script src='node_modules/orgenic-ui/dist/orgenic-ui.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

## Framework Integration

### Angular

Install ORGENIC UI:
```bash
npm install @orgenic/orgenic-ui
```

Add CUSTOM_ELEMENTS_SCHEMA to module:
```ts
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
```

Import defineCustomElements in main.ts:
```ts
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { defineCustomElements } from '@orgenic/orgenic-ui/dist/loader';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

defineCustomElements(window);
```

Using og-button:
```html
<og-button [label]="title" (clicked)="buttonClicked()"></og-button>
```

Import one or more theme in ```src/style.scss```
```css
@import '../node_modules/@orgenic/orgenic-ui/dist/collection/themes/dark.theme.css';
/* optional more themes */
@import '../node_modules/@orgenic/orgenic-ui/dist/collection/themes/light.theme.css';
```

Activate specific (per default the latest import in style.scss will be active):
```html
...
<body class="og-theme--light">
...
```
```html
...
<body class="og-theme--dark">
...
```

### Vue

### React
