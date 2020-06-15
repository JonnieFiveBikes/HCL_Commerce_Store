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

const { MODE } = require("./buildConstant");

const opts = {
  //defaults
  string: ["appName"],
  default: {
    appName: "Emerald",
  },
};

const cmdArgs = minimist(process.argv.slice(2), opts);

if (cmdArgs.appName.trim() === "") {
  cmdArgs.appName = "Emerald";
}

const runSOption = {
  parallel: false,
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
