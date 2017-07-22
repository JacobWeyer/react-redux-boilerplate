#React-Redux Boilerplate
This is my attempt at creating a cleaner react project folder structure

## Docs
1. [Organization](/docs/organization.md)
2. [PropTypes](/docs/proptypes.md)
3. [Component Lifecycle](/docs/component-lifecycle.md)
4. [Testing](/docs/testing.md)

## Installation
To install this boilerplate, first make sure you've installed [Yarn](https://yarnpkg.com) and [Node](https://nodejs.org).

If you have both of these, then type `yarn install` and it will being installing the NPM packages into the node_modules directory

## Commands
`yarn run start`

This will start the Hot Module Reloader, making it available at http://localhost:8080

`yarn run build`

This will build the App for distribution

## PostCSS Config
This config file contains all of the PostCSS plugins being currently used.

These are:
- autoprefixer
- css-mqpacker
- cssnano
- postcss-assets

To install additional PostCSS plugins, do `yarn add *package*` and then add its NPM package name to the plugins 
in postcss.config.js file