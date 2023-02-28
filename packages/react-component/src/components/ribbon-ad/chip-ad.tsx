/*
 ***************************************************
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2022
 *
 ***************************************************
 */

import styled from "@mui/styled-engine-sc";
import { StyledChip } from "../../elements/chip";

const ChipAd = styled(({ identifier, value: label, className: c = "", ...props }) => {
  const className = `${c} ${identifier.replace(/(\w)(\S+)/g, (m, s0, s1) => `${s0.toUpperCase()}${s1.toLowerCase()}`)}`;
  return <StyledChip {...{ label, className, ...props }} />;
})`
  ${({ theme }) => `
    color: ${theme.palette.common.white};
    background: ${theme.palette.primary.dark};
    font-weight: 600;
    margin-right: 8px;
    margin-bottom: 8px;

    &.New,
    &.Sale,
    &.Exclusive {
      background: #c10c0d;
    }

    > span.MuiChip-label {
      padding-top: 2px;
    }
  `}
`;

export { ChipAd };
