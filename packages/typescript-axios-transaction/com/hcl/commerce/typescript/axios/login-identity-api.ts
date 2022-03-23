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
import { ComIbmCommerceRestMemberHandlerLoginIdentityHandlerLoginForm } from '../../../../../com/hcl/commerce/typescript/axios';
// @ts-ignore
import { ComIbmCommerceRestMemberHandlerLoginIdentityHandlerTokenValidationForm } from '../../../../../com/hcl/commerce/typescript/axios';
// @ts-ignore
import { ComIbmCommerceRestMemberHandlerLoginIdentityHandlerUserIdentity } from '../../../../../com/hcl/commerce/typescript/axios';
/**
 * LoginIdentityApi - axios parameter creator
 * @export
 */
export const LoginIdentityApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Logs in a registered user using their user name and password.
         * @summary Log in user
         * @param {string} storeId The store identifier.
         * @param {string} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
         * @param {ComIbmCommerceRestMemberHandlerLoginIdentityHandlerLoginForm} [body] Logon body.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        loginIdentityLogin: async (storeId: string, responseFormat?: string, body?: ComIbmCommerceRestMemberHandlerLoginIdentityHandlerLoginForm, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'storeId' is not null or undefined
            assertParamExists('loginIdentityLogin', 'storeId', storeId)
            const localVarPath = `/store/{storeId}/loginidentity`
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
        /**
         * Logs out the registered user.
         * @summary Log out user
         * @param {string} storeId The store identifier.
         * @param {string} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        loginIdentityLogout: async (storeId: string, responseFormat?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'storeId' is not null or undefined
            assertParamExists('loginIdentityLogout', 'storeId', storeId)
            const localVarPath = `/store/{storeId}/loginidentity/@self`
                .replace(`{${"storeId"}}`, String(storeId));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (responseFormat !== undefined) {
                localVarQueryParameter['responseFormat'] = responseFormat;
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
         * Logs in a registered user using their user name and password.
         * @summary Logs in with third party oauth provider.
         * @param {string} storeId The store identifier.
         * @param {string} [responseFormat] The response format. If the request has an input body, that body must also use the format specified in \\\&quot;responseFormat\\\&quot;. Valid values include \\\&quot;json\\\&quot; and \\\&quot;xml\\\&quot; without the quotes. If the responseFormat.
         * @param {ComIbmCommerceRestMemberHandlerLoginIdentityHandlerTokenValidationForm} [body] Token validation body.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storeStoreIdLoginidentityOauthPost: async (storeId: string, responseFormat?: string, body?: ComIbmCommerceRestMemberHandlerLoginIdentityHandlerTokenValidationForm, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'storeId' is not null or undefined
            assertParamExists('storeStoreIdLoginidentityOauthPost', 'storeId', storeId)
            const localVarPath = `/store/{storeId}/loginidentity/oauth`
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
        /**
         * Logs in a registered user using their user name and password.
         * @summary Validate access token with external authorization server based on OAuth2.0 and login WCS.
         * @param {string} storeId The store identifier.
         * @param {string} [responseFormat] The response format. If the request has an input body, that body must also use the format specified in \\\&quot;responseFormat\\\&quot;. Valid values include \\\&quot;json\\\&quot; and \\\&quot;xml\\\&quot; without the quotes. If the responseFormat.
         * @param {ComIbmCommerceRestMemberHandlerLoginIdentityHandlerTokenValidationForm} [body] Token validation body.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storeStoreIdLoginidentityOauthValidatePost: async (storeId: string, responseFormat?: string, body?: ComIbmCommerceRestMemberHandlerLoginIdentityHandlerTokenValidationForm, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'storeId' is not null or undefined
            assertParamExists('storeStoreIdLoginidentityOauthValidatePost', 'storeId', storeId)
            const localVarPath = `/store/{storeId}/loginidentity/oauth_validate`
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
 * LoginIdentityApi - functional programming interface
 * @export
 */
export const LoginIdentityApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = LoginIdentityApiAxiosParamCreator(configuration)
    return {
        /**
         * Logs in a registered user using their user name and password.
         * @summary Log in user
         * @param {string} storeId The store identifier.
         * @param {string} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
         * @param {ComIbmCommerceRestMemberHandlerLoginIdentityHandlerLoginForm} [body] Logon body.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async loginIdentityLogin(storeId: string, responseFormat?: string, body?: ComIbmCommerceRestMemberHandlerLoginIdentityHandlerLoginForm, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ComIbmCommerceRestMemberHandlerLoginIdentityHandlerUserIdentity>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.loginIdentityLogin(storeId, responseFormat, body, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Logs out the registered user.
         * @summary Log out user
         * @param {string} storeId The store identifier.
         * @param {string} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async loginIdentityLogout(storeId: string, responseFormat?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.loginIdentityLogout(storeId, responseFormat, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Logs in a registered user using their user name and password.
         * @summary Logs in with third party oauth provider.
         * @param {string} storeId The store identifier.
         * @param {string} [responseFormat] The response format. If the request has an input body, that body must also use the format specified in \\\&quot;responseFormat\\\&quot;. Valid values include \\\&quot;json\\\&quot; and \\\&quot;xml\\\&quot; without the quotes. If the responseFormat.
         * @param {ComIbmCommerceRestMemberHandlerLoginIdentityHandlerTokenValidationForm} [body] Token validation body.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async storeStoreIdLoginidentityOauthPost(storeId: string, responseFormat?: string, body?: ComIbmCommerceRestMemberHandlerLoginIdentityHandlerTokenValidationForm, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ComIbmCommerceRestMemberHandlerLoginIdentityHandlerUserIdentity>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.storeStoreIdLoginidentityOauthPost(storeId, responseFormat, body, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * Logs in a registered user using their user name and password.
         * @summary Validate access token with external authorization server based on OAuth2.0 and login WCS.
         * @param {string} storeId The store identifier.
         * @param {string} [responseFormat] The response format. If the request has an input body, that body must also use the format specified in \\\&quot;responseFormat\\\&quot;. Valid values include \\\&quot;json\\\&quot; and \\\&quot;xml\\\&quot; without the quotes. If the responseFormat.
         * @param {ComIbmCommerceRestMemberHandlerLoginIdentityHandlerTokenValidationForm} [body] Token validation body.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async storeStoreIdLoginidentityOauthValidatePost(storeId: string, responseFormat?: string, body?: ComIbmCommerceRestMemberHandlerLoginIdentityHandlerTokenValidationForm, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ComIbmCommerceRestMemberHandlerLoginIdentityHandlerUserIdentity>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.storeStoreIdLoginidentityOauthValidatePost(storeId, responseFormat, body, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * LoginIdentityApi - factory interface
 * @export
 */
export const LoginIdentityApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = LoginIdentityApiFp(configuration)
    return {
        /**
         * Logs in a registered user using their user name and password.
         * @summary Log in user
         * @param {string} storeId The store identifier.
         * @param {string} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
         * @param {ComIbmCommerceRestMemberHandlerLoginIdentityHandlerLoginForm} [body] Logon body.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        loginIdentityLogin(storeId: string, responseFormat?: string, body?: ComIbmCommerceRestMemberHandlerLoginIdentityHandlerLoginForm, options?: any): AxiosPromise<ComIbmCommerceRestMemberHandlerLoginIdentityHandlerUserIdentity> {
            return localVarFp.loginIdentityLogin(storeId, responseFormat, body, options).then((request) => request(axios, basePath));
        },
        /**
         * Logs out the registered user.
         * @summary Log out user
         * @param {string} storeId The store identifier.
         * @param {string} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        loginIdentityLogout(storeId: string, responseFormat?: string, options?: any): AxiosPromise<void> {
            return localVarFp.loginIdentityLogout(storeId, responseFormat, options).then((request) => request(axios, basePath));
        },
        /**
         * Logs in a registered user using their user name and password.
         * @summary Logs in with third party oauth provider.
         * @param {string} storeId The store identifier.
         * @param {string} [responseFormat] The response format. If the request has an input body, that body must also use the format specified in \\\&quot;responseFormat\\\&quot;. Valid values include \\\&quot;json\\\&quot; and \\\&quot;xml\\\&quot; without the quotes. If the responseFormat.
         * @param {ComIbmCommerceRestMemberHandlerLoginIdentityHandlerTokenValidationForm} [body] Token validation body.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storeStoreIdLoginidentityOauthPost(storeId: string, responseFormat?: string, body?: ComIbmCommerceRestMemberHandlerLoginIdentityHandlerTokenValidationForm, options?: any): AxiosPromise<ComIbmCommerceRestMemberHandlerLoginIdentityHandlerUserIdentity> {
            return localVarFp.storeStoreIdLoginidentityOauthPost(storeId, responseFormat, body, options).then((request) => request(axios, basePath));
        },
        /**
         * Logs in a registered user using their user name and password.
         * @summary Validate access token with external authorization server based on OAuth2.0 and login WCS.
         * @param {string} storeId The store identifier.
         * @param {string} [responseFormat] The response format. If the request has an input body, that body must also use the format specified in \\\&quot;responseFormat\\\&quot;. Valid values include \\\&quot;json\\\&quot; and \\\&quot;xml\\\&quot; without the quotes. If the responseFormat.
         * @param {ComIbmCommerceRestMemberHandlerLoginIdentityHandlerTokenValidationForm} [body] Token validation body.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        storeStoreIdLoginidentityOauthValidatePost(storeId: string, responseFormat?: string, body?: ComIbmCommerceRestMemberHandlerLoginIdentityHandlerTokenValidationForm, options?: any): AxiosPromise<ComIbmCommerceRestMemberHandlerLoginIdentityHandlerUserIdentity> {
            return localVarFp.storeStoreIdLoginidentityOauthValidatePost(storeId, responseFormat, body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * LoginIdentityApi - object-oriented interface
 * @export
 * @class LoginIdentityApi
 * @extends {BaseAPI}
 */
export class LoginIdentityApi extends BaseAPI {
    /**
     * Logs in a registered user using their user name and password.
     * @summary Log in user
     * @param {string} storeId The store identifier.
     * @param {string} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
     * @param {ComIbmCommerceRestMemberHandlerLoginIdentityHandlerLoginForm} [body] Logon body.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoginIdentityApi
     */
    public loginIdentityLogin(storeId: string, responseFormat?: string, body?: ComIbmCommerceRestMemberHandlerLoginIdentityHandlerLoginForm, options?: any) {
        return LoginIdentityApiFp(this.configuration).loginIdentityLogin(storeId, responseFormat, body, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Logs out the registered user.
     * @summary Log out user
     * @param {string} storeId The store identifier.
     * @param {string} [responseFormat] The response format. Valid values are json and xml. If the request contains an input body, it must use the format specified in responseFormat. If the responseFormat is not specified, the accept  HTTP header determines the format of the response. If the accept  HTTP header is not specified then default response format is json.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoginIdentityApi
     */
    public loginIdentityLogout(storeId: string, responseFormat?: string, options?: any) {
        return LoginIdentityApiFp(this.configuration).loginIdentityLogout(storeId, responseFormat, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Logs in a registered user using their user name and password.
     * @summary Logs in with third party oauth provider.
     * @param {string} storeId The store identifier.
     * @param {string} [responseFormat] The response format. If the request has an input body, that body must also use the format specified in \\\&quot;responseFormat\\\&quot;. Valid values include \\\&quot;json\\\&quot; and \\\&quot;xml\\\&quot; without the quotes. If the responseFormat.
     * @param {ComIbmCommerceRestMemberHandlerLoginIdentityHandlerTokenValidationForm} [body] Token validation body.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoginIdentityApi
     */
    public storeStoreIdLoginidentityOauthPost(storeId: string, responseFormat?: string, body?: ComIbmCommerceRestMemberHandlerLoginIdentityHandlerTokenValidationForm, options?: any) {
        return LoginIdentityApiFp(this.configuration).storeStoreIdLoginidentityOauthPost(storeId, responseFormat, body, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Logs in a registered user using their user name and password.
     * @summary Validate access token with external authorization server based on OAuth2.0 and login WCS.
     * @param {string} storeId The store identifier.
     * @param {string} [responseFormat] The response format. If the request has an input body, that body must also use the format specified in \\\&quot;responseFormat\\\&quot;. Valid values include \\\&quot;json\\\&quot; and \\\&quot;xml\\\&quot; without the quotes. If the responseFormat.
     * @param {ComIbmCommerceRestMemberHandlerLoginIdentityHandlerTokenValidationForm} [body] Token validation body.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LoginIdentityApi
     */
    public storeStoreIdLoginidentityOauthValidatePost(storeId: string, responseFormat?: string, body?: ComIbmCommerceRestMemberHandlerLoginIdentityHandlerTokenValidationForm, options?: any) {
        return LoginIdentityApiFp(this.configuration).storeStoreIdLoginidentityOauthValidatePost(storeId, responseFormat, body, options).then((request) => request(this.axios, this.basePath));
    }
}
