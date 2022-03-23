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

import { EspotExperimentResult } from './espot-experiment-result';
import { EspotMarketingContent } from './espot-marketing-content';

/**
 * 
 * @export
 * @interface EspotMarketingSpotDataTitle
 */
export interface EspotMarketingSpotDataTitle {
    /**
     * 
     * @type {Array<EspotExperimentResult>}
     * @memberof EspotMarketingSpotDataTitle
     */
    experimentResult?: Array<EspotExperimentResult>;
    /**
     * 
     * @type {EspotMarketingContent}
     * @memberof EspotMarketingSpotDataTitle
     */
    marketingContent: EspotMarketingContent;
    /**
     * 
     * @type {string}
     * @memberof EspotMarketingSpotDataTitle
     */
    marketingSpotDataTitleDataType: string;
    /**
     * 
     * @type {string}
     * @memberof EspotMarketingSpotDataTitle
     */
    marketingSpotDataTitleName: string;
    /**
     * 
     * @type {string}
     * @memberof EspotMarketingSpotDataTitle
     */
    marketingSpotDataTitleId: string;
    /**
     * 
     * @type {string}
     * @memberof EspotMarketingSpotDataTitle
     */
    marketingSpotDataTitleActivityID?: string;
}


