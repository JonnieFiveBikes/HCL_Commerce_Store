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
Running copyStoreAssets...
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
const theOtherAppName = cmdArgs.allApp === "" ? [] : cmdArgs.allApp.split(",").filter((s) => s !== appName);
const appNameLowercase = cmdArgs.appName.toLowerCase();
const appNameToken = new RegExp("{{appName}}", "g");
const appNameLowercaseToken = new RegExp("{{lowercaseAppName}}", "g");
const portToken = new RegExp("{{port}}", "g");
const httpsToken = new RegExp("{{https}}", "g");

/**
 * check `target` for missing keys that are in `source` and copy them
 *   over from `source` by adding a prefix to the value -- then check
 *   if any nested objects exist and put them in `outputQueue` to be checked
 *   later
 * @param {*} source source object to verify against
 * @param {*} target target object to check for missing keys in
 * @param {*} targetPrefix prefix to append to dummy value copied from source
 * @param {*} outputQueue queue to update for any nested objects
 */
function copyMissingLangObject(source, target, targetPrefix, outputQueue) {
  const srcKeys = Object.keys(source);
  const objKeys = srcKeys.filter((k) => typeof source[k] !== "string");
  const missing = srcKeys.filter((k) => target[k] === undefined && typeof source[k] === "string");

  // copy dummy string keys
  missing.forEach((k) => (target[k] = `${targetPrefix}:${source[k]}`));

  // add nested objects to output queue (verify recursively) -- check if target
  //   doesn't even have such an object and add an empty one that will be filled
  objKeys.forEach((k) => {
    if (target[k] === undefined) {
      target[k] = {};
    }
    outputQueue.push({ source: source[k], target: target[k] });
  });
}

/**
 * for each non-english language (`lang`), check to see if a counterpart from the english
 *   language json (`source`) is missing -- if so, generate a dummy value and then
 *   recursively (done iteratively) check any nested objects
 * @param {*} source root english language json object
 * @param {*} lang language to verify against english language json
 */
function processLang(source, lang) {
  const target = fs.readJsonSync(`./public/locales/${lang}/translation.json`, {
    encoding: "utf-8",
  });
  const queue = [];

  copyMissingLangObject(source, target, lang, queue);
  for (let i = 0; i < queue.length; ++i) {
    copyMissingLangObject(queue[i].source, queue[i].target, lang, queue);
  }

  if (queue.length > 0) {
    fs.writeJSONSync(`./public/locales/${lang}/translation.json`, target, {
      encoding: "utf-8",
      spaces: 2,
    });
  }
}

/**
 * asynchronously process each non-english language
 */
function generateDummyTranslations() {
  const langs = fs.readdirSync(`./public/locales`);
  const enJson = fs.readJsonSync("./public/locales/en-US/translation.json", {
    encoding: "utf-8",
  });
  langs.filter((l) => l !== "en-US").forEach(async (l) => processLang(enJson, l));
}

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

    // fix missing locale data for non-en langs
    generateDummyTranslations();
  } catch (e) {
    console.error(e);
  }
  console.log(TEMPLATE_FOLDERS);
  TEMPLATE_FOLDERS.forEach((TEMPLATE_FOLDER) => {
    const files = find.fileSync(TEMPLATE_FILENAME_PATTERN, TEMPLATE_FOLDER);
    files.forEach(function (file) {
      const destFile = file.split(".template")[0].substr(TEMPLATE_FOLDER.length);
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
