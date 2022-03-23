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
import {
  FETCH_ELIGIBLE_CONTRACT_REQUESTED,
  FETCH_ELIGIBLE_CONTRACT_SUCCESS,
  FETCH_ELIGIBLE_CONTRACT_ERROR,
  CONTRACT_SWITCH_REQEUSTED,
  CONTRACT_SWITCH_ERROR,
} from "../action-types/contract";

const FETCH_CONTRACT_REQUESTED_ACTION = createAction<any, string>(FETCH_ELIGIBLE_CONTRACT_REQUESTED);

const FETCH_CONTRACT_SUCCESS_ACTION = createAction<any, string>(FETCH_ELIGIBLE_CONTRACT_SUCCESS);

const FETCH_CONTRACT_ERROR_ACTION = createAction<any, string>(FETCH_ELIGIBLE_CONTRACT_ERROR);

const CONTRACT_SWITCH_ACTION = createAction<any, string>(CONTRACT_SWITCH_REQEUSTED);

const CONTRACT_SWITCH_ERROR_ACTION = createAction<any, string>(CONTRACT_SWITCH_ERROR);

export {
  FETCH_CONTRACT_REQUESTED_ACTION,
  FETCH_CONTRACT_SUCCESS_ACTION,
  FETCH_CONTRACT_ERROR_ACTION,
  CONTRACT_SWITCH_ACTION,
  CONTRACT_SWITCH_ERROR_ACTION,
};
