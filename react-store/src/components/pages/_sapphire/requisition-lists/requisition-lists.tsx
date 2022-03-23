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
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
//Custom libraries
import { SIGNIN } from "../../../../constants/routes";
import CreateRequisitionList from "../../../widgets/requisition-lists/create-requisition-lists";
import UploadRequisitionList from "../../../widgets/upload-requisition-lists/upload-requisition-lists";
import AccountSidebar from "../../../widgets/account-sidebar/AccountSidebar";
import { TitleLayout } from "../../../widgets/title/TitleLayout";
import { RequisitionListsTable } from "../../../widgets/requisition-lists-table";
//Redux
import { loginStatusSelector } from "../../../../redux/selectors/user";
//UI
import { StyledGrid, StyledContainer, withCustomTableContext } from "@hcl-commerce-store-sdk/react-component";

const RequisitionLists: React.FC = () => {
  const { t } = useTranslation();
  const loginStatus = useSelector(loginStatusSelector);

  if (!loginStatus) {
    return <Navigate replace to={SIGNIN} />;
  } else {
    return (
      <StyledContainer cid="requisition-lists">
        <TitleLayout title={t("RequisitionLists.Title")} cid="requisition-lists-title" />
        <StyledGrid container spacing={2}>
          <StyledGrid item xs={12} md={3} className="sidebar">
            <AccountSidebar />
          </StyledGrid>
          <StyledGrid item xs={12} md={9}>
            <StyledGrid container spacing={2}>
              <StyledGrid item xs>
                <CreateRequisitionList />
              </StyledGrid>
              <StyledGrid item xs>
                <UploadRequisitionList />
              </StyledGrid>
              <StyledGrid item xs={12}>
                <RequisitionListsTable />
              </StyledGrid>
            </StyledGrid>
          </StyledGrid>
        </StyledGrid>
      </StyledContainer>
    );
  }
};

export default withCustomTableContext(RequisitionLists);
