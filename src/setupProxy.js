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
const { createProxyMiddleware } = require("http-proxy-middleware");

// update this point to your Search and Transaction server.
// const SEARCH_HOST = MOCK_HOST;
// CHANGE SEARCH_HOST to point to the Docker Search Query Service for ElasticSearch
// for example const SEARCH_HOST = "https://10.190.66.159:30901";
const SEARCH_HOST = "https://localhost:30901";
const TRANSACTION_HOST = "https://localhost";
const MOCK_HOST = "http://localhost:9002";

const useMock = () => {
  return process.env.REACT_APP_MOCK === "true";
};

const appHost = `${
  process.env.HTTPS === "true" ? "https" : "http"
}://localhost:${process.env.PORT ? process.env.PORT : 3000}`;

const mockPathRewrite = (path, req) => {
  let newPath = path.replace(/storeId=\d+/, "storeId=12101");
  newPath = newPath.replace(/catalogId=\d+/, "catalogId=11051");
  newPath = newPath.replace(/searchTerm=[a-zA-Z0-9]+/, "searchTerm=bed");
  newPath = newPath.replace(/term=[a-zA-Z0-9]+/, "term=bed");
  newPath = newPath.replace(
    /contractId=[-]*\d+/,
    "contractId=4000000000000000503"
  );
  newPath = newPath.replace(
    /activeOrgId=[-]*\d+/,
    "activeOrgId=7000000000000003002"
  );
  newPath = newPath.replace(/orderId=\d+/, "orderId=mockOrderId");
  newPath = newPath.replace(/pageSize=\d+/, "pageSize=5");
  newPath = newPath.replace(/pageNumber=\d+/, "pageNumber=1");
  if (
    newPath.indexOf("minPrice=0&") === -1 ||
    newPath.indexOf("maxPrice=500&") === -1
  ) {
    newPath = newPath.replace(/minPrice=\d+/, "minPrice=0");
    newPath = newPath.replace(/maxPrice=\d+/, "maxPrice=0");
  }
  return newPath;
};

const storeAssetPathRewrite = (path, req) => {
  return path.replace("/hclstore/", "/").replace("/wcsstore/", "/");
};

const options = {
  changeOrigin: true,
  secure: false,
};

const searchProxyContext = useMock()
  ? {
      target: MOCK_HOST,
      ...options,
      pathRewrite: mockPathRewrite,
    }
  : {
      target: SEARCH_HOST,
      ...options,
    };

const hclStoreAssetProxyContext = {
  target: appHost,
  ...options,
  pathRewrite: storeAssetPathRewrite,
};

const transactionProxyContext = useMock()
  ? {
      target: MOCK_HOST,
      ...options,
      pathRewrite: mockPathRewrite,
    }
  : {
      target: TRANSACTION_HOST,
      ...options,
    };

module.exports = function (app) {
  app.use(
    ["/search/resources/api/", "/search/resources/store/"],
    createProxyMiddleware(searchProxyContext)
  );
  app.use("/wcs/resources/", createProxyMiddleware(transactionProxyContext));
  app.use(
    ["/hclstore/", "/wcsstore/ExtendedSitesCatalogAssetStore"],
    createProxyMiddleware(hclStoreAssetProxyContext)
  );
};
