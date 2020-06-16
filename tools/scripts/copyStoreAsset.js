/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020
 *
 *==================================================
 */
console.log(
  `
============================
Running copyStoreAssest...
============================
`
);

const fs = require("fs-extra");
const find = require("find");
const minimist = require("minimist");

const { MODE, DEFAULT_APP } = require("./buildConstant");

const ASSET_FOLDER = "assets/";
const COMMON_ASSET_FOLDER = `${ASSET_FOLDER}common/`;
const TEMPLATE_FILENAME_PATTERN = new RegExp(".+\\.template$");
const TEMPLATE_FOLDERS = [];

// add default template folder
TEMPLATE_FOLDERS.push(`${ASSET_FOLDER}template/default/`);

let opts = {
  //defaults
  string: ["appName", "allApp", "mode", "port", "https"],
  default: {
    appName: DEFAULT_APP,
    allApp: "",
    mode: MODE.DEFAULT,
    port: 3000,
    https: false,
  },
};
//console.log(process.execPath);
const cmdArgs = minimist(process.argv.slice(2), opts);
console.log(cmdArgs);

if (cmdArgs.mode !== MODE.DEFAULT) {
  TEMPLATE_FOLDERS.push(`${ASSET_FOLDER}template/${cmdArgs.mode}/`);
}

if (cmdArgs.appName.trim() === "") {
  cmdArgs.appName = DEFAULT_APP;
}

const appName = cmdArgs.appName;
const theOtherAppName =
  cmdArgs.allApp === ""
    ? []
    : cmdArgs.allApp.split(",").filter((s) => s !== appName);
const appNameLowercase = cmdArgs.appName.toLowerCase();
const appNameToken = new RegExp("{{appName}}", "g");
const appNameLowercaseToken = new RegExp("{{lowercaseAppName}}", "g");
const portToken = new RegExp("{{port}}", "g");
const httpsToken = new RegExp("{{https}}", "g");

function copyAsset() {
  try {
    // copy asset from other app, so that the catalog images both all apps can
    // served from same app from developer env.
    theOtherAppName.forEach((otherappName) => {
      fs.copySync(`${ASSET_FOLDER}${otherappName.toLowerCase()}`, ".");
      console.log(`Copy ${ASSET_FOLDER}${otherappName.toLowerCase()} success!`);
    });
    fs.copySync(`${ASSET_FOLDER}${appNameLowercase}`, ".");
    console.log(`Copy ${ASSET_FOLDER}${appNameLowercase} success!`);
    fs.copySync(`${COMMON_ASSET_FOLDER}`, ".");
    console.log(`Copy ${COMMON_ASSET_FOLDER} success!`);
  } catch (e) {
    console.error(e);
  }
  console.log(TEMPLATE_FOLDERS);
  TEMPLATE_FOLDERS.forEach((TEMPLATE_FOLDER) => {
    const files = find.fileSync(TEMPLATE_FILENAME_PATTERN, TEMPLATE_FOLDER);
    files.forEach(function (file) {
      const destFile = file
        .split(".template")[0]
        .substr(TEMPLATE_FOLDER.length);
      fs.outputFileSync(
        destFile,
        fs
          .readFileSync(file, "utf8")
          .replace(appNameToken, appName)
          .replace(appNameLowercaseToken, appNameLowercase)
          .replace(portToken, cmdArgs.port)
          .replace(httpsToken, cmdArgs.https),
        "utf8",
        (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log(`File ${file} copied to ${destFile}.`);
          }
        }
      );
    });
  });
}
copyAsset();
