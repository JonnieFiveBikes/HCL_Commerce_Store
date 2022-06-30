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
/**
 * The constant hold a list of service names that require guest shopper.
 * For example /wcs/resources/store/{storeId}/cart/@self?sortOrderItemBy=orderItemID,
 * the `cart` after storeId is the entry in the arry.
 * `skip` is to specify a request method that will be skipped/ignored.
 *
 */
export const userRequiredServices = { cart: { skip: "GET" }, checkout: {} };
