'use strict';

const path = require('path');
const fs = require('fs');

const mapToRelativePath = require('./mapToRelativePath');

module.exports = function createRelativePathMap(rootPath, tsConfigFile, currentFile) {
  const tsConfig = JSON.parse(fs.readFileSync(tsConfigFile, 'utf8'));;
  const compilerOptions = tsConfig.compilerOptions;
  const paths = compilerOptions.paths;

  const map = {};

  for (let alias in paths) {
    // TODO - NOT SAFE AT ALL!!!!
    let aliasPath = paths[alias][0].replace('*', '');

    map[alias.replace('*', '')] = mapToRelativePath(rootPath, currentFile, aliasPath);
  }

  return map;
}
