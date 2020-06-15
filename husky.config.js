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
const tasks = arr => arr.join(" && ");

module.exports = {
  hooks: {
    "pre-commit": tasks([
      "pretty-quick --staged",
      "./tools/scripts/hooks/verifyCopyright.sh"
    ])
  }
};
