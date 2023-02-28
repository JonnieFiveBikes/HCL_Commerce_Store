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
import { useCreateRequisitionList } from "../../../_foundation/hooks/use-create-requisition-lists";
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
  StyledFormHelperText,
  useCustomTable,
} from "@hcl-commerce-store-sdk/react-component";
import Add from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Divider } from "@mui/material";

/**
 * Create new Requisition List widget for Requisition Lists
 *
 * @returns create Requisition List widget
 */
const CreateRequisitionList: React.FC = () => {
  const { pageSize } = useCustomTable();
  const { t } = useTranslation();
  const {
    requisitionListName,
    requisitionListType,
    dirty,
    handleRequisitionListName,
    handleRequisitionListType,
    createRequisitionList,
    isValidRequisitionListName,
  } = useCreateRequisitionList();
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };
  const clickCreateList = () => {
    createRequisitionList(pageSize);
    toggleExpand();
  };
  return (
    <StyledAccordion testId={`create-requisition-list`} expanded={isExpanded} onClick={toggleExpand}>
      <StyledAccordionSummary
        className="horizontal-padding-2 vertical-padding-2 rl-cr8-acrdn"
        expandIcon={<ExpandMoreIcon />}>
        <StyledIconLabel
          icon={<Add color="primary" className="full-center" />}
          label={t("RequisitionLists.CreateNewRequisitionList")}
        />
      </StyledAccordionSummary>
      <Divider className="bottom-margin-3" />
      <StyledAccordionDetails data-testid="create-requisition-lists-accordion-details" onClick={toggleExpand}>
        <StyledGrid container item spacing={1}>
          <StyledGrid item xs={12}>
            <StyledFormHelperText>
              <StyledTypography variant="body2" component="span">
                <b> {t("RequisitionLists.NewRequisitionName")}</b>
              </StyledTypography>
            </StyledFormHelperText>
            <StyledTextField
              required
              id="listName"
              name="listName"
              value={requisitionListName}
              inputProps={{ maxLength: 128 }}
              autoComplete="requisitionListName"
              placeholder="Requisition List Name"
              onChange={(event) => handleRequisitionListName(event)}
              error={dirty && !isValidRequisitionListName(requisitionListName)}
              helperText={
                dirty && !isValidRequisitionListName(requisitionListName)
                  ? t("RequisitionLists.InvalidListName")
                  : EMPTY_STRING
              }
            />
          </StyledGrid>
          <StyledGrid item xs={12}>
            <StyledFormControl component="fieldset">
              <StyledFormHelperText>
                <StyledTypography variant="body2" component="span">
                  <b> {t("RequisitionLists.Visibility")}</b>
                </StyledTypography>
              </StyledFormHelperText>
              <StyledRadioGroup
                row
                name="listType"
                value={requisitionListType}
                onChange={(event) => handleRequisitionListType(event)}>
                <StyledFormControlLabel
                  value={PRIVATE_ORDER}
                  control={<StyledRadio />}
                  label={<StyledTypography variant="body2">{t("RequisitionLists.PrivateList")}</StyledTypography>}
                />
                <StyledFormControlLabel
                  value={SHARED_ORDER}
                  control={<StyledRadio />}
                  label={<StyledTypography variant="body2">{t("RequisitionLists.SharedList")}</StyledTypography>}
                />
              </StyledRadioGroup>
            </StyledFormControl>
          </StyledGrid>
          <StyledGrid item xs={12}>
            <StyledButton
              testId="requisition-list-create"
              size="small"
              color="primary"
              onClick={clickCreateList}
              disabled={!isValidRequisitionListName(requisitionListName)}>
              {t("RequisitionLists.CreateList")}
            </StyledButton>
          </StyledGrid>
        </StyledGrid>
      </StyledAccordionDetails>
    </StyledAccordion>
  );
};

export default CreateRequisitionList;
