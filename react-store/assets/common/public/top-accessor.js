/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2023
 *
 *==================================================
 */

const storeviewURL = new URL(window.location.href);
const storeId = storeviewURL.searchParams.get("storeId");
if (storeId && storeId !== "") {
  window.HCL_STORE_ID = storeId;
}
try {
  window.top.origin; // test access
  window.topOrSelf = window.top;
}
catch (err) {
  window.topOrSelf = window.self;
}
