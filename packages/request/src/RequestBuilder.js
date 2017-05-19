const Request = require('./Request');

class RequestBuilder {
  constructor(defaultOptions) {
    this.defaultOptions = defaultOptions;
    this.options = {};
  }

  setOptions(name, options) {
    this.options[name] = options;
    return this;
  }

  request(names = []) {
    if (!Array.isArray(names)) {
      names = [names];
    }
    const request = new Request(this.defaultOptions);
    for (const name of names) {
      request.addOptions(this.options[name]);
    }
    return request;
  }

  send(path, options) {
    return this.request().send(path, options);
  }

  delete(path, options) {
    return this.request().delete(path, options);
  }

  get(path, options) {
    return this.request().get(path, options);
  }

  post(path, options) {
    return this.request().post(path, options);
  }

  put(path, options) {
    return this.request().put(path, options);
  }
}

module.exports = RequestBuilder;
