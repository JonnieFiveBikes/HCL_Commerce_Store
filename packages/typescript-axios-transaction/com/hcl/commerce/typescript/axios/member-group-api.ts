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
import { ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummary } from '../../../../../com/hcl/commerce/typescript/axios';
/**
 * MemberGroupApi - axios parameter creator
 * @export
 */
export const MemberGroupApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Finds approval member groups types for an organization based on properties filter.
         * @param {string} storeId The store identifier.
         * @param {string} propertiesFilter Properties value based on which approval member groups will be filtered.
         * @param {string} q The query name.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storeStoreIdMemberGroupGet: async (storeId: string, propertiesFilter: string, q: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'storeId' is not null or undefined
            assertParamExists('storeStoreIdMemberGroupGet', 'storeId', storeId)
            // verify required parameter 'propertiesFilter' is not null or undefined
            assertParamExists('storeStoreIdMemberGroupGet', 'propertiesFilter', propertiesFilter)
            // verify required parameter 'q' is not null or undefined
            assertParamExists('storeStoreIdMemberGroupGet', 'q', q)
            const localVarPath = `/store/{storeId}/member_group`
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

            if (propertiesFilter !== undefined) {
                localVarQueryParameter['propertiesFilter'] = propertiesFilter;
            }

            if (q !== undefined) {
                localVarQueryParameter['q'] = q;
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
         * @summary Finds a member group by its ID.
         * @param {string} storeId The store identifier.
         * @param {string} memberGroupId The member group ID.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storeStoreIdMemberGroupMemberGroupIdGet: async (storeId: string, memberGroupId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'storeId' is not null or undefined
            assertParamExists('storeStoreIdMemberGroupMemberGroupIdGet', 'storeId', storeId)
            // verify required parameter 'memberGroupId' is not null or undefined
            assertParamExists('storeStoreIdMemberGroupMemberGroupIdGet', 'memberGroupId', memberGroupId)
            const localVarPath = `/store/{storeId}/member_group/{memberGroupId}`
                .replace(`{${"storeId"}}`, String(storeId))
                .replace(`{${"memberGroupId"}}`, String(memberGroupId));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
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
         * @summary Finds a member group current shopper explicitly belongs.
         * @param {string} storeId The store identifier.
         * @param {string} memberId The memberID.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storeStoreIdMemberGroupMemberMemberIdGet: async (storeId: string, memberId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'storeId' is not null or undefined
            assertParamExists('storeStoreIdMemberGroupMemberMemberIdGet', 'storeId', storeId)
            // verify required parameter 'memberId' is not null or undefined
            assertParamExists('storeStoreIdMemberGroupMemberMemberIdGet', 'memberId', memberId)
            const localVarPath = `/store/{storeId}/member_group/member/{memberId}`
                .replace(`{${"storeId"}}`, String(storeId))
                .replace(`{${"memberId"}}`, String(memberId));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
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
 * MemberGroupApi - functional programming interface
 * @export
 */
export const MemberGroupApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = MemberGroupApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Finds approval member groups types for an organization based on properties filter.
         * @param {string} storeId The store identifier.
         * @param {string} propertiesFilter Properties value based on which approval member groups will be filtered.
         * @param {string} q The query name.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async storeStoreIdMemberGroupGet(storeId: string, propertiesFilter: string, q: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummary>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.storeStoreIdMemberGroupGet(storeId, propertiesFilter, q, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Finds a member group by its ID.
         * @param {string} storeId The store identifier.
         * @param {string} memberGroupId The member group ID.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async storeStoreIdMemberGroupMemberGroupIdGet(storeId: string, memberGroupId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummary>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.storeStoreIdMemberGroupMemberGroupIdGet(storeId, memberGroupId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Finds a member group current shopper explicitly belongs.
         * @param {string} storeId The store identifier.
         * @param {string} memberId The memberID.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async storeStoreIdMemberGroupMemberMemberIdGet(storeId: string, memberId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummary>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.storeStoreIdMemberGroupMemberMemberIdGet(storeId, memberId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * MemberGroupApi - factory interface
 * @export
 */
export const MemberGroupApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = MemberGroupApiFp(configuration)
    return {
        /**
         * 
         * @summary Finds approval member groups types for an organization based on properties filter.
         * @param {string} storeId The store identifier.
         * @param {string} propertiesFilter Properties value based on which approval member groups will be filtered.
         * @param {string} q The query name.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storeStoreIdMemberGroupGet(storeId: string, propertiesFilter: string, q: string, options?: any): AxiosPromise<ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummary> {
            return localVarFp.storeStoreIdMemberGroupGet(storeId, propertiesFilter, q, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Finds a member group by its ID.
         * @param {string} storeId The store identifier.
         * @param {string} memberGroupId The member group ID.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storeStoreIdMemberGroupMemberGroupIdGet(storeId: string, memberGroupId: string, options?: any): AxiosPromise<ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummary> {
            return localVarFp.storeStoreIdMemberGroupMemberGroupIdGet(storeId, memberGroupId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Finds a member group current shopper explicitly belongs.
         * @param {string} storeId The store identifier.
         * @param {string} memberId The memberID.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storeStoreIdMemberGroupMemberMemberIdGet(storeId: string, memberId: string, options?: any): AxiosPromise<ComIbmCommerceMemberBeansMemberGroupListDataBeanIBMStoreSummary> {
            return localVarFp.storeStoreIdMemberGroupMemberMemberIdGet(storeId, memberId, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * MemberGroupApi - object-oriented interface
 * @export
 * @class MemberGroupApi
 * @extends {BaseAPI}
 */
export class MemberGroupApi extends BaseAPI {
    /**
     * 
     * @summary Finds approval member groups types for an organization based on properties filter.
     * @param {string} storeId The store identifier.
     * @param {string} propertiesFilter Properties value based on which approval member groups will be filtered.
     * @param {string} q The query name.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MemberGroupApi
     */
    public storeStoreIdMemberGroupGet(storeId: string, propertiesFilter: string, q: string, options?: any) {
        return MemberGroupApiFp(this.configuration).storeStoreIdMemberGroupGet(storeId, propertiesFilter, q, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Finds a member group by its ID.
     * @param {string} storeId The store identifier.
     * @param {string} memberGroupId The member group ID.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MemberGroupApi
     */
    public storeStoreIdMemberGroupMemberGroupIdGet(storeId: string, memberGroupId: string, options?: any) {
        return MemberGroupApiFp(this.configuration).storeStoreIdMemberGroupMemberGroupIdGet(storeId, memberGroupId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Finds a member group current shopper explicitly belongs.
     * @param {string} storeId The store identifier.
     * @param {string} memberId The memberID.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MemberGroupApi
     */
    public storeStoreIdMemberGroupMemberMemberIdGet(storeId: string, memberId: string, options?: any) {
        return MemberGroupApiFp(this.configuration).storeStoreIdMemberGroupMemberMemberIdGet(storeId, memberId, options).then((request) => request(this.axios, this.basePath));
    }
}
