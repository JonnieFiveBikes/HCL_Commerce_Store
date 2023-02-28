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

// DON'T CHANGE ANYTHING HERE -- add these values in your .env.development.local file.
//   See the .env.development.local.template file for more information
//   At the very least, your .env.development.local file should contain something like this:
//   SEARCH_HOST=https://10.190.66.207:30901
//   TRANSACTION_HOST=https://10.190.66.207:6443
const HOSTS = {
  SEARCH_HOST: process.env.SEARCH_HOST ?? "https://127.0.0.1:30901",
  TRANSACTION_HOST: process.env.TRANSACTION_HOST ?? "https://127.0.0.1",
  MOCK_HOST: process.env.MOCK_HOST ?? "http://127.0.0.1:9002",
  CMC_HOST: process.env.CMC_HOST ?? "https://127.0.0.1:7443",
  DX_HOST: process.env.DX_HOST ?? "https://localhost",
  GRAPHQL_HOST: process.env.GRAPHQL_HOST ?? "https://127.0.0.1:3443",
  APPROVALS_HOST: process.env.APPROVALS_HOST ?? "https://127.0.0.1:6643",
};

console.log("Using values: %o", HOSTS);

const { SEARCH_HOST, TRANSACTION_HOST, MOCK_HOST, CMC_HOST, DX_HOST, GRAPHQL_HOST, APPROVALS_HOST } = HOSTS;
const isHttps = process.env.HTTPS === "true";

const useMock = () => process.env.REACT_APP_MOCK === "true";
const appHost = `${isHttps ? "https" : "http"}://127.0.0.1:${process.env.PORT || 3000}`;

let searchTerm = "";
const minPrice = "100";
const maxPrice = "500";

const AppName = process.env.REACT_APP_STORENAME;

if (AppName === "Emerald") {
  searchTerm = "bed";
} else {
  searchTerm = "bolt";
}

const mockPathRewrite = (path, req) => {
  let newPath = path.replace(/searchTerm=[a-zA-Z0-9]+/, "searchTerm=" + searchTerm);
  if (newPath.indexOf("minPrice=0&") === -1 || newPath.indexOf("maxPrice=500&") === -1) {
    newPath = newPath.replace(/minPrice=\d+/, "minPrice=" + minPrice);
    newPath = newPath.replace(/maxPrice=\d+/, "maxPrice=" + maxPrice);
  }
  return newPath;
};

const storeAssetPathRewrite = {
  "^/EmeraldSAS": `/${AppName}/EmeraldSAS`,
  "^/EmeraldCAS": `/${AppName}/EmeraldCAS`,
  "^/SapphireSAS": `/${AppName}/SapphireSAS`,
  "^/SapphireCAS": `/${AppName}/SapphireCAS`,
  "^/hclstore": `/${AppName}/`,
  "^/wcsstore": `/${AppName}/`,
  "^/ExtendedSitesCatalogAssetStore": `/${AppName}/ExtendedSitesCatalogAssetStore`,
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

const lobToolsProxyContext = {
  target: CMC_HOST,
  ...options,
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
const dxProxyContext = {
  target: DX_HOST,
  ...options,
};

const graphQLContext = {
  target: GRAPHQL_HOST,
  ...options,
};

const approvalsContext = {
  target: APPROVALS_HOST,
  ...options,
};

module.exports = function (app) {
  app.use(["/search/resources/api/", "/search/resources/store/"], createProxyMiddleware(searchProxyContext));
  app.use("/wcs/resources/", createProxyMiddleware(transactionProxyContext));
  app.use(
    [
      "/hclstore",
      "/wcsstore",
      "/EmeraldSAS",
      "/EmeraldCAS",
      "/SapphireSAS",
      "/EmeraldPlusSAS",
      "/SapphirePlusSAS",
      "/ExtendedSitesCatalogAssetStore",
    ],
    createProxyMiddleware(hclStoreAssetProxyContext)
  );
  app.use(["/lobtools/", "/tooling/", "/sockjs-node/", "/rest/"], createProxyMiddleware(lobToolsProxyContext));
  app.use("/dx/", createProxyMiddleware(dxProxyContext));
  app.use("/graphql", createProxyMiddleware(graphQLContext));
  app.use("/approvals", createProxyMiddleware(approvalsContext));
};
