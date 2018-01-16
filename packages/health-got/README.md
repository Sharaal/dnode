[![dependencies | 1 | 44](https://img.shields.io/badge/dependencies-1%20|%2044-blue.svg)](DEPENDENCIES.md)

Provides check function for [`health`](http://npmjs.com/@dnode/health) performing HTTP requests.

# Usage

```
const health = require('@dnode/health')({
  example: require('@dnode/health-got')('http://example.com/'),
});
require('@dnode/controllers')(app, [health]);
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
            "url": "http://example.com/",
            "options": {
               "json": true
            }
         }
      }
   ]
}
```
