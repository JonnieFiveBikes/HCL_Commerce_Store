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


/**
 * Request of UserRegistrationAdminAdd.
 * @export
 * @interface ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
 */
export interface ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest {
    /**
     * The registrant\'s street address, to a maximum of three lines of information.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    address1?: string;
    /**
     * The registrant\'s street address, to a maximum of three lines of information.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    address2?: string;
    /**
     * The registrant\'s street address, to a maximum of three lines of information.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    address3?: string;
    /**
     * Customizable field.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    addressField1?: string;
    /**
     * Customizable field.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    addressField2?: string;
    /**
     * Customizable field.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    addressField3?: string;
    /**
     * The purpose of the address. Valid values are: S - shipto, B - billto, SB - shipto and billto (The default value.).
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    addressType?: string;
    /**
     * The registrant\'s age.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    age?: string;
    /**
     * A special ID assigned by the registrant\'s business organization or organizational unit to this particular registrant..
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    alternateId?: string;
    /**
     * You can manage custom member attributes (MBRATTRVAL table) for this user using the following syntax: {attributeName}_{storeId}_{action}_{sequence}: string. The curly braced values must be replaced as follows: attributeName is any attribute specified in MBRATTRVAL table, storeId is the numerical id of the store (or null to indicate all stores), action is either \'r\' (for replace) or \'d\' (for delete), and sequence to indicate the sequence of this value in relation to other values for this attribute. Some examples. \'JobFunction_10001_r_1\' : \'ProductManager\' is specifying that the user has a JobFunction attribute value of ProductManager for the store 10001, this is for replacing the first (r_1) JobFunction attribute value for the user. JobFunction_null_d deletes all job functions for the user in all stores. 
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    attributeName_storeId_action_sequence?: string;
    /**
     * D - An indicator that daytime is the best time to call the registrant; E - An indicator that evening is the best time to call the registrant.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    bestCallingTime?: string;
    /**
     * The registrant\'s organization\'s code to identify the shipping or billing addresses and cost center.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    billingCode?: string;
    /**
     * Code designating the method of code structure used for the billing code. The default value is D, assigned by buyer.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    billingCodeType?: string;
    /**
     * Answer to the challenge question.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    challengeAnswer?: string;
    /**
     * Challenge question for verbal confirmation of the customer\'s identity.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    challengeQuestion?: string;
    /**
     * The number of children the registrant has.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    children?: string;
    /**
     * The name of the city where the registrant resides.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    city?: string;
    /**
     * The company name of the organization that the registrant represents, obtained when filling in demographic information.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    companyName?: string;
    /**
     * The name of the country or region where the registrant resides.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    country?: string;
    /**
     * Date of birth. The format is yyyy-mm-dd, for example: 1980-01-01.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    dateOfBirth?: string;
    /**
     * The department identifier for the registrant.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    departmentNumber?: string;
    /**
     * A description of the registrant.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    description?: string;
    /**
     * The registrant\'s primary e-mail or Web address.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    email1?: string;
    /**
     * The registrant\'s secondary e-mail or Web address.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    email2?: string;
    /**
     * The registrant\'s ID with his or her employer.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    employeeId?: string;
    /**
     * The registrant\'s status as an employee (for example, regular, permanent, contractor, or part time).
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    employeeType?: string;
    /**
     * The registrant\'s primary facsimile number.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    fax1?: string;
    /**
     * The registrant\'s secondary facsimile number.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    fax2?: string;
    /**
     * The first name of the registrant.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    firstName?: string;
    /**
     * The registrant\'s gender.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    gender?: string;
    /**
     * The registrant\'s hobbies.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    hobbies?: string;
    /**
     * The number of people in the registrant\'s household; the default is 1.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    household?: string;
    /**
     * The registrant\'s annual income.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    income?: string;
    /**
     * The currency in which the registrant\'s income is paid.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    incomeCurrency?: string;
    /**
     * Required if the authentication mode is LDAP: The last name of the registrant. If the authentication mode is LDAP, this parameter is mandatory.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    lastName?: string;
    /**
     * The registrant\'s logon ID. If you are using LDAP, changing a user\'s logonID is not supported because it would require deleting and recreating the user in LDAP. This process would cause all non-WebSphere Commerce user attributes, such as the password, to be lost. If you are not using LDAP, changing the user\'s logon ID is not recommended, because the promotion subsystem stores the logon ID of the creator of the promotion in the XMLPARAM column of the PX_PROMOTION table. Note: When the UserRegistrationUpdate command is used to change the logonID, the command will automatically update the USERS.DN database column. Do not assume that ADDRESS.NICKNAME will also change. Instead, the following finder should be used to get the single self address of a user: AddressAccessBean.findSelfAddressByMember(Long memberID).
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    logonId: string;
    /**
     * The registrant\'s password. In database mode, the password is encrypted before it is saved in the database. In LDAP mode, the password is only stored on the LDAP server.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    logonPassword: string;
    /**
     * Required if the logonPassword is used: The registrant\'s password, entered a second time.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    logonPasswordVerify?: string;
    /**
     * The name of the registrant\'s manager.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    manager?: string;
    /**
     * The registrant\'s marital status.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    maritalStatus?: string;
    /**
     * The marketing tracking consent. 0 means opt-out, 1 means opt-in.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    marketingTrackingConsent?: string;
    /**
     * The middle name of the registrant.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    middleName?: string;
    /**
     * The registrant\'s mobile phone number used for SMS, for example, 4161235555.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    mobilePhone1?: string;
    /**
     * The country code used for the registrant\'s mobile phone number, for example, CA for Canada.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    mobilePhone1Country?: string;
    /**
     * The internal address (for example, mail stop).
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    officeAddress?: string;
    /**
     * Whether the registrant has previously placed an order. This value is supplied by the registrant.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    orderBefore?: string;
    /**
     * The fully qualified DN of the organization to register under. Required for B2B user registration. 
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    organizationDistinguishedName?: string;
    /**
     * The identifier of the registrant\'s company.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    organizationId?: string;
    /**
     * The name of the organization that the registrant represents.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    organizationName?: string;
    /**
     * The identifier of the registrant\'s organizational unit.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    organizationUnitId?: string;
    /**
     * The name of the unit within the organization that the registrant represents.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    organizationUnitName?: string;
    /**
     * 1 - An indicator to include package inserts when the order is shipped; 0 - An indicator to not include package inserts when the order is shipped. There is no default for this field. If the field is left unused, it remains null in the database.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    packageSuppression?: string;
    /**
     * The parent member identifier of the user.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    parentMemberId?: string;
    /**
     * The title of the user whose address is being entered (for example, Dr., Rev., Mr. or Ms.).
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    personTitle?: string;
    /**
     * The registrant\'s primary phone number.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    phone1?: string;
    /**
     * The type of phone used for the registrant\'s primary phone number, for example TTY for hearing impaired, PCM for pulse-coded modulation, or CEL for mobile. This is a field of 3 characters.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    phone1Type?: string;
    /**
     * The registrant\'s secondary phone number.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    phone2?: string;
    /**
     * The type of phone used for the registrant\'s secondary phone number, for example TTY for hearing impaired, PCM for pulse-coded modulation, or CEL for mobile. This is a field of 3 characters.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    phone2Type?: string;
    /**
     * URL or path to a photo of the registrant.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    photo?: string;
    /**
     * The account policy for this user.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    policyAccountId?: string;
    /**
     * The preferred phone for the registrant (stored in the ADDRESS table), for example: P1=phone 1 P2=phone 2.
     * @type {Array<string>}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    preferredCommunication?: Array<string>;
    /**
     * The registrant\'s preferred currency for transactions.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    preferredCurrency?: string;
    /**
     * The registrant\'s preferred mode of delivery.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    preferredDelivery?: string;
    /**
     * The registrant\'s preferred language.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    preferredLanguage?: string;
    /**
     * The registrant\'s preferred unit of measure.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    preferredMeasure?: string;
    /**
     * The version of the privacy notice. For example \'1.0\'.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    privacyNoticeVersion?: string;
    /**
     * The user\'s profile type. If profileType is not specified, by default, the profileType is set to \'C\' and a consumer user will be created; A business user can be by setting profileType to \'B\'.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    profileType?: ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequestProfileTypeEnum;
    /**
     * 1 - An indicator that the registrant\'s primary phone number is listed; 0 - An indicator that the registrant\'s primary phone number is unlisted. There is no default for these publishPhone fields. If the field is left unused, it remains null in the database.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    publishPhone1?: string;
    /**
     * 1 - An indicator that the registrant\'s secondary phone number is listed; 0 - An indicator that the registrant\'s secondary phone number is unlisted.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    publishPhone2?: string;
    /**
     * Determines whether the registrant wants to receive marketing e-mail activities for the current store (or all stores if no stores have been visited during the session): true - The user wants to receive marketing e-mail activities; false - The user does not want to receive e-mail activities (the default).
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    receiveEmail?: string;
    /**
     * Specifies whether the registrant wants to receive marketing SMS messages for the current store (or all stores if no stores have been visited during the session). Valid values are true or false (default).
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    receiveSMS?: string;
    /**
     * Indicates whether the user wants to receive order notification SMS text messages. Valid values are true or false (default).
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    receiveSMSNotification?: string;
    /**
     * The name of the registrant\'s secretary or administrative assistant.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    secretary?: string;
    /**
     * A shipping code based on geographical region, especially useful with tax software.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    shippingGeoCode?: string;
    /**
     * The name of the state, province, or equivalent where the registrant resides.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    state?: string;
    /**
     * A tax code based on geographical region, especially useful with tax software.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    taxGeoCode?: string;
    /**
     * The time zone in which the registrant does business (report as GMT +/- hours).
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    timeZone?: string;
    /**
     * The URL to call when the command completes successfully.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    URL?: string;
    /**
     * Customizable field.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    userField1?: string;
    /**
     * Customizable field.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    userField2?: string;
    /**
     * Customizable field.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    userField3?: string;
    /**
     * Customizable field.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    userProfileField1?: string;
    /**
     * Customizable field.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    userProfileField2?: string;
    /**
     * The user account status. A status of 1 indicates the account is enabled, and a status of 0 indicates the account is disabled.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    userStatus?: string;
    /**
     * Customizable field for demographic information; this is single-character field.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    x_demographicField1?: string;
    /**
     * Customizable field for demographic information; this is single-character field.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    x_demographicField2?: string;
    /**
     * Customizable field for demographic information; this is single-character field.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    x_demographicField3?: string;
    /**
     * Customizable field for demographic information; this is single-character field.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    x_demographicField4?: string;
    /**
     * Customizable field for demographic information; a field of 254 characters.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    x_demographicField5?: string;
    /**
     * Customizable field for demographic information; an integer field.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    x_demographicField6?: string;
    /**
     * Customizable field for demographic information; a field var char, length 6.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    x_demographicField7?: string;
    /**
     * A string used to identify the user for taxation purposes.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    x_taxPayerId?: string;
    /**
     * The ZIP or postal code of the registrant\'s address.
     * @type {string}
     * @memberof ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequest
     */
    zipCode?: string;
}

/**
    * @export
    * @enum {string}
    */
export enum ComIbmCommerceRestMemberHandlerPersonHandlerUserRegistrationAdminAddRequestProfileTypeEnum {
    B = 'B',
    C = 'C'
}



