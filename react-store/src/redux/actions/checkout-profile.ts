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
import * as t from "../action-types/checkout-profile";

export const CPROF_CREATE_ACTION = createAction<any, string>(t.CPROF_CREATE);
export const CPROF_CREATE_SUCCESS_ACTION = createAction<any, string>(t.CPROF_CREATE_SUCCESS);
export const CPROF_CREATE_FAILURE_ACTION = createAction<any, string>(t.CPROF_CREATE_FAILURE);
export const CPROF_FETCH_ALL_ACTION = createAction<any, string>(t.CPROF_FETCH_ALL);
export const CPROF_FETCH_ALL_SUCCESS_ACTION = createAction<any, string>(t.CPROF_FETCH_ALL_SUCCESS);
export const CPROF_FETCH_ALL_FAILURE_ACTION = createAction<any, string>(t.CPROF_FETCH_ALL_FAILURE);
export const CPROF_DELETE_ACTION = createAction<any, string>(t.CPROF_DELETE);
export const CPROF_DELETE_SUCCESS_ACTION = createAction<any, string>(t.CPROF_DELETE_SUCCESS);
export const CPROF_DELETE_FAILURE_ACTION = createAction<any, string>(t.CPROF_DELETE_FAILURE);
export const CPROF_UPDATE_ACTION = createAction<any, string>(t.CPROF_UPDATE);
export const CPROF_UPDATE_SUCCESS_ACTION = createAction<any, string>(t.CPROF_UPDATE_SUCCESS);
export const CPROF_UPDATE_FAILURE_ACTION = createAction<any, string>(t.CPROF_UPDATE_FAILURE);
