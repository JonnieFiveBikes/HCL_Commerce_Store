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
import HTMLReactParser from "html-react-parser";

const MarketingContentText = ({ content }) => {
  return <div>{HTMLReactParser(content)}</div>;
};

export default MarketingContentText;
