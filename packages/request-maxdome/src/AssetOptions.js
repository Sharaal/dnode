const Asset = require('./Asset');

class AssetOptions {
  constructor(assetId, { hostname: hostname = 'maxdome.de', protocol: protocol = 'http' } = {}) {
    this.assetId = assetId;
    this.hostname = hostname;
    this.protocol = protocol;
  }

  toRequestOptions() {
    return {
      method: 'get',
      transform: data =>
        new Asset(data, {
          hostname: this.hostname,
          protocol: this.protocol,
        }),
      url: {
        path: `v1/assets/${this.assetId}`,
      },
    };
  }
}

module.exports = AssetOptions;
