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
import { ComIbmCommerceRestOrderHandlerOrderHandlerOrderNotification } from '../../../../../com/hcl/commerce/typescript/axios';
// @ts-ignore
import { ComIbmCommerceRestOrderHandlerOrderNotificationHandlerOrderNotificationResponse } from '../../../../../com/hcl/commerce/typescript/axios';
/**
 * OrderNotificationApi - axios parameter creator
 * @export
 */
export const OrderNotificationApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Sends an order notification message.
         * @summary Sends an order notification message.
         * @param {string} storeId The store identifier.
         * @param {string} orderId The order identifier.
         * @param {ComIbmCommerceRestOrderHandlerOrderHandlerOrderNotification} [body] Order notification body.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        orderSendOrderNotificationMessage: async (storeId: string, orderId: string, body?: ComIbmCommerceRestOrderHandlerOrderHandlerOrderNotification, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'storeId' is not null or undefined
            assertParamExists('orderSendOrderNotificationMessage', 'storeId', storeId)
            // verify required parameter 'orderId' is not null or undefined
            assertParamExists('orderSendOrderNotificationMessage', 'orderId', orderId)
            const localVarPath = `/store/{storeId}/order-notifications/{orderId}`
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
 * OrderNotificationApi - functional programming interface
 * @export
 */
export const OrderNotificationApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = OrderNotificationApiAxiosParamCreator(configuration)
    return {
        /**
         * Sends an order notification message.
         * @summary Sends an order notification message.
         * @param {string} storeId The store identifier.
         * @param {string} orderId The order identifier.
         * @param {ComIbmCommerceRestOrderHandlerOrderHandlerOrderNotification} [body] Order notification body.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async orderSendOrderNotificationMessage(storeId: string, orderId: string, body?: ComIbmCommerceRestOrderHandlerOrderHandlerOrderNotification, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ComIbmCommerceRestOrderHandlerOrderNotificationHandlerOrderNotificationResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.orderSendOrderNotificationMessage(storeId, orderId, body, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * OrderNotificationApi - factory interface
 * @export
 */
export const OrderNotificationApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = OrderNotificationApiFp(configuration)
    return {
        /**
         * Sends an order notification message.
         * @summary Sends an order notification message.
         * @param {string} storeId The store identifier.
         * @param {string} orderId The order identifier.
         * @param {ComIbmCommerceRestOrderHandlerOrderHandlerOrderNotification} [body] Order notification body.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        orderSendOrderNotificationMessage(storeId: string, orderId: string, body?: ComIbmCommerceRestOrderHandlerOrderHandlerOrderNotification, options?: any): AxiosPromise<ComIbmCommerceRestOrderHandlerOrderNotificationHandlerOrderNotificationResponse> {
            return localVarFp.orderSendOrderNotificationMessage(storeId, orderId, body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * OrderNotificationApi - object-oriented interface
 * @export
 * @class OrderNotificationApi
 * @extends {BaseAPI}
 */
export class OrderNotificationApi extends BaseAPI {
    /**
     * Sends an order notification message.
     * @summary Sends an order notification message.
     * @param {string} storeId The store identifier.
     * @param {string} orderId The order identifier.
     * @param {ComIbmCommerceRestOrderHandlerOrderHandlerOrderNotification} [body] Order notification body.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OrderNotificationApi
     */
    public orderSendOrderNotificationMessage(storeId: string, orderId: string, body?: ComIbmCommerceRestOrderHandlerOrderHandlerOrderNotification, options?: any) {
        return OrderNotificationApiFp(this.configuration).orderSendOrderNotificationMessage(storeId, orderId, body, options).then((request) => request(this.axios, this.basePath));
    }
}
