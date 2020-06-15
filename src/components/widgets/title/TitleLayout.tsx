/**
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020
 *
 *==================================================
 */
//Standard libraries
import React from "react";

const TitleLayout = (props: any) => {
  const { Title: title, cid } = props;
  return <h2 id={cid}>{title}</h2>;
};

export { TitleLayout };
