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
import { ComIbmCommerceRestMemberHandlerPreviewTokenHandlerPasswordValidRequest } from '../../../../../com/hcl/commerce/typescript/axios';
// @ts-ignore
import { ComIbmCommerceRestMemberHandlerPreviewTokenHandlerPreviewParameters } from '../../../../../com/hcl/commerce/typescript/axios';
// @ts-ignore
import { ComIbmCommerceRestMemberHandlerPreviewTokenHandlerPreviewToken } from '../../../../../com/hcl/commerce/typescript/axios';
// @ts-ignore
import { ComIbmCommerceRestMemberHandlerPreviewTokenHandlerValidIdentifier } from '../../../../../com/hcl/commerce/typescript/axios';
/**
 * PreviewTokenApi - axios parameter creator
 * @export
 */
export const PreviewTokenApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Checks if the password is valid.
         * @summary Check password validity
         * @param {string} storeId The store identifier.
         * @param {ComIbmCommerceRestMemberHandlerPreviewTokenHandlerPasswordValidRequest} body The request body to validate a preview token password.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        checkIsPasswordValid: async (storeId: string, body: ComIbmCommerceRestMemberHandlerPreviewTokenHandlerPasswordValidRequest, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'storeId' is not null or undefined
            assertParamExists('checkIsPasswordValid', 'storeId', storeId)
            // verify required parameter 'body' is not null or undefined
            assertParamExists('checkIsPasswordValid', 'body', body)
            const localVarPath = `/store/{storeId}/previewToken/isvalid`
                .replace(`{${"storeId"}}`, String(storeId));
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
        /**
         * Requests the preview token.
         * @summary Requests the preview token.
         * @param {string} storeId The store identifier.
         * @param {string} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
         * @param {ComIbmCommerceRestMemberHandlerPreviewTokenHandlerPreviewParameters} [body] Request body.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        generatePreviewToken: async (storeId: string, responseFormat?: string, body?: ComIbmCommerceRestMemberHandlerPreviewTokenHandlerPreviewParameters, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'storeId' is not null or undefined
            assertParamExists('generatePreviewToken', 'storeId', storeId)
            const localVarPath = `/store/{storeId}/previewToken`
                .replace(`{${"storeId"}}`, String(storeId));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (responseFormat !== undefined) {
                localVarQueryParameter['responseFormat'] = responseFormat;
            }


    
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
 * PreviewTokenApi - functional programming interface
 * @export
 */
export const PreviewTokenApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = PreviewTokenApiAxiosParamCreator(configuration)
    return {
        /**
         * Checks if the password is valid.
         * @summary Check password validity
         * @param {string} storeId The store identifier.
         * @param {ComIbmCommerceRestMemberHandlerPreviewTokenHandlerPasswordValidRequest} body The request body to validate a preview token password.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async checkIsPasswordValid(storeId: string, body: ComIbmCommerceRestMemberHandlerPreviewTokenHandlerPasswordValidRequest, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ComIbmCommerceRestMemberHandlerPreviewTokenHandlerValidIdentifier>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.checkIsPasswordValid(storeId, body, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Requests the preview token.
         * @summary Requests the preview token.
         * @param {string} storeId The store identifier.
         * @param {string} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
         * @param {ComIbmCommerceRestMemberHandlerPreviewTokenHandlerPreviewParameters} [body] Request body.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async generatePreviewToken(storeId: string, responseFormat?: string, body?: ComIbmCommerceRestMemberHandlerPreviewTokenHandlerPreviewParameters, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ComIbmCommerceRestMemberHandlerPreviewTokenHandlerPreviewToken>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.generatePreviewToken(storeId, responseFormat, body, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * PreviewTokenApi - factory interface
 * @export
 */
export const PreviewTokenApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = PreviewTokenApiFp(configuration)
    return {
        /**
         * Checks if the password is valid.
         * @summary Check password validity
         * @param {string} storeId The store identifier.
         * @param {ComIbmCommerceRestMemberHandlerPreviewTokenHandlerPasswordValidRequest} body The request body to validate a preview token password.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        checkIsPasswordValid(storeId: string, body: ComIbmCommerceRestMemberHandlerPreviewTokenHandlerPasswordValidRequest, options?: any): AxiosPromise<ComIbmCommerceRestMemberHandlerPreviewTokenHandlerValidIdentifier> {
            return localVarFp.checkIsPasswordValid(storeId, body, options).then((request) => request(axios, basePath));
        },
        /**
         * Requests the preview token.
         * @summary Requests the preview token.
         * @param {string} storeId The store identifier.
         * @param {string} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
         * @param {ComIbmCommerceRestMemberHandlerPreviewTokenHandlerPreviewParameters} [body] Request body.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        generatePreviewToken(storeId: string, responseFormat?: string, body?: ComIbmCommerceRestMemberHandlerPreviewTokenHandlerPreviewParameters, options?: any): AxiosPromise<ComIbmCommerceRestMemberHandlerPreviewTokenHandlerPreviewToken> {
            return localVarFp.generatePreviewToken(storeId, responseFormat, body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * PreviewTokenApi - object-oriented interface
 * @export
 * @class PreviewTokenApi
 * @extends {BaseAPI}
 */
export class PreviewTokenApi extends BaseAPI {
    /**
     * Checks if the password is valid.
     * @summary Check password validity
     * @param {string} storeId The store identifier.
     * @param {ComIbmCommerceRestMemberHandlerPreviewTokenHandlerPasswordValidRequest} body The request body to validate a preview token password.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PreviewTokenApi
     */
    public checkIsPasswordValid(storeId: string, body: ComIbmCommerceRestMemberHandlerPreviewTokenHandlerPasswordValidRequest, options?: any) {
        return PreviewTokenApiFp(this.configuration).checkIsPasswordValid(storeId, body, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Requests the preview token.
     * @summary Requests the preview token.
     * @param {string} storeId The store identifier.
     * @param {string} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
     * @param {ComIbmCommerceRestMemberHandlerPreviewTokenHandlerPreviewParameters} [body] Request body.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PreviewTokenApi
     */
    public generatePreviewToken(storeId: string, responseFormat?: string, body?: ComIbmCommerceRestMemberHandlerPreviewTokenHandlerPreviewParameters, options?: any) {
        return PreviewTokenApiFp(this.configuration).generatePreviewToken(storeId, responseFormat, body, options).then((request) => request(this.axios, this.basePath));
    }
}
