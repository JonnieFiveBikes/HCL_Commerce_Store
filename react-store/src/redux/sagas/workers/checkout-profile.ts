/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *==================================================
 */

import { call, put } from "redux-saga/effects";
import * as a from "../../actions/checkout-profile";
import { ADDRESS_DETAILS_GET_SUCCESS } from "../../action-types/account";

import { get } from "lodash-es";
import { getSite } from "../../../_foundation/hooks/useSite";
import { CheckoutProfileApi } from "@hcl-commerce-store-sdk/typescript-axios-transaction";
import { site } from "../../../_foundation/constants/site";
import { RF_JSON } from "../../../constants/common";
import { HANDLE_SUCCESS_MESSAGE_ACTION } from "../../actions/success";
import { CREATED } from "http-status-codes";
import personService from "../../../_foundation/apis/transaction/person.service";
import addressUtil from "../../../utils/addressUtil";

export function* fetchAllProfilesSelf(action: any) {
  const siteInfo = getSite();
  const storeId = siteInfo?.storeID ?? "";
  const api = new CheckoutProfileApi(undefined, site.transactionContext);
  const w = get(action, "payload.widget");

  try {
    const r = yield call(api.checkoutProfileGetCheckoutProfile.bind(api), storeId, RF_JSON);
    const s = yield call(personService.findPersonBySelf, {});
    const addresses = get(s, "data.contact", []);
    if (s?.data?.addressLine) {
      addresses.push(addressUtil.getRegisteredInitialAddress(s.data));
    }
    const p = { profiles: get(r, "data.CheckoutProfile", []), addresses };
    if (w) {
      p["widget"] = w;
    }

    yield put({ type: ADDRESS_DETAILS_GET_SUCCESS, response: s.data });
    yield put(a.CPROF_FETCH_ALL_SUCCESS_ACTION(p));
  } catch (e) {
    yield put(a.CPROF_FETCH_ALL_FAILURE_ACTION(e));
  }
}

export function* deleteProfileById(action: any) {
  const siteInfo = getSite();
  const storeId = siteInfo?.storeID ?? "";
  const api = new CheckoutProfileApi(undefined, site.transactionContext);
  const w = get(action, "payload.widget");
  const id = get(action, "payload.profileId");
  const name = get(action, "payload.nickName");

  try {
    yield call(api.checkoutProfileDeleteCheckoutProfile.bind(api), storeId, id, RF_JSON);
    const msg = {
      key: "success-message.DeletedCheckoutProfile",
      messageParameters: { "0": name },
    };
    yield put(HANDLE_SUCCESS_MESSAGE_ACTION(msg));
    yield put(a.CPROF_FETCH_ALL_ACTION({ widget: w }));
  } catch (e) {
    yield put(a.CPROF_DELETE_FAILURE_ACTION(e));
  }
}

export function* createProfile(action: any) {
  const siteInfo = getSite();
  const storeId = siteInfo?.storeID ?? "";
  const api = new CheckoutProfileApi(undefined, site.transactionContext);
  const w = get(action, "payload.widget");
  const body = get(action, "payload.body");

  try {
    const r = yield call(api.checkoutProfileCreateCheckoutProfile.bind(api), storeId, RF_JSON, body);
    if (r.status === CREATED) {
      const msg = {
        key: "success-message.CREATE_CHECKOUT_PROFILE_SUCCESS",
        messageParameters: { "0": body.profileName },
      };
      yield put(HANDLE_SUCCESS_MESSAGE_ACTION(msg));
      yield put(a.CPROF_FETCH_ALL_ACTION({ widget: w }));
    }
  } catch (e) {
    yield put(a.CPROF_CREATE_FAILURE_ACTION(e));
  }
}

export function* editProfileById(action: any) {
  const siteInfo = getSite();
  const storeId = siteInfo?.storeID ?? "";
  const api = new CheckoutProfileApi(undefined, site.transactionContext);
  const w = get(action, "payload.widget");
  const id = get(action, "payload.profileId");
  const name = get(action, "payload.nickName");
  const body = get(action, "payload.body");

  try {
    yield call(api.checkoutProfileUpdateCheckoutProfileById.bind(api), storeId, id, RF_JSON, body);
    const msg = {
      key: "success-message.UpdatedCheckoutProfile",
      messageParameters: { "0": name },
    };
    yield put(HANDLE_SUCCESS_MESSAGE_ACTION(msg));
    yield put(a.CPROF_FETCH_ALL_ACTION({ widget: w }));
  } catch (e) {
    yield put(a.CPROF_UPDATE_FAILURE_ACTION(e));
  }
}
