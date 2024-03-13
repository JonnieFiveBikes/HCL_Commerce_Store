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
 * AccessControlForViewApi - axios parameter creator
 * @export
 */
export const AccessControlForViewApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary By default, this API check if this user is allowed to access this view.
         * @param {string} storeId The store identifier.
         * @param {string} [responseFormat] The response format. If the request has an input body, that body must also use the format specified in \&quot;responseFormat\&quot;. Valid values include �json� and �xml� without the quotes. If the responseFormat isn�t specified, the �accept� HTTP header shall be used to determine the format of the response. If the �accept� HTTP header isn�t specified as well, the default response format shall be in json
         * @param {string} [profileName] Profile name. Profiles determine the subset of data to be returned by a query.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storeStoreIdAccessControlByUserIdAndViewIdGet: async (storeId: string, responseFormat?: string, profileName?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'storeId' is not null or undefined
            assertParamExists('storeStoreIdAccessControlByUserIdAndViewIdGet', 'storeId', storeId)
            const localVarPath = `/store/{storeId}/access_control/byUserIdAndViewId`
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

            if (profileName !== undefined) {
                localVarQueryParameter['profileName'] = profileName;
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
 * AccessControlForViewApi - functional programming interface
 * @export
 */
export const AccessControlForViewApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = AccessControlForViewApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary By default, this API check if this user is allowed to access this view.
         * @param {string} storeId The store identifier.
         * @param {string} [responseFormat] The response format. If the request has an input body, that body must also use the format specified in \&quot;responseFormat\&quot;. Valid values include �json� and �xml� without the quotes. If the responseFormat isn�t specified, the �accept� HTTP header shall be used to determine the format of the response. If the �accept� HTTP header isn�t specified as well, the default response format shall be in json
         * @param {string} [profileName] Profile name. Profiles determine the subset of data to be returned by a query.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async storeStoreIdAccessControlByUserIdAndViewIdGet(storeId: string, responseFormat?: string, profileName?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.storeStoreIdAccessControlByUserIdAndViewIdGet(storeId, responseFormat, profileName, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * AccessControlForViewApi - factory interface
 * @export
 */
export const AccessControlForViewApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = AccessControlForViewApiFp(configuration)
    return {
        /**
         * 
         * @summary By default, this API check if this user is allowed to access this view.
         * @param {string} storeId The store identifier.
         * @param {string} [responseFormat] The response format. If the request has an input body, that body must also use the format specified in \&quot;responseFormat\&quot;. Valid values include �json� and �xml� without the quotes. If the responseFormat isn�t specified, the �accept� HTTP header shall be used to determine the format of the response. If the �accept� HTTP header isn�t specified as well, the default response format shall be in json
         * @param {string} [profileName] Profile name. Profiles determine the subset of data to be returned by a query.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storeStoreIdAccessControlByUserIdAndViewIdGet(storeId: string, responseFormat?: string, profileName?: string, options?: any): AxiosPromise<void> {
            return localVarFp.storeStoreIdAccessControlByUserIdAndViewIdGet(storeId, responseFormat, profileName, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * AccessControlForViewApi - object-oriented interface
 * @export
 * @class AccessControlForViewApi
 * @extends {BaseAPI}
 */
export class AccessControlForViewApi extends BaseAPI {
    /**
     * 
     * @summary By default, this API check if this user is allowed to access this view.
     * @param {string} storeId The store identifier.
     * @param {string} [responseFormat] The response format. If the request has an input body, that body must also use the format specified in \&quot;responseFormat\&quot;. Valid values include �json� and �xml� without the quotes. If the responseFormat isn�t specified, the �accept� HTTP header shall be used to determine the format of the response. If the �accept� HTTP header isn�t specified as well, the default response format shall be in json
     * @param {string} [profileName] Profile name. Profiles determine the subset of data to be returned by a query.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AccessControlForViewApi
     */
    public storeStoreIdAccessControlByUserIdAndViewIdGet(storeId: string, responseFormat?: string, profileName?: string, options?: any) {
        return AccessControlForViewApiFp(this.configuration).storeStoreIdAccessControlByUserIdAndViewIdGet(storeId, responseFormat, profileName, options).then((request) => request(this.axios, this.basePath));
    }
}