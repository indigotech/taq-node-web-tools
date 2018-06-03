'use strict';

const path = require('path');
const defaults = require('lodash.defaults');
const { Transform } = require('stream');

const createRelativePathMap = require('./path-utils/createRelativePathMap');

module.exports = function moduleResolver(options) {

  options = defaults({}, options, { rootPath: path.resolve('.'), tsConfigFile: 'tsconfig.json' });

  return new Transform({
    objectMode: true,
    transform: (file, encoding, callback) => {
      if (file.isStream()) {
        return callback(new Error('Stream module resolution not implemented'), file);
      }

      if (!file.isNull() && file.isBuffer()) {
        const replaceMap = createRelativePathMap(options.rootPath, options.tsConfigFile, file.path);

        for (const alias in replaceMap) {
          file.contents = new Buffer(
            String(file.contents)
              .replace(new RegExp(alias, 'g'), replaceMap[alias])
              .replace('.//', './')
          );
        }
      }
      return callback(null, file);
    },
  });
}
