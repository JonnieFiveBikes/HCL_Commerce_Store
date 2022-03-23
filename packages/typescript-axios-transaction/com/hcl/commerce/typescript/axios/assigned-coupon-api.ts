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
import { CartAssignedCoupon } from '../../../../../com/hcl/commerce/typescript/axios';
// @ts-ignore
import { ComIbmCommerceRestOrderHandlerAssignedCouponHandlerApplyCouponBody } from '../../../../../com/hcl/commerce/typescript/axios';
// @ts-ignore
import { ComIbmCommerceRestOrderHandlerAssignedCouponHandlerApplyCouponResponse } from '../../../../../com/hcl/commerce/typescript/axios';
// @ts-ignore
import { ComIbmCommerceRestOrderHandlerAssignedCouponHandlerRemoveCouponResponse } from '../../../../../com/hcl/commerce/typescript/axios';
/**
 * AssignedCouponApi - axios parameter creator
 * @export
 */
export const AssignedCouponApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Applies coupons to the shopping cart.
         * @param {string} storeId The store identifier.
         * @param {ComIbmCommerceRestOrderHandlerAssignedCouponHandlerApplyCouponBody} body The request body for applying a coupon to the shopping cart.
         * @param {string} [responseFormat] The response format. If the request has an input body, that body must also use the format specified in \&quot;responseFormat\&quot;. Valid values include \&quot;json\&quot; and \&quot;xml\&quot; without the quotes. If the responseFormat isn\&#39;t specified, the \&quot;accept\&quot; HTTP header shall be used to determine the format of the response. If the \&quot;accept\&quot; HTTP header isn\&#39;t specified as well, the default response format shall be in json.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        applyCoupon: async (storeId: string, body: ComIbmCommerceRestOrderHandlerAssignedCouponHandlerApplyCouponBody, responseFormat?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'storeId' is not null or undefined
            assertParamExists('applyCoupon', 'storeId', storeId)
            // verify required parameter 'body' is not null or undefined
            assertParamExists('applyCoupon', 'body', body)
            const localVarPath = `/store/{storeId}/cart/@self/assigned_coupon`
                .replace(`{${"storeId"}}`, String(storeId));
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
        /**
         * 
         * @summary Removes coupons from the shopping cart.
         * @param {string} storeId The store identifier.
         * @param {string} couponId Coupon identifier..
         * @param {string} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storeStoreIdCartSelfAssignedCouponCouponIdDelete: async (storeId: string, couponId: string, responseFormat?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'storeId' is not null or undefined
            assertParamExists('storeStoreIdCartSelfAssignedCouponCouponIdDelete', 'storeId', storeId)
            // verify required parameter 'couponId' is not null or undefined
            assertParamExists('storeStoreIdCartSelfAssignedCouponCouponIdDelete', 'couponId', couponId)
            const localVarPath = `/store/{storeId}/cart/@self/assigned_coupon/{couponId}`
                .replace(`{${"storeId"}}`, String(storeId))
                .replace(`{${"couponId"}}`, String(couponId));
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
         * @summary Gets assigned coupons for the shopping cart.
         * @param {string} storeId The store identifier.
         * @param {string} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storeStoreIdCartSelfAssignedCouponGet: async (storeId: string, responseFormat?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'storeId' is not null or undefined
            assertParamExists('storeStoreIdCartSelfAssignedCouponGet', 'storeId', storeId)
            const localVarPath = `/store/{storeId}/cart/@self/assigned_coupon`
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
    }
};

/**
 * AssignedCouponApi - functional programming interface
 * @export
 */
export const AssignedCouponApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = AssignedCouponApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Applies coupons to the shopping cart.
         * @param {string} storeId The store identifier.
         * @param {ComIbmCommerceRestOrderHandlerAssignedCouponHandlerApplyCouponBody} body The request body for applying a coupon to the shopping cart.
         * @param {string} [responseFormat] The response format. If the request has an input body, that body must also use the format specified in \&quot;responseFormat\&quot;. Valid values include \&quot;json\&quot; and \&quot;xml\&quot; without the quotes. If the responseFormat isn\&#39;t specified, the \&quot;accept\&quot; HTTP header shall be used to determine the format of the response. If the \&quot;accept\&quot; HTTP header isn\&#39;t specified as well, the default response format shall be in json.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async applyCoupon(storeId: string, body: ComIbmCommerceRestOrderHandlerAssignedCouponHandlerApplyCouponBody, responseFormat?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ComIbmCommerceRestOrderHandlerAssignedCouponHandlerApplyCouponResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.applyCoupon(storeId, body, responseFormat, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Removes coupons from the shopping cart.
         * @param {string} storeId The store identifier.
         * @param {string} couponId Coupon identifier..
         * @param {string} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async storeStoreIdCartSelfAssignedCouponCouponIdDelete(storeId: string, couponId: string, responseFormat?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ComIbmCommerceRestOrderHandlerAssignedCouponHandlerRemoveCouponResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.storeStoreIdCartSelfAssignedCouponCouponIdDelete(storeId, couponId, responseFormat, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Gets assigned coupons for the shopping cart.
         * @param {string} storeId The store identifier.
         * @param {string} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async storeStoreIdCartSelfAssignedCouponGet(storeId: string, responseFormat?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CartAssignedCoupon>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.storeStoreIdCartSelfAssignedCouponGet(storeId, responseFormat, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * AssignedCouponApi - factory interface
 * @export
 */
export const AssignedCouponApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = AssignedCouponApiFp(configuration)
    return {
        /**
         * 
         * @summary Applies coupons to the shopping cart.
         * @param {string} storeId The store identifier.
         * @param {ComIbmCommerceRestOrderHandlerAssignedCouponHandlerApplyCouponBody} body The request body for applying a coupon to the shopping cart.
         * @param {string} [responseFormat] The response format. If the request has an input body, that body must also use the format specified in \&quot;responseFormat\&quot;. Valid values include \&quot;json\&quot; and \&quot;xml\&quot; without the quotes. If the responseFormat isn\&#39;t specified, the \&quot;accept\&quot; HTTP header shall be used to determine the format of the response. If the \&quot;accept\&quot; HTTP header isn\&#39;t specified as well, the default response format shall be in json.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        applyCoupon(storeId: string, body: ComIbmCommerceRestOrderHandlerAssignedCouponHandlerApplyCouponBody, responseFormat?: string, options?: any): AxiosPromise<ComIbmCommerceRestOrderHandlerAssignedCouponHandlerApplyCouponResponse> {
            return localVarFp.applyCoupon(storeId, body, responseFormat, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Removes coupons from the shopping cart.
         * @param {string} storeId The store identifier.
         * @param {string} couponId Coupon identifier..
         * @param {string} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storeStoreIdCartSelfAssignedCouponCouponIdDelete(storeId: string, couponId: string, responseFormat?: string, options?: any): AxiosPromise<ComIbmCommerceRestOrderHandlerAssignedCouponHandlerRemoveCouponResponse> {
            return localVarFp.storeStoreIdCartSelfAssignedCouponCouponIdDelete(storeId, couponId, responseFormat, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Gets assigned coupons for the shopping cart.
         * @param {string} storeId The store identifier.
         * @param {string} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storeStoreIdCartSelfAssignedCouponGet(storeId: string, responseFormat?: string, options?: any): AxiosPromise<CartAssignedCoupon> {
            return localVarFp.storeStoreIdCartSelfAssignedCouponGet(storeId, responseFormat, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * AssignedCouponApi - object-oriented interface
 * @export
 * @class AssignedCouponApi
 * @extends {BaseAPI}
 */
export class AssignedCouponApi extends BaseAPI {
    /**
     * 
     * @summary Applies coupons to the shopping cart.
     * @param {string} storeId The store identifier.
     * @param {ComIbmCommerceRestOrderHandlerAssignedCouponHandlerApplyCouponBody} body The request body for applying a coupon to the shopping cart.
     * @param {string} [responseFormat] The response format. If the request has an input body, that body must also use the format specified in \&quot;responseFormat\&quot;. Valid values include \&quot;json\&quot; and \&quot;xml\&quot; without the quotes. If the responseFormat isn\&#39;t specified, the \&quot;accept\&quot; HTTP header shall be used to determine the format of the response. If the \&quot;accept\&quot; HTTP header isn\&#39;t specified as well, the default response format shall be in json.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AssignedCouponApi
     */
    public applyCoupon(storeId: string, body: ComIbmCommerceRestOrderHandlerAssignedCouponHandlerApplyCouponBody, responseFormat?: string, options?: any) {
        return AssignedCouponApiFp(this.configuration).applyCoupon(storeId, body, responseFormat, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Removes coupons from the shopping cart.
     * @param {string} storeId The store identifier.
     * @param {string} couponId Coupon identifier..
     * @param {string} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AssignedCouponApi
     */
    public storeStoreIdCartSelfAssignedCouponCouponIdDelete(storeId: string, couponId: string, responseFormat?: string, options?: any) {
        return AssignedCouponApiFp(this.configuration).storeStoreIdCartSelfAssignedCouponCouponIdDelete(storeId, couponId, responseFormat, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Gets assigned coupons for the shopping cart.
     * @param {string} storeId The store identifier.
     * @param {string} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AssignedCouponApi
     */
    public storeStoreIdCartSelfAssignedCouponGet(storeId: string, responseFormat?: string, options?: any) {
        return AssignedCouponApiFp(this.configuration).storeStoreIdCartSelfAssignedCouponGet(storeId, responseFormat, options).then((request) => request(this.axios, this.basePath));
    }
}