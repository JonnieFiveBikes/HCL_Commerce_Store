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
import { ComIbmCommerceCommonBeansStoreCurrencyFormatDescriptionDataBeanIBMStoreDetails } from '../../../../../com/hcl/commerce/typescript/axios';
/**
 * CurrencyFormatApi - axios parameter creator
 * @export
 */
export const CurrencyFormatApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Gets currency format by currency.
         * @summary Get currency format
         * @param {string} storeId The store identifier.
         * @param {string} q The query name.
         * @param {string} [currency] The query name.
         * @param {string} [numberUsage] The number usage.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        currencyFormatFindByCurrency: async (storeId: string, q: string, currency?: string, numberUsage?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'storeId' is not null or undefined
            assertParamExists('currencyFormatFindByCurrency', 'storeId', storeId)
            // verify required parameter 'q' is not null or undefined
            assertParamExists('currencyFormatFindByCurrency', 'q', q)
            const localVarPath = `/store/{storeId}/currency_format`
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

            if (currency !== undefined) {
                localVarQueryParameter['currency'] = currency;
            }

            if (numberUsage !== undefined) {
                localVarQueryParameter['numberUsage'] = numberUsage;
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
 * CurrencyFormatApi - functional programming interface
 * @export
 */
export const CurrencyFormatApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = CurrencyFormatApiAxiosParamCreator(configuration)
    return {
        /**
         * Gets currency format by currency.
         * @summary Get currency format
         * @param {string} storeId The store identifier.
         * @param {string} q The query name.
         * @param {string} [currency] The query name.
         * @param {string} [numberUsage] The number usage.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async currencyFormatFindByCurrency(storeId: string, q: string, currency?: string, numberUsage?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ComIbmCommerceCommonBeansStoreCurrencyFormatDescriptionDataBeanIBMStoreDetails>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.currencyFormatFindByCurrency(storeId, q, currency, numberUsage, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * CurrencyFormatApi - factory interface
 * @export
 */
export const CurrencyFormatApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = CurrencyFormatApiFp(configuration)
    return {
        /**
         * Gets currency format by currency.
         * @summary Get currency format
         * @param {string} storeId The store identifier.
         * @param {string} q The query name.
         * @param {string} [currency] The query name.
         * @param {string} [numberUsage] The number usage.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        currencyFormatFindByCurrency(storeId: string, q: string, currency?: string, numberUsage?: string, options?: any): AxiosPromise<ComIbmCommerceCommonBeansStoreCurrencyFormatDescriptionDataBeanIBMStoreDetails> {
            return localVarFp.currencyFormatFindByCurrency(storeId, q, currency, numberUsage, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * CurrencyFormatApi - object-oriented interface
 * @export
 * @class CurrencyFormatApi
 * @extends {BaseAPI}
 */
export class CurrencyFormatApi extends BaseAPI {
    /**
     * Gets currency format by currency.
     * @summary Get currency format
     * @param {string} storeId The store identifier.
     * @param {string} q The query name.
     * @param {string} [currency] The query name.
     * @param {string} [numberUsage] The number usage.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CurrencyFormatApi
     */
    public currencyFormatFindByCurrency(storeId: string, q: string, currency?: string, numberUsage?: string, options?: any) {
        return CurrencyFormatApiFp(this.configuration).currencyFormatFindByCurrency(storeId, q, currency, numberUsage, options).then((request) => request(this.axios, this.basePath));
    }
}