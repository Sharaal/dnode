[![dependencies | 1 | 44](https://img.shields.io/badge/dependencies-1%20|%2044-blue.svg)](DEPENDENCIES.md)

Provides check function for [`health`](http://npmjs.com/@dnode/health) performing HTTP requests.

# Usage

```
require('@dnode/controllers')(
  app,
  [
    require('@dnode/health').controller({
      example: require('@dnode/health-got')('http://example.com/'),
    }),
  ]
);
```

# Example response

```
{
   "outcome": "UP",
   "checks": [
      {
         "name": "example",
         "state": "UP",
         "data": {
            "method": "GET",
            "url": "http://example.com/"
         }
      }
   ]
}
```
