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

//UI
import {
  StyledBreadcrumbs,
  StyledContainer,
  StyledGrid,
  StyledLink,
  StyledTypography,
} from "@hcl-commerce-store-sdk/react-component";
import { useTranslation } from "react-i18next";

//Custom libraries
import * as ROUTES from "../../../../constants/routes";
import AccountSidebar from "../../../widgets/account-sidebar/AccountSidebar";
import { ViewUploadLogsTable } from "../../../widgets/upload-requisition-lists/view-upload-logs-table";

const ViewUploadLogs = () => {
  const { t } = useTranslation();

  return (
    <StyledContainer cid="viewUploadLogs">
      <StyledBreadcrumbs className="vertical-padding-2">
        <StyledLink to={ROUTES.REQUISITION_LISTS}>
          <StyledTypography variant="h4">{t("RequisitionLists.Title")}</StyledTypography>
        </StyledLink>
        <StyledTypography style={{ overflowWrap: "break-word" }} variant="h4">
          {t("RequisitionLists.UploadLog")}
        </StyledTypography>
      </StyledBreadcrumbs>
      <StyledGrid container spacing={2}>
        <StyledGrid item xs={12} md={3} className="sidebar">
          <AccountSidebar />
        </StyledGrid>
        <StyledGrid item xs={12} md={9}>
          <ViewUploadLogsTable />
        </StyledGrid>
      </StyledGrid>
    </StyledContainer>
  );
};

export default ViewUploadLogs;
