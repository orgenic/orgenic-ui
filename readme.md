[![travis status](https://travis-ci.com/orgenic/orgenic-ui.svg?branch=master)](https://travis-ci.com/orgenic/orgenic-ui)

# ORGENIC UI

<div style="text-align: center">
  <a href="https://orgenic.org/">
    <img src="https://orgenic.org/ui/assets/img/orgenic-ui-logo@2x.png" alt="ORGENIC UI logo" width="358" height="72">
  </a>
</div>

## Getting Started

With these instructions you will get ORGENIC UI up and running.

### Installing

```javascript
npm i @orgenic/orgenic-ui
```

Integrate ORGENIC UI in your application

**main.ts**

```typescript
// ...
import { defineCustomElements } from '@orgenic/orgenic-ui/dist/loader';

// ...

defineCustomElements(window);
```

**app/app.module.ts**

```typescript
// ...
import { /*...*/ CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
    // ...
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
```

## Documentation

Find the full documentation of ORGENIC UI at [https://doc.orgenic.org](https://doc.orgenic.org).

## Versioning

We use [Semantic Versioning](http://semver.org/).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.