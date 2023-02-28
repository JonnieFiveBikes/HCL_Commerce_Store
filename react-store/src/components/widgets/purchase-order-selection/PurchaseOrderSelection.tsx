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
//Custom libraries
//UI
import DescriptionIcon from "@mui/icons-material/Description";
import { StyledGrid, StyledIconLabel } from "@hcl-commerce-store-sdk/react-component";

/**
 * PaymentMethodSelection component
 * displays billing address selection and payment method selection sections
 * @param props
 */
const PurchaseOrderSelection: React.FC<any> = (props) => {
  const { t } = useTranslation();

  return (
    <>
      <StyledGrid container direction="row" justifyContent="space-between" alignItems="center">
        <StyledIconLabel icon={<DescriptionIcon />} label={t("PurchaseOrderSelection.Title")} />
      </StyledGrid>
    </>
  );
};

export { PurchaseOrderSelection };
