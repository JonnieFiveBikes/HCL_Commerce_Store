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
import ListItem from "@mui/material/ListItem";

const CustomListItem = (props: any) => <ListItem {...props} />;
//const CustomListItem = (props: any) => <ListItem {...props} button={false} />;

const StyledListItem = styled(CustomListItem)`
  ${({ theme }) => `
  `}
`;

export { StyledListItem };
