[![dependencies | 0 | 0](https://img.shields.io/badge/dependencies-0%20|%200-green.svg)](DEPENDENCIES.md)

# Usage

## The controller

```javascript
require('@dnode/controllers')(app, [
  require('@dnode/version').controller(),
]);
```

## Only the version

```javascript
const version = require('@dnode/version')();
```

# Swagger

```yaml
paths:
  /version:
    get:
      summary: "Response the version of the app"
      responses:
        200:
          description: "OK"
        500:
          description: "Internal Server Error"
```
