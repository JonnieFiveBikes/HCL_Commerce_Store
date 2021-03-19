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

const mods = {};

const CustomPopper = React.forwardRef((props: any, ref: any) => (
  <Popper {...props} modifiers={mods} ref={ref} />
));

const StyledPopper = styled(CustomPopper)`
  ${({ theme }) => `

    `}
`;

export default StyledPopper;
