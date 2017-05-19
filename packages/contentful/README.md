# Usage

```javascript
const contentfulClient = require('@dnode/contentful')({
  accessToken: process.env.ACCESS_TOKEN,
  space: process.env.SPACE_ID,
});
const entry = await contentfulClient.getEntry('entryId');
```
