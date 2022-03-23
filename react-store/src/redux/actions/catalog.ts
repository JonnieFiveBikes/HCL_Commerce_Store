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
import * as ACTIONTYPES from "../action-types/catalog";

const getProductListAction = createAction<any>(ACTIONTYPES.PRODUCT_LIST_GET_REQUESTED);

const resetProductListAction = createAction(ACTIONTYPES.PRODUCT_LIST_RESET_REQUESTED);

const getProductListForPDPAction = createAction<any>(ACTIONTYPES.PRODUCT_LIST_FOR_PDP_GET_REQUESTED);

const getProductListDetailsAction = createAction<any>(ACTIONTYPES.PRODUCT_LIST_DEETS);

export { getProductListAction, resetProductListAction, getProductListForPDPAction, getProductListDetailsAction };
