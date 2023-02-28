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

//Standard libraries
import { AxiosPromise } from "axios";
//Foundation libraries
import { getSite } from "../../hooks/useSite";
import { WishlistApi } from "@hcl-commerce-store-sdk/typescript-axios-transaction";
import { site } from "../../constants/site";

const wishlistApiInstance = new WishlistApi(undefined, site.transactionContext);
const wishListService = {
  /**
   * Gets all of the shopper's wish lists.
   * `@method`
   * `@name WishList#findWishlist`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {integer} pageNumber ` Page number, starting at 1. Valid values include positive integers of 1 and above. The "pageSize" must be specified for paging to work.
   ** `@property {integer} pageSize ` Page size. Used to limit the amount of data returned by a query. Valid values include positive integers of 1 and above. The "pageNumber" must be specified for paging to work.
   */
  findWishlist(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, responseFormat, pageNumber, pageSize, ...options } = parameters;
    return wishlistApiInstance.wishlistFindWishlist(storeId, responseFormat, pageNumber, pageSize, options);
  },

  /**
   * Creates a wish list, either empty or with items.
   * `@method`
   * `@name WishList#createWishlist`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {any} body ` The request body for creating a wishlist or wishlist item.
   */
  createWishlist(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, responseFormat, body, ...options } = parameters;
    return wishlistApiInstance.wishlistCreateWishlist(storeId, responseFormat, body, options);
  },

  /**
   * Updates the wish list to change the description or to add or update an item.
   * `@method`
   * `@name WishList#updateWishlist`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} externalId (required)` The child property of `Parameters`.Wish list external identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {string} addItem ` When set to true, a new item in a request will be added to the wishlist. When false or missing, the wishlist description and/or item will be updated with the information in the request. Default is false.
   ** `@property {any} body ` The request body for updating a wishlist description or wishlist item.
   */
  updateWishlist(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, externalId, responseFormat, addItem, body, ...options } = parameters;
    return wishlistApiInstance.wishlistUpdateWishlist(storeId, externalId, responseFormat, addItem, body, options);
  },

  /**
   * Deletes a wish list or delete an item from a wish list. Specify an itemId or a productId to delete only that item from the wish list; otherwise the entire wish list will be deleted.  When both itemId and productId are provided, itemId will be used ONLY.
   * `@method`
   * `@name WishList#deleteWishlist`
   *
   * `@param {any} parameters` have following properties:
   ** `@property {string} storeId (required)` The child property of `Parameters`.The store identifier.
   ** `@property {string} externalId (required)` The child property of `Parameters`.Wish list external identifier.
   ** `@property {string} responseFormat ` The response format. If the request has an input body, that body must also use the format specified in "responseFormat". Valid values include "json" and "xml" without the quotes. If the responseFormat isn't specified, the "accept" HTTP header shall be used to determine the format of the response. If the "accept" HTTP header isn't specified as well, the default response format shall be in json.
   ** `@property {string} itemId ` Specifies the id of the wish list item to be deleted. If this parameter and productId are missing or blank, the entire wishlist will be deleted.
   ** `@property {string} productId ` Specifies the id of the wish list product to be deleted. If this parameter and itemId are missing or blank, the entire wishlist will be deleted.
   */
  deleteWishlist(parameters: any): AxiosPromise<any> {
    const siteInfo = getSite();
    const { storeId = siteInfo?.storeID, externalId, responseFormat, itemId, productId, ...options } = parameters;
    return wishlistApiInstance.wishlistDeleteWishlist(storeId, externalId, responseFormat, itemId, productId, options);
  },
};

export default wishListService;
