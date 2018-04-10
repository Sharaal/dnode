[![dependencies | 1 | 10](https://img.shields.io/badge/dependencies-1%20|%2010-blue.svg)](DEPENDENCIES.md)

# Usage

```javascript
const contentfulClient = require('@dnode/contentful')({
  accessToken: process.env.ACCESS_TOKEN,
  space: process.env.SPACE_ID,
});
const entry = await contentfulClient.getEntry('entryId');
```
