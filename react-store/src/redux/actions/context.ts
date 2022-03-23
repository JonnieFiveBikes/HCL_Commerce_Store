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
import * as ACTIONTYPES from "../action-types/context";

export const USER_CONTEXT_REQUEST_ACTION = createAction<any, string>(ACTIONTYPES.USER_CONTEXT_REQUESTED);

export const USER_CONTEXT_REQUEST_SUCCESS_ACTION = createAction<any, string>(ACTIONTYPES.USER_CONTEXT_REQUEST_SUCCESS);

export const USER_CONTEXT_REQUEST_ERROR_ACTION = createAction<any, string>(ACTIONTYPES.USER_CONTEXT_REQUEST_ERROR);
