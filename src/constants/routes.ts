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
export const APPROVE_ORDERS = "/approve-orders";
export const SAVED_ORDERS = "/saved-orders";
export const REQUISITION_LISTS = "/requisition-lists";
export const ORDER_DETAILS = "/order-details";
export const ORDER_ID_PARAM = "/:orderId";
export const ORDER_DETAILS_ROUTE = `${ORDER_DETAILS}${ORDER_ID_PARAM}`;

//User
export const ADDRESS_BOOK = "/address-book";
export const ADD_ADDRESS = "/add-address";
export const EDIT_ADDRESS = "/edit-address";
export const ADDRESS_ID_PARAM = "/:addressId";
export const EDIT_ADDRESS_ROUTE = `${EDIT_ADDRESS}${ADDRESS_ID_PARAM}`;
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
