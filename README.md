[//]: # "================================================="
[//]: # "Licensed Materials - Property of HCL Technologies"
[//]: #
[//]: # "HCL Commerce"
[//]: #
[//]: # "(C) Copyright HCL Technologies Limited 2020-2022"
[//]: #
[//]: # "================================================="

# HCL Commerce store development kit

Headless Storefront SDK using NPM workspaces

### Prerequisites

The project can be loaded on any environment supporting Node.js development.

- Node.js LTS Version >= 16.0.0
- npm version >= 8.0.0

### Workspace struture

    |
    +--- `react-store`: The main React Store NPM package
    |
    +--- `bvt`: The BVT image build scripts
    |
    +--- `tool`: The NPM build scripts helpers
    |
    +--- `packages`: Components packages
            |
            +--- `react-component`: React Component package
            |
            +--- `utils`: Utils package
            |
            +--- `typescript-axios-es`: Elastic Search server Rest client package
            |
            +--- `typescript-axios-transaction`: Transaction server Rest client package

### Naming convention in our project

- To avoid file system difference between Windows and Unix, we need to use dash-case for filename and folder name
- Filename needs to be same as component name only differ in case.
- Inside React components, we need to stick with React naming convention for variable and component names. PascalCase for React components, camelCase for variables and component instance.

### Util script

#### Merge Swagger spec util

Since rest service for each server is generated into a npm package and open api generator generate it at once, an NodeJs util is created to help merge all spec into one file for a particular server.

`node tools/scripts/mergeOpenApi3.js --input packages/typescript-axios-transaction/specs/transaction --output packages/typescript-axios-transaction/specs/transaction.json`

### Generate new transaction apis in SDK

First get the new swagger json preferably in open api 3 format. For example user and org management. Ideally you would then merge the new json with the existing file in `packages/typescript-axios-transaction/specs/transaction.json`.

To merge the file with transaction.json, run the above merge swagger spec util script. This will overwrite the `transaction.json` file in specs. Either you can take back up of transaction.json file or you can also create a new file ie `transaction2.json` as per your need.

`npx @openapitools/openapi-generator-cli generate -g typescript-axios -c config.yaml -i specs/transaction.json`

Run above command from `packages/typescript-axios-transaction` to generate all the REST APIs client file in the com folder. You can then confirm the files generated for the APIs you wanted to generate.

Finally, do the npm install, build and link steps in this axios folder, same as you do in react-component. This is to link store web to this folder for accessing the newly generated REST APIs service files.

### Run NPM workspace build script

All NPM scripts can be run from workspace root. For reference see https://docs.npmjs.com/cli/v8/using-npm/workspaces

1. install `npm install` will install all deps for all project under workspace
2. build production bundle of packages `npm run build:production -ws --if-present`
3. build development build of packages `npm run build:dev -ws --if-present`
4. start store dev server: `npm start -w=react-store`

Note: `-ws` means all workspaces; `-w={workspacename}` is for a specific workspace. `workspacename` can be the folder name, e.g. `packages/react-component` or the package name defined in package.json, e.g. `@hcl-commerce-store-sdk/react-component`. For NPM scripts that defined in React-store package, please take a look of [Readme](./react-store/README.md) file in React store.

### Recommended Editor

We recommend to use VS Code

##### VS Code editor extension

1.  Gitlens: https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens
2.  Code formatting: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
