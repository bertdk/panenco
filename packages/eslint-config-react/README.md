# @panenco/eslint-config-react

This package is made for reducing boilerplate in `.eslintrc.json` file and create single source of truth around all repositories.

## Installation

### Prerequisites

You must have an access to Panenco Github Package Registry.

### Configure `.npmrc`

```
registry=https://registry.npmjs.org/
@panenco:registry=https://npm.pkg.github.com
always-auth=true
```

```sh
yarn add -DW eslint @panenco/eslint-config-react
```

## Configuration

In your root `.eslintrc.json` just use

```
{
  "root": true,
  "extends": ["@panenco/eslint-config-react"]
}
```
