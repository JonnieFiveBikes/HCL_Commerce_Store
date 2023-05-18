/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020
 *
 *==================================================
 */

//Standard libraries
import React, { Fragment, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios, { Canceler } from "axios";
import { useTranslation } from "react-i18next";
import getDisplayName from "react-display-name";
//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";
import { PaymentInfoType } from "../../../_foundation/hooks/use-checkout-payment";
//Redux
import { addressDetailsSelector } from "../../../redux/selectors/account";
import { organizationDetailsSelector, activeOrgSelector } from "../../../redux/selectors/organization";
import { GET_ADDRESS_DETAIL_ACTION } from "../../../redux/actions/account";
import { payMethodsSelector } from "../../../redux/selectors/order";
//UI
import { StyledGrid, StyledTypography, StyledCard, StyledNumberInput } from "@hcl-commerce-store-sdk/react-component";
//Custom libraries
import FormattedPriceDisplay from "../formatted-price-display";
import storeUtil from "../../../utils/storeUtil";
import { EMPTY_STRING, ORG_ADDRESS, ADDRESS_LINE, CARD_NUMBER_MASK_CHAR } from "../../../constants/common";
import { PAYMENT, ACCOUNT_CC, EXPIRE_MONTH, EXPIRE_YEAR } from "../../../constants/order";
import { GET_ORGANIZATION_ADDRESS_ACTION } from "../../../redux/actions/organization";

interface PaymentInfoCardProps {
  paymentInfo: PaymentInfoType;
  currentPaymentNumber: number;
  readOnly?: boolean;
  handleEditPayment?: (v?: any) => void;
  handleDeletePayment?: (v?: any) => void;
  handlePiAmountChange?: (v?: any) => void;
  getMaximumPiAmount?: (v?: any) => void;
  isValidPaymentList?: (v?: any) => boolean;
}

/**
 * Payment info card display component
 * displays the details of a single payment
 * @param props
 */
const PaymentInfoCard: React.FC<PaymentInfoCardProps> = (props: any) => {
  const widgetName = getDisplayName(PaymentInfoCard);
  const {
    paymentInfo,
    currentPaymentNumber,
    handleEditPayment,
    handleDeletePayment,
    handlePiAmountChange,
    getMaximumPiAmount,
    isValidPaymentList,
  } = props;
  const readOnly = props.readOnly ? props.readOnly : false;
  const addressId = paymentInfo.addressId ? paymentInfo.addressId : paymentInfo.billing_address_id;
  const addressDetails = useSelector(addressDetailsSelector);
  const orgAddressDetails = useSelector(organizationDetailsSelector);
  const activeOrgId = useSelector(activeOrgSelector);
  const payMethods = useSelector(payMethodsSelector);

  const addressData = props.addressData ? buildAddressData(props.addressData) : getAddress();
  const maxPiAmount = getMaximumPiAmount ? getMaximumPiAmount(currentPaymentNumber) : 0;

  const payMethodDisplayName = useMemo(
    () => getPaymentMethodDisplayName(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paymentInfo, payMethods]
  );
  const { account, expire_month, expire_year } = useMemo(
    () => getCreditCardDetails(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paymentInfo]
  );

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { mySite } = useSite();

  const CancelToken = Axios.CancelToken;
  const cancels: Canceler[] = [];

  const payloadBase: any = {
    widget: widgetName,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

  useEffect(() => {
    if (mySite && !addressDetails) {
      dispatch(GET_ADDRESS_DETAIL_ACTION({ ...payloadBase }));
    }
    if (mySite && !orgAddressDetails) {
      const param: any = {
        storeId: mySite.storeId,
        organizationId: activeOrgId,
        ...payloadBase,
      };
      dispatch(GET_ORGANIZATION_ADDRESS_ACTION(param));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mySite]);

  useEffect(() => {
    return () => {
      cancels.forEach((cancel) => cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getAddress() {
    let finalAddressData: any = {};
    if (addressDetails && addressId !== EMPTY_STRING) {
      const contactMap = addressDetails.contactMap;
      if (addressDetails.addressId === addressId) {
        finalAddressData = addressDetails;
      } else if (contactMap && contactMap[addressId]) {
        finalAddressData = contactMap[addressId];
      }
    }
    if (
      orgAddressDetails &&
      orgAddressDetails.contactInfo &&
      orgAddressDetails.addressBook &&
      addressId !== EMPTY_STRING
    ) {
      if (addressId === orgAddressDetails.contactInfo.addressId) {
        const orgAddress: any = {};
        Object.assign(orgAddress, orgAddressDetails.contactInfo);
        orgAddress[ADDRESS_LINE] = [orgAddress.address1, orgAddress.address2, orgAddress.address3];
        orgAddress[ORG_ADDRESS] = true;
        finalAddressData = orgAddress;
      } else {
        for (const orgAddress of orgAddressDetails.addressBook) {
          if (addressId === orgAddress.addressId) {
            const address: any = {};
            Object.assign(address, orgAddress);
            address[ADDRESS_LINE] = [address.address1, address.address2, address.address3];
            address[ORG_ADDRESS] = true;
            finalAddressData = address;
            break;
          }
        }
      }
    }
    return buildAddressData(finalAddressData);
  }

  function buildAddressData(address: any) {
    let finalAddressData: any = { ...address };

    let fullNameString: string = EMPTY_STRING;
    if (finalAddressData.firstName !== undefined && finalAddressData.firstName !== EMPTY_STRING) {
      fullNameString = finalAddressData.firstName;
    }
    if (finalAddressData.lastName !== undefined && finalAddressData.lastName !== EMPTY_STRING) {
      if (fullNameString !== EMPTY_STRING) {
        fullNameString += " ";
      }
      fullNameString += finalAddressData.lastName;
      finalAddressData = {
        ...finalAddressData,
        fullNameString: fullNameString,
      };
    }

    const cityStateZipList: string[] = [];
    if (finalAddressData.city !== undefined && finalAddressData.city !== EMPTY_STRING) {
      cityStateZipList.push(finalAddressData.city);
    }
    if (finalAddressData.state !== undefined && finalAddressData.state !== EMPTY_STRING) {
      cityStateZipList.push(finalAddressData.state);
    }
    if (finalAddressData.zipCode !== undefined && finalAddressData.zipCode !== EMPTY_STRING) {
      cityStateZipList.push(finalAddressData.zipCode);
    }
    if (cityStateZipList.length > 0) {
      const cityStateZipString = cityStateZipList.join(", ");
      finalAddressData = {
        ...finalAddressData,
        cityStateZipString: cityStateZipString,
      };
    }
    return finalAddressData;
  }

  function getPaymentMethodDisplayName() {
    let displayName = EMPTY_STRING;
    if (paymentInfo.piDescription) {
      return paymentInfo.piDescription;
    }
    if (paymentInfo && payMethods?.length > 0) {
      const payMethod = payMethods.find((pm) => pm.paymentMethodName === paymentInfo.payMethodId);
      if (payMethod) {
        displayName = payMethod.description;
      } else {
        displayName = paymentInfo.payMethodId;
      }
    }
    return displayName;
  }

  function getCreditCardDetails() {
    let account = EMPTY_STRING;
    let expire_month = EMPTY_STRING;
    let expire_year = EMPTY_STRING;
    if (paymentInfo && paymentInfo.creditCardFormData) {
      account = paymentInfo.creditCardFormData.account;
      expire_month = paymentInfo.creditCardFormData.expire_month;
      expire_year = paymentInfo.creditCardFormData.expire_year;
    } else if (paymentInfo && paymentInfo.protocolData) {
      account = paymentInfo.protocolData.find((pd) => pd.name === ACCOUNT_CC)?.value;
      expire_month = paymentInfo.protocolData.find((pd) => pd.name === EXPIRE_MONTH)?.value;
      expire_year = paymentInfo.protocolData.find((pd) => pd.name === EXPIRE_YEAR)?.value;
    }
    return { account, expire_month, expire_year };
  }

  const headerComponent = (
    <>
      <StyledTypography variant="subtitle2">
        {t("PaymentInfoCard.Title", { number: currentPaymentNumber + 1 })}
      </StyledTypography>
      {payMethodDisplayName && (
        <StyledTypography variant="body2" className="full-width">
          {payMethodDisplayName}
        </StyledTypography>
      )}
    </>
  );

  const contentComponent = (
    <StyledGrid container spacing={1}>
      <StyledGrid item xs={12} sm={6}>
        <StyledTypography variant="body2" className="full-width shipment-group-heading" gutterBottom>
          {t("PaymentInfoCard.Labels.AmountToPay")}
        </StyledTypography>

        {readOnly ? (
          <StyledTypography variant="body2" gutterBottom>
            <FormattedPriceDisplay min={parseFloat(paymentInfo.piAmount)} currency={paymentInfo.piCurrency} />
          </StyledTypography>
        ) : (
          <StyledNumberInput
            className="right-padding-4 bottom-padding-1"
            value={parseFloat(paymentInfo.piAmount)}
            min={0.01}
            max={maxPiAmount}
            precision={2}
            onChange={(valueAsNumber) => handlePiAmountChange(valueAsNumber, currentPaymentNumber)}
            strict={true}
          />
        )}

        {account && account !== EMPTY_STRING && (
          <StyledTypography variant="body2">{storeUtil.maskCardNumber(account)}</StyledTypography>
        )}
        {account && expire_month && expire_year && (
          <StyledTypography variant="body2">
            {t("PaymentInfoCard.Labels.ExpiryDate", {
              month: expire_month,
              year: expire_year,
            })}
          </StyledTypography>
        )}
      </StyledGrid>
      <StyledGrid item xs={12} sm={6}>
        <StyledTypography variant="body2" className="full-width shipment-group-heading">
          {t("PaymentInfoCard.Labels.BillingAddress")}
        </StyledTypography>
        {addressData.fullNameString && (
          <StyledTypography variant="body1" display="block" noWrap>
            {addressData.fullNameString}
          </StyledTypography>
        )}
        {addressData.addressLine &&
          addressData.addressLine.map((line: string, index: number) => (
            <Fragment key={index}>
              {line && (
                <StyledTypography variant="body1" display="block" noWrap>
                  {line}
                </StyledTypography>
              )}
            </Fragment>
          ))}

        {addressData.cityStateZipString && (
          <StyledTypography variant="body1" display="block" noWrap>
            {addressData.cityStateZipString}
          </StyledTypography>
        )}

        {addressData.country && (
          <StyledTypography variant="body1" display="block" noWrap>
            {addressData.country}
          </StyledTypography>
        )}

        {addressData.phone1 && (
          <StyledTypography variant="body1" display="block" noWrap>
            {addressData.phone1}
          </StyledTypography>
        )}

        {addressData.email1 && (
          <StyledTypography variant="body1" display="block" noWrap>
            {addressData.email1}
          </StyledTypography>
        )}
      </StyledGrid>
    </StyledGrid>
  );

  const cardActions = readOnly
    ? []
    : [
        {
          text: t("PaymentInfoCard.Actions.Edit"),
          handleClick: () => handleEditPayment(currentPaymentNumber),
        },
        {
          text: t("PaymentInfoCard.Actions.Delete"),
          handleClick: () => handleDeletePayment(currentPaymentNumber),
          enableConfirmation: true,
        },
      ];

  return (
    <StyledCard
      testId={`payment-${currentPaymentNumber}`}
      className={`payment-card ${
        isValidPaymentList &&
        !isValidPaymentList() &&
        PAYMENT.ccMethods[paymentInfo?.payMethodId] &&
        (account.includes(CARD_NUMBER_MASK_CHAR) || account === EMPTY_STRING)
          ? "error-card-selected"
          : EMPTY_STRING
      }`}
      headerProps={headerComponent}
      contentComponent={contentComponent}
      cardActions={cardActions}
      confirmLabel={t("AddressCard.Confirm")}
      cancelLabel={t("AddressCard.Cancel")}
    />
  );
};

export { PaymentInfoCard };
