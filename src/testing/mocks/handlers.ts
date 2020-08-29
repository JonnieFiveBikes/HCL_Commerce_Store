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
export const handlers = [
  // Handles a GET /user request
  rest.get("*", (req, res, ctx) => {
    return res(ctx.status(404));
  }),
];
