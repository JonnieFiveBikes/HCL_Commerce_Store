/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020, 2021
 *
 *==================================================
 */
const http = require("http");
const mockserver = require("mockserver");
const port = 9002;

mockserver.headers = ["WCPersonalization", "WCTrustedToken"];
const mockServer = http.createServer(mockserver("mocks")).listen(port);
mockServer.on("request", (req, res) => {
  const url = req.url;
  const queryIndex = url.indexOf("?"),
    _query = (queryIndex >= 0 ? url.substring(queryIndex).replace(/\?/g, "") : "")
      .split("&")
      //sort the parameter so that we have identical mock file in the end;
      .sort();
  const langIdIndex = _query.findIndex((e) => e.startsWith("langId="));
  let langId = [];
  if (langIdIndex > -1) {
    langId = _query.splice(langIdIndex, 1);
  }
  //we have langId always at the end of the mock file name.
  const query = _query.concat(langId);
  let path = url;
  if (queryIndex > 0) {
    path = url.substring(0, queryIndex);
  }
  req.url = path + (queryIndex > 0 ? `?${query.join("&")}` : "");
  console.log("Mock request url: ", req.url);
});
console.log(`Mock Server is running on port ${port}`);
