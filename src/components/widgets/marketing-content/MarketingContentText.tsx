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
import ReactHtmlParser from "react-html-parser";

const MarketingContentText = ({ content }) => {
  return <div>{ReactHtmlParser(content)}</div>;
};

export default MarketingContentText;
