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

import { WishlistWishlistItemAnnouncementEmailRecipient } from './wishlist-wishlist-item-announcement-email-recipient';
import { WishlistWishlistItemAnnouncementUserData } from './wishlist-wishlist-item-announcement-user-data';

/**
 * 
 * @export
 * @interface WishlistWishlistItemAnnouncement
 */
export interface WishlistWishlistItemAnnouncement {
    /**
     * 
     * @type {WishlistWishlistItemAnnouncementUserData}
     * @memberof WishlistWishlistItemAnnouncement
     */
    userData?: WishlistWishlistItemAnnouncementUserData;
    /**
     * 
     * @type {Array<WishlistWishlistItemAnnouncementEmailRecipient>}
     * @memberof WishlistWishlistItemAnnouncement
     */
    emailRecipient: Array<WishlistWishlistItemAnnouncementEmailRecipient>;
    /**
     * 
     * @type {string}
     * @memberof WishlistWishlistItemAnnouncement
     */
    senderEmailAddress: string;
    /**
     * 
     * @type {string}
     * @memberof WishlistWishlistItemAnnouncement
     */
    giftListAnnouncementID?: string;
    /**
     * 
     * @type {string}
     * @memberof WishlistWishlistItemAnnouncement
     */
    sentDate?: string;
    /**
     * 
     * @type {string}
     * @memberof WishlistWishlistItemAnnouncement
     */
    message: string;
    /**
     * 
     * @type {string}
     * @memberof WishlistWishlistItemAnnouncement
     */
    senderName: string;
}


