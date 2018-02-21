[![dependencies | 0 | 0](https://img.shields.io/badge/dependencies-0%20|%200-green.svg)](DEPENDENCIES.md)

Provides an `/health` endpoint response with the health of the app in the [MicroProfile format](https://microprofile.io/project/eclipse/microprofile-health).

# Usage

```
require('@dnode/controllers')(
  app,
  [
    require('@dnode/health').controller({
      example: () => {},
    }),
  ]
);
```

# Example response

```
{
   "outcome":"UP",
   "checks":[
      {
         "name":"example",
         "state":"UP",
         "data":{}
      }
   ]
}
```

# Plugins

* Check with HTTP requests: [`health-got`](https://www.npmjs.com/package/@dnode/health-got)
