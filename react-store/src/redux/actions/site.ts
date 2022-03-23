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
//Standard libraries
import { createAction } from "@reduxjs/toolkit";
//Redux
import * as ACTIONTYPES from "../action-types/site";

export const INIT_SITE_SUCCESS_ACTION = createAction<any, string>(ACTIONTYPES.INIT_SITE_SUCCESS);
