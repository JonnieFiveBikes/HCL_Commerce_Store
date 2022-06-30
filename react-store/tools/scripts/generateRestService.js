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

/**
 * Deprecated, for backward compatibility only
 * Use this to regrenerate your custom services JS client.
 */
const fs = require("fs");
const swaggerGen = require("swagger-js-codegen").CodeGen;
const minimist = require("minimist");

let swaggerDistDir = "src/_foundation/apis";
let opts = {
  //defaults
  string: ["spec", "name", "resourceDomain", "tag", "ops"],
  default: {
    name: "undefined",
    spec: "undefined",
    resourceDomain: "undefined",
    tag: "undefined",
    ops: "undefined",
  },
};
//console.log(process.execPath);
let cmdArgs = minimist(process.argv.slice(2), opts);
//console.log(cmdArgs);

//verify cms args
if (cmdArgs.spec === "undefined" || cmdArgs.name === "undefined" || cmdArgs.resourceDomain === "undefined") {
  console.error(`Error: You must specify the following cmd line arguments: spec, name, resourceDomain
    Swagger v1.X example:
        npm run generate-rest -- --name GuestIdentity --resourceDomain Transaction --spec tools/scripts/codeGen/swaggerSpec/commerce/guestIdentity.swagger.json --ops 'getCart,addTocart'
    Swaggeer v2.x example with tag:
        npm run generate-rest -- --name ProductView --resourceDomain Search --spec tools/scripts/codeGen/swaggerSpec/commerce/search.swagger.json --tag ProductView --ops 'getCart,addTocart'`);
  throw new Error("Invalid format");
}

generateRestClass(cmdArgs);

function isOpToInclude(operationId, opsToInclude) {
  if (!opsToInclude) {
    return true;
  } else {
    return opsToInclude.indexOf(operationId) > -1;
  }
}

function generateRestClass(opts) {
  let classTemplate = fs.readFileSync("tools/scripts/codeGen/templates/swagger/clazz.mustache", "utf-8");
  let methodTemplate = fs.readFileSync("tools/scripts/codeGen/templates/swagger/method.mustache", "utf-8");
  let requestTemplate = fs.readFileSync("tools/scripts/codeGen/templates/swagger/request.mustache", "utf-8");

  let spec = JSON.parse(fs.readFileSync(opts.spec, "utf-8"));
  let includingOperations = undefined;
  if (opts.ops && opts.ops !== "undefined") {
    includingOperations = opts.ops.split(",");
  }
  //A tag has been specified indicating SWAGGER v2.x. We filter spec to remove
  if (opts.tag && opts.tag !== "undefined") {
    let tagList = opts.tag.split(",");

    let filteredTags = spec.tags.filter(function (tag) {
      return tagList.indexOf(tag.name) >= 0;
    });

    if (filteredTags.length === 0) {
      console.error("Error: The specified tag " + opts.tag + "  is not present in Swagger spec " + opts.spec + ".");
      return;
    }

    Object.keys(spec.paths).forEach(function (pathRoute) {
      /*
       * path = { get: { tags: [] }, post: {  tags: [] } , etc}
       */
      let path = spec.paths[pathRoute];
      delete spec.paths[pathRoute];

      let filteredPath = {};
      Object.keys(path).forEach(function (method) {
        //remvoe deprecated spec for Swagger spec 2.0
        if (!path[method].deprecated && isOpToInclude(path[method].operationId, includingOperations)) {
          tagList.forEach(function (tag) {
            if (path[method].tags.indexOf(tag) !== -1) {
              filteredPath[method] = path[method];
            }
          });
        }
      });

      if (Object.keys(filteredPath).length > 0) {
        spec.paths[pathRoute] = filteredPath;
      }
    });

    spec.tags = filteredTags;
  } else {
    //remove deprecated spec Swagger spec 1.0
    let apis = spec.apis.filter(function (api) {
      let operations = api.operations.filter(function (op) {
        return !op.deprecated && isOpToInclude(op.nickname, includingOperations);
      });
      api.operations = operations;
      return operations.length > 0;
    });
    spec.apis = apis;
  }

  opts.camelCaseResourceDomain = opts.resourceDomain.substr(0, 1).toLowerCase().concat(opts.resourceDomain.substr(1));
  opts.camelCaseClassName = opts.name.substr(0, 1).toLowerCase().concat(opts.name.substr(1));
  //generate
  let source = swaggerGen.getCustomCode({
    className: opts.name,
    beautify: false,
    lint: false,
    mustache: {
      resourceDomainNameCamelCase: opts.camelCaseResourceDomain,
      resourceDomainName: opts.resourceDomain,
      moduleNameCamelCase: opts.camelCaseModuleName,
      classNameCamelCase: opts.camelCaseClassName,
      year: new Date().getFullYear(),
    },
    swagger: spec,
    template: {
      class: classTemplate,
      method: methodTemplate,
      request: requestTemplate,
    },
  });
  fs.mkdirSync(`${swaggerDistDir}/${opts.camelCaseResourceDomain}`, {
    recursive: true,
  });
  fs.writeFile(
    `${swaggerDistDir}/${opts.camelCaseResourceDomain}/${opts.camelCaseClassName}.service.ts`,
    source,
    "utf8",
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(
          `wrote to ${swaggerDistDir}/${opts.camelCaseResourceDomain}/${opts.camelCaseClassName}.service.ts successfully`
        );
      }
    }
  );
}
