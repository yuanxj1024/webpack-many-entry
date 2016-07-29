var a = require('./style.scss');
var b = require('./js/main.js');
var c = require('tip');

$(function () {
  console.log('c is ', c);
  console.log('ready');
  console.log(a, b);
  var test = function () {
    return 'a';
  };
});
