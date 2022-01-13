/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020
 *
 *==================================================
 */
//Redux
import { LOCALE } from "../../_foundation/constants/common";
import { localStorageUtil } from "../../_foundation/utils/storageUtil";
import { RootReducerState } from "../reducers";

const langSelector = (state: RootReducerState) => {
  return localStorageUtil.get(LOCALE) || "";
};
export { langSelector };
