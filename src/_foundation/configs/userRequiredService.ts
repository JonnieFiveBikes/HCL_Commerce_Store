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
 *
 */
export const userRequiredServices = ["cart", "checkout"];
