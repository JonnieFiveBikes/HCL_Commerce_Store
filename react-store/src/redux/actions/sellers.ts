/**
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2022
 *
 *==================================================
 */
import { createAction } from "@reduxjs/toolkit";
import * as A from "../action-types/sellers";

const SELLERS_GET_ACTION = createAction<any, string>(A.SELLERS_GET);
const SELLERS_GET_SUCCESS_ACTION = createAction<any, string>(A.SELLERS_GET_SUCCESS);
const SELLERS_GET_FAILURE_ACTION = createAction<any, string>(A.SELLERS_GET_FAILURE);

const SET_SELLER_ACTION = createAction<any, string>(A.SET_SELLER);
const SET_SELLER_SUCCESS_ACTION = createAction<any, string>(A.SET_SELLER_SUCCESS);
const SET_SELLER_FAILURE_ACTION = createAction<any, string>(A.SET_SELLER_FAILURE);

const REG_SELLER_ACTION = createAction<any, string>(A.REG_SELLER);
const REG_SELLER_SUCCESS_ACTION = createAction<any, string>(A.REG_SELLER_SUCCESS);
const REG_SELLER_FAILURE_ACTION = createAction<any, string>(A.REG_SELLER_FAILURE);

export {
  SELLERS_GET_ACTION,
  SELLERS_GET_SUCCESS_ACTION,
  SELLERS_GET_FAILURE_ACTION,
  SET_SELLER_ACTION,
  SET_SELLER_SUCCESS_ACTION,
  SET_SELLER_FAILURE_ACTION,
  REG_SELLER_ACTION,
  REG_SELLER_SUCCESS_ACTION,
  REG_SELLER_FAILURE_ACTION,
};
