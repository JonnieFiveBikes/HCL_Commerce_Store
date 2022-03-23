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
import * as ACTIONTYPES from "../action-types/api";

const API_CALL_ACTION = createAction<any, string>(ACTIONTYPES.API_CALL_REQUESTED);

export { API_CALL_ACTION };
