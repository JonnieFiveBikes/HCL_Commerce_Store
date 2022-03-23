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
 * RedirectRuleApi - axios parameter creator
 * @export
 */
export const RedirectRuleApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Gets the feature version data.
         * @summary Get feature version data
         * @param {string} storeId The store identifier.
         * @param {string} q The query name.
         * @param {Array<string>} origUrlKeywordId The keyword ID.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        redirectRuleFindByOriginalUrlKeywordIds: async (storeId: string, q: string, origUrlKeywordId: Array<string>, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'storeId' is not null or undefined
            assertParamExists('redirectRuleFindByOriginalUrlKeywordIds', 'storeId', storeId)
            // verify required parameter 'q' is not null or undefined
            assertParamExists('redirectRuleFindByOriginalUrlKeywordIds', 'q', q)
            // verify required parameter 'origUrlKeywordId' is not null or undefined
            assertParamExists('redirectRuleFindByOriginalUrlKeywordIds', 'origUrlKeywordId', origUrlKeywordId)
            const localVarPath = `/store/{storeId}/seo/redirectrule`
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

            if (origUrlKeywordId) {
                localVarQueryParameter['origUrlKeywordId'] = origUrlKeywordId.join(COLLECTION_FORMATS.csv);
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
 * RedirectRuleApi - functional programming interface
 * @export
 */
export const RedirectRuleApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = RedirectRuleApiAxiosParamCreator(configuration)
    return {
        /**
         * Gets the feature version data.
         * @summary Get feature version data
         * @param {string} storeId The store identifier.
         * @param {string} q The query name.
         * @param {Array<string>} origUrlKeywordId The keyword ID.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async redirectRuleFindByOriginalUrlKeywordIds(storeId: string, q: string, origUrlKeywordId: Array<string>, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.redirectRuleFindByOriginalUrlKeywordIds(storeId, q, origUrlKeywordId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * RedirectRuleApi - factory interface
 * @export
 */
export const RedirectRuleApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = RedirectRuleApiFp(configuration)
    return {
        /**
         * Gets the feature version data.
         * @summary Get feature version data
         * @param {string} storeId The store identifier.
         * @param {string} q The query name.
         * @param {Array<string>} origUrlKeywordId The keyword ID.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        redirectRuleFindByOriginalUrlKeywordIds(storeId: string, q: string, origUrlKeywordId: Array<string>, options?: any): AxiosPromise<object> {
            return localVarFp.redirectRuleFindByOriginalUrlKeywordIds(storeId, q, origUrlKeywordId, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * RedirectRuleApi - object-oriented interface
 * @export
 * @class RedirectRuleApi
 * @extends {BaseAPI}
 */
export class RedirectRuleApi extends BaseAPI {
    /**
     * Gets the feature version data.
     * @summary Get feature version data
     * @param {string} storeId The store identifier.
     * @param {string} q The query name.
     * @param {Array<string>} origUrlKeywordId The keyword ID.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RedirectRuleApi
     */
    public redirectRuleFindByOriginalUrlKeywordIds(storeId: string, q: string, origUrlKeywordId: Array<string>, options?: any) {
        return RedirectRuleApiFp(this.configuration).redirectRuleFindByOriginalUrlKeywordIds(storeId, q, origUrlKeywordId, options).then((request) => request(this.axios, this.basePath));
    }
}
