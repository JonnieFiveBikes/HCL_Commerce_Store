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
  ENTITLED_ORG_REQUESTED,
  ENTITLED_ORG_REQUEST_SUCCESS,
  ENTITLED_ORG_REQUEST_ERROR,
  ORG_SWITCH_REQUESTED,
  ORG_SWITCH_REQUEST_ERROR,
  GET_ORGANIZATION_ADDRESS,
  GET_ORGANIZATION_ADDRESS_SUCCESS,
  GET_ORGANIZATION_ADDRESS_ERROR,
} from "../action-types/organization";

const ENTITLED_ORG_ACTION = createAction<any, string>(ENTITLED_ORG_REQUESTED);

const ENTITLED_ORG_SUCCESS_ACTION = createAction<any, string>(ENTITLED_ORG_REQUEST_SUCCESS);

const ENTITLED_ORG_ERROR_ACTION = createAction<any, string>(ENTITLED_ORG_REQUEST_ERROR);

const ORG_SWITCH_ACTION = createAction<any, string>(ORG_SWITCH_REQUESTED);

const ORG_SWITCH_ERROR_ACTION = createAction<any, string>(ORG_SWITCH_REQUEST_ERROR);

const GET_ORGANIZATION_ADDRESS_ACTION = createAction<any, string>(GET_ORGANIZATION_ADDRESS);
const GET_ORGANIZATION_ADDRESS_SUCCESS_ACTION = createAction<any, string>(GET_ORGANIZATION_ADDRESS_SUCCESS);
const GET_ORGANIZATION_ADDRESS_ERROR_ACTION = createAction<any, string>(GET_ORGANIZATION_ADDRESS_ERROR);
export {
  ENTITLED_ORG_ACTION,
  ENTITLED_ORG_SUCCESS_ACTION,
  ENTITLED_ORG_ERROR_ACTION,
  ORG_SWITCH_ACTION,
  ORG_SWITCH_ERROR_ACTION,
  GET_ORGANIZATION_ADDRESS_ACTION,
  GET_ORGANIZATION_ADDRESS_SUCCESS_ACTION,
  GET_ORGANIZATION_ADDRESS_ERROR_ACTION,
};
