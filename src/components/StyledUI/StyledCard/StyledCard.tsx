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
import styled from "styled-components";
import Card from "@material-ui/core/Card";

const StyledCard = styled(({ ...props }) => <Card {...props} />)`
  ${({ theme }) => `
    .MuiTypography-body2 {
      width: 66%;
      margin: 0 auto;
    }
  `}
`;

export default StyledCard;
