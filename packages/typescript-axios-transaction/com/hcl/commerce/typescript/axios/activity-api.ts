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
/**
 * ActivityApi - axios parameter creator
 * @export
 */
export const ActivityApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Gets the activity list by query type and parameters.
         * @param {string} storeId The store identifier.
         * @param {string} q The query name.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storeStoreIdActivityGet: async (storeId: string, q: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'storeId' is not null or undefined
            assertParamExists('storeStoreIdActivityGet', 'storeId', storeId)
            // verify required parameter 'q' is not null or undefined
            assertParamExists('storeStoreIdActivityGet', 'q', q)
            const localVarPath = `/store/{storeId}/activity`
                .replace(`{${"storeId"}}`, String(storeId));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (q !== undefined) {
                localVarQueryParameter['q'] = q;
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
         * 
         * @summary Resolve email activity urls
         * @param {string} storeId The store identifier.
         * @param {string} [emailPromotionId] 
         * @param {string} [urlHeader] 
         * @param {string} [userId] 
         * @param {string} [optOutForwardUrl] 
         * @param {string} [clickedEventUrl] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storeStoreIdActivityUrlsGet: async (storeId: string, emailPromotionId?: string, urlHeader?: string, userId?: string, optOutForwardUrl?: string, clickedEventUrl?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'storeId' is not null or undefined
            assertParamExists('storeStoreIdActivityUrlsGet', 'storeId', storeId)
            const localVarPath = `/store/{storeId}/activity/urls`
                .replace(`{${"storeId"}}`, String(storeId));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (emailPromotionId !== undefined) {
                localVarQueryParameter['emailPromotionId'] = emailPromotionId;
            }

            if (urlHeader !== undefined) {
                localVarQueryParameter['urlHeader'] = urlHeader;
            }

            if (userId !== undefined) {
                localVarQueryParameter['userId'] = userId;
            }

            if (optOutForwardUrl !== undefined) {
                localVarQueryParameter['optOutForwardUrl'] = optOutForwardUrl;
            }

            if (clickedEventUrl !== undefined) {
                localVarQueryParameter['clickedEventUrl'] = clickedEventUrl;
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
 * ActivityApi - functional programming interface
 * @export
 */
export const ActivityApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ActivityApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Gets the activity list by query type and parameters.
         * @param {string} storeId The store identifier.
         * @param {string} q The query name.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async storeStoreIdActivityGet(storeId: string, q: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.storeStoreIdActivityGet(storeId, q, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Resolve email activity urls
         * @param {string} storeId The store identifier.
         * @param {string} [emailPromotionId] 
         * @param {string} [urlHeader] 
         * @param {string} [userId] 
         * @param {string} [optOutForwardUrl] 
         * @param {string} [clickedEventUrl] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async storeStoreIdActivityUrlsGet(storeId: string, emailPromotionId?: string, urlHeader?: string, userId?: string, optOutForwardUrl?: string, clickedEventUrl?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.storeStoreIdActivityUrlsGet(storeId, emailPromotionId, urlHeader, userId, optOutForwardUrl, clickedEventUrl, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * ActivityApi - factory interface
 * @export
 */
export const ActivityApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ActivityApiFp(configuration)
    return {
        /**
         * 
         * @summary Gets the activity list by query type and parameters.
         * @param {string} storeId The store identifier.
         * @param {string} q The query name.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storeStoreIdActivityGet(storeId: string, q: string, options?: any): AxiosPromise<void> {
            return localVarFp.storeStoreIdActivityGet(storeId, q, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Resolve email activity urls
         * @param {string} storeId The store identifier.
         * @param {string} [emailPromotionId] 
         * @param {string} [urlHeader] 
         * @param {string} [userId] 
         * @param {string} [optOutForwardUrl] 
         * @param {string} [clickedEventUrl] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storeStoreIdActivityUrlsGet(storeId: string, emailPromotionId?: string, urlHeader?: string, userId?: string, optOutForwardUrl?: string, clickedEventUrl?: string, options?: any): AxiosPromise<void> {
            return localVarFp.storeStoreIdActivityUrlsGet(storeId, emailPromotionId, urlHeader, userId, optOutForwardUrl, clickedEventUrl, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ActivityApi - object-oriented interface
 * @export
 * @class ActivityApi
 * @extends {BaseAPI}
 */
export class ActivityApi extends BaseAPI {
    /**
     * 
     * @summary Gets the activity list by query type and parameters.
     * @param {string} storeId The store identifier.
     * @param {string} q The query name.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ActivityApi
     */
    public storeStoreIdActivityGet(storeId: string, q: string, options?: any) {
        return ActivityApiFp(this.configuration).storeStoreIdActivityGet(storeId, q, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Resolve email activity urls
     * @param {string} storeId The store identifier.
     * @param {string} [emailPromotionId] 
     * @param {string} [urlHeader] 
     * @param {string} [userId] 
     * @param {string} [optOutForwardUrl] 
     * @param {string} [clickedEventUrl] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ActivityApi
     */
    public storeStoreIdActivityUrlsGet(storeId: string, emailPromotionId?: string, urlHeader?: string, userId?: string, optOutForwardUrl?: string, clickedEventUrl?: string, options?: any) {
        return ActivityApiFp(this.configuration).storeStoreIdActivityUrlsGet(storeId, emailPromotionId, urlHeader, userId, optOutForwardUrl, clickedEventUrl, options).then((request) => request(this.axios, this.basePath));
    }
}
