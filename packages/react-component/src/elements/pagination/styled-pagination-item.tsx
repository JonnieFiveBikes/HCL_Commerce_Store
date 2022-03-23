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
import PaginationItem from "@material-ui/lab/PaginationItem";

/**
 * Styled component on @material-ui
 * @see https://material-ui.com/api/pagination-item/
 */
const StyledPaginationItem = styled(({ ...props }) => <PaginationItem {...props} />)`
  && {
  }
`;

export { StyledPaginationItem };
