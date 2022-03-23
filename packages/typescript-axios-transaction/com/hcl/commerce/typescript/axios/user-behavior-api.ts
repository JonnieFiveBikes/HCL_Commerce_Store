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
import { ComIbmCommerceMarketingBeansUserBehaviorListDataBeanIBMAdminSummary } from '../../../../../com/hcl/commerce/typescript/axios';
// @ts-ignore
import { ComIbmCommerceRestMarketingHandlerUserBehaviorHandlerDeleteUserBehaviorResponse } from '../../../../../com/hcl/commerce/typescript/axios';
/**
 * UserBehaviorApi - axios parameter creator
 * @export
 */
export const UserBehaviorApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Delete the marketing tracking data for a user for the store.
         * @param {string} storeId The store identifier.
         * @param {number} userId The user ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteUserBehaviorData: async (storeId: string, userId: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'storeId' is not null or undefined
            assertParamExists('deleteUserBehaviorData', 'storeId', storeId)
            // verify required parameter 'userId' is not null or undefined
            assertParamExists('deleteUserBehaviorData', 'userId', userId)
            const localVarPath = `/store/{storeId}/user_behavior/{userId}`
                .replace(`{${"storeId"}}`, String(storeId))
                .replace(`{${"userId"}}`, String(userId));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
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
         * @summary Get the marketing tracking data for a user for the store.
         * @param {string} storeId The store identifier.
         * @param {string} [userId] The user ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findUserBehaviors: async (storeId: string, userId?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'storeId' is not null or undefined
            assertParamExists('findUserBehaviors', 'storeId', storeId)
            const localVarPath = `/store/{storeId}/user_behavior`
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

            if (userId !== undefined) {
                localVarQueryParameter['userId'] = userId;
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
 * UserBehaviorApi - functional programming interface
 * @export
 */
export const UserBehaviorApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = UserBehaviorApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Delete the marketing tracking data for a user for the store.
         * @param {string} storeId The store identifier.
         * @param {number} userId The user ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteUserBehaviorData(storeId: string, userId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ComIbmCommerceRestMarketingHandlerUserBehaviorHandlerDeleteUserBehaviorResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteUserBehaviorData(storeId, userId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get the marketing tracking data for a user for the store.
         * @param {string} storeId The store identifier.
         * @param {string} [userId] The user ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async findUserBehaviors(storeId: string, userId?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ComIbmCommerceMarketingBeansUserBehaviorListDataBeanIBMAdminSummary>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.findUserBehaviors(storeId, userId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * UserBehaviorApi - factory interface
 * @export
 */
export const UserBehaviorApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = UserBehaviorApiFp(configuration)
    return {
        /**
         * 
         * @summary Delete the marketing tracking data for a user for the store.
         * @param {string} storeId The store identifier.
         * @param {number} userId The user ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteUserBehaviorData(storeId: string, userId: number, options?: any): AxiosPromise<ComIbmCommerceRestMarketingHandlerUserBehaviorHandlerDeleteUserBehaviorResponse> {
            return localVarFp.deleteUserBehaviorData(storeId, userId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get the marketing tracking data for a user for the store.
         * @param {string} storeId The store identifier.
         * @param {string} [userId] The user ID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        findUserBehaviors(storeId: string, userId?: string, options?: any): AxiosPromise<ComIbmCommerceMarketingBeansUserBehaviorListDataBeanIBMAdminSummary> {
            return localVarFp.findUserBehaviors(storeId, userId, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * UserBehaviorApi - object-oriented interface
 * @export
 * @class UserBehaviorApi
 * @extends {BaseAPI}
 */
export class UserBehaviorApi extends BaseAPI {
    /**
     * 
     * @summary Delete the marketing tracking data for a user for the store.
     * @param {string} storeId The store identifier.
     * @param {number} userId The user ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserBehaviorApi
     */
    public deleteUserBehaviorData(storeId: string, userId: number, options?: any) {
        return UserBehaviorApiFp(this.configuration).deleteUserBehaviorData(storeId, userId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get the marketing tracking data for a user for the store.
     * @param {string} storeId The store identifier.
     * @param {string} [userId] The user ID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserBehaviorApi
     */
    public findUserBehaviors(storeId: string, userId?: string, options?: any) {
        return UserBehaviorApiFp(this.configuration).findUserBehaviors(storeId, userId, options).then((request) => request(this.axios, this.basePath));
    }
}
