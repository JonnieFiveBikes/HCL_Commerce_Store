/**
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020
 *
 *==================================================
 */

export const HOME = "/";

//Order
export const CART = "/cart";
export const CHECKOUT = "/checkout";
export const CHECKOUT_SHIPPING = `${CHECKOUT}/shipping`;
export const CHECKOUT_PAYMENT = `${CHECKOUT}/payment`;
export const CHECKOUT_REVIEW = `${CHECKOUT}/review`;
export const ORDER_CONFIRMATION = "/order-confirmation";
export const ORDER_HISTORY = "/order-history";
export const WISH_LIST = "/wish-list";
export const RECURRING_ORDERS = "/recurring-orders";
export const INPROGRESS_ORDERS = "/inprogress-orders";
export const REQUISITION_LISTS = "/requisition-lists";
export const VIEW_UPLOAD_LOGS = "/view-upload-logs";
export const ORDER_DETAILS = "/order-details";
export const ORDER_ID_PARAM = "/:orderId";
export const ORDER_DETAILS_ROUTE = `${ORDER_DETAILS}${ORDER_ID_PARAM}`;
export const LIST_ID_PARAM = "/:orderId";

//User
export const ADDRESS_BOOK = "/address-book";
export const ADD_ADDRESS = "/add-address";
export const EDIT_ADDRESS = "/edit-address";
export const ADDRESS_ID_PARAM = "/:addressId";
export const EDIT_ADDRESS_ROUTE = `${EDIT_ADDRESS}${ADDRESS_ID_PARAM}`;

//Account
export const SIGNIN = "/sign-in";
export const BUYER_REGISTRATION = "/buyer-registration";
export const ORG_REGISTRATION = "/organization-registration";
export const ACCOUNT = "/account";
export const DASHBOARD = "/dashboard";
export const FORGOT_PASSWORD = "/forgot-password";
//Search
export const SEARCH = "/search";

//register user access only
export const REGISTER_PROTECTED = "register";
//only guest and generic user access
export const GENERIC_PROTECTED = "generic";

export const BUYER_MANAGEMENT = "/buyer-management";
export const APPROVALS_MANAGEMENT = "/approvals-management";
export const ORGANIZATION_MANAGEMENT = "/organization-management";
export const ORDER_APPROVAL = "/order-approval";

//Checkout Profile
export const CHECKOUT_PROFILES = "/list-checkout-profiles";
export const CHECKOUT_PROFILE_CREATE = "/checkout-profile-create";
export const CHECKOUT_PROFILE_EDIT = "/edit-checkout-profile";

// in-progress orders + items
export const IP_ORDER_DETAILS = "/inprogress-order-details";
export const IP_ORDER_DETAILS_ROUTE = `${IP_ORDER_DETAILS}${ORDER_ID_PARAM}`;

// Reqisition List + items
export const REQUISITION_LIST_DETAILS = "/requisition-list-details";
export const REQUISITION_LIST_DETAILS_ROUTE = `${REQUISITION_LIST_DETAILS}${LIST_ID_PARAM}`;

export const COMPARE_ROUTE = "/compare-products";