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
import { ComIbmCommerceRestSubscriptionHandlerSubscriptionHandlerCancelRecurringOrSubscription } from '../../../../../com/hcl/commerce/typescript/axios';
// @ts-ignore
import { ComIbmCommerceRestSubscriptionHandlerSubscriptionHandlerSubmitRecurringOrSubscription } from '../../../../../com/hcl/commerce/typescript/axios';
// @ts-ignore
import { ComIbmCommerceRestSubscriptionHandlerSubscriptionHandlerSubmitRecurringOrSubscriptionResponse } from '../../../../../com/hcl/commerce/typescript/axios';
// @ts-ignore
import { SubscriptionIBMStoreDetails } from '../../../../../com/hcl/commerce/typescript/axios';
// @ts-ignore
import { SubscriptionIBMStoreSummary } from '../../../../../com/hcl/commerce/typescript/axios';
/**
 * SubscriptionApi - axios parameter creator
 * @export
 */
export const SubscriptionApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Gets subscriptions by user and subscription type.
         * @summary Get by user and subscription type
         * @param {string} storeId The store identifier.
         * @param {string} q The query name.
         * @param {string} subscriptionTypeCode The subscription type code for example, All, RecurringOrder.
         * @param {string} buyerId The buyer ID.
         * @param {string} [profileName] Profile name. Profiles determine the subset of data returned by a query.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        subscriptionByBuyerIdAndSubscriptionType: async (storeId: string, q: string, subscriptionTypeCode: string, buyerId: string, profileName?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'storeId' is not null or undefined
            assertParamExists('subscriptionByBuyerIdAndSubscriptionType', 'storeId', storeId)
            // verify required parameter 'q' is not null or undefined
            assertParamExists('subscriptionByBuyerIdAndSubscriptionType', 'q', q)
            // verify required parameter 'subscriptionTypeCode' is not null or undefined
            assertParamExists('subscriptionByBuyerIdAndSubscriptionType', 'subscriptionTypeCode', subscriptionTypeCode)
            // verify required parameter 'buyerId' is not null or undefined
            assertParamExists('subscriptionByBuyerIdAndSubscriptionType', 'buyerId', buyerId)
            const localVarPath = `/store/{storeId}/subscription`
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

            if (profileName !== undefined) {
                localVarQueryParameter['profileName'] = profileName;
            }

            if (subscriptionTypeCode !== undefined) {
                localVarQueryParameter['subscriptionTypeCode'] = subscriptionTypeCode;
            }

            if (buyerId !== undefined) {
                localVarQueryParameter['buyerId'] = buyerId;
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
         * Gets subscription information by subscription ID.
         * @summary Get by subscription ID
         * @param {string} storeId The store identifier.
         * @param {string} subscriptionId The subcription ID.
         * @param {string} [profileName] Profile name. Profiles determine the subset of data returned by a query.
         * @param {string} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        subscriptionBySubscriptionId: async (storeId: string, subscriptionId: string, profileName?: string, responseFormat?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'storeId' is not null or undefined
            assertParamExists('subscriptionBySubscriptionId', 'storeId', storeId)
            // verify required parameter 'subscriptionId' is not null or undefined
            assertParamExists('subscriptionBySubscriptionId', 'subscriptionId', subscriptionId)
            const localVarPath = `/store/{storeId}/subscription/{subscriptionId}`
                .replace(`{${"storeId"}}`, String(storeId))
                .replace(`{${"subscriptionId"}}`, String(subscriptionId));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (profileName !== undefined) {
                localVarQueryParameter['profileName'] = profileName;
            }

            if (responseFormat !== undefined) {
                localVarQueryParameter['responseFormat'] = responseFormat;
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
         * Cancels the specified recurring or subscription order.
         * @summary Cancel recurring or subscription
         * @param {string} storeId The store identifier.
         * @param {string} orderId The order ID.
         * @param {string} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
         * @param {string} [subscriptionId] The subscription ID.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        subscriptionCancelRecurringOrSubscription: async (storeId: string, orderId: string, responseFormat?: string, subscriptionId?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'storeId' is not null or undefined
            assertParamExists('subscriptionCancelRecurringOrSubscription', 'storeId', storeId)
            // verify required parameter 'orderId' is not null or undefined
            assertParamExists('subscriptionCancelRecurringOrSubscription', 'orderId', orderId)
            const localVarPath = `/store/{storeId}/subscription/{orderId}/cancel_recurring_or_subscription`
                .replace(`{${"storeId"}}`, String(storeId))
                .replace(`{${"orderId"}}`, String(orderId));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (responseFormat !== undefined) {
                localVarQueryParameter['responseFormat'] = responseFormat;
            }

            if (subscriptionId !== undefined) {
                localVarQueryParameter['subscriptionId'] = subscriptionId;
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
         * Submits a recurring or subscription order.
         * @summary Submit recurring or subscription
         * @param {string} storeId The store identifier.
         * @param {string} orderId The order ID.
         * @param {string} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
         * @param {ComIbmCommerceRestSubscriptionHandlerSubscriptionHandlerSubmitRecurringOrSubscription} [body] Request body.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        subscriptionSubmitRecurringOrSubscription: async (storeId: string, orderId: string, responseFormat?: string, body?: ComIbmCommerceRestSubscriptionHandlerSubscriptionHandlerSubmitRecurringOrSubscription, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'storeId' is not null or undefined
            assertParamExists('subscriptionSubmitRecurringOrSubscription', 'storeId', storeId)
            // verify required parameter 'orderId' is not null or undefined
            assertParamExists('subscriptionSubmitRecurringOrSubscription', 'orderId', orderId)
            const localVarPath = `/store/{storeId}/subscription/{orderId}/submit_recurring_or_subscription`
                .replace(`{${"storeId"}}`, String(storeId))
                .replace(`{${"orderId"}}`, String(orderId));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (responseFormat !== undefined) {
                localVarQueryParameter['responseFormat'] = responseFormat;
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(body, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * SubscriptionApi - functional programming interface
 * @export
 */
export const SubscriptionApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = SubscriptionApiAxiosParamCreator(configuration)
    return {
        /**
         * Gets subscriptions by user and subscription type.
         * @summary Get by user and subscription type
         * @param {string} storeId The store identifier.
         * @param {string} q The query name.
         * @param {string} subscriptionTypeCode The subscription type code for example, All, RecurringOrder.
         * @param {string} buyerId The buyer ID.
         * @param {string} [profileName] Profile name. Profiles determine the subset of data returned by a query.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async subscriptionByBuyerIdAndSubscriptionType(storeId: string, q: string, subscriptionTypeCode: string, buyerId: string, profileName?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<SubscriptionIBMStoreSummary>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.subscriptionByBuyerIdAndSubscriptionType(storeId, q, subscriptionTypeCode, buyerId, profileName, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Gets subscription information by subscription ID.
         * @summary Get by subscription ID
         * @param {string} storeId The store identifier.
         * @param {string} subscriptionId The subcription ID.
         * @param {string} [profileName] Profile name. Profiles determine the subset of data returned by a query.
         * @param {string} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async subscriptionBySubscriptionId(storeId: string, subscriptionId: string, profileName?: string, responseFormat?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<SubscriptionIBMStoreDetails>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.subscriptionBySubscriptionId(storeId, subscriptionId, profileName, responseFormat, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Cancels the specified recurring or subscription order.
         * @summary Cancel recurring or subscription
         * @param {string} storeId The store identifier.
         * @param {string} orderId The order ID.
         * @param {string} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
         * @param {string} [subscriptionId] The subscription ID.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async subscriptionCancelRecurringOrSubscription(storeId: string, orderId: string, responseFormat?: string, subscriptionId?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ComIbmCommerceRestSubscriptionHandlerSubscriptionHandlerCancelRecurringOrSubscription>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.subscriptionCancelRecurringOrSubscription(storeId, orderId, responseFormat, subscriptionId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Submits a recurring or subscription order.
         * @summary Submit recurring or subscription
         * @param {string} storeId The store identifier.
         * @param {string} orderId The order ID.
         * @param {string} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
         * @param {ComIbmCommerceRestSubscriptionHandlerSubscriptionHandlerSubmitRecurringOrSubscription} [body] Request body.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async subscriptionSubmitRecurringOrSubscription(storeId: string, orderId: string, responseFormat?: string, body?: ComIbmCommerceRestSubscriptionHandlerSubscriptionHandlerSubmitRecurringOrSubscription, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ComIbmCommerceRestSubscriptionHandlerSubscriptionHandlerSubmitRecurringOrSubscriptionResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.subscriptionSubmitRecurringOrSubscription(storeId, orderId, responseFormat, body, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * SubscriptionApi - factory interface
 * @export
 */
export const SubscriptionApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = SubscriptionApiFp(configuration)
    return {
        /**
         * Gets subscriptions by user and subscription type.
         * @summary Get by user and subscription type
         * @param {string} storeId The store identifier.
         * @param {string} q The query name.
         * @param {string} subscriptionTypeCode The subscription type code for example, All, RecurringOrder.
         * @param {string} buyerId The buyer ID.
         * @param {string} [profileName] Profile name. Profiles determine the subset of data returned by a query.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        subscriptionByBuyerIdAndSubscriptionType(storeId: string, q: string, subscriptionTypeCode: string, buyerId: string, profileName?: string, options?: any): AxiosPromise<SubscriptionIBMStoreSummary> {
            return localVarFp.subscriptionByBuyerIdAndSubscriptionType(storeId, q, subscriptionTypeCode, buyerId, profileName, options).then((request) => request(axios, basePath));
        },
        /**
         * Gets subscription information by subscription ID.
         * @summary Get by subscription ID
         * @param {string} storeId The store identifier.
         * @param {string} subscriptionId The subcription ID.
         * @param {string} [profileName] Profile name. Profiles determine the subset of data returned by a query.
         * @param {string} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        subscriptionBySubscriptionId(storeId: string, subscriptionId: string, profileName?: string, responseFormat?: string, options?: any): AxiosPromise<SubscriptionIBMStoreDetails> {
            return localVarFp.subscriptionBySubscriptionId(storeId, subscriptionId, profileName, responseFormat, options).then((request) => request(axios, basePath));
        },
        /**
         * Cancels the specified recurring or subscription order.
         * @summary Cancel recurring or subscription
         * @param {string} storeId The store identifier.
         * @param {string} orderId The order ID.
         * @param {string} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
         * @param {string} [subscriptionId] The subscription ID.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        subscriptionCancelRecurringOrSubscription(storeId: string, orderId: string, responseFormat?: string, subscriptionId?: string, options?: any): AxiosPromise<ComIbmCommerceRestSubscriptionHandlerSubscriptionHandlerCancelRecurringOrSubscription> {
            return localVarFp.subscriptionCancelRecurringOrSubscription(storeId, orderId, responseFormat, subscriptionId, options).then((request) => request(axios, basePath));
        },
        /**
         * Submits a recurring or subscription order.
         * @summary Submit recurring or subscription
         * @param {string} storeId The store identifier.
         * @param {string} orderId The order ID.
         * @param {string} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
         * @param {ComIbmCommerceRestSubscriptionHandlerSubscriptionHandlerSubmitRecurringOrSubscription} [body] Request body.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        subscriptionSubmitRecurringOrSubscription(storeId: string, orderId: string, responseFormat?: string, body?: ComIbmCommerceRestSubscriptionHandlerSubscriptionHandlerSubmitRecurringOrSubscription, options?: any): AxiosPromise<ComIbmCommerceRestSubscriptionHandlerSubscriptionHandlerSubmitRecurringOrSubscriptionResponse> {
            return localVarFp.subscriptionSubmitRecurringOrSubscription(storeId, orderId, responseFormat, body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * SubscriptionApi - object-oriented interface
 * @export
 * @class SubscriptionApi
 * @extends {BaseAPI}
 */
export class SubscriptionApi extends BaseAPI {
    /**
     * Gets subscriptions by user and subscription type.
     * @summary Get by user and subscription type
     * @param {string} storeId The store identifier.
     * @param {string} q The query name.
     * @param {string} subscriptionTypeCode The subscription type code for example, All, RecurringOrder.
     * @param {string} buyerId The buyer ID.
     * @param {string} [profileName] Profile name. Profiles determine the subset of data returned by a query.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SubscriptionApi
     */
    public subscriptionByBuyerIdAndSubscriptionType(storeId: string, q: string, subscriptionTypeCode: string, buyerId: string, profileName?: string, options?: any) {
        return SubscriptionApiFp(this.configuration).subscriptionByBuyerIdAndSubscriptionType(storeId, q, subscriptionTypeCode, buyerId, profileName, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Gets subscription information by subscription ID.
     * @summary Get by subscription ID
     * @param {string} storeId The store identifier.
     * @param {string} subscriptionId The subcription ID.
     * @param {string} [profileName] Profile name. Profiles determine the subset of data returned by a query.
     * @param {string} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SubscriptionApi
     */
    public subscriptionBySubscriptionId(storeId: string, subscriptionId: string, profileName?: string, responseFormat?: string, options?: any) {
        return SubscriptionApiFp(this.configuration).subscriptionBySubscriptionId(storeId, subscriptionId, profileName, responseFormat, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Cancels the specified recurring or subscription order.
     * @summary Cancel recurring or subscription
     * @param {string} storeId The store identifier.
     * @param {string} orderId The order ID.
     * @param {string} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
     * @param {string} [subscriptionId] The subscription ID.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SubscriptionApi
     */
    public subscriptionCancelRecurringOrSubscription(storeId: string, orderId: string, responseFormat?: string, subscriptionId?: string, options?: any) {
        return SubscriptionApiFp(this.configuration).subscriptionCancelRecurringOrSubscription(storeId, orderId, responseFormat, subscriptionId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Submits a recurring or subscription order.
     * @summary Submit recurring or subscription
     * @param {string} storeId The store identifier.
     * @param {string} orderId The order ID.
     * @param {string} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
     * @param {ComIbmCommerceRestSubscriptionHandlerSubscriptionHandlerSubmitRecurringOrSubscription} [body] Request body.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SubscriptionApi
     */
    public subscriptionSubmitRecurringOrSubscription(storeId: string, orderId: string, responseFormat?: string, body?: ComIbmCommerceRestSubscriptionHandlerSubscriptionHandlerSubmitRecurringOrSubscription, options?: any) {
        return SubscriptionApiFp(this.configuration).subscriptionSubmitRecurringOrSubscription(storeId, orderId, responseFormat, body, options).then((request) => request(this.axios, this.basePath));
    }
}
