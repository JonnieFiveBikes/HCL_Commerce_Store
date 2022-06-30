/**
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2022
 *
 *==================================================
 */
import { createAction } from "@reduxjs/toolkit";
import * as ACTIONTYPES from "../action-types/country";

export const GET_COUNTRY_STATE_LIST_ACTION = createAction<any, string>(ACTIONTYPES.COUNTRY_STATE_LIST_GET_REQUESTED);
