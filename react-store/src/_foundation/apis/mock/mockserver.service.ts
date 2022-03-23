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
import axios, { AxiosRequestConfig, Method, AxiosPromise } from "axios";
const path = require("path");
const join = path.join;
const fs = require("fs");

const mockServerService = {
  // this method is used for HTTP GET method
  getMock(parameters: any, headers?: any, url?: string): AxiosPromise<any> {
    let body = {};
    let header: Headers;
    let headerValues: any = {};
    if (typeof headers === "undefined" || headers === null) {
      header = new Headers();
    } else {
      header = new Headers(headers);
    }
    headerValues["Accept"] = ["application/json"];
    for (let val of headerValues["Accept"]) {
      header.append("Accept", val);
    }

    let requestOptions: AxiosRequestConfig = {
      method: "GET",
      headers: header,
      url: url,
    };
    return axios(requestOptions);
  },

  // HTTP PUT method
  putMock(parameters: any, headers?: any, url?: string): AxiosPromise<any> {
    let body = {};
    let header: Headers;
    let headerValues: any = {};
    if (typeof headers === "undefined" || headers === null) {
      header = new Headers();
    } else {
      header = new Headers(headers);
    }
    headerValues["Accept"] = ["application/json"];
    for (let val of headerValues["Accept"]) {
      header.append("Accept", val);
    }

    let requestOptions: AxiosRequestConfig = {
      method: "PUT",
      headers: header,
      url: url,
    };
    return axios(requestOptions);
  },

  // HTTP POST method
  postMock(parameters: any, headers?: any, url?: string): AxiosPromise<any> {
    let body = {};
    let header: Headers;
    let headerValues: any = {};
    if (typeof headers === "undefined" || headers === null) {
      header = new Headers();
    } else {
      header = new Headers(headers);
    }
    headerValues["Accept"] = ["application/json"];
    for (let val of headerValues["Accept"]) {
      header.append("Accept", val);
    }

    let requestOptions: AxiosRequestConfig = {
      method: "POST",
      headers: header,
      url: url,
    };
    return axios(requestOptions);
  },
};

export default mockServerService;
