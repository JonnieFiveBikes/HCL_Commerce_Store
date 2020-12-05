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
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const BreadcrumbWrapper = (props: any) => (
  <Breadcrumbs {...props} separator={<NavigateNextIcon fontSize="small" />} />
);

const StyledBreadcrumbs = styled(BreadcrumbWrapper)`
  ${({ theme }) => `
    margin: ${theme.spacing(3)}px 0;

    a {
      font-weight: 500;
    }
  `}
`;

export default StyledBreadcrumbs;
