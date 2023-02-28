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

### Workspace structure

    |
    |--- react-store: The main React Store NPM package
    |--- bvt: The BVT image build scripts
    |--- tools: The NPM build scripts helpers
    |--- packages: Component packages
         |
         |--- react-component: React component package
         |--- typescript-axios-approvals: Approvals service REST client package
         |--- typescript-axios-es: Elastic Search server REST client package
         |--- typescript-axios-transaction: Transaction server REST client package
         |--- utils: Utility function package

### Naming convention in our project

- To avoid file system difference between Windows and Unix, we need to use kebab-case for filename and folder name
- Filename needs to be same as component name (component names should use pascal-case naming convention).
- Inside React components, we need to stick with React naming convention for variable and component names. PascalCase for React components, camelCase for variables and component instance.

### REST client APIs

Follow instructions under the **_Generating or Re-generating_** README section of each REST client package, i.e.,

- `typescript-axios-transaction`: [here](./packages/typescript-axios-transaction/README.md#generating-or-re-generating)
- `typescript-axios-es`: [here](./packages/typescript-axios-es/README.md#generating-or-re-generating)
- `typescript-axios-approvals`: [here](./packages/typescript-axios-approvals/README.md#generating-or-re-generating)

### Run NPM workspace build script

All NPM scripts can be run from workspace root. For reference see https://docs.npmjs.com/cli/v8/using-npm/workspaces

1. `npm install` will install deps for all workspaces in the project
2. to build production bundles of all workspaces: `npm run build:production -ws --if-present`
3. to build development builds of all workspaces: `npm run build:dev -ws --if-present`
4. start store dev server: `npm start -w=react-store`

Note: `-ws` means all workspaces; `-w={workspacename}` is for a specific workspace. `workspacename` can be the folder name, e.g. `packages/react-component` or the package name defined in `package.json`, e.g. `@hcl-commerce-store-sdk/react-component`. For NPM scripts that are defined in the `react-store` package, please take a look at [README.md](./react-store/README.md) file in that package.

### Recommended Editor

We recommend Visual Studio Code (VS Code)

##### VS Code editor extensions

1.  Gitlens: https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens
2.  Code formatting: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
