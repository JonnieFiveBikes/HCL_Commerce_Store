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
import { ComIbmCommerceUserBeansCountryStateListDataBeanIBMCountryStateListSummary } from '../../../../../com/hcl/commerce/typescript/axios';
// @ts-ignore
import { ComIbmCommerceUserBeansCountryStateListDataBeanIBMCountryStateName } from '../../../../../com/hcl/commerce/typescript/axios';
/**
 * CountryApi - axios parameter creator
 * @export
 */
export const CountryApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Gets a list of countries or regions with the corresponding states or provinces.
         * @summary Get countries and regions
         * @param {string} storeId The store identifier.
         * @param {string} [profileName] Profile name. Profiles determine the subset of data returned by a query.  Default profile name &#x3D; IBM_countryStateList_Summary.
         * @param {string} [countryCode] The country or region abbreviation code.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        countryFindCountryStateList: async (storeId: string, profileName?: string, countryCode?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'storeId' is not null or undefined
            assertParamExists('countryFindCountryStateList', 'storeId', storeId)
            const localVarPath = `/store/{storeId}/country/country_state_list`
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

            if (profileName !== undefined) {
                localVarQueryParameter['profileName'] = profileName;
            }

            if (countryCode !== undefined) {
                localVarQueryParameter['countryCode'] = countryCode;
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
         * Gets the display name of a country and/or a state.
         * @summary Get display name of countries and regions
         * @param {string} storeId The store identifier.
         * @param {string} [profileName] Profile name. Profiles determine the subset of data returned by a query. The default profile name is IBM_countryStateName.
         * @param {string} [countryCode] The country or region abbreviation code.
         * @param {string} [stateCode] The state or province abbreviation code.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        countryFindCountryStateName: async (storeId: string, profileName?: string, countryCode?: string, stateCode?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'storeId' is not null or undefined
            assertParamExists('countryFindCountryStateName', 'storeId', storeId)
            const localVarPath = `/store/{storeId}/country/country_state_name`
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

            if (profileName !== undefined) {
                localVarQueryParameter['profileName'] = profileName;
            }

            if (countryCode !== undefined) {
                localVarQueryParameter['countryCode'] = countryCode;
            }

            if (stateCode !== undefined) {
                localVarQueryParameter['stateCode'] = stateCode;
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
 * CountryApi - functional programming interface
 * @export
 */
export const CountryApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = CountryApiAxiosParamCreator(configuration)
    return {
        /**
         * Gets a list of countries or regions with the corresponding states or provinces.
         * @summary Get countries and regions
         * @param {string} storeId The store identifier.
         * @param {string} [profileName] Profile name. Profiles determine the subset of data returned by a query.  Default profile name &#x3D; IBM_countryStateList_Summary.
         * @param {string} [countryCode] The country or region abbreviation code.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async countryFindCountryStateList(storeId: string, profileName?: string, countryCode?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ComIbmCommerceUserBeansCountryStateListDataBeanIBMCountryStateListSummary>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.countryFindCountryStateList(storeId, profileName, countryCode, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Gets the display name of a country and/or a state.
         * @summary Get display name of countries and regions
         * @param {string} storeId The store identifier.
         * @param {string} [profileName] Profile name. Profiles determine the subset of data returned by a query. The default profile name is IBM_countryStateName.
         * @param {string} [countryCode] The country or region abbreviation code.
         * @param {string} [stateCode] The state or province abbreviation code.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async countryFindCountryStateName(storeId: string, profileName?: string, countryCode?: string, stateCode?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ComIbmCommerceUserBeansCountryStateListDataBeanIBMCountryStateName>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.countryFindCountryStateName(storeId, profileName, countryCode, stateCode, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * CountryApi - factory interface
 * @export
 */
export const CountryApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = CountryApiFp(configuration)
    return {
        /**
         * Gets a list of countries or regions with the corresponding states or provinces.
         * @summary Get countries and regions
         * @param {string} storeId The store identifier.
         * @param {string} [profileName] Profile name. Profiles determine the subset of data returned by a query.  Default profile name &#x3D; IBM_countryStateList_Summary.
         * @param {string} [countryCode] The country or region abbreviation code.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        countryFindCountryStateList(storeId: string, profileName?: string, countryCode?: string, options?: any): AxiosPromise<ComIbmCommerceUserBeansCountryStateListDataBeanIBMCountryStateListSummary> {
            return localVarFp.countryFindCountryStateList(storeId, profileName, countryCode, options).then((request) => request(axios, basePath));
        },
        /**
         * Gets the display name of a country and/or a state.
         * @summary Get display name of countries and regions
         * @param {string} storeId The store identifier.
         * @param {string} [profileName] Profile name. Profiles determine the subset of data returned by a query. The default profile name is IBM_countryStateName.
         * @param {string} [countryCode] The country or region abbreviation code.
         * @param {string} [stateCode] The state or province abbreviation code.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        countryFindCountryStateName(storeId: string, profileName?: string, countryCode?: string, stateCode?: string, options?: any): AxiosPromise<ComIbmCommerceUserBeansCountryStateListDataBeanIBMCountryStateName> {
            return localVarFp.countryFindCountryStateName(storeId, profileName, countryCode, stateCode, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * CountryApi - object-oriented interface
 * @export
 * @class CountryApi
 * @extends {BaseAPI}
 */
export class CountryApi extends BaseAPI {
    /**
     * Gets a list of countries or regions with the corresponding states or provinces.
     * @summary Get countries and regions
     * @param {string} storeId The store identifier.
     * @param {string} [profileName] Profile name. Profiles determine the subset of data returned by a query.  Default profile name &#x3D; IBM_countryStateList_Summary.
     * @param {string} [countryCode] The country or region abbreviation code.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CountryApi
     */
    public countryFindCountryStateList(storeId: string, profileName?: string, countryCode?: string, options?: any) {
        return CountryApiFp(this.configuration).countryFindCountryStateList(storeId, profileName, countryCode, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Gets the display name of a country and/or a state.
     * @summary Get display name of countries and regions
     * @param {string} storeId The store identifier.
     * @param {string} [profileName] Profile name. Profiles determine the subset of data returned by a query. The default profile name is IBM_countryStateName.
     * @param {string} [countryCode] The country or region abbreviation code.
     * @param {string} [stateCode] The state or province abbreviation code.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CountryApi
     */
    public countryFindCountryStateName(storeId: string, profileName?: string, countryCode?: string, stateCode?: string, options?: any) {
        return CountryApiFp(this.configuration).countryFindCountryStateName(storeId, profileName, countryCode, stateCode, options).then((request) => request(this.axios, this.basePath));
    }
}
