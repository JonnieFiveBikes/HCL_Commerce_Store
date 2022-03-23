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
 * URLKeywordApi - axios parameter creator
 * @export
 */
export const URLKeywordApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Gets the feature version data.
         * @summary Get feature version data
         * @param {string} storeId The store identifier.
         * @param {string} q The query name.
         * @param {string} tokenName The input token name.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        uRLKeywordFindByTokenName: async (storeId: string, q: string, tokenName: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'storeId' is not null or undefined
            assertParamExists('uRLKeywordFindByTokenName', 'storeId', storeId)
            // verify required parameter 'q' is not null or undefined
            assertParamExists('uRLKeywordFindByTokenName', 'q', q)
            // verify required parameter 'tokenName' is not null or undefined
            assertParamExists('uRLKeywordFindByTokenName', 'tokenName', tokenName)
            const localVarPath = `/store/{storeId}/seo/urlkeyword`
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

            if (tokenName !== undefined) {
                localVarQueryParameter['tokenName'] = tokenName;
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
 * URLKeywordApi - functional programming interface
 * @export
 */
export const URLKeywordApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = URLKeywordApiAxiosParamCreator(configuration)
    return {
        /**
         * Gets the feature version data.
         * @summary Get feature version data
         * @param {string} storeId The store identifier.
         * @param {string} q The query name.
         * @param {string} tokenName The input token name.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async uRLKeywordFindByTokenName(storeId: string, q: string, tokenName: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.uRLKeywordFindByTokenName(storeId, q, tokenName, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * URLKeywordApi - factory interface
 * @export
 */
export const URLKeywordApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = URLKeywordApiFp(configuration)
    return {
        /**
         * Gets the feature version data.
         * @summary Get feature version data
         * @param {string} storeId The store identifier.
         * @param {string} q The query name.
         * @param {string} tokenName The input token name.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        uRLKeywordFindByTokenName(storeId: string, q: string, tokenName: string, options?: any): AxiosPromise<object> {
            return localVarFp.uRLKeywordFindByTokenName(storeId, q, tokenName, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * URLKeywordApi - object-oriented interface
 * @export
 * @class URLKeywordApi
 * @extends {BaseAPI}
 */
export class URLKeywordApi extends BaseAPI {
    /**
     * Gets the feature version data.
     * @summary Get feature version data
     * @param {string} storeId The store identifier.
     * @param {string} q The query name.
     * @param {string} tokenName The input token name.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof URLKeywordApi
     */
    public uRLKeywordFindByTokenName(storeId: string, q: string, tokenName: string, options?: any) {
        return URLKeywordApiFp(this.configuration).uRLKeywordFindByTokenName(storeId, q, tokenName, options).then((request) => request(this.axios, this.basePath));
    }
}
