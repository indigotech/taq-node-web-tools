# taqtile-node-web-tools
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

Taqtile's Tools for Web and Node development

# Development

This project uses [Lerna](https://lernajs.io/) to manage its packages.

## Environment setup

- Ensure you are using the proper node version - check current version in `.nvmrc` file

```bash
$ nvm use
```

or 

```bash
$ nvm install
```

- Install the dependencies

```bash
$ yarn
```

## Boostrapping packages

To install and link all dependencies from packages, run:

```bash
$ yarn run bootstrap
```

## Testing

To run all available tests from each package, run:

```bash
$ yarn run test
```

## Publishing

To publish packages, run:

```bash
$ yarn run publish
```
