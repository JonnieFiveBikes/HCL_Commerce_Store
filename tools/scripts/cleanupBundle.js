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
const fs = require("fs-extra");

const { DIST_FOLDER, BUILD_FOLDER } = require("./buildConstant");

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

fs.removeSync(`${DIST_FOLDER}${cmdArgs.appName}`);
fs.moveSync(`${BUILD_FOLDER}`, `${DIST_FOLDER}${cmdArgs.appName}/`, {
  overwrite: true,
});
console.log(
  `Files moved from ${BUILD_FOLDER} to ${DIST_FOLDER}${cmdArgs.appName}.`
);
