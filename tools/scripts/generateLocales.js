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
const fsExtra = require("fs-extra");
const find = require("find");
const nlsRoot = "src/";
const outDir = "public/locales/";
[
  "en-US",
  "fr-FR",
  "de-DE",
  "it-IT",
  "es-ES",
  "pt-BR",
  "zh-CN",
  "zh-TW",
  "ko-KR",
  "ja-JP",
  "sv-SE"
].forEach(function(locale) {
  var pattern = new RegExp(
    "^src[/\\\\].+[/\\\\]nls[/\\\\].+_" + locale + "\\.json$"
  );
  var jsonObj = {};

  find.fileSync(pattern, nlsRoot).forEach(function(file) {
    Object.assign(jsonObj, fsExtra.readJsonSync(file));
  });

  fsExtra.outputJsonSync(
    outDir + "/" + locale + "/" + "translation.json",
    jsonObj,
    {
      spaces: "\t"
    }
  );
});
