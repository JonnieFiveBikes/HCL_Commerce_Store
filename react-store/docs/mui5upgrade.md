[//]: # "================================================="
[//]: # "Licensed Materials - Property of HCL Technologies"
[//]: #
[//]: # "HCL Commerce"
[//]: #
[//]: # "(C) Copyright HCL Technologies Limited 2022"
[//]: #
[//]: # "================================================="

## Upgrading from Mui 4 to 5

#### Steps for upgrading:

1. Read this first https://mui.com/material-ui/migration/migration-v4/

2. Run

   `npm install @mui/material @mui/styles`

   `npm install @mui/lab`

   `npm install @mui/icons-material`

   `npm install @mui/material @mui/styled-engine-sc styled-component`

3. Remove old material ui dependencies from package.json files in all NPM workspaces.

4. Do a global search and replace `import styled from "styled-components"` with `import styled from "@mui/styled-engine-sc";`

5. Run `npx @mui/codemod v5.0.0/preset-safe <folder_name>` folder by folder. We found it will miss some files for sure, how ever, make sure it only run once. The script will do most of search and replace work for you.

6. Update theme spacing function

   - Do a global search of "theme.spacing(", remove 'px'. e.g. `${theme.spacing(3)}px` to `${theme.spacing(3)}`

   - For calculated size using theme.spacing, use CSS calc function.

     e.g. : `max-width: ${window.innerWidth - theme.spacing(3)}px;`

     to `max-width: calc(${window.innerWidth}px - ${theme.spacing(3)});`

7. Styled function update, see https://mui.com/system/styled/ for details.

   e.g. Native HTML element we used to use Styled-Component function with syntax `styled.div`, now need to change it to `styled("div")` instead.

8. Breaking changes: Look at this https://mui.com/material-ui/migration/v5-style-changes/ and https://mui.com/material-ui/migration/v5-component-changes/ to see if it applies, in addition:

   - Mui Picker has updated picker util provider, update the provider, see details here https://mui.com/material-ui/migration/v5-component-changes/
   - Mui Popper is now using popper.js v2. To us the modifier property is array now instead of object, update this to array. Look at this https://popper.js.org/docs/v2/migration-guide/ to see if any other things apply

9. CSS, CSS probably need to go through all components/pages to identify issues and fixes. The issues that we identified are

   - Styled stepper, we added padding.
   - Update accordionSummary related css

10. Espot content: we added content `mui component parser` in `use-espot.tsx` hook, which support basic Container, Grid, Typography properties.

11. Build

    - Added rollup alias config for mapping `mui/styled-engine` to `mui/styled-engine-sc`, since we are using `styled-component` in `react-component` package/folder.
    - Npm install `craco`, use `craco` to add webpack alias config for mapping `mui/styled-engine` to `mui/styled-engine-sc`. See `craco.config.js` in react-store.
    - Update tsconfig file to have similar map between mui/styled-engine and `mui/styled-engine-sc`.
