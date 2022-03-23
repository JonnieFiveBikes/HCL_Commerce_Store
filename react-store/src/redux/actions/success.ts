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
import * as ACTIONTYPES from "../action-types/success";
import { SuccessMessageReducerState } from "../reducers/reducerStateInterface";

const HANDLE_SUCCESS_MESSAGE_ACTION = createAction<SuccessMessageReducerState, string>(
  ACTIONTYPES.HANDLE_SUCCESS_MESSAGE
);
const RESET_SUCCESS_MESSAGE_ACTION = createAction(ACTIONTYPES.RESET_SUCCESS_MESSAGE);
export { HANDLE_SUCCESS_MESSAGE_ACTION, RESET_SUCCESS_MESSAGE_ACTION };
