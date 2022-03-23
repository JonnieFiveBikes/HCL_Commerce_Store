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
 * SearchDocumentResourceApi - axios parameter creator
 * @export
 */
export const SearchDocumentResourceApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Gets BOD data.
         * @param {string} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getMarketingESpotData: async (body?: string, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/v2/documents/bod`;
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
 * SearchDocumentResourceApi - functional programming interface
 * @export
 */
export const SearchDocumentResourceApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = SearchDocumentResourceApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Gets BOD data.
         * @param {string} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getMarketingESpotData(body?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getMarketingESpotData(body, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * SearchDocumentResourceApi - factory interface
 * @export
 */
export const SearchDocumentResourceApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = SearchDocumentResourceApiFp(configuration)
    return {
        /**
         * 
         * @summary Gets BOD data.
         * @param {string} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getMarketingESpotData(body?: string, options?: any): AxiosPromise<string> {
            return localVarFp.getMarketingESpotData(body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * SearchDocumentResourceApi - object-oriented interface
 * @export
 * @class SearchDocumentResourceApi
 * @extends {BaseAPI}
 */
export class SearchDocumentResourceApi extends BaseAPI {
    /**
     * 
     * @summary Gets BOD data.
     * @param {string} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SearchDocumentResourceApi
     */
    public getMarketingESpotData(body?: string, options?: any) {
        return SearchDocumentResourceApiFp(this.configuration).getMarketingESpotData(body, options).then((request) => request(this.axios, this.basePath));
    }
}