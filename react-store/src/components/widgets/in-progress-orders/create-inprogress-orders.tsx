/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *==================================================
 */
//Standard libraries
import React from "react";
import { useTranslation } from "react-i18next";
//Custom libraries
import { PRIVATE_ORDER, SHARED_ORDER, EMPTY_STRING } from "../../../constants/common";
import addressUtil from "../../../utils/addressUtil";
import { useCreateInprogressOrder } from "../../../_foundation/hooks/use-create-inprogress-order";
//UI
import {
  StyledGrid,
  StyledIconLabel,
  StyledTextField,
  StyledAccordion,
  StyledAccordionSummary,
  StyledAccordionDetails,
  StyledButton,
  StyledFormControl,
  StyledRadioGroup,
  StyledTypography,
  StyledRadio,
  StyledFormControlLabel,
} from "@hcl-commerce-store-sdk/react-component";
import Add from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Divider } from "@mui/material";

/**
 * Create new order widget for inprogress orders
 *
 * @returns create inprogress order widget
 */
const CreateInprogressOrders: React.FC = () => {
  const { t } = useTranslation();
  const { orderName, orderType, handleOrderName, handleOrderType, createOrder, isValidOrderName } =
    useCreateInprogressOrder();

  return (
    <StyledAccordion testId={`in-progress-order-create`}>
      <StyledAccordionSummary
        className="horizontal-padding-2 vertical-padding-2 ip-cr8-acrdn"
        expandIcon={<ExpandMoreIcon />}>
        <StyledIconLabel
          icon={<Add color="primary" className="full-center" />}
          label={t("InprogressOrders.CreateNewOrder")}
        />
      </StyledAccordionSummary>
      <Divider className="bottom-margin-3" />
      <StyledAccordionDetails>
        <StyledGrid container item spacing={3} direction="row" alignItems="flex-start">
          <StyledGrid item xs={12} sm={3}>
            <StyledTextField
              required
              id="orderName"
              name="orderName"
              label={t("InprogressOrders.NewOrderName")}
              value={orderName}
              inputProps={{ maxLength: 128 }}
              autoComplete="orderName"
              onChange={(event) => handleOrderName(event)}
              error={!addressUtil.validateNickName(orderName)}
              helperText={
                !addressUtil.validateNickName(orderName) ? t("InprogressOrders.InvalidOrderName") : EMPTY_STRING
              }
            />
          </StyledGrid>
          <StyledGrid item xs={12} sm={3} className="vertical-margin-3">
            <StyledButton
              testId="inprogress-orders-create-order"
              size="small"
              color="primary"
              onClick={createOrder}
              disabled={!isValidOrderName()}>
              {t("InprogressOrders.CreateOrder")}
            </StyledButton>
          </StyledGrid>
          <StyledGrid item xs={12} sm={6} className="vertical-margin-1">
            <StyledFormControl component="fieldset">
              <StyledRadioGroup row name="orderType" value={orderType} onChange={(event) => handleOrderType(event)}>
                <StyledFormControlLabel
                  value={PRIVATE_ORDER}
                  control={<StyledRadio />}
                  label={<StyledTypography variant="body2">{t("InprogressOrders.PrivateOrder")}</StyledTypography>}
                />
                <StyledFormControlLabel
                  value={SHARED_ORDER}
                  control={<StyledRadio />}
                  label={<StyledTypography variant="body2">{t("InprogressOrders.SharedOrder")}</StyledTypography>}
                />
              </StyledRadioGroup>
            </StyledFormControl>
          </StyledGrid>
        </StyledGrid>
      </StyledAccordionDetails>
    </StyledAccordion>
  );
};

export default CreateInprogressOrders;
