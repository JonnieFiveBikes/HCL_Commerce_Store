/* tslint:disable */
/* eslint-disable */
/**
 * HCL Commerce Services - Query Service
 * Query Service Api Documentation
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
 * V2CategoryResourceApi - axios parameter creator
 * @export
 */
export const V2CategoryResourceApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Gets Response for V2.0 API for store as per the requirements
         * @param {string} storeId 
         * @param {Array<string>} [identifier] 
         * @param {Array<string>} [id] 
         * @param {string} [parentCategoryId] 
         * @param {Array<string>} [depthAndLimit] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getV2CategoryResources: async (storeId: string, identifier?: Array<string>, id?: Array<string>, parentCategoryId?: string, depthAndLimit?: Array<string>, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'storeId' is not null or undefined
            assertParamExists('getV2CategoryResources', 'storeId', storeId)
            const localVarPath = `/api/v2/categories`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (storeId !== undefined) {
                localVarQueryParameter['storeId'] = storeId;
            }

            if (identifier) {
                localVarQueryParameter['identifier'] = identifier;
            }

            if (id) {
                localVarQueryParameter['id'] = id;
            }

            if (parentCategoryId !== undefined) {
                localVarQueryParameter['parentCategoryId'] = parentCategoryId;
            }

            if (depthAndLimit) {
                localVarQueryParameter['depthAndLimit'] = depthAndLimit;
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
 * V2CategoryResourceApi - functional programming interface
 * @export
 */
export const V2CategoryResourceApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = V2CategoryResourceApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Gets Response for V2.0 API for store as per the requirements
         * @param {string} storeId 
         * @param {Array<string>} [identifier] 
         * @param {Array<string>} [id] 
         * @param {string} [parentCategoryId] 
         * @param {Array<string>} [depthAndLimit] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getV2CategoryResources(storeId: string, identifier?: Array<string>, id?: Array<string>, parentCategoryId?: string, depthAndLimit?: Array<string>, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getV2CategoryResources(storeId, identifier, id, parentCategoryId, depthAndLimit, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * V2CategoryResourceApi - factory interface
 * @export
 */
export const V2CategoryResourceApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = V2CategoryResourceApiFp(configuration)
    return {
        /**
         * 
         * @summary Gets Response for V2.0 API for store as per the requirements
         * @param {string} storeId 
         * @param {Array<string>} [identifier] 
         * @param {Array<string>} [id] 
         * @param {string} [parentCategoryId] 
         * @param {Array<string>} [depthAndLimit] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getV2CategoryResources(storeId: string, identifier?: Array<string>, id?: Array<string>, parentCategoryId?: string, depthAndLimit?: Array<string>, options?: any): AxiosPromise<string> {
            return localVarFp.getV2CategoryResources(storeId, identifier, id, parentCategoryId, depthAndLimit, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * V2CategoryResourceApi - object-oriented interface
 * @export
 * @class V2CategoryResourceApi
 * @extends {BaseAPI}
 */
export class V2CategoryResourceApi extends BaseAPI {
    /**
     * 
     * @summary Gets Response for V2.0 API for store as per the requirements
     * @param {string} storeId 
     * @param {Array<string>} [identifier] 
     * @param {Array<string>} [id] 
     * @param {string} [parentCategoryId] 
     * @param {Array<string>} [depthAndLimit] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof V2CategoryResourceApi
     */
    public getV2CategoryResources(storeId: string, identifier?: Array<string>, id?: Array<string>, parentCategoryId?: string, depthAndLimit?: Array<string>, options?: any) {
        return V2CategoryResourceApiFp(this.configuration).getV2CategoryResources(storeId, identifier, id, parentCategoryId, depthAndLimit, options).then((request) => request(this.axios, this.basePath));
    }
}
