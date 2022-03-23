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

import { OrderOrderDetailRewardOptionAdjustment } from './order-order-detail-reward-option-adjustment';
import { OrderOrderDetailRewardOptionAmount } from './order-order-detail-reward-option-amount';
import { OrderOrderDetailRewardOptionCalculationCodeID } from './order-order-detail-reward-option-calculation-code-id';
import { OrderOrderDetailRewardOptionDescription } from './order-order-detail-reward-option-description';
import { OrderOrderDetailRewardOptionGiftSet } from './order-order-detail-reward-option-gift-set';
import { OrderOrderDetailRewardOptionGiftSetSpecification } from './order-order-detail-reward-option-gift-set-specification';
import { OrderOrderDetailRewardOptionRewardChoice } from './order-order-detail-reward-option-reward-choice';
import { OrderOrderDetailRewardOptionRewardChoiceGiftItem } from './order-order-detail-reward-option-reward-choice-gift-item';
import { OrderOrderDetailRewardOptionRewardOptionIdentifier } from './order-order-detail-reward-option-reward-option-identifier';
import { OrderOrderDetailRewardOptionRewardSpecGiftItem } from './order-order-detail-reward-option-reward-spec-gift-item';
import { OrderOrderDetailRewardOptionRewardSpecification } from './order-order-detail-reward-option-reward-specification';
import { OrderOrderDetailRewardOptionUserData } from './order-order-detail-reward-option-user-data';

/**
 * 
 * @export
 * @interface OrderOrderDetailRewardOption
 */
export interface OrderOrderDetailRewardOption {
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailRewardOption
     */
    code?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailRewardOption
     */
    adjustmentLanguage?: string;
    /**
     * 
     * @type {number}
     * @memberof OrderOrderDetailRewardOption
     */
    adjustmentAmount?: number;
    /**
     * 
     * @type {OrderOrderDetailRewardOptionCalculationCodeID}
     * @memberof OrderOrderDetailRewardOption
     */
    calculationCodeID?: OrderOrderDetailRewardOptionCalculationCodeID;
    /**
     * 
     * @type {OrderOrderDetailRewardOptionAdjustment}
     * @memberof OrderOrderDetailRewardOption
     */
    adjustment?: OrderOrderDetailRewardOptionAdjustment;
    /**
     * 
     * @type {OrderOrderDetailRewardOptionGiftSet}
     * @memberof OrderOrderDetailRewardOption
     */
    giftSet?: OrderOrderDetailRewardOptionGiftSet;
    /**
     * 
     * @type {Array<OrderOrderDetailRewardOptionRewardSpecGiftItem>}
     * @memberof OrderOrderDetailRewardOption
     */
    rewardSpecGiftItem?: Array<OrderOrderDetailRewardOptionRewardSpecGiftItem>;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailRewardOption
     */
    adjustmentCode?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailRewardOption
     */
    adjustmentDescription?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailRewardOption
     */
    adjustmentUsage?: string;
    /**
     * 
     * @type {OrderOrderDetailRewardOptionRewardChoice}
     * @memberof OrderOrderDetailRewardOption
     */
    rewardChoice?: OrderOrderDetailRewardOptionRewardChoice;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailRewardOption
     */
    adjustmentCurrency?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailRewardOption
     */
    usage?: string;
    /**
     * 
     * @type {OrderOrderDetailRewardOptionUserData}
     * @memberof OrderOrderDetailRewardOption
     */
    userData?: OrderOrderDetailRewardOptionUserData;
    /**
     * 
     * @type {OrderOrderDetailRewardOptionDescription}
     * @memberof OrderOrderDetailRewardOption
     */
    description?: OrderOrderDetailRewardOptionDescription;
    /**
     * 
     * @type {OrderOrderDetailRewardOptionRewardOptionIdentifier}
     * @memberof OrderOrderDetailRewardOption
     */
    rewardOptionIdentifier: OrderOrderDetailRewardOptionRewardOptionIdentifier;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailRewardOption
     */
    rewardOptionExternalId?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailRewardOption
     */
    promotionType?: string;
    /**
     * 
     * @type {boolean}
     * @memberof OrderOrderDetailRewardOption
     */
    isPromotionCodeRequired?: boolean;
    /**
     * 
     * @type {OrderOrderDetailRewardOptionGiftSetSpecification}
     * @memberof OrderOrderDetailRewardOption
     */
    giftSetSpecification?: OrderOrderDetailRewardOptionGiftSetSpecification;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailRewardOption
     */
    adjustmentDisplayLevel?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailRewardOption
     */
    displayLevel?: string;
    /**
     * 
     * @type {OrderOrderDetailRewardOptionAmount}
     * @memberof OrderOrderDetailRewardOption
     */
    amount?: OrderOrderDetailRewardOptionAmount;
    /**
     * 
     * @type {OrderOrderDetailRewardOptionRewardSpecification}
     * @memberof OrderOrderDetailRewardOption
     */
    rewardSpecification?: OrderOrderDetailRewardOptionRewardSpecification;
    /**
     * 
     * @type {Array<OrderOrderDetailRewardOptionRewardChoiceGiftItem>}
     * @memberof OrderOrderDetailRewardOption
     */
    rewardChoiceGiftItem?: Array<OrderOrderDetailRewardOptionRewardChoiceGiftItem>;
    /**
     * 
     * @type {number}
     * @memberof OrderOrderDetailRewardOption
     */
    rewardSpecMaxQuantity?: number;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailRewardOption
     */
    rewardOptionId?: string;
    /**
     * 
     * @type {string}
     * @memberof OrderOrderDetailRewardOption
     */
    rewardSpecMaxQuantityUom?: string;
}


