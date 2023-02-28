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
import React, { Fragment, useCallback, useState } from "react";
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
import { Divider } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
  detailsClass?: string;
}

const OrderDetailSubsection: React.FC<OrderDetailSubSectionProps> = (props) => {
  const { heading, details, actions, detailsClass } = props;
  const detailsArray = Array.isArray(details) ? details : [details];
  const [isExpanded, setIsExpended] = useState<boolean>(true);
  const onChange = useCallback((_event: React.SyntheticEvent, expanded: boolean) => {
    setIsExpended(expanded);
  }, []);
  const { t } = useTranslation();
  return (
    <StyledPaper>
      <StyledAccordion testId={`order-shipping-details-group`} defaultExpanded={true} onChange={onChange}>
        <StyledAccordionSummary
          expandIcon={
            <>
              {isExpanded ? null : (
                <StyledButton
                  testId="order-shipping-info-show-group-details"
                  variant="text"
                  color="secondary"
                  size="small"
                  component="div"
                  className="horizontal-padding-1">
                  <StyledTypography variant="body1">{t("OrderShippingInfo.Labels.ShowGroupDetails")}</StyledTypography>
                </StyledButton>
              )}
              <ExpandMoreIcon />
              {isExpanded ? (
                <StyledButton
                  testId="order-shipping-info-hide-group-details"
                  variant="text"
                  color="primary"
                  size="small"
                  component="div"
                  className="accordion-show-expanded horizontal-padding-1">
                  <StyledTypography variant="body1">{t("OrderShippingInfo.Labels.HideGroupDetails")}</StyledTypography>
                </StyledButton>
              ) : null}
            </>
          }>
          {heading && <StyledContainer className="vertical-margin-2">{heading}</StyledContainer>}
        </StyledAccordionSummary>
        <Divider />
        <StyledAccordionDetails className={detailsClass}>
          {detailsArray?.map((detail: any, index: number) => (
            <Fragment key={index}>
              <StyledContainer className="vertical-margin-2">{detail}</StyledContainer>
              {index + 1 !== detailsArray.length && <Divider />}
            </Fragment>
          ))}
        </StyledAccordionDetails>
      </StyledAccordion>
      {actions && (
        <>
          <Divider />
          <StyledContainer className="vertical-margin-2">{actions}</StyledContainer>
        </>
      )}
    </StyledPaper>
  );
};

export default OrderDetailSubsection;
