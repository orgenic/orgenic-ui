
# ORGENIC UI

[![travis status](https://travis-ci.com/orgenic/orgenic-ui.svg?branch=master)](https://travis-ci.com/orgenic/orgenic-ui)

<div style="text-align: center">
  <a href="https://orgenic.org/">
    <img src="https://orgenic.org/ui/assets/img/orgenic-ui-logo@2x.png" alt="ORGENIC UI logo" width="358" height="72">
  </a>
</div>

## Getting Started

todo: These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

todo: What things you need to install the software and how to install them

```
Give examples
```

### Installing

```javascript
npm i @orgenic/orgenic-ui
```

Integration ORGENIC UI in your Application

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

todo: Please read the [full documentation](https://doc.orgenic.org)

## Contributing

todo: Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

todo: We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
