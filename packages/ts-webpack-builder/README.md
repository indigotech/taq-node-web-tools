# ts-webpack-builder

A functional builder for webpack config written in [Typescript](http://www.typescriptlang.org/).

*This package was heavily inspired on [webpack-blocks](https://github.com/andywer/webpack-blocks).*

<!-- Section to uncomment when we publish - for now we have to install from file reference
# Installation

```bash
yarn add @taqtile/ts-webpack-builder

# or

npm i @taqtile/ts-webpack-builder
```
-->

# Basic usage

```typescript
import {
  createConfig,
  setEntry,
  setOutput,
  setPlugin,
} from '@taqtile/ts-webpack-builder';

module.exports = createConfig([
  setEntry({
    app: './src/app.ts',
  }),
  addRule(/\.ts?$/, 'awesome-typescript-loader', [/node_modules/]),
  setOutput({
    path: root('dist/public'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[name].chunk.js',
  }),
  onCondition(process.env.ENV === 'development', [
    setDevServer({
      port: +process.env.PORT,
      host: process.env.HOST,
    })
  ]),
]);
```
