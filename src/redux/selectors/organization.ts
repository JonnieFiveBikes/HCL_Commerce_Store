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
import { RootReducerState } from "../reducers";

const entitledOrgSelector = (state: RootReducerState) => {
  return state.organization.entitledOrganizations;
};
const activeOrgSelector = (state: RootReducerState) => {
  return state.context.entitlement?.activeOrganizationId;
};

export { entitledOrgSelector, activeOrgSelector };
