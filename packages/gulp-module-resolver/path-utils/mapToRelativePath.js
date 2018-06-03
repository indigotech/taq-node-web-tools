'use strict';

const path = require('path');
const first = require('lodash.first');
const last = require('lodash.last');

module.exports = function mapToRelativePath(rootPath, currentFile, aliasPath) {
  let from = path.dirname(currentFile);
  let to = path.normalize(aliasPath);

  from = path.resolve(rootPath, from);
  to = path.resolve(rootPath, to);

  let resolved = path.relative(from, to);

  if (first(resolved) !== '.') {
    resolved = './' + resolved;
  }

  if (last(resolved) == '.') {
    resolved += '/';
  }

  return resolved.replace('//', '/');
}
