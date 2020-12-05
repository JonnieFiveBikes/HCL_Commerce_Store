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
//Standard libraries
import { call, put, select } from "redux-saga/effects";
//Foundation libraries
import contractService from "../../../_foundation/apis/transaction/contract.service";
import switchContractService from "../../../_foundation/apis/transaction/switchContract.service";
//Redux
import {
  FETCH_CONTRACT_SUCCESS_ACTION,
  FETCH_CONTRACT_ERROR_ACTION,
  CONTRACT_SWITCH_ERROR_ACTION,
} from "../../actions/contract";
import { USER_CONTEXT_REQUEST_ACTION } from "../../actions/context";
import {
  contractSelector,
  currentEntitledContractsSelector,
} from "../../selectors/contract";
import { loginStatusSelector } from "../../selectors/user";

export function* fetchContract(action: any) {
  try {
    const payload = action.payload;
    const response = yield call(contractService.findEligible, payload);
    yield put(FETCH_CONTRACT_SUCCESS_ACTION({ ...response.data }));
    yield* preSelectContract(action);
  } catch (error) {
    yield put(FETCH_CONTRACT_ERROR_ACTION(error));
  }
}

export function* switchContract(action: any) {
  try {
    yield call(switchContractService.changeContract, action.payload);
    yield put(USER_CONTEXT_REQUEST_ACTION(action.payload));
  } catch (error) {
    yield put(CONTRACT_SWITCH_ERROR_ACTION(error));
  }
}

export function* preSelectContract(action: any) {
  try {
    //fetch first entitled contract and explicitly set it to entitled contract.
    const contracts = yield select(contractSelector);
    const entitledContracts: string[] = yield select(
      currentEntitledContractsSelector
    );
    const isLogin = yield select(loginStatusSelector);
    if (isLogin && entitledContracts.length !== 1) {
      const contract = Object.keys(contracts)[0];
      yield call(switchContractService.changeContract, {
        $queryParameters: { contractId: String(contract) },
        ...action.payload,
      });
      yield put(USER_CONTEXT_REQUEST_ACTION(action.payload));
    }
  } catch (error) {
    yield put(CONTRACT_SWITCH_ERROR_ACTION(error));
  }
}
