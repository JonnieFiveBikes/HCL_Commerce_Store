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
import { get } from "lodash-es";
import { call, put } from "redux-saga/effects";
import { CommerceEnvironment } from "../../../constants/common";
import { getSite } from "../../../_foundation/hooks/useSite";

import { SELLERS_GET_SUCCESS_ACTION, SET_SELLER_SUCCESS_ACTION } from "../../actions/sellers";
import i18n from "../../../i18n";

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
