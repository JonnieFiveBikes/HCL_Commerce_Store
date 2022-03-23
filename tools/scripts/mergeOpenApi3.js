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
const fs = require("fs-extra");
const find = require("find");
const minimist = require("minimist");

let opts = {
  //defaults
  string: ["input", "output"],
};
//console.log(process.execPath);
let cmdArgs = minimist(process.argv.slice(2), opts);
//console.log(cmdArgs);

//verify cms args
if (cmdArgs.input === "undefined" || cmdArgs.output === "undefined") {
  console.error(
    `Error: You must specify the following cmd line arguments: input, output
    eg. node tools/scripts/mergeOpenApi3.js --input packages/typescript-axios-transaction/specs/transaction --output packages/typescript-axios-transaction/specs/transaction.json`
  );
  return;
}

const SPEC_FILENAME_PATTERN = new RegExp(".+\\.json$");

let specJson = null;

const files = find.fileSync(SPEC_FILENAME_PATTERN, cmdArgs.input);
function mergeSpec(spec) {
  if (!specJson) {
    specJson = spec;
  } else {
    specJson.tags = specJson.tags.concat(spec.tags);
    specJson.paths = { ...specJson.paths, ...spec.paths };

    specJson.components.schemas = {
      ...specJson.components.schemas,
      ...spec.components.schemas,
    };
  }
}

files.forEach((file) => {
  mergeSpec(JSON.parse(fs.readFileSync(file, "utf-8")));
});

//remove enum from parameter.
for (const [, p] of Object.entries(specJson.paths)) {
  // console.log(p);
  for (const [, method] of Object.entries(p)) {
    method.parameters?.forEach((param) => {
      if (param.schema) {
        delete param.schema.enum;
      }
    });
  }
}

fs.outputFileSync(cmdArgs.output, JSON.stringify(specJson), "utf8");
