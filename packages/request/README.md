[![dependencies | 6 | 58](https://img.shields.io/badge/dependencies-6%20|%2058-blue.svg)](DEPENDENCIES.md)

# Usage

## Simplest usage

```javascript
const Request = require('@dnode/request').Request;

const response = await new Request().get('http://google.de');
```

## Set options for a request by a name

```javascript
const RequestBuilder = require('@dnode/request').RequestBuilder;

const requestBuilder = new RequestBuilder().setOptions('google', {
  url: 'http://google.de',
});

const response = await RequestBuilder.request('google').send();
```

## Set options for all requests

```javascript
const RequestBuilder = require('@dnode/request').RequestBuilder;

const google = new RequestBuilder({
  url: 'http://google.de',
});

const response = await google.send();
```

## Define and use a class for more complex options

```javascript
const RequestBuilder = require('@dnode/request').RequestBuilder;

const google = new RequestBuilder({
  url: 'http://google.de',
});

class SearchOptions {
  constructor(q) {
    this.q = q;
  }

  toRequestOptions() {
    return {
      url: {
        path: '/search',
        query: {
          q: this.q,
        },
      },
    };
  }
}

const response = await google
  .send(new SearchOptions('how to use google search'));
```
