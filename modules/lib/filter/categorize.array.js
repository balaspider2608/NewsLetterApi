var _ = require('lodash');

module.exports = categorize = function (data) {
    return _.chain(data)
            .groupBy('category').toPairs()
            .map((currentItem) => _.zipObject(["category", "articles"], currentItem))
            .value();
}