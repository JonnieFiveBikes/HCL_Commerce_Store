/*
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
import { StyledButton } from "../../StyledUI";
import { EMPTY_STRING } from "../../../constants/common";

const MarketingContentButton = ({ appearance, url, text }) => {
  const publicUrlPath = process.env.PUBLIC_URL
    ? process.env.PUBLIC_URL
    : EMPTY_STRING;

  if (
    appearance !== "area" &&
    url !== EMPTY_STRING &&
    text !== EMPTY_STRING &&
    url !== publicUrlPath
  ) {
    return (
      <StyledButton color={appearance} href={url}>
        {text}
      </StyledButton>
    );
  } else {
    return null;
  }
};

export default MarketingContentButton;
