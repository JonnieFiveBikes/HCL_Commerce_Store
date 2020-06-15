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
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
//Redux
import { cartSelector } from "../../../redux/selectors/order";
import { RESET_CART_ACTION } from "../../../redux/actions/order";
//UI
import {
  StyledGrid,
  StyledContainer,
  StyledPaper,
  StyledTypography,
} from "../../StyledUI";

/**
 * Order Confirmation component
 * displays order confirmation info
 * @param props
 */
const ConfirmationSection: React.FC = (props: any) => {
  const cart = useSelector(cartSelector);
  const orderId = cart ? cart.orderId : "";

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    return () => {
      dispatch(RESET_CART_ACTION());
    };
  }, []);

  return (
    <StyledPaper>
      <StyledGrid container>
        <StyledGrid
          item
          xs={12}
          sm={8}
          md={6}
          className="vertical-margin-2 horizontal-margin-3">
          <StyledTypography variant="h5" gutterBottom>
            {t("ConfirmationSection.Msgs.ThankYou")}
          </StyledTypography>
          <StyledTypography variant="body1">
            {t("ConfirmationSection.Msgs.Details", { orderId: orderId })}
          </StyledTypography>
        </StyledGrid>
      </StyledGrid>
    </StyledPaper>
  );
};

export { ConfirmationSection };
