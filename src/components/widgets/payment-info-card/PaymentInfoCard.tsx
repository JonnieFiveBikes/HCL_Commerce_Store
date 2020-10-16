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
import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios, { Canceler } from "axios";
import { useTranslation } from "react-i18next";
//Foundation libraries
import { useSite } from "../../../_foundation/hooks/useSite";
//Custom libraries
import { PaymentInfoType } from "../../pages/checkout/payment/Payment";
//Redux
import { addressDetailsSelector } from "../../../redux/selectors/account";
import { GET_ADDRESS_DETAIL_ACTION } from "../../../redux/actions/account";
//UI
import { StyledGrid, StyledTypography, StyledCard } from "../../StyledUI";

interface PaymentInfoCardProps {
  paymentInfo: PaymentInfoType;
  currentPaymentNumber: number;
}

/**
 * Payment info card display component
 * displays the details of a single payment
 * @param props
 */
const PaymentInfoCard: React.FC<PaymentInfoCardProps> = (props: any) => {
  const { paymentInfo, currentPaymentNumber } = props;
  const addressId = paymentInfo.addressId;
  const addressDetails = useSelector(addressDetailsSelector);
  const addressData = props.addressData
    ? buildAddressData(props.addressData)
    : getAddress();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { mySite } = useSite();

  const CancelToken = Axios.CancelToken;
  let cancels: Canceler[] = [];

  const payloadBase: any = {
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

  useEffect(() => {
    if (mySite && addressDetails === null) {
      dispatch(GET_ADDRESS_DETAIL_ACTION({ ...payloadBase }));
    }
  }, [mySite]);

  function getAddress() {
    let finalAddressData: any = {};
    if (addressDetails && addressId !== "") {
      const contactMap = addressDetails.contactMap;
      if (addressDetails.addressId === addressId) {
        finalAddressData = addressDetails;
      } else if (contactMap && contactMap[addressId]) {
        finalAddressData = contactMap[addressId];
      }
    }
    return buildAddressData(finalAddressData);
  }

  function buildAddressData(address: any) {
    let finalAddressData: any = { ...address };

    let fullNameString: string = "";
    if (
      finalAddressData.firstName !== undefined &&
      finalAddressData.firstName !== ""
    ) {
      fullNameString = finalAddressData.firstName;
    }
    if (
      finalAddressData.lastName !== undefined &&
      finalAddressData.lastName !== ""
    ) {
      if (fullNameString !== "") {
        fullNameString += " ";
      }
      fullNameString += finalAddressData.lastName;
      finalAddressData = {
        ...finalAddressData,
        fullNameString: fullNameString,
      };
    }

    let cityStateZipList: string[] = [];
    if (finalAddressData.city !== undefined && finalAddressData.city !== "") {
      cityStateZipList.push(finalAddressData.city);
    }
    if (finalAddressData.state !== undefined && finalAddressData.state !== "") {
      cityStateZipList.push(finalAddressData.state);
    }
    if (
      finalAddressData.zipCode !== undefined &&
      finalAddressData.zipCode !== ""
    ) {
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

  const handleEditPayment = () => {};
  const handleDeletePayment = () => {};

  const headerComponent = (
    <>
      <StyledTypography variant="subtitle2">
        {t("PaymentInfoCard.Title", currentPaymentNumber)}
      </StyledTypography>
      <StyledTypography variant="body2" className="full-width">
        {paymentInfo.selectedPayOption}
      </StyledTypography>
    </>
  );

  const contentComponent = (
    <StyledGrid container>
      <StyledGrid item xs={12} sm={6}>
        <StyledTypography variant="body2" className="full-width">
          {t("PaymentInfoCard.Labels.AmountToPay")}
        </StyledTypography>
      </StyledGrid>
      <StyledGrid item xs={12} sm={6}>
        <StyledTypography variant="body2" className="full-width">
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

  const cardActions = [
    {
      text: t("PaymentInfoCard.Actions.Edit"),
      handleClick: () => handleEditPayment(),
    },
    {
      text: t("PaymentInfoCard.Actions.Delete"),
      handleClick: () => handleDeletePayment(),
      enableConfirmation: true,
    },
  ];

  return (
    <StyledCard
      headerProps={headerComponent}
      contentComponent={contentComponent}
      cardActions={cardActions}
      confirmLabel={t("AddressCard.Confirm")}
      cancelLabel={t("AddressCard.Cancel")}
    />
  );
};

export { PaymentInfoCard };
