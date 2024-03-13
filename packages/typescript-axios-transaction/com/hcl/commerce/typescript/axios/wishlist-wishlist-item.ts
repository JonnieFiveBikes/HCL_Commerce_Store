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

import { ComIbmCommerceFoundationCommonDatatypesContactInfoType } from './com-ibm-commerce-foundation-common-datatypes-contact-info-type';
import { ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordType } from './com-ibm-commerce-giftcenter-facade-datatypes-gift-list-purchase-record-type';
import { ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantType } from './com-ibm-commerce-giftcenter-facade-datatypes-gift-list-registrant-type';
import { WishlistWishlistItemAnnouncement } from './wishlist-wishlist-item-announcement';
import { WishlistWishlistItemItem } from './wishlist-wishlist-item-item';
import { WishlistWishlistItemUserDataField } from './wishlist-wishlist-item-user-data-field';

/**
 * 
 * @export
 * @interface WishlistWishlistItem
 */
export interface WishlistWishlistItem {
    /**
     * 
     * @type {string}
     * @memberof WishlistWishlistItem
     */
    externalIdentifier?: string;
    /**
     * 
     * @type {string}
     * @memberof WishlistWishlistItem
     */
    storeName?: string;
    /**
     * 
     * @type {string}
     * @memberof WishlistWishlistItem
     */
    manageAccessPassword?: string;
    /**
     * 
     * @type {Array<ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantType>}
     * @memberof WishlistWishlistItem
     */
    coRegistrant?: Array<ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantType>;
    /**
     * 
     * @type {string}
     * @memberof WishlistWishlistItem
     */
    uniqueID?: string;
    /**
     * 
     * @type {ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantType}
     * @memberof WishlistWishlistItem
     */
    registrant?: ComIbmCommerceGiftcenterFacadeDatatypesGiftListRegistrantType;
    /**
     * 
     * @type {Array<WishlistWishlistItemAnnouncement>}
     * @memberof WishlistWishlistItem
     */
    announcement?: Array<WishlistWishlistItemAnnouncement>;
    /**
     * 
     * @type {ComIbmCommerceFoundationCommonDatatypesContactInfoType}
     * @memberof WishlistWishlistItem
     */
    postEventAddress?: ComIbmCommerceFoundationCommonDatatypesContactInfoType;
    /**
     * 
     * @type {string}
     * @memberof WishlistWishlistItem
     */
    event?: string;
    /**
     * 
     * @type {string}
     * @memberof WishlistWishlistItem
     */
    state?: string;
    /**
     * 
     * @type {string}
     * @memberof WishlistWishlistItem
     */
    location?: string;
    /**
     * 
     * @type {Array<WishlistWishlistItemUserDataField>}
     * @memberof WishlistWishlistItem
     */
    userDataField?: Array<WishlistWishlistItemUserDataField>;
    /**
     * 
     * @type {string}
     * @memberof WishlistWishlistItem
     */
    registryAccessKey?: string;
    /**
     * 
     * @type {string}
     * @memberof WishlistWishlistItem
     */
    lastUpdate?: string;
    /**
     * 
     * @type {string}
     * @memberof WishlistWishlistItem
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof WishlistWishlistItem
     */
    storeId?: string;
    /**
     * 
     * @type {Array<ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordType>}
     * @memberof WishlistWishlistItem
     */
    purchaseRecord?: Array<ComIbmCommerceGiftcenterFacadeDatatypesGiftListPurchaseRecordType>;
    /**
     * 
     * @type {string}
     * @memberof WishlistWishlistItem
     */
    guestMessage?: string;
    /**
     * 
     * @type {string}
     * @memberof WishlistWishlistItem
     */
    accessSpecifier: string;
    /**
     * 
     * @type {string}
     * @memberof WishlistWishlistItem
     */
    optForEmail?: string;
    /**
     * 
     * @type {string}
     * @memberof WishlistWishlistItem
     */
    giftCardAccepted?: string;
    /**
     * 
     * @type {ComIbmCommerceFoundationCommonDatatypesContactInfoType}
     * @memberof WishlistWishlistItem
     */
    preEventAddress?: ComIbmCommerceFoundationCommonDatatypesContactInfoType;
    /**
     * 
     * @type {string}
     * @memberof WishlistWishlistItem
     */
    guestAccessKey?: string;
    /**
     * 
     * @type {Array<WishlistWishlistItemItem>}
     * @memberof WishlistWishlistItem
     */
    item?: Array<WishlistWishlistItemItem>;
    /**
     * 
     * @type {string}
     * @memberof WishlistWishlistItem
     */
    descriptionName?: string;
    /**
     * 
     * @type {string}
     * @memberof WishlistWishlistItem
     */
    createdTime?: string;
    /**
     * 
     * @type {string}
     * @memberof WishlistWishlistItem
     */
    storeOwnerID?: string;
    /**
     * 
     * @type {string}
     * @memberof WishlistWishlistItem
     */
    registry?: string;
}

