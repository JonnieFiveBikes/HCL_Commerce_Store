/**
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
import { useTranslation } from "react-i18next";
//HCL libraries
import { StyledContainer, StyledGrid, BreadcrumbWidget } from "@hcl-commerce-store-sdk/react-component";
//UI
import { StoreLocatorWidget } from "../../widgets/store-locator-widget";
//Custom libraries
import { HOME, STORE_LOCATOR } from "../../../constants/routes";

const StoreLocator = () => {
  const { t } = useTranslation();
  const breadcrumbs = [
    { label: t("StoreLocator.home"), seo: { href: HOME }, value: "1" },
    { label: t("StoreLocator.title"), seo: { href: STORE_LOCATOR }, value: "2" },
  ];
  return (
    <StyledContainer className="page">
      <StyledGrid container direction="column" justifyContent="center" alignItems="stretch">
        <StyledGrid item xs={12}>
          <BreadcrumbWidget cid="store-locator-page" breadcrumbs={breadcrumbs} />
        </StyledGrid>
        <StyledGrid item xs={12}>
          <StoreLocatorWidget />
        </StyledGrid>
      </StyledGrid>
    </StyledContainer>
  );
};

export default StoreLocator;
