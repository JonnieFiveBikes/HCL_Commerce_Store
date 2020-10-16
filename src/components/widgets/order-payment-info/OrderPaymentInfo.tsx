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
import { StyledTypography, StyledIconLabel, StyledBox } from "../../StyledUI";
import PaymentIcon from "@material-ui/icons/Payment";

interface OrderPaymentInfoProps {
  paymentInstruction: any;
}

/**
 * Order Payment info component
 * displays payment instruction details of an order
 * @param props
 */
const OrderPaymentInfo: React.FC<OrderPaymentInfoProps> = (props: any) => {
  const pi = props.paymentInstruction;
  const { account, month, year } = initProtocolData();

  const { t } = useTranslation();

  function initProtocolData() {
    let newAccount: string = "";
    let newMonth: string = "";
    let newYear: string = "";
    if (pi && pi.protocolData) {
      const data = pi.protocolData;
      for (let i = 0; i < data.length; i++) {
        if (data[i].name === "account") {
          newAccount = data[i].value;
        } else if (data[i].name === "expire_month") {
          newMonth = data[i].value;
        } else if (data[i].name === "expire_year") {
          newYear = data[i].value;
        }
        if (newAccount !== "" && newMonth !== "" && newYear !== "") {
          break;
        }
      }
    }
    return { account: newAccount, month: newMonth, year: newYear };
  }

  return (
    <>
      {pi && (
        <>
          <StyledIconLabel
            icon={<PaymentIcon />}
            label={t("OrderPaymentInfo.Labels.BillMethod")}
          />
          <StyledBox my={2}>
            <StyledTypography gutterBottom>{pi.piDescription}</StyledTypography>
            {account !== "" && (
              <StyledTypography gutterBottom>{account}</StyledTypography>
            )}
            {month !== "" && year !== "" && (
              <StyledTypography gutterBottom>
                {month} / {year}
              </StyledTypography>
            )}
          </StyledBox>
        </>
      )}
    </>
  );
};

export { OrderPaymentInfo };
