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
import Avatar from "@material-ui/core/Avatar";

const StyledAvatar = styled(({ ...props }) => <Avatar {...props} />)`
  ${({ theme }) => `
  `}
`;

export default StyledAvatar;
