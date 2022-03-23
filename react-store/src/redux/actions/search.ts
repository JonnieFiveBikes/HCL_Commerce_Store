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
import * as ACTIONTYPES from "../action-types/search";

const KEYWORDS_UPDATED_ACTION = createAction<any, string>(ACTIONTYPES.KEYWORDS_UPDATED);

const KEYWORDS_RESET_ACTION = createAction<any, string>(ACTIONTYPES.KEYWORDS_RESET);

export { KEYWORDS_UPDATED_ACTION, KEYWORDS_RESET_ACTION };
