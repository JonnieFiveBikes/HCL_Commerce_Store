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
import { all } from "redux-saga/effects";
//Redux
import * as ACCOUNT from "./watchers/account";
import * as CATALOG from "./watchers/catalog";
import * as ORDER from "./watchers/order";
import * as USER from "./watchers/user";
import * as ERROR from "./watchers/error";
import * as SEO from "./watchers/seo";
import * as CONTRACT from "./watchers/contract";
import * as MARKETING from "./watchers/marketingEvent";
import * as CONTEXT from "./watchers/context";
import * as ORGANIZATION from "./watchers/organization";
import * as RECURRINGORDER from "./watchers/recurringOrder";
import * as ORDERDETAILS from "./watchers/orderDetails";

/**
 * Root Saga
 */
export default function* rootSaga() {
  yield all([
    ACCOUNT.watchSaga(),
    ORDER.watchSaga(),
    CATALOG.watchSaga(),
    ERROR.watchSaga(),
    SEO.watchSaga(),
    USER.watchSaga(),
    CONTRACT.watchSaga(),
    MARKETING.watchSaga(),
    CONTEXT.watchSaga(),
    ORGANIZATION.watchSaga(),
    RECURRINGORDER.watchSaga(),
    ORDERDETAILS.watchSaga(),
  ]);
}
