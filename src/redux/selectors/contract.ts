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

const contractSelector = (state: RootReducerState) => {
  return state.contract;
};
const currentContractIdSelector = (state: RootReducerState) => {
  let contractId = state.context.entitlement?.currentTradingAgreementIds[0];
  if (!contractId && state.contract) {
    contractId = Object.keys(state.contract)[0];
  }
  return contractId ? String(contractId) : contractId;
};

const currentEntitledContractsSelector = (state: RootReducerState) => {
  return state.context.entitlement?.currentTradingAgreementIds || [];
};
export {
  contractSelector,
  currentContractIdSelector,
  currentEntitledContractsSelector,
};
