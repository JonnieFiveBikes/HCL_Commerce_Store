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

import { ComIbmCommerceRestWishlistHandlerWishlistHandlerProcessBodyParameterDescriptionAnnouncementBodyDescription } from './com-ibm-commerce-rest-wishlist-handler-wishlist-handler-process-body-parameter-description-announcement-body-description';

/**
 * Description of the post input body to process the wish list.
 * @export
 * @interface ComIbmCommerceRestWishlistHandlerWishlistHandlerProcessBodyParameterDescription
 */
export interface ComIbmCommerceRestWishlistHandlerWishlistHandlerProcessBodyParameterDescription {
    /**
     * The email announcements made about the gift list by the registrants to friends and family.
     * @type {Array<ComIbmCommerceRestWishlistHandlerWishlistHandlerProcessBodyParameterDescriptionAnnouncementBodyDescription>}
     * @memberof ComIbmCommerceRestWishlistHandlerWishlistHandlerProcessBodyParameterDescription
     */
    announcement?: Array<ComIbmCommerceRestWishlistHandlerWishlistHandlerProcessBodyParameterDescriptionAnnouncementBodyDescription>;
}


