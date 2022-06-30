import { FC } from "react";
import { useLocation, useNavigate } from "react-router";
import { CompareWidget } from "../../widgets/compare/compare";
import { StyledContainer, StyledGrid, StyledTextLink, StyledTypography } from "@hcl-commerce-store-sdk/react-component";

import { useTranslation } from "react-i18next";
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

const GoBack = ({ from, checked: compare }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <StyledTextLink
      data-testid="product-compare-back-to-product-list-link"
      label={<StyledTypography variant="button">{t("compare.goBack")}</StyledTypography>}
      onClick={() => navigate(from, { state: { compare } })}
    />
  );
};

const Compare: FC = (props) => {
  const location: any = useLocation();
  const { state } = location;
  const { data, from } = state;
  const { t } = useTranslation();
  return (
    <StyledContainer id="compare-page-container">
      <StyledGrid container justifyContent="space-between" alignItems="center" className="vertical-padding-4">
        <StyledTypography variant="h4">{t("compare.prodComp")}</StyledTypography>
        <GoBack {...{ from, checked: data.checked }} />
      </StyledGrid>
      <div className="full-height">{data ? <CompareWidget {...state} /> : <></>}</div>
    </StyledContainer>
  );
};

export default Compare;
