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
import * as ACTIONTYPES from "../action-types/confirmation";

const OPEN_CONFIRMATION_ACTION = createAction<any, string>(ACTIONTYPES.OPEN_CONFIRMATION);

const CONFIRMATION_HANDLED_ACTION = createAction<any, string>(ACTIONTYPES.CONFIRMATION_HANDLED);

const CONFIRMATION_CANCELLED_ACTION = createAction<any, string>(ACTIONTYPES.CONFIRMATION_CANCELLED);

const CONFIRMATION_COMMS_ACTION = createAction<any, string>(ACTIONTYPES.CONFIRMATION_COMMS);

export {
  OPEN_CONFIRMATION_ACTION,
  CONFIRMATION_CANCELLED_ACTION,
  CONFIRMATION_HANDLED_ACTION,
  CONFIRMATION_COMMS_ACTION,
};
