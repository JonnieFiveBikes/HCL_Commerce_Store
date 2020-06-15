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
import ListItem from "@material-ui/core/ListItem";

const CustomListItem = (props: any) => <ListItem {...props} />;
//const CustomListItem = (props: any) => <ListItem {...props} button={false} />;

const StyledListItem = styled(CustomListItem)`
  ${({ theme }) => `
  `}
`;

export default StyledListItem;
