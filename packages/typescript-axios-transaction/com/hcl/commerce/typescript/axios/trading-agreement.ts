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

import { Participant } from './participant';

/**
 * 
 * @export
 * @interface TradingAgreement
 */
export interface TradingAgreement {
    /**
     * The participants of the trading agreement (contract or account).
     * @type {Array<Participant>}
     * @memberof TradingAgreement
     */
    participants?: Array<Participant>;
    /**
     * The unique ID of the trading agreement (contract or account).
     * @type {number}
     * @memberof TradingAgreement
     */
    referenceNumber?: number;
    /**
     * Time the trading agreement (contract or account) is created.
     * @type {string}
     * @memberof TradingAgreement
     */
    createTime?: string;
    /**
     * Time the trading agreement (contract or account) is last updated.
     * @type {string}
     * @memberof TradingAgreement
     */
    updateTime?: string;
    /**
     * Start time for the TradingAgreement. If not specified, the TradingAgreement starts immediately.
     * @type {string}
     * @memberof TradingAgreement
     */
    startTime?: string;
    /**
     * End time for the TradingAgreement. If not specified, the TradingAgreement has no end time.
     * @type {string}
     * @memberof TradingAgreement
     */
    endTime?: string;
}

