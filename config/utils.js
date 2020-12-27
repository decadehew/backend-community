const path = require('path');

exports.resolve = function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

exports.APP_PATH = exports.resolve('src');
exports.DIST_PATH = exports.resolve('dist');

exports.getWebpackResolveConfig = function (customAlias = {}) {
  const appPath = exports.APP_PATH;
  return {
    modules: [appPath, 'node_modules'], // 告訴 webpack 哪些目錄需要去搜索
    extensions: ['.js', '.json'], // 指定哪些後綴需要去搜索
    alias: {
      '@': appPath,
      ...customAlias
    }
  };
}
