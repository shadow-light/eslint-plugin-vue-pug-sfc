<h1 align="center">
:warning: THIS PROJECT IS CURRENTLY IN ALPHA :warning:<br>
Use fixer at your own risk, could damage your code!
</h1>

<p align="center">
  &nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://eslint.org" target="_blank">
    <img alt="Eslint" src="https://avatars.githubusercontent.com/u/6019716?s=160&v=4">
  </a>
  &nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://vuejs.org" target="_blank">
    <img alt="Vue" src="https://vuejs.org/images/logo.svg" height="150">
  </a>
  &nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://pugjs.org" target="_blank">
    <img alt="Pug" src="https://cdn.rawgit.com/pugjs/pug-logo/eec436cee8fd9d1726d7839cbe99d1f694692c0c/SVG/pug-final-logo-_-colour-128.svg" height="160">
  </a>
  &nbsp;&nbsp;&nbsp;&nbsp;
</p>

<h2 align="center">Eslint Plugin Vue Pug SFC</h2>

<p align="center">
  <a href="https://github.com/Shinigami92/eslint-plugin-vue-pug-sfc/blob/main/LICENSE">
    <img alt="license: MIT" src="https://img.shields.io/github/license/Shinigami92/eslint-plugin-vue-pug-sfc.svg?style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/eslint-plugin-vue-pug-sfc" target="_blank">
    <img alt="NPM package" src="https://img.shields.io/npm/v/eslint-plugin-vue-pug-sfc.svg?style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/eslint-plugin-vue-pug-sfc" target="_blank">
    <img alt="downloads" src="https://img.shields.io/npm/dt/eslint-plugin-vue-pug-sfc.svg?style=flat-square">
  </a>
  <a href="https://prettier.io" target="_blank">
    <img alt="Code Style: Prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
  </a>
  <a href="https://github.com/Shinigami92/eslint-plugin-vue-pug-sfc/actions/workflows/ci.yml">
    <img alt="Build Status" src="https://github.com/Shinigami92/eslint-plugin-vue-pug-sfc/actions/workflows/ci.yml/badge.svg?branch=main">
  </a>
</p>

# Intro

This plugin adds support for the Pug language to Eslint in `.vue` files.

---

- [Getting started](#getting-started)
- [Usage](#usage)
- [Motivation](#motivation)
- [Current Project Process](#current-project-process)

## Getting started

```bash
yarn add --dev eslint-plugin-vue-pug-sfc
```

## Usage

In `eslint` config:

```jsonc
{
  "plugins": ["vue-pug-sfc"],
  "rules": {
    "vue-pug-sfc/this-in-template": "warn"
  }
}
```

## Current Project Process

- [ ] Stabilizing the `range` calculation of pug tokens [src/utils/index#parsePugContent](https://github.com/Shinigami92/eslint-plugin-vue-pug-sfc/blob/main/src/utils/index.ts#L67)
- [ ] Full support of `vue-pug-sfc/this-in-template`
  - [x] `never`
    - [x] Detecting `this.`
    - [x] Auto-fix `this.` _stable? if not please open issue!_
    - [ ] Detect more complex code like `this[`
  - [ ] `always`
    - [ ] Detect missing `this`

## Motivation

- https://github.com/vuejs/eslint-plugin-vue/issues/640
- https://github.com/vuejs/eslint-plugin-vue/issues/310
- https://github.com/vuejs/vue-eslint-parser/issues/29
