/* tslint:disable */
/* eslint-disable */
/**
 * HCL Commerce Transaction server Services 
 * These services provide APIs to interact with transaction
 *
 * The version of the OpenAPI document: 9.1.6
 * 
 * (C) Copyright HCL Technologies Limited 2021
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { ComIbmCommerceRestWishlistHandlerWishlistHandlerWishListUpdateResponseItem } from './com-ibm-commerce-rest-wishlist-handler-wishlist-handler-wish-list-update-response-item';

/**
 * Wish list change response.
 * @export
 * @interface ComIbmCommerceRestWishlistHandlerWishlistHandlerWishListUpdateResponse
 */
export interface ComIbmCommerceRestWishlistHandlerWishlistHandlerWishListUpdateResponse {
    /**
     * Wish list item to add or update.
     * @type {Array<ComIbmCommerceRestWishlistHandlerWishlistHandlerWishListUpdateResponseItem>}
     * @memberof ComIbmCommerceRestWishlistHandlerWishlistHandlerWishListUpdateResponse
     */
    item?: Array<ComIbmCommerceRestWishlistHandlerWishlistHandlerWishListUpdateResponseItem>;
    /**
     * Wish list unique identifier.
     * @type {string}
     * @memberof ComIbmCommerceRestWishlistHandlerWishlistHandlerWishListUpdateResponse
     */
    uniqueID: string;
}

