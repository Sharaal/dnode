const _ = {
  cloneDeep: require('lodash.clonedeep'),
  isArray: require('lodash.isarray'),
  mergeWith: require('lodash.mergewith'),
};
const rp = require('request-promise');
const URI = require('urijs');

class Request {
  constructor(options) {
    this.options = {
      timeout: 1000,
    };
    if (options) {
      this.addOptions(options);
    }
  }

  addOptions(options) {
    if (Array.isArray(options)) {
      options.forEach(options => this.addOptions(options));
      return this;
    }
    if (options.toRequestOptions) {
      this.addOptions(options.toRequestOptions(this.options));
      return this;
    }
    _.mergeWith(this.options, options, (to, from) => {
      if (_.isArray(from)) {
        if (!to) {
          to = [];
        }
        return to.concat(from);
      }
    });
    return this;
  }

  getOptions() {
    const options = _.cloneDeep(this.options);
    if (typeof options.url === 'object') {
      const url = new URI(options.url);
      if (typeof options.url.query === 'object') {
        url.query(options.url.query);
      }
      if (typeof options.url.search === 'object') {
        url.search(options.url.search);
      }
      options.url = url.toString();
    }
    return options;
  }

  send(path, options) {
    if (typeof path === 'object') {
      options = path;
      path = undefined;
    }
    if (path) {
      this.addOptions({ url: { path } });
    }
    if (options) {
      this.addOptions(options);
    }
    options = this.getOptions();
    if (typeof options.body === 'object') {
      options.json = true;
    }
    return rp(options);
  }

  delete(path, options) {
    this.addOptions({ method: 'delete' });
    return this.send(path, options);
  }

  get(path, options) {
    this.addOptions({ method: 'get' });
    return this.send(path, options);
  }

  post(path, options) {
    this.addOptions({ method: 'post' });
    return this.send(path, options);
  }

  put(path, options) {
    this.addOptions({ method: 'put' });
    return this.send(path, options);
  }
}

module.exports = Request;
