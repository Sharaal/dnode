const getRequestBuilder = require('./src/getRequestBuilder');

Object.assign(getRequestBuilder, {
  Asset: require('./src/Asset'),
  AssetOptions: require('./src/AssetOptions'),
  AssetsOptions: require('./src/AssetsOptions'),
  AssetsQueryOptions: require('./src/AssetsQueryOptions'),
  MaxdomeOptions: require('./src/MaxdomeOptions'),
  Maxpert: require('./src/Maxpert'),
  Review: require('./src/Review'),
  SessionOptions: require('./src/SessionOptions'),
  TipOfTheDay: require('./src/TipOfTheDay'),
  TipOfTheDaysOptions: require('./src/TipOfTheDaysOptions'),
  getRequestBuilder: require('./src/getRequestBuilder'),
});

module.exports = getRequestBuilder;
