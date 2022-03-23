/*
 ***************************************************
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2022
 *
 ***************************************************
 */

import { Fallback } from "./fallback";

export const Exclusive = ({ className: c = "", ...props }) => {
  const className = `Exclusive ${c}`;
  return <Fallback {...({ ...props, className } as any)} />;
};
