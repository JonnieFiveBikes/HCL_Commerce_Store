/**
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020
 *
 *==================================================
 */
//Standard libraries
import { createAction } from "@reduxjs/toolkit";
//Redux
import * as ACTIONTYPES from "../action-types/seo";

const GET_SEO_CONFIG_ACTION = createAction<any, string>(ACTIONTYPES.GET_SEO_CONFIG);
const GET_SEO_CONFIG_SUCCESS_ACTION = createAction<any, string>(ACTIONTYPES.GET_SEO_CONFIG_SUCCESS);
export { GET_SEO_CONFIG_ACTION, GET_SEO_CONFIG_SUCCESS_ACTION };
