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
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const BreadcrumbWrapper = (props: any) => <Breadcrumbs {...props} separator={<NavigateNextIcon fontSize="small" />} />;

export const StyledBreadcrumbs = styled(BreadcrumbWrapper)`
  ${({ theme }) => `
    margin: ${theme.spacing(4)} 0;
  `}
`;
