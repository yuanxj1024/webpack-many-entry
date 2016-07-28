var path = require('path');
var containerPath = path.resolve('./');

var alias = {
  tip: path.resolve(containerPath, './app/src/custom_plugins/tip')
};

console.log('alias = ', alias);

module.exports = alias;
