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
import React from "react";
import { useTranslation } from "react-i18next";
//UI
import {
  StyledTypography,
  StyledIconLabel,
  StyledBox,
  StyledTextField,
  StyledGrid,
} from "@hcl-commerce-store-sdk/react-component";
import PaymentIcon from "@mui/icons-material/Payment";
import { SELECTED_PROFILE } from "../../../_foundation/constants/common";
import { EMPTY_STRING } from "../../../constants/common";
import storeUtil from "../../../utils/storeUtil";
import { get } from "lodash-es";
import { useLocation } from "react-router";

interface OrderPaymentInfoProps {
  paymentInstruction: any;
  cvv?: string;
  setCvv?: (v: any) => void;
}

/**
 * Order Payment info component
 * displays payment instruction details of an order
 * @param props
 */
const OrderPaymentInfo: React.FC<OrderPaymentInfoProps> = (props: any) => {
  const { paymentInstruction: pi, cvv, setCvv } = props;
  const { t } = useTranslation();
  const { account, month, year, payment_method } = initProtocolData();
  const location: any = useLocation();

  function initProtocolData() {
    let newAccount: string = "";
    let newMonth: string = "";
    let newYear: string = "";
    let payment_method: string = "";

    if (pi && pi.protocolData) {
      const data = pi.protocolData;
      for (let i = 0; i < data.length; i++) {
        if (data[i].name === "account") {
          newAccount = data[i].value;
        } else if (data[i].name === "expire_month") {
          newMonth = data[i].value;
        } else if (data[i].name === "expire_year") {
          newYear = data[i].value;
        } else if (data[i].name === "payment_method") {
          payment_method = t(`CheckoutProfile.payMethods.${data[i].value}`);
        }
        if (newAccount !== "" && newMonth !== "" && newYear !== "" && payment_method !== "") {
          break;
        }
      }
    }
    return {
      account: newAccount,
      month: newMonth,
      year: newYear,
      payment_method: payment_method,
    };
  }

  const usingProfile = get(location, `state.${SELECTED_PROFILE}`);
  const expDate = month + "/" + year;
  const handleCvvChange = (event) => {
    setCvv(event.target.value);
  };
  return usingProfile ? (
    pi ? (
      <>
        <StyledIconLabel icon={<PaymentIcon />} label={t("OrderPaymentInfo.Labels.BillMethod")} />
        <StyledBox my={2}>
          {payment_method !== "" && <StyledTypography gutterBottom>{payment_method}</StyledTypography>}
        </StyledBox>
        {account !== "" && (
          <>
            <StyledBox my={2}>
              <StyledTypography gutterBottom>{account}</StyledTypography>
            </StyledBox>
            <StyledGrid container spacing={2}>
              <StyledGrid item xs={12} sm={6}>
                <StyledTextField
                  required
                  name="account"
                  value={expDate}
                  label={t("PaymentMethodSelection.Labels.ExpiryDate")}
                  type="text"
                  inputProps={{ maxLength: 19 }}
                  fullWidth
                />
              </StyledGrid>
              <StyledGrid item xs={12} sm={6}>
                <StyledTextField
                  required
                  name="cvv"
                  autoFocus
                  type="password"
                  placeholder={"cvv"}
                  value={cvv}
                  onChange={handleCvvChange}
                  error={!(storeUtil.isNumeric(cvv) && (cvv.length === 3 || cvv.length === 4))}
                  helperText={
                    !(storeUtil.isNumeric(cvv) && (cvv.length === 3 || cvv.length === 4))
                      ? t("PaymentMethodSelection.Msgs.CVV")
                      : EMPTY_STRING
                  }
                  label={t("PaymentMethodSelection.Labels.CVV")}
                  inputProps={{ maxLength: 4 }}
                  fullWidth
                />
              </StyledGrid>
            </StyledGrid>
          </>
        )}
      </>
    ) : null
  ) : pi ? (
    <>
      <StyledIconLabel icon={<PaymentIcon />} label={t("OrderPaymentInfo.Labels.BillMethod")} />
      <StyledBox my={2}>
        <StyledTypography gutterBottom>{pi.piDescription}</StyledTypography>
        {account !== "" && <StyledTypography gutterBottom>{account}</StyledTypography>}
        {month !== "" && year !== "" && (
          <StyledTypography gutterBottom>
            {month} / {year}
          </StyledTypography>
        )}
      </StyledBox>
    </>
  ) : null;
};

export { OrderPaymentInfo };
