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
import { call, put } from "redux-saga/effects";
//Foundation libraries
import urlsService from "../../../_foundation/apis/search/urls.service";
//Redux
import { GET_SEO_CONFIG_SUCCESS_ACTION } from "../../actions/seo";

export function* getSEO(action: any) {
  const { identifier } = action.payload;
  try {
    const response = yield call(
      urlsService.getV2URLResourcesUsingGET,
      action.payload
    );
    yield put(GET_SEO_CONFIG_SUCCESS_ACTION({ identifier, response }));
  } catch (error) {
    if (error.isAxiosError && error.response && error.response.status === 404) {
      const response = error.response;
      yield put(GET_SEO_CONFIG_SUCCESS_ACTION({ identifier, response }));
    }
  }
}
