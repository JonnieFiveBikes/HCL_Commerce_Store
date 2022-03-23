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

import { AddressReference } from './address-reference';

/**
 * The shipping to address term and condition. <br>This optional term specifies where products purchased under a contract are shipped. Specifying this term and condition allows you to limit the locations where orders can be shipped. If the ship-to address term and condition is not specified, a ship-to address must be specified each time an order is made under a contract. If this term is specified, the buyer cannot specify a new ship-to address when placing an order, but must select a ship-to address from a list of ship-to addresses.
 * @export
 * @interface ShippingTCShipToAddressAllOf
 */
export interface ShippingTCShipToAddressAllOf {
    /**
     * The full entity class name of the term and condition.
     * @type {string}
     * @memberof ShippingTCShipToAddressAllOf
     */
    _class?: ShippingTCShipToAddressAllOfClassEnum;
    /**
     * 
     * @type {AddressReference}
     * @memberof ShippingTCShipToAddressAllOf
     */
    addressReference?: AddressReference;
}

/**
    * @export
    * @enum {string}
    */
export enum ShippingTCShipToAddressAllOfClassEnum {
    ComIbmCommerceTradingEntitiesShippingTcShipToAddress = 'com.ibm.commerce.trading.entities.ShippingTCShipToAddress'
}



