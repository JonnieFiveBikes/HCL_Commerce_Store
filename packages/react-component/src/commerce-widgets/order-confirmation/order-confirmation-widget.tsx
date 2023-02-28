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

//Foundation Libraries

//UI
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { StyledContainer, StyledGrid, StyledIcon, StyledPaper, StyledTypography } from "../../elements";

interface OrderConfirmationProps {
  isOrderSubmitted: boolean;
  isOrderApproved: boolean;
  isOrderPending: boolean;
  ORDERCONFIRMATION_TITLE: string;
  ORDER_CONFIRMATION_HEADING: string;
  ORDER_CONFIRMATION_PENDING_MSG: string;
  ORDER_NUMBER_MSG: string;
  EMAIL_CONFIMRATION_MSG: string;
  PENDING_DETAILS_MSG: string;
  THANK_YOU_MSG: string;
}

/**
 * Order confirmation widget.
 * For props definition, @see {@link OrderConfirmationProps}.
 * @param props The props for order confirmation widget.
 */
export const OrderConfirmationWidget: React.FC<any> = (props: OrderConfirmationProps) => {
  const {
    isOrderSubmitted,
    isOrderApproved,
    isOrderPending,
    ORDERCONFIRMATION_TITLE,
    ORDER_CONFIRMATION_HEADING,
    ORDER_CONFIRMATION_PENDING_MSG,
    ORDER_NUMBER_MSG,
    EMAIL_CONFIMRATION_MSG,
    PENDING_DETAILS_MSG,
    THANK_YOU_MSG,
  } = props;

  return (
    <StyledContainer className="page">
      <StyledTypography tabIndex="0" variant="h4" className="vertical-margin-4">
        {ORDERCONFIRMATION_TITLE}
      </StyledTypography>
      <StyledPaper>
        <StyledGrid container direction="column" alignItems="center" className="vertical-margin-15">
          {(isOrderSubmitted || isOrderApproved) && (
            <StyledGrid item>
              <StyledIcon icon={<CheckCircleIcon style={{ fontSize: 75 }} />} iconSize={40} backgroundSize={40} />
            </StyledGrid>
          )}
          <StyledGrid item>
            <StyledTypography variant="h3" align="center" gutterBottom>
              {(isOrderSubmitted || isOrderApproved) && ORDER_CONFIRMATION_HEADING}
              {isOrderPending && ORDER_CONFIRMATION_PENDING_MSG}
            </StyledTypography>
            <StyledTypography variant="h6" align="center" gutterBottom>
              {ORDER_NUMBER_MSG}
            </StyledTypography>
            <StyledTypography variant="body1" align="center" gutterBottom>
              {(isOrderSubmitted || isOrderApproved) && EMAIL_CONFIMRATION_MSG}
              {isOrderPending && PENDING_DETAILS_MSG}
            </StyledTypography>
            <StyledTypography variant="body1" align="center">
              {THANK_YOU_MSG}
            </StyledTypography>
          </StyledGrid>
        </StyledGrid>
      </StyledPaper>
    </StyledContainer>
  );
};
