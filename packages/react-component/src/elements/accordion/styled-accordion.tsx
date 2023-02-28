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
import React from "react";
import styled from "@mui/styled-engine-sc";
import Accordion, { AccordionProps } from "@mui/material/Accordion";

interface StyledAccordionProps extends AccordionProps {
  testId: string;
}

const StyledAccordionWrapper = styled((props: any) => <Accordion {...props} />)`
  ${({ theme }) => `
    &.MuiAccordion-root.Mui-expanded {
      margin: 0;

      &:before {
        opacity: 1;
      }
      &.shipment-group {
        margin: ${theme.spacing(2)} 0;
        border-radius: ${theme.shape.borderRadius}px;
        border: 1px solid  ${theme.palette.divider};
      }
    }
    &.shipment-group {
      margin: ${theme.spacing(2)} 0;
      border-radius: ${theme.shape.borderRadius}px;
      border: 1px solid  ${theme.palette.divider};
    }
  `}
`;

const StyledAccordion: React.FC<StyledAccordionProps> = ({ testId, ...props }) => {
  return <StyledAccordionWrapper data-testid={testId} {...props} />;
};

export { StyledAccordion };
