# Developers guide

## Prepare

Install the dependencies

```bash
npm install
```

## Develop

Build the typescript and package it for distribution

```bash
npm run build && npm run package
```

Run the tests

```bash
$ npm test

 PASS  ./index.test.js
  ✓ throws invalid number (3ms)
  ✓ wait 500 ms (504ms)
  ✓ test runs (95ms)

...
```

## Contribute

Before creating a commit, validate your changes and build the associated distribution files

```bash
npm run all
```
