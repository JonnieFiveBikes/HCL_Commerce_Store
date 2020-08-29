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
import { rest } from "msw";
import * as homeCatESpot from "../../../../../mocks/wcs/resources/store/__/espot/data/HomeCategoryRec.mock.json";
import * as categoryRecs from "../../../../../mocks/search/resources/api/v2/categories/data/10516.10501.mock.json";
export const handlers = [
  // Handles a GET /user request
  rest.get(
    "http://localhost/wcs/resources/store/:storeId/espot/Home_CategoryRec",
    (req, res, ctx) => {
      return res(ctx.json(homeCatESpot));
    }
  ),
  rest.get(
    "http://localhost/search/resources/api/v2/categories",
    (req, res, ctx) => {
      return res(ctx.json(categoryRecs));
    }
  ),
];
