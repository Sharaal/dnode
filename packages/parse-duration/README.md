[![dependencies | 1 | 1](https://img.shields.io/badge/dependencies-1%20|%201-blue.svg)](DEPENDENCIES.md)

# DEPRECATED
In favor of [@dnode/duration](https://www.npmjs.com/package/@dnode/duration) 

# Usage

## 1 hour 20 minutes in milliseconds

```javascript
const ms = require('@dnode/parse-duration')('1h 20m');
```

## 1 hour 20 minutes in seconds (with second parameter)

```javascript
const s = require('@dnode/parse-duration')('1h 20m', 's');
```

## 1 hour 20 minutes in seconds (with "in" keyword)

```javascript
const s = require('@dnode/parse-duration')('1h 20m in s');
```
