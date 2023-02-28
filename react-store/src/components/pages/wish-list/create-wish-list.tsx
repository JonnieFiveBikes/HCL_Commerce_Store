/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2022
 *
 *==================================================
 */
//Standard libraries
import React from "react";
import { useTranslation } from "react-i18next";
//Custom libraries
import { useWishList } from "../../../_foundation/hooks/use-wishlist";
import { EMPTY_STRING } from "../../../constants/common";
//UI
import {
  StyledGrid,
  StyledTextField,
  StyledTypography,
  StyledIconLabel,
  StyledButton,
  StyledAccordion,
  StyledAccordionSummary,
  StyledAccordionDetails,
} from "@hcl-commerce-store-sdk/react-component";
import Add from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CreateWishList: React.FC = (props: any) => {
  const {
    wishListName,
    handleWishListName,
    validateWishListName,
    canCreateWishList,
    createWishList,
    isExpanded,
    toggleExpand,
  } = useWishList();
  const { t } = useTranslation();
  return (
    <StyledGrid container>
      <StyledAccordion testId={`create-wish-list`} style={{ flex: "1" }} expanded={isExpanded} onClick={toggleExpand}>
        <StyledAccordionSummary
          className="horizontal-padding-2 vertical-padding-2 cprof-cr8-acrdn"
          expandIcon={<ExpandMoreIcon />}>
          <StyledIconLabel
            icon={<Add color="primary" className="full-center" />}
            label={t("WishList.CreateWishListTitle")}
          />
        </StyledAccordionSummary>
        <StyledAccordionDetails data-testid="create-wish-list-accordion-details" onClick={toggleExpand}>
          <StyledGrid item container spacing={2} alignItems="flex-start">
            <StyledGrid item xs={12} sm={6} md={5}>
              <StyledTextField
                fullWidth
                required
                id="create-wish-list-name"
                name="wishListName"
                label={
                  <StyledTypography variant="body1" style={{ fontWeight: "bold" }}>
                    {t("WishList.WishListName")}
                  </StyledTypography>
                }
                value={wishListName}
                inputProps={{ maxLength: 128 }}
                autoComplete="wishListName"
                onChange={handleWishListName}
                error={validateWishListName(wishListName)}
                helperText={validateWishListName(wishListName) ? t("WishList.InvalidWishListName") : EMPTY_STRING}
              />
            </StyledGrid>
            <StyledGrid item xs={12} sm={3} md={3}>
              <StyledButton
                testId="create-wishlist"
                fullWidth
                className="top-margin-4"
                color="primary"
                disabled={canCreateWishList()}
                onClick={createWishList}>
                <StyledTypography variant="body1">{t("WishList.CreateList")}</StyledTypography>
              </StyledButton>
            </StyledGrid>
          </StyledGrid>
        </StyledAccordionDetails>
      </StyledAccordion>
    </StyledGrid>
  );
};

export default CreateWishList;
