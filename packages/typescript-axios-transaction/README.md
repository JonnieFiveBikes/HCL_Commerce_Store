## @hcl-commerce-store-sdk/typescript-axios-transaction@9.1.12

This generator creates TypeScript/JavaScript client that utilizes [axios](https://github.com/axios/axios). The generated Node module can be used in the following environments:

Environment

- Node.js
- Webpack
- Browserify

Language level

- ES5 - you must have a Promises/A+ library installed
- ES6

Module system

- CommonJS
- ES6 module system

It can be used in both TypeScript and JavaScript. In TypeScript, the definition should be automatically resolved via `package.json`. ([Reference](http://www.typescriptlang.org/docs/handbook/typings-for-npm-packages.html))

### Building

To build and compile the typescript sources to javascript use:

- `npm install`
- `npm run build:dev` (or `npm run build:production` for an optimized bundle)

### Publishing

First build the package then run `npm publish`

### Consuming

navigate to the folder of your consuming project and run one of the following commands.

_published:_

```
npm install @hcl-commerce-store-sdk/typescript-axios-transaction@9.1.12 --save
```

_unPublished (not recommended):_

```
npm install PATH_TO_GENERATED_PACKAGE --save
```

### Generating or Re-generating

Use the `mergeOpenApi3.js` utility to merge all transaction-server spec files into one file:

```
node tools/scripts/mergeOpenApi3.js --input packages/typescript-axios-transaction/specs/transaction --output packages/typescript-axios-transaction/specs/transaction.json
```

Then, run the API generator on the merged file:

```
npx @openapitools/openapi-generator-cli generate -g typescript-axios -c config.yaml -i specs/transaction.json
```
