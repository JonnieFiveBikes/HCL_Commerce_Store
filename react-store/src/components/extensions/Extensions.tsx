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

//Standard libraries
import React from "react";
//Custom libraries
import { APIDiagram } from "../../_dev/api-diagram";
/**
 * Extensions
 * Displays any extensions for development use.
 * This file will be overwritten during production build by the template under
 * assets\template\production\src\components\extensions.
 * @param props
 */
const Extensions: React.FC = (props: any) => {
  return <APIDiagram />;
};

export default Extensions;
