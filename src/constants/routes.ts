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
export const ORDER_HISTORY = "/order-history";
export const WISH_LIST = "/wish-list";
export const RECURRING_ORDERS = "/recurring-orders";
export const APPROVE_ORDERS = "/approve-orders";
export const SAVED_ORDERS = "/saved-orders";
export const REQUISITION_LISTS = "/requisition-lists";
export const ORDER_DETAILS = "/order-details";
export const ORDER_ID_PARAM = "/:orderId";
export const ORDER_DETAILS_ROUTE = `${ORDER_DETAILS}${ORDER_ID_PARAM}`;

//User
export const ADDRESS_BOOK = "/address-book";
export const PERSONAL_INFORMATION = "/personal-information";

//Account
export const SIGNIN = "/sign-in";
export const BUYER_REGISTRATION = "/buyer-registration";
export const ORG_REGISTRATION = "/organization-registration";
export const ACCOUNT = "/account";
export const DASHBOARD = "/dashboard";

//Search
export const SEARCH = "/search";

//register user access only
export const REGISTER_PROTECTED = "register";
//only guest and generic user access
export const GENERIC_PROTECTED = "generic";
