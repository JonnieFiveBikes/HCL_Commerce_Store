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
import styled from "styled-components";

const StyledIcon = styled.div`
  ${({ theme }) => `
  .MuiSvgIcon-fontSizeLarge{
    font-size: ${theme.spacing(13)}px;
  }
`}
`;

export default StyledIcon;
