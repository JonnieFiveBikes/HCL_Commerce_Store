## Build

HCL Commerce Store React SDK build process supports build multiple APPs.

### Default build process

The SDK has two default Apps predefined: B2C Store based `Emerald` app and B2B Store based `Sapphire` app. The production build, by running `npm run build -- --appName Emerald,Sapphire`, will output bundle files into `dist/Emerald` and `dist/Sapphire` folder with both apps's React route `basename` default to `Emerald` and `Sapphire` respectively.

The build process is built on top of existing `react-script` from [Create React App](https://create-react-app.dev/). The build scripts and assets are located in following folder:

- build scripts folder: `tools/scripts`

  - `start.js` used when user run `npm start`, `npm run mock`, and `npm run preview` starting a React dev server.
  - `build.js` used when user run `npm run build` to build App bundles.
  - `buildConstant.js` defines constants used during the build.
  - the rest scripts in the folder are helper scripts for both `build.js` and `start.js`.

- assets folder: `assets`

  - sub folder `common` has all common assets among different Apps.
  - sub folder `Emerald` and `Sapphire` are named according to the app names, app specific assets are in those folders.
  - sub folder `template`, as indicates by name, is for template files used during build process. Templates basically taking some values from build scripts and replacing the corresponding tokens in the template.
  - during build, all files in sub folders are copied to destination with similar folder structure in the project. e.g.`.env.development.template` in `template` folder will be output to project root as file `.env.development`.
  - copy sequence in template file: the default folder will be copied first. According different `mode`, if you are running `npm run preview` or `npm run mock`, either files in `mock` or `preview` will be copied and overwrite the `default`. If `mode` is not specified, i.e. `npm start` script, only the `default` folder is copied. As for `npm run build` the `production` folder will overwrite the `default`.

- the build process flow:
  - `npm start`, `npm run preview`, `npm run mock`:
    1. clean `public` folder. `public` folder is Create React app assets folder, refer to [Using the Public Folder](https://create-react-app.dev/docs/using-the-public-folder)
    2. copy app assets, from `assets` folder, mostly will be into `public` folder.
    3. copy templates, from `template` folder, including environment variables in `.env`
    4. `react-script start`
  - `npm run build`
    1. clean `dist` folder, `dist` is where the bundle to be output by our build process.
    2. clean `public` folder.
    3. copy app assets, from `assets` folder, mostly will be into `public` folder.
    4. copy templates, from `template` folder, including environment variables in `.env`
    5. `react-script build`
    6. copy file from `build` to `dist/{appName}`.
    7. clean `public` folder.
    8. continue with second app if applicable.

### Customize the build process

#### Rename App for build.

To rename app in order for build app bundle into different name, a list of files need to be updated with new App name.

**Important, the app name must be a valid store identifier of your store in Commerce system.**

1. `tools/scripts/buildConstant.js` file
   - replace const `ALL_APP`, `DEFAULT_APP` with new app names.
2. in `.env` file, replace `REACT_APP_STORENAME` with your app name, this is fallback environment variable, it is used unless there is no this variable defined in `.env.development` or `.env.production` file. More details, please refer to [Adding Development Environment Variables In .env](https://create-react-app.dev/docs/adding-custom-environment-variables#adding-development-environment-variables-in-env)
3. in `assets` folder, rename or copy folder `emerald`, `sapphire` to new app name. **NOTE**: To avoid potential issue with different operating system, the folder name is using lowercase app name. Replace the static asset in folder, for example images, with new app specific assets.
4. CSS theme. In `src/themes` folder,
   1. rename or create file `appa-theme.js`, `appb-theme.js`.
   2. locate and open `index.js` file, make following update:
      ```diff
      - import Emerald from "./emerald-theme";
      - import Sapphire from "./sapphire-theme";
      - const themes = { Emerald, Sapphire };
      + import AppA from "./appa-theme";
      + import AppB from "./appb-theme";
      + const themes = { AppA, AppB };
      const CurrentTheme = themes[process.env.REACT_APP_STORENAME];
      export { CurrentTheme };
      ```
5. run `npm run build` or `npm start` script.

#### Adding new app name

1. `tools/scripts/buildConstant.js` file, add new app name to const `ALL_APP`, `DEFAULT_APP`.
2. in `assets` folder, add new sub-folder using new app name.

   **NOTE**: To avoid potential issue with different operating system, the folder name is using lowercase app name. Replace the static asset in folder, for example images, with new app specific assets.

3. CSS theme. In `src/themes` folder,
   1. create new theme file `appa-theme.js`, `appb-theme.js`.
   2. locate and open `index.js` file, make following update:
      ```diff
      import Emerald from "./emerald-theme";
      import Sapphire from "./sapphire-theme";
      - const themes = { Emerald, Sapphire };
      + import AppA from "./appa-theme";
      + import AppB from "./appb-theme";
      + const themes = { AppA, AppB, Emerald, Sapphire };
      const CurrentTheme = themes[process.env.REACT_APP_STORENAME];
      export { CurrentTheme };
      ```
4. run `npm run build` or `npm start` script.

#### Build app bundle without React route basename

In cases that basename is not applicable, we can remove the basename for app. To do this, in `assets/template` folder, remove `REACT_APP_ROUTER_BASENAME` entries in `.env` template files. For example,

```diff
PORT={{port}}
HTTPS={{https}}

REACT_APP_STORENAME={{appName}}
- REACT_APP_ROUTER_BASENAME={{appName}}
+ REACT_APP_ROUTER_BASENAME=
```
