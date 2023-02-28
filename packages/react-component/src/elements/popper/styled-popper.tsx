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
import styled from "@mui/styled-engine-sc";
import Popper from "@mui/material/Popper";
import React from "react";

const mods = [
  { name: "flip", enabled: false },
  { name: "preventOverflow", enabled: false },
  { name: "hide", enabled: true },
];

const CustomPopper = React.forwardRef((props: any, ref: any) => {
  const { modifiers = [], ...rest } = props;
  const _modifiers = [
    ...mods
      .concat(modifiers)
      .reduce((m, o) => m.set(o.name, Object.assign(m.get(o.name) || {}, o)), new Map())
      .values(),
  ];
  return <Popper {...rest} modifiers={_modifiers} ref={ref} />;
});

const StyledPopper = styled(CustomPopper)`
  ${({ theme }) => `

    `}
`;

export { StyledPopper };
