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
import Popper from "@material-ui/core/Popper";
import React from "react";

const mods = {
  flip: {
    enabled: false,
  },
  preventOverflow: {
    enabled: false,
    boundariesElement: "scrollParent",
  },
  hide: {
    enabled: true,
  },
};

const CustomPopper = React.forwardRef((props: any, ref: any) => {
  const { modifiers, ...rest } = props;
  return <Popper {...rest} modifiers={{ ...mods, ...(modifiers || {}) }} ref={ref} />;
});

const StyledPopper = styled(CustomPopper)`
  ${({ theme }) => `

    `}
`;

export { StyledPopper };
