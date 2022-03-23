/**
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *==================================================
 */
//Standard libraries
import { createAction } from "@reduxjs/toolkit";
//Redux
import * as ACTIONTYPES from "../action-types/category";

const UPDATE_CATEGORIES_STATE_ACTION = createAction<any>(ACTIONTYPES.UPDATE_CATEGORIES_STATE);

export { UPDATE_CATEGORIES_STATE_ACTION };
