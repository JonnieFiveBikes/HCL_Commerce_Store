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
import { PageDesignIBMStoreDetails } from '../../../../../com/hcl/commerce/typescript/axios';
/**
 * PageDesignApi - axios parameter creator
 * @export
 */
export const PageDesignApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Finds a product display layout page by product ID.
         * @summary Get layout by product ID
         * @param {string} storeId The store identifier.
         * @param {string} q The query name.
         * @param {string} productId The product ID.
         * @param {string} objectIdentifier The object identifier
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pageDesignByProductId: async (storeId: string, q: string, productId: string, objectIdentifier: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'storeId' is not null or undefined
            assertParamExists('pageDesignByProductId', 'storeId', storeId)
            // verify required parameter 'q' is not null or undefined
            assertParamExists('pageDesignByProductId', 'q', q)
            // verify required parameter 'productId' is not null or undefined
            assertParamExists('pageDesignByProductId', 'productId', productId)
            // verify required parameter 'objectIdentifier' is not null or undefined
            assertParamExists('pageDesignByProductId', 'objectIdentifier', objectIdentifier)
            const localVarPath = `/store/{storeId}/page_design`
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

            if (productId !== undefined) {
                localVarQueryParameter['productId'] = productId;
            }

            if (objectIdentifier !== undefined) {
                localVarQueryParameter['objectIdentifier'] = objectIdentifier;
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
 * PageDesignApi - functional programming interface
 * @export
 */
export const PageDesignApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = PageDesignApiAxiosParamCreator(configuration)
    return {
        /**
         * Finds a product display layout page by product ID.
         * @summary Get layout by product ID
         * @param {string} storeId The store identifier.
         * @param {string} q The query name.
         * @param {string} productId The product ID.
         * @param {string} objectIdentifier The object identifier
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async pageDesignByProductId(storeId: string, q: string, productId: string, objectIdentifier: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<PageDesignIBMStoreDetails>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.pageDesignByProductId(storeId, q, productId, objectIdentifier, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * PageDesignApi - factory interface
 * @export
 */
export const PageDesignApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = PageDesignApiFp(configuration)
    return {
        /**
         * Finds a product display layout page by product ID.
         * @summary Get layout by product ID
         * @param {string} storeId The store identifier.
         * @param {string} q The query name.
         * @param {string} productId The product ID.
         * @param {string} objectIdentifier The object identifier
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        pageDesignByProductId(storeId: string, q: string, productId: string, objectIdentifier: string, options?: any): AxiosPromise<PageDesignIBMStoreDetails> {
            return localVarFp.pageDesignByProductId(storeId, q, productId, objectIdentifier, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * PageDesignApi - object-oriented interface
 * @export
 * @class PageDesignApi
 * @extends {BaseAPI}
 */
export class PageDesignApi extends BaseAPI {
    /**
     * Finds a product display layout page by product ID.
     * @summary Get layout by product ID
     * @param {string} storeId The store identifier.
     * @param {string} q The query name.
     * @param {string} productId The product ID.
     * @param {string} objectIdentifier The object identifier
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PageDesignApi
     */
    public pageDesignByProductId(storeId: string, q: string, productId: string, objectIdentifier: string, options?: any) {
        return PageDesignApiFp(this.configuration).pageDesignByProductId(storeId, q, productId, objectIdentifier, options).then((request) => request(this.axios, this.basePath));
    }
}