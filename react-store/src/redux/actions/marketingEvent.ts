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
import { CLICK_EVENT_TRIGGERED, TRIGGER_MARKETING } from "../action-types/marketingEvent";

const CLICK_EVENT_TRIGGERED_ACTION = createAction<any, string>(CLICK_EVENT_TRIGGERED);

const TRIGGER_MARKETING_ACTION = createAction<any, string>(TRIGGER_MARKETING);

export { CLICK_EVENT_TRIGGERED_ACTION, TRIGGER_MARKETING_ACTION };
