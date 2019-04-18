[![travis status](https://travis-ci.com/orgenic/orgenic-ui.svg?branch=master)](https://travis-ci.com/orgenic/orgenic-ui)

# ORGENIC UI

<div style="text-align: center">
  <a href="https://orgenic.org/">
    <img src="https://orgenic.org/ui/assets/img/orgenic-ui-logo@2x.png" alt="ORGENIC UI logo" width="358" height="72">
  </a>
</div>

## Getting Started

With these instructions you will get ORGENIC UI integrated in your project.

### Installing

```bash
npm i @orgenic/orgenic-ui
```

### Angular
Integrate ORGENIC UI in your angular application

**main.ts**

```typescript
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// add line: import orgenic ui loader
import { defineCustomElements } from '@orgenic/orgenic-ui/dist/loader';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// add line: register custom elements
defineCustomElements(window);
```

**app/app.module.ts**

```typescript
// ...
// add line: import custom elements schema
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
    declarations: [
        // ...
    imports: [
        // ...
    ],
    providers: [
        // ...
    ],
    bootstrap: [AppComponent],
// add line: add custom elements schema to NgModule
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
```

### React

Integrate ORGENIC UI in your react application

**src/index.js**
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// add line: import orgenic ui loader
import { defineCustomElements } from '@orgenic/orgenic-ui/dist/loader';

ReactDOM.render(<App />, document.getElementById('root'));

// add line: register custom elements
defineCustomElements(window);

serviceWorker.unregister();
```

### Vue

Integrate ORGENIC UI in your vue application

**src/main.js**
```javascript
import Vue from 'vue';

// ...

// add line: import orgenic ui loader
import { defineCustomElements } from '@orgenic/orgenic-ui/dist/loader';

// add line: register custom elements
defineCustomElements(window);

Vue.config.productionTip = false;
// add line: configure vue to ignore orgenic-ui components
Vue.config.ignoredElements = [/og-\w*/];

const router = new VueRouter({
    // ...
})

Vue.use(VueRouter);

new Vue({
    el: '#app',
    router,
    render: (h) => h(App)
});
```

### Vanilla JS

Integrating ORGENIC-UI in a plain JS application.

**index.html**
```html
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="orgenic-ui/dist/themes/dark.theme.css" />
        <script src="orgenic-ui/dist/orgenic-ui.js"></script>
        <style>
            body {
                font-family: Roboto;
            }
        </style>
    </head>
    <body class="og-theme--dark">
        <og-card name="Hello ORGENIC-UI">
            <div slot="content">
                <og-button label="Default Button"></og-button>
            </div>
        </og-card>
    </body>
</html>
```

## Documentation

Find the full documentation of ORGENIC UI at [https://docs.orgenic.org](https://docs.orgenic.org).

## Versioning

We use [Semantic Versioning](http://semver.org/).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
