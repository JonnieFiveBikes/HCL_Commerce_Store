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

const { ALL_APP, MODE, PORT, DEFAULT_APP } = require("./buildConstant");

let opts = {
  //defaults
  string: ["appName", "mode", "port", "https"],
  default: {
    appName: DEFAULT_APP,
    mode: MODE.DEFAULT,
    port: "",
    https: "",
  },
};

const cmdArgs = minimist(process.argv.slice(2), opts);

if (cmdArgs.appName.trim() === "") {
  cmdArgs.appName = DEFAULT_APP;
}

if (cmdArgs.mode.trim() === "") {
  cmdArgs.mode = MODE.DEFAULT;
}

console.debug(cmdArgs);

const port = cmdArgs.port !== "" ? cmdArgs.port : cmdArgs.mode === MODE.PREVIEW ? PORT.PREVIEW : PORT.DEV;
const https = cmdArgs.mode === MODE.PREVIEW || cmdArgs.https.toLowerCase() === "true";
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
