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
  StyledBox,
  StyledIconLabel,
  StyledGrid,
  StyledTextField,
  StyledTypography,
} from "@hcl-commerce-store-sdk/react-component";
import DescriptionIcon from "@mui/icons-material/Description";

interface PurchaseOrderNumberProps {
  poNumber: string;
  handlePONumberChange?: (v?: any) => void;
  isValidPO?: (v?: any) => boolean;
}

/**
 * Purchase Order Number component
 * displays PO number input or text display
 * @param props
 */
const PurchaseOrderNumber: React.FC<PurchaseOrderNumberProps> = (props: any) => {
  const { poNumber, handlePONumberChange, isValidPO } = props;
  const { t } = useTranslation();

  const readOnly = handlePONumberChange === undefined || isValidPO === undefined;

  return readOnly ? (
    <>
      <StyledBox display="flex" flexDirection="row" alignItems="center" flexWrap="wrap">
        <StyledIconLabel icon={<DescriptionIcon />} label={t("PurchaseOrderNumber.Labels.PONumber")} />
        <StyledBox py={1}>
          <StyledTypography variant="h5" className="wrapText">
            {poNumber}
          </StyledTypography>
        </StyledBox>
      </StyledBox>
    </>
  ) : (
    <StyledGrid container spacing={2}>
      <StyledGrid item container direction="row" justifyContent="space-between" alignItems="center">
        <StyledIconLabel icon={<DescriptionIcon />} label={t("PurchaseOrderNumber.Title")} />
      </StyledGrid>
      <StyledGrid item xs={12} sm={4}>
        <StyledTextField
          name="purchaseorder_id"
          type="text"
          size="small"
          value={poNumber}
          className="bottom-margin-1"
          onChange={handlePONumberChange}
          helperText={!isValidPO() ? t("PurchaseOrderNumber.Msgs.PONumberRequired") : ""}
          inputProps={{ maxLength: 128 }}
          fullWidth
          required
        />
      </StyledGrid>
    </StyledGrid>
  );
};

export default PurchaseOrderNumber;
