const AssetsOptions = require('./AssetsOptions');
const MaxdomeOptions = require('./MaxdomeOptions');
const RequestBuilder = require('@dnode/request').RequestBuilder;
const TipOfTheDaysOptions = require('./TipOfTheDaysOptions');

module.exports = (
  { maxdomeOptions: maxdomeOptions = {}, assetOptions: assetOptions = {} } = {}
) =>
  new RequestBuilder(new MaxdomeOptions(maxdomeOptions))
    .setOptions('assets', new AssetsOptions(assetOptions))
    .setOptions('tipOfTheDays', new TipOfTheDaysOptions());
