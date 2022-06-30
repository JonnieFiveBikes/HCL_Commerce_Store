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

import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
import { Configuration } from '../../../../../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../../../../../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../../../../../base';
// @ts-ignore
import { InventoryavailabilityInventoryavailability } from '../../../../../com/hcl/commerce/typescript/axios';
// @ts-ignore
import { InventoryavailabilityInventoryavailabilityByorderid } from '../../../../../com/hcl/commerce/typescript/axios';
/**
 * InventoryAvailabilityApi - axios parameter creator
 * @export
 */
export const InventoryAvailabilityApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Gets inventory details for the specified product by its identifier (PartNumber). Multiple partNumbers can be passed to the URI separated by a comma (,).
         * @summary Get details by part number
         * @param {string} storeId The store identifier.
         * @param {string} partNumbers The product identifiers. Multiple values are separated by commas for example, /inventoryavailability/\&#39;AuroraWMDRS-1,\&#39;AuroraWMDRS-2.
         * @param {string} [sellerId] The Marketplace Seller ID. Multiple values are separated by commas. Example: sellerId&#x3D;1,2
         * @param {'xml' | 'json'} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
         * @param {string} [onlineStoreName] The online store name.
         * @param {string} [physicalStoreName] The physical store names. Separate multiple values with a comma for example, physicalStoreName&#x3D;China mall,Sales mall.
         * @param {string} [forUser] User name to act on behalf of.
         * @param {string} [forUserId] User identifier to act on behalf of.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        inventoryAvailabilityGetInventoryAvailabilityByPartNumber: async (storeId: string, partNumbers: string, sellerId?: string, responseFormat?: 'xml' | 'json', onlineStoreName?: string, physicalStoreName?: string, forUser?: string, forUserId?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'storeId' is not null or undefined
            assertParamExists('inventoryAvailabilityGetInventoryAvailabilityByPartNumber', 'storeId', storeId)
            // verify required parameter 'partNumbers' is not null or undefined
            assertParamExists('inventoryAvailabilityGetInventoryAvailabilityByPartNumber', 'partNumbers', partNumbers)
            const localVarPath = `/store/{storeId}/inventoryavailability/byPartNumber/{partNumbers}`
                .replace(`{${"storeId"}}`, String(storeId))
                .replace(`{${"partNumbers"}}`, String(partNumbers));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication basicAuth required
            // http basic authentication required
            setBasicAuthToObject(localVarRequestOptions, configuration)

            if (sellerId !== undefined) {
                localVarQueryParameter['sellerId'] = sellerId;
            }

            if (responseFormat !== undefined) {
                localVarQueryParameter['responseFormat'] = responseFormat;
            }

            if (onlineStoreName !== undefined) {
                localVarQueryParameter['onlineStoreName'] = onlineStoreName;
            }

            if (physicalStoreName !== undefined) {
                localVarQueryParameter['physicalStoreName'] = physicalStoreName;
            }

            if (forUser !== undefined) {
                localVarQueryParameter['forUser'] = forUser;
            }

            if (forUserId !== undefined) {
                localVarQueryParameter['forUserId'] = forUserId;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Gets inventory details for the specified product by its catalog entry ID. Multiple product IDs can be passed to the URI separated by a comma (,).
         * @summary Get details by product identifier
         * @param {string} storeId The store identifier.
         * @param {string} productIds The product identifiers. Multiple values are separated by commas. Example: /inventoryavailability/10001,10002.
         * @param {string} [sellerId] The Marketplace Seller ID. Multiple values are separated by commas. Example: sellerId&#x3D;1,2
         * @param {'xml' | 'json'} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
         * @param {string} [onlineStoreId] The online store identifier.
         * @param {string} [physicalStoreId] The physical store identifiers. Multiple values are separated by commas. Example: physicalStoreId&#x3D;10001,10002.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        inventoryAvailabilityGetInventoryAvailabilityByProductId: async (storeId: string, productIds: string, sellerId?: string, responseFormat?: 'xml' | 'json', onlineStoreId?: string, physicalStoreId?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'storeId' is not null or undefined
            assertParamExists('inventoryAvailabilityGetInventoryAvailabilityByProductId', 'storeId', storeId)
            // verify required parameter 'productIds' is not null or undefined
            assertParamExists('inventoryAvailabilityGetInventoryAvailabilityByProductId', 'productIds', productIds)
            const localVarPath = `/store/{storeId}/inventoryavailability/{productIds}`
                .replace(`{${"storeId"}}`, String(storeId))
                .replace(`{${"productIds"}}`, String(productIds));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication basicAuth required
            // http basic authentication required
            setBasicAuthToObject(localVarRequestOptions, configuration)

            if (sellerId !== undefined) {
                localVarQueryParameter['sellerId'] = sellerId;
            }

            if (responseFormat !== undefined) {
                localVarQueryParameter['responseFormat'] = responseFormat;
            }

            if (onlineStoreId !== undefined) {
                localVarQueryParameter['onlineStoreId'] = onlineStoreId;
            }

            if (physicalStoreId !== undefined) {
                localVarQueryParameter['physicalStoreId'] = physicalStoreId;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Gets inventory details for the specified order by it\'s identifier (order Id).
         * @summary Get details by order ID
         * @param {string} storeId The store identifier.
         * @param {string} physicalStoreId The physical store identifiers. Check inventory availability in provided physical stores. Multiple values are separated by commas for example, physicalStoreId&#x3D;10001,10002.
         * @param {string} orderId The order identifiers for example, /inventoryavailability/10001.
         * @param {'xml' | 'json'} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
         * @param {string} [onlineStoreId] The online store identifier.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        inventoryAvailabilityGetInventoryOverallAvailabilityByOrderId: async (storeId: string, physicalStoreId: string, orderId: string, responseFormat?: 'xml' | 'json', onlineStoreId?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'storeId' is not null or undefined
            assertParamExists('inventoryAvailabilityGetInventoryOverallAvailabilityByOrderId', 'storeId', storeId)
            // verify required parameter 'physicalStoreId' is not null or undefined
            assertParamExists('inventoryAvailabilityGetInventoryOverallAvailabilityByOrderId', 'physicalStoreId', physicalStoreId)
            // verify required parameter 'orderId' is not null or undefined
            assertParamExists('inventoryAvailabilityGetInventoryOverallAvailabilityByOrderId', 'orderId', orderId)
            const localVarPath = `/store/{storeId}/inventoryavailability/byOrderId/{orderId}`
                .replace(`{${"storeId"}}`, String(storeId))
                .replace(`{${"orderId"}}`, String(orderId));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication basicAuth required
            // http basic authentication required
            setBasicAuthToObject(localVarRequestOptions, configuration)

            if (physicalStoreId !== undefined) {
                localVarQueryParameter['physicalStoreId'] = physicalStoreId;
            }

            if (responseFormat !== undefined) {
                localVarQueryParameter['responseFormat'] = responseFormat;
            }

            if (onlineStoreId !== undefined) {
                localVarQueryParameter['onlineStoreId'] = onlineStoreId;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * InventoryAvailabilityApi - functional programming interface
 * @export
 */
export const InventoryAvailabilityApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = InventoryAvailabilityApiAxiosParamCreator(configuration)
    return {
        /**
         * Gets inventory details for the specified product by its identifier (PartNumber). Multiple partNumbers can be passed to the URI separated by a comma (,).
         * @summary Get details by part number
         * @param {string} storeId The store identifier.
         * @param {string} partNumbers The product identifiers. Multiple values are separated by commas for example, /inventoryavailability/\&#39;AuroraWMDRS-1,\&#39;AuroraWMDRS-2.
         * @param {string} [sellerId] The Marketplace Seller ID. Multiple values are separated by commas. Example: sellerId&#x3D;1,2
         * @param {'xml' | 'json'} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
         * @param {string} [onlineStoreName] The online store name.
         * @param {string} [physicalStoreName] The physical store names. Separate multiple values with a comma for example, physicalStoreName&#x3D;China mall,Sales mall.
         * @param {string} [forUser] User name to act on behalf of.
         * @param {string} [forUserId] User identifier to act on behalf of.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async inventoryAvailabilityGetInventoryAvailabilityByPartNumber(storeId: string, partNumbers: string, sellerId?: string, responseFormat?: 'xml' | 'json', onlineStoreName?: string, physicalStoreName?: string, forUser?: string, forUserId?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InventoryavailabilityInventoryavailability>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.inventoryAvailabilityGetInventoryAvailabilityByPartNumber(storeId, partNumbers, sellerId, responseFormat, onlineStoreName, physicalStoreName, forUser, forUserId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Gets inventory details for the specified product by its catalog entry ID. Multiple product IDs can be passed to the URI separated by a comma (,).
         * @summary Get details by product identifier
         * @param {string} storeId The store identifier.
         * @param {string} productIds The product identifiers. Multiple values are separated by commas. Example: /inventoryavailability/10001,10002.
         * @param {string} [sellerId] The Marketplace Seller ID. Multiple values are separated by commas. Example: sellerId&#x3D;1,2
         * @param {'xml' | 'json'} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
         * @param {string} [onlineStoreId] The online store identifier.
         * @param {string} [physicalStoreId] The physical store identifiers. Multiple values are separated by commas. Example: physicalStoreId&#x3D;10001,10002.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async inventoryAvailabilityGetInventoryAvailabilityByProductId(storeId: string, productIds: string, sellerId?: string, responseFormat?: 'xml' | 'json', onlineStoreId?: string, physicalStoreId?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InventoryavailabilityInventoryavailability>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.inventoryAvailabilityGetInventoryAvailabilityByProductId(storeId, productIds, sellerId, responseFormat, onlineStoreId, physicalStoreId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Gets inventory details for the specified order by it\'s identifier (order Id).
         * @summary Get details by order ID
         * @param {string} storeId The store identifier.
         * @param {string} physicalStoreId The physical store identifiers. Check inventory availability in provided physical stores. Multiple values are separated by commas for example, physicalStoreId&#x3D;10001,10002.
         * @param {string} orderId The order identifiers for example, /inventoryavailability/10001.
         * @param {'xml' | 'json'} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
         * @param {string} [onlineStoreId] The online store identifier.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async inventoryAvailabilityGetInventoryOverallAvailabilityByOrderId(storeId: string, physicalStoreId: string, orderId: string, responseFormat?: 'xml' | 'json', onlineStoreId?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InventoryavailabilityInventoryavailabilityByorderid>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.inventoryAvailabilityGetInventoryOverallAvailabilityByOrderId(storeId, physicalStoreId, orderId, responseFormat, onlineStoreId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * InventoryAvailabilityApi - factory interface
 * @export
 */
export const InventoryAvailabilityApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = InventoryAvailabilityApiFp(configuration)
    return {
        /**
         * Gets inventory details for the specified product by its identifier (PartNumber). Multiple partNumbers can be passed to the URI separated by a comma (,).
         * @summary Get details by part number
         * @param {string} storeId The store identifier.
         * @param {string} partNumbers The product identifiers. Multiple values are separated by commas for example, /inventoryavailability/\&#39;AuroraWMDRS-1,\&#39;AuroraWMDRS-2.
         * @param {string} [sellerId] The Marketplace Seller ID. Multiple values are separated by commas. Example: sellerId&#x3D;1,2
         * @param {'xml' | 'json'} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
         * @param {string} [onlineStoreName] The online store name.
         * @param {string} [physicalStoreName] The physical store names. Separate multiple values with a comma for example, physicalStoreName&#x3D;China mall,Sales mall.
         * @param {string} [forUser] User name to act on behalf of.
         * @param {string} [forUserId] User identifier to act on behalf of.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        inventoryAvailabilityGetInventoryAvailabilityByPartNumber(storeId: string, partNumbers: string, sellerId?: string, responseFormat?: 'xml' | 'json', onlineStoreName?: string, physicalStoreName?: string, forUser?: string, forUserId?: string, options?: any): AxiosPromise<InventoryavailabilityInventoryavailability> {
            return localVarFp.inventoryAvailabilityGetInventoryAvailabilityByPartNumber(storeId, partNumbers, sellerId, responseFormat, onlineStoreName, physicalStoreName, forUser, forUserId, options).then((request) => request(axios, basePath));
        },
        /**
         * Gets inventory details for the specified product by its catalog entry ID. Multiple product IDs can be passed to the URI separated by a comma (,).
         * @summary Get details by product identifier
         * @param {string} storeId The store identifier.
         * @param {string} productIds The product identifiers. Multiple values are separated by commas. Example: /inventoryavailability/10001,10002.
         * @param {string} [sellerId] The Marketplace Seller ID. Multiple values are separated by commas. Example: sellerId&#x3D;1,2
         * @param {'xml' | 'json'} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
         * @param {string} [onlineStoreId] The online store identifier.
         * @param {string} [physicalStoreId] The physical store identifiers. Multiple values are separated by commas. Example: physicalStoreId&#x3D;10001,10002.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        inventoryAvailabilityGetInventoryAvailabilityByProductId(storeId: string, productIds: string, sellerId?: string, responseFormat?: 'xml' | 'json', onlineStoreId?: string, physicalStoreId?: string, options?: any): AxiosPromise<InventoryavailabilityInventoryavailability> {
            return localVarFp.inventoryAvailabilityGetInventoryAvailabilityByProductId(storeId, productIds, sellerId, responseFormat, onlineStoreId, physicalStoreId, options).then((request) => request(axios, basePath));
        },
        /**
         * Gets inventory details for the specified order by it\'s identifier (order Id).
         * @summary Get details by order ID
         * @param {string} storeId The store identifier.
         * @param {string} physicalStoreId The physical store identifiers. Check inventory availability in provided physical stores. Multiple values are separated by commas for example, physicalStoreId&#x3D;10001,10002.
         * @param {string} orderId The order identifiers for example, /inventoryavailability/10001.
         * @param {'xml' | 'json'} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
         * @param {string} [onlineStoreId] The online store identifier.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        inventoryAvailabilityGetInventoryOverallAvailabilityByOrderId(storeId: string, physicalStoreId: string, orderId: string, responseFormat?: 'xml' | 'json', onlineStoreId?: string, options?: any): AxiosPromise<InventoryavailabilityInventoryavailabilityByorderid> {
            return localVarFp.inventoryAvailabilityGetInventoryOverallAvailabilityByOrderId(storeId, physicalStoreId, orderId, responseFormat, onlineStoreId, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * InventoryAvailabilityApi - object-oriented interface
 * @export
 * @class InventoryAvailabilityApi
 * @extends {BaseAPI}
 */
export class InventoryAvailabilityApi extends BaseAPI {
    /**
     * Gets inventory details for the specified product by its identifier (PartNumber). Multiple partNumbers can be passed to the URI separated by a comma (,).
     * @summary Get details by part number
     * @param {string} storeId The store identifier.
     * @param {string} partNumbers The product identifiers. Multiple values are separated by commas for example, /inventoryavailability/\&#39;AuroraWMDRS-1,\&#39;AuroraWMDRS-2.
     * @param {string} [sellerId] The Marketplace Seller ID. Multiple values are separated by commas. Example: sellerId&#x3D;1,2
     * @param {'xml' | 'json'} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
     * @param {string} [onlineStoreName] The online store name.
     * @param {string} [physicalStoreName] The physical store names. Separate multiple values with a comma for example, physicalStoreName&#x3D;China mall,Sales mall.
     * @param {string} [forUser] User name to act on behalf of.
     * @param {string} [forUserId] User identifier to act on behalf of.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof InventoryAvailabilityApi
     */
    public inventoryAvailabilityGetInventoryAvailabilityByPartNumber(storeId: string, partNumbers: string, sellerId?: string, responseFormat?: 'xml' | 'json', onlineStoreName?: string, physicalStoreName?: string, forUser?: string, forUserId?: string, options?: any) {
        return InventoryAvailabilityApiFp(this.configuration).inventoryAvailabilityGetInventoryAvailabilityByPartNumber(storeId, partNumbers, sellerId, responseFormat, onlineStoreName, physicalStoreName, forUser, forUserId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Gets inventory details for the specified product by its catalog entry ID. Multiple product IDs can be passed to the URI separated by a comma (,).
     * @summary Get details by product identifier
     * @param {string} storeId The store identifier.
     * @param {string} productIds The product identifiers. Multiple values are separated by commas. Example: /inventoryavailability/10001,10002.
     * @param {string} [sellerId] The Marketplace Seller ID. Multiple values are separated by commas. Example: sellerId&#x3D;1,2
     * @param {'xml' | 'json'} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
     * @param {string} [onlineStoreId] The online store identifier.
     * @param {string} [physicalStoreId] The physical store identifiers. Multiple values are separated by commas. Example: physicalStoreId&#x3D;10001,10002.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof InventoryAvailabilityApi
     */
    public inventoryAvailabilityGetInventoryAvailabilityByProductId(storeId: string, productIds: string, sellerId?: string, responseFormat?: 'xml' | 'json', onlineStoreId?: string, physicalStoreId?: string, options?: any) {
        return InventoryAvailabilityApiFp(this.configuration).inventoryAvailabilityGetInventoryAvailabilityByProductId(storeId, productIds, sellerId, responseFormat, onlineStoreId, physicalStoreId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Gets inventory details for the specified order by it\'s identifier (order Id).
     * @summary Get details by order ID
     * @param {string} storeId The store identifier.
     * @param {string} physicalStoreId The physical store identifiers. Check inventory availability in provided physical stores. Multiple values are separated by commas for example, physicalStoreId&#x3D;10001,10002.
     * @param {string} orderId The order identifiers for example, /inventoryavailability/10001.
     * @param {'xml' | 'json'} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
     * @param {string} [onlineStoreId] The online store identifier.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof InventoryAvailabilityApi
     */
    public inventoryAvailabilityGetInventoryOverallAvailabilityByOrderId(storeId: string, physicalStoreId: string, orderId: string, responseFormat?: 'xml' | 'json', onlineStoreId?: string, options?: any) {
        return InventoryAvailabilityApiFp(this.configuration).inventoryAvailabilityGetInventoryOverallAvailabilityByOrderId(storeId, physicalStoreId, orderId, responseFormat, onlineStoreId, options).then((request) => request(this.axios, this.basePath));
    }
}
