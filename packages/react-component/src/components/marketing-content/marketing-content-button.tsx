/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *==================================================
 */
//standard libraries
import React from "react";
//local
import { StyledButton } from "../../elements";

type MarketingContentButtonProps = {
  /**
   * The appearance of the button.
   */
  appearance?: string;
  /**
   * The target url that button-click will be redirecting to.
   */
  url?: string;
  /**
   * The text of the button.
   */
  text?: string;
};

/**
 * The button component for Marketing content.
 * For props definition @see {@link MarketingContentButtonProps}.
 *
 * @param props the `MarketingContentButtonProps`
 *
 */
const MarketingContentButton: React.FC<MarketingContentButtonProps> = ({ appearance, url, text }) => {
  if (appearance !== "area" && url && text) {
    const aprn = appearance as "default" | "inherit" | "primary" | "secondary" | undefined;
    return (
      <StyledButton testId={url} color={aprn} href={url}>
        {text}
      </StyledButton>
    );
  } else {
    return null;
  }
};

export { MarketingContentButton };
