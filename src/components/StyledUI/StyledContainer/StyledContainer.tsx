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
import Container from "@material-ui/core/Container";

const CustomContainer = (props: any) => <Container {...props} maxWidth="lg" />;

const StyledContainer = styled(CustomContainer)`
  ${({ theme }) => `
  `}
`;

export default StyledContainer;
