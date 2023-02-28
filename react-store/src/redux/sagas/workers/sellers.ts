/*
 *---------------------------------------------------
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2022
 *
 *---------------------------------------------------
 */
import { Configuration, MarketplaceSellerApi } from "@hcl-commerce-store-sdk/typescript-axios-transaction";
import {
  Configuration as ApCfg,
  SellerOrganizationRequestsApi,
} from "@hcl-commerce-store-sdk/typescript-axios-approvals";
import { get } from "lodash-es";
import { call, put } from "redux-saga/effects";
import { CommerceEnvironment, SUCCESS_MSG_PREFIX } from "../../../constants/common";
import { getSite } from "../../../_foundation/hooks/useSite";

import {
  REG_SELLER_FAILURE_ACTION,
  REG_SELLER_SUCCESS_ACTION,
  SELLERS_GET_SUCCESS_ACTION,
  SET_SELLER_SUCCESS_ACTION,
} from "../../actions/sellers";
import i18n from "../../../i18n";
import { HANDLE_SUCCESS_MESSAGE_ACTION } from "../../actions/success";

export function* getSellers(action: any) {
  const site: any = getSite();
  const storeId = site?.storeID ?? "";
  const api = new MarketplaceSellerApi(new Configuration(), site.transactionContext);
  const widget = get(action, "payload.widget");
  const langId = CommerceEnvironment.reverseLanguageMap[i18n.languages[0].split("-").join("_")];

  try {
    // remember to pass-in the axios-canceler and widget-name into real-API once implemented
    const response = yield call(api.findActiveMarketplaceSellerByStoreId.bind(api), storeId, langId);
    yield put(SELLERS_GET_SUCCESS_ACTION({ widget, response: { ...response.data, b2b: site.isB2B } }));
  } catch (error) {
    yield put(SELLERS_GET_SUCCESS_ACTION({ widget, response: { marketplaceSellers: [], count: 0, b2b: site.isB2B } }));
  }
}

export function* setSeller(action: any) {
  try {
    const sellers = get(action, "payload.sellers");
    yield put(SET_SELLER_SUCCESS_ACTION({ sellers }));
  } catch (error) {
    yield put(SET_SELLER_SUCCESS_ACTION({ sellers: null }));
  }
}

export function* registerSeller(action: any) {
  const site: any = getSite();
  const storeId = site?.storeID ?? "";
  const { payload = {} } = action;
  const { body = {}, widget, callback } = payload;
  const api = new SellerOrganizationRequestsApi(new ApCfg(), site.approvalsContext);
  try {
    const response = yield call(api.createSellerOrganizationRequest.bind(api), { ...body, storeId });
    yield put(REG_SELLER_SUCCESS_ACTION({ widget, response }));
    callback();
    yield put(HANDLE_SUCCESS_MESSAGE_ACTION({ key: `${SUCCESS_MSG_PREFIX}SellerRegd` }));
  } catch (error) {
    yield put(REG_SELLER_FAILURE_ACTION({ widget, response: { error } }));
  }
}
