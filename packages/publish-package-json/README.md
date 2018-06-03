# publish-package-json

Command line utility to clean and copy package.json for publishing a npm package.


<!-- Section to uncomment when we publish - for now we have to install from file reference
# Installation

```bash
yarn add @taqtile/publish-package-json

# or

npm i @taqtile/publish-package-json
```
-->


# Basic usage

Add a npm-script shortcut:

```json
{
  "scripts": {
    "clean-to-publish": "clean-to-publish"
  }
}
```

And use it

```bash
yarn run clean-to-publish

# or

npm run clean-to-publish
```

If you've installed globally, invoke directly from command line:

```bash
clean-to-publish
```

`clean-to-publish` command will read your package.json and add a modified version of it in the dist directory ommiting `scripts`, `devDependencies`, `jest`.
