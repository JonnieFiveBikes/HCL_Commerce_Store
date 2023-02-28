/*
 *---------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2022
 *
 *---------------------------------------------------
 */
const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      "@mui/styled-engine": path.resolve(__dirname, "../node_modules/@mui/styled-engine-sc"),
    },
  },
};
