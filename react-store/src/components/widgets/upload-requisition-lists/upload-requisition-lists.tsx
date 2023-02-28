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
import { useUploadReqisitionList } from "../../../_foundation/hooks/use-upload-requisition-lists";
import { EMPTY_STRING } from "../../../constants/common";
import addressUtil from "../../../utils/addressUtil";
//Foundation
import { localStorageUtil } from "../../../_foundation/utils/storageUtil";
import { LOCALE } from "../../../_foundation/constants/common";
//UI
import {
  StyledGrid,
  StyledIconLabel,
  StyledAccordion,
  StyledAccordionSummary,
  StyledAccordionDetails,
  StyledButton,
  StyledLink,
  StyledFormHelperText,
  StyledTypography,
  StyledTextField,
} from "@hcl-commerce-store-sdk/react-component";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Divider } from "@mui/material";

/**
 * Create new order widget for inprogress orders
 *
 * @returns create inprogress order widget
 */
const UploadRequisitionList: React.FC = () => {
  const { t } = useTranslation();
  const locale = localStorageUtil.get(LOCALE) ?? "en_US";
  const {
    uploadList,
    uploadFileRef,
    requisitionListName,
    handleRequisitionListName,
    file,
    onFileSelect,
    canCreateList,
  } = useUploadReqisitionList();
  const browseClickHandler = () => uploadFileRef.current.click();
  return (
    <StyledAccordion testId={`upload-requisition-list`}>
      <StyledAccordionSummary
        className="horizontal-padding-2 vertical-padding-2 rl-upload-acrdn"
        expandIcon={<ExpandMoreIcon />}>
        <StyledIconLabel
          icon={<CloudUploadIcon color="primary" className="full-center" />}
          label={t("RequisitionLists.UploadRequisitionList")}
        />
      </StyledAccordionSummary>
      <Divider className="bottom-margin-3" />
      <StyledAccordionDetails>
        <StyledGrid container item spacing={2} direction="row" alignItems="flex-start">
          <StyledGrid item xs={12} md={3}>
            <StyledButton testId="requisition-list-browse" size="small" color="secondary" onClick={browseClickHandler}>
              {t("RequisitionLists.Browse")}
            </StyledButton>
            <input
              ref={uploadFileRef}
              name="UpLoadedFile"
              onChange={onFileSelect}
              accept="application/csv,text/csv"
              type="file"
              hidden
            />
          </StyledGrid>
          <StyledGrid item xs={12} md={9}>
            <StyledTypography variant="caption">{t("RequisitionLists.SelectedFile")}</StyledTypography>
            <StyledTypography variant="caption" className="wrapText">
              {file?.name ? file.name : EMPTY_STRING}
            </StyledTypography>
          </StyledGrid>
          <StyledGrid item xs={12}>
            <StyledLink
              to={`/widget_add_requisition_lists/${locale}/file_upload_instructions.pdf`}
              target="_blank"
              download>
              {t("RequisitionLists.DownloadInstructionsWithAnExample")}
            </StyledLink>
          </StyledGrid>
          <StyledGrid item xs={12}>
            <StyledFormHelperText>
              <StyledTypography variant="body2" component="span">
                <b> {t("RequisitionLists.NewRequisitionName")}</b>
              </StyledTypography>
            </StyledFormHelperText>
            <StyledTextField
              required
              id="requisitionListName"
              name="requisitionListName"
              value={requisitionListName}
              inputProps={{ maxLength: 128 }}
              autoComplete="requisitionListName"
              placeholder={t("RequisitionLists.NewRequisitionName")}
              onChange={handleRequisitionListName}
              error={!addressUtil.validateNickName(requisitionListName)}
              helperText={
                !addressUtil.validateNickName(requisitionListName)
                  ? t("RequisitionLists.InvalidListName")
                  : EMPTY_STRING
              }
            />
          </StyledGrid>
          <StyledGrid item xs={12}>
            <StyledButton
              testId="requisition-list-create-on-upload"
              size="small"
              color="primary"
              onClick={uploadList}
              disabled={!canCreateList()}>
              {t("RequisitionLists.CreateList")}
            </StyledButton>
          </StyledGrid>
        </StyledGrid>
      </StyledAccordionDetails>
    </StyledAccordion>
  );
};

export default UploadRequisitionList;
