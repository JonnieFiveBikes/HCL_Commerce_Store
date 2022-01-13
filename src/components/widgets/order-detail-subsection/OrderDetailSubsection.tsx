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
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";

//UI
import {
  StyledPaper,
  StyledContainer,
  StyledAccordion,
  StyledAccordionSummary,
  StyledAccordionDetails,
  StyledTypography,
  StyledButton,
} from "@hcl-commerce-store-sdk/react-component";
import { Divider } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

interface OrderDetailSubSectionProps {
  /**
   * The heading eleemtns to display in heading area
   */
  heading?: any;
  /**
   * The action elements/buttons to display in action area.
   */
  actions?: any;
  /**
   * The elements to be rendered in details section.
   */
  details: any;
}

const OrderDetailSubsection: React.FC<OrderDetailSubSectionProps> = (props) => {
  const { heading, details, actions } = props;
  const detailsArray = Array.isArray(details) ? details : [details];
  const { t } = useTranslation();
  return (
    <StyledPaper>
      <StyledAccordion defaultExpanded={true}>
        <StyledAccordionSummary
          expandIcon={
            <>
              <StyledButton
                variant="text"
                color="secondary"
                size="small"
                component="div"
                className="accordion-show-summary horizontal-padding-1">
                <StyledTypography variant="body1">
                  {t("OrderShippingInfo.Labels.ShowGroupDetails")}
                </StyledTypography>
              </StyledButton>
              <ExpandMoreIcon />
              <StyledButton
                variant="text"
                color="primary"
                size="small"
                component="div"
                className="accordion-show-expanded horizontal-padding-1">
                <StyledTypography variant="body1">
                  {t("OrderShippingInfo.Labels.HideGroupDetails")}
                </StyledTypography>
              </StyledButton>
            </>
          }>
          {heading && (
            <StyledContainer className="vertical-margin-2">
              {heading}
            </StyledContainer>
          )}
        </StyledAccordionSummary>
        <Divider />
        <StyledAccordionDetails>
          {detailsArray?.map((detail: any, index: number) => (
            <Fragment key={index}>
              <StyledContainer className="vertical-margin-2">
                {detail}
              </StyledContainer>
              {index + 1 !== detailsArray.length && <Divider />}
            </Fragment>
          ))}
        </StyledAccordionDetails>
      </StyledAccordion>
      {actions && (
        <>
          <Divider />
          <StyledContainer className="vertical-margin-2">
            {actions}
          </StyledContainer>
        </>
      )}
    </StyledPaper>
  );
};

export default OrderDetailSubsection;
