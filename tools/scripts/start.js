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

const { ALL_APP, MODE, PORT } = require("./buildConstant");

let opts = {
  //defaults
  string: ["appName", "mode", "port"],
  default: {
    appName: "Emerald",
    mode: MODE.DEFAULT,
    port: "",
  },
};

const cmdArgs = minimist(process.argv.slice(2), opts);

if (cmdArgs.appName.trim() === "") {
  cmdArgs.appName = "Emerald";
}

if (cmdArgs.mode.trim() === "") {
  cmdArgs.mode = MODE.DEFAULT;
}

const port =
  cmdArgs.port !== ""
    ? cmdArgs.port
    : cmdArgs.mode === MODE.PREVIEW
    ? PORT.PREVIEW
    : PORT.DEV;
const https = cmdArgs.mode === MODE.PREVIEW ? true : false;
const runPOption = {
  parallel: true,
  printName: true,
  stdout: process.stdout,
  stderr: process.stderr,
  stdin: process.stdin,
};

const runSOption = {
  parallel: false,
  printName: true,
  stdout: process.stdout,
  stderr: process.stderr,
  stdin: process.stdin,
};

if (cmdArgs.mode !== MODE.MOCK) {
  runAll(
    [
      `generateAsset -- --appName ${cmdArgs.appName} --allApp ${ALL_APP} --mode ${cmdArgs.mode} --port ${port} --https ${https}`,
      "dev",
    ],
    runSOption
  ).catch((e) => {
    console.error(e);
    throw e;
  });
} else {
  runAll(
    [
      `generateAsset -- --appName ${cmdArgs.appName} --allApp ${ALL_APP} --mode ${cmdArgs.mode} --port ${port} --https ${https}`,
    ],
    runSOption
  )
    .then(() => {
      runAll(["mockApi", "dev"], runPOption);
    })
    .catch((e) => {
      console.error(e);
      throw e;
    });
}
