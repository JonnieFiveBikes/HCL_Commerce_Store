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
const minimist = require("minimist");
const runAll = require("npm-run-all");

const { DEFAULT_APP } = require("./buildConstant");

const opts = {
  //defaults
  string: ["appName"],
  default: {
    appName: DEFAULT_APP,
  },
};

const cmdArgs = minimist(process.argv.slice(2), opts);

if (cmdArgs.appName.trim() === "") {
  cmdArgs.appName = DEFAULT_APP;
}

const runSOption = {
  parallel: false,
  printLabel: true,
  printName: true,
  stdout: process.stdout,
  stderr: process.stderr,
  stdin: process.stdin,
};
const appNames = cmdArgs.appName.split(",");
console.log(appNames);
const scripts = [];
appNames.forEach((sn) => {
  scripts.push(
    `generateAsset -- --appName ${sn} --mode production`,
    "bundle",
    `cleanupBundle -- --appName ${sn} --mode production`
  );
});
runAll(scripts, runSOption).catch((e) => {
  console.error(e);
  throw e;
});
