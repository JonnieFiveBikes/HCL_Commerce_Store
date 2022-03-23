/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *==================================================
 */

import { createAction } from "@reduxjs/toolkit";
import * as TYPES from "../action-types/local-storage";

export const LS_LANG_CHANGE_ACTION = createAction<any, string>(TYPES.LS_LANG_CHANGE);

export const LS_LANG_CHANGE_DONE_ACTION = createAction<any, string>(TYPES.LS_LANG_CHANGE_DONE);
