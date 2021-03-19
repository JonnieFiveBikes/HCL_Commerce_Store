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

import "jest-canvas-mock";
import "@testing-library/jest-dom/extend-expect";
// src/setupTests.js
import { server } from "./testing/mocks/server";
// Establish API mocking before all tests.

jest.mock("./_foundation/hooks/useSite/SiteInfoService", () => {
  return {
    SiteInfoService: {
      getSiteInfo: () => {
        return {
          getSiteValue: () => {
            //this is used by rest service only
            return {
              storeName: "Emerald",
              transactionContext: "/wcs/resources",
              searchContext: "/search/resources",
              storeID: "11",
              catalogStoreID: "12001",
              catalogID: "11501",
              defaultCurrencyID: "USD",
              defaultLanguageID: "-1",
              storeType: "MHS",
              isB2B: false,
              supportedLanguages: ["-1"],
              supportedCurrencies: ["USD"],
              inventorySystem: -2,
            };
          },
        };
      },
    },
  };
});
window.scrollTo = jest.fn();
beforeAll(() => {
  server.listen();
});
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());
