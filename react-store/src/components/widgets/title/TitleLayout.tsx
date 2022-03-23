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
  const title = props.title;
  const cid = props.cid;
  return (
    <h3 className="top-margin-expanded-menu" id={cid}>
      {title}
    </h3>
  );
};

export { TitleLayout };
