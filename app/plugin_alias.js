var path = require('path');
var containerPath = path.resolve('./');

var alias = {
  jquery: path.resolve(containerPath, './app/src/plugins/jquery/dist/jquery.min.js'),
  underscore: '../../plugins/underscore/underscore-min.js'

};
console.log('alias = ', alias);

module.exports = alias;
