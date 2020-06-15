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
const http = require("http");
const mockserver = require("mockserver");
const port = 9002;

mockserver.headers = ["WCPersonalization", "WCTrustedToken"];
http.createServer(mockserver("mocks")).listen(port);
console.log(`Mock Server is running on port ${port}`);
