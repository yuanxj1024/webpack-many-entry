function staticURLReplace(options) {
  // Configure your plugin with options...
}

// 处理URL
function replaceURL(urls) {
  var temp = [];
  urls.map(function (item) {
    temp.push(item.substr(item.lastIndexOf('\/') + 1));
  });
  return temp;
}

staticURLReplace.prototype.apply = function (compiler) {
  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {
      htmlPluginData.assets.js = replaceURL(htmlPluginData.assets.js);
      htmlPluginData.assets.css = replaceURL(htmlPluginData.assets.css);
      callback(null, htmlPluginData);
    });
  });
};

module.exports = staticURLReplace;
