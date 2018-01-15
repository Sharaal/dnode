Provides an `/health` endpoint response with the health of the app in the [MicroProfile format](https://microprofile.io/project/eclipse/microprofile-health).

# Usage

```
const health = require('@dnode/health')({
  example: () => {},
});
require('@dnode/controllers')(app, [health]);
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
