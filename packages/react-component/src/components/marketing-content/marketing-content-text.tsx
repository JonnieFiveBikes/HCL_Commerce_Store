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
import HTMLReactParser from "html-react-parser";
import { replaceDx } from "./content-helper";

type MarketingContentTextProps = {
  content: string;
};

/**
 * The component to handle marketing string content either pure text or HTML string content.
 * For props' type definition @see {@link MarketingContentTextProps}
 * @param props an object contains a string property `content`
 */
export const MarketingContentText: React.FC<MarketingContentTextProps> = ({ content }) => {
  return <div>{HTMLReactParser(content, { replace: replaceDx })}</div>;
};
