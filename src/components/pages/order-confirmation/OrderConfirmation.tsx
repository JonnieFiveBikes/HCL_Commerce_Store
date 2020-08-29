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
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Redirect } from "react-router-dom";
import { useLocation } from "react-router";
//Custom libraries
import { useSite } from "../../../_foundation/hooks/useSite";
import * as ROUTES from "../../../constants/routes";
//UI
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import {
  StyledContainer,
  StyledGrid,
  StyledIcon,
  StyledPaper,
  StyledTypography,
} from "../../StyledUI";

/**
 * Order Confirmation component
 * displays order confirmation info
 * @param props
 */
const OrderConfirmation: React.FC = (props: any) => {
  const { t } = useTranslation();
  const mySite: any = useSite();
  const location = useLocation();
  const orderId: string = location?.state ? location.state["orderId"] : "";
  const storeName: string = mySite?.storeName;

  let emailList: string[] = location?.state ? location.state["emailList"] : [];
  emailList = [...new Set(emailList)];
  const emailListString = emailList.join(", ");

  return orderId ? (
    <StyledContainer className="page">
      <StyledTypography tabIndex="0" variant="h4" className="vertical-margin-4">
        {t("OrderConfirmation.Title")}
      </StyledTypography>
      <StyledPaper>
        <StyledGrid
          container
          direction="column"
          alignItems="center"
          className="vertical-margin-15">
          <StyledGrid item>
            <StyledIcon>
              <CheckCircleIcon color="primary" fontSize="large" />
            </StyledIcon>
          </StyledGrid>
          <StyledGrid item>
            <StyledTypography variant="h3" align="center" gutterBottom>
              {t("OrderConfirmation.Msgs.Heading")}
            </StyledTypography>
            <StyledTypography variant="h6" align="center" gutterBottom>
              {t("OrderConfirmation.Msgs.OrderNumber", { orderId: orderId })}
            </StyledTypography>
            <StyledTypography variant="body1" align="center" gutterBottom>
              {t("OrderConfirmation.Msgs.Details", { emails: emailListString })}
            </StyledTypography>
            <StyledTypography variant="body1" align="center">
              {t("OrderConfirmation.Msgs.ThankYou", { storeName: storeName })}
            </StyledTypography>
          </StyledGrid>
        </StyledGrid>
      </StyledPaper>
    </StyledContainer>
  ) : (
    <Redirect to={ROUTES.CART} />
  );
};

export default OrderConfirmation;
