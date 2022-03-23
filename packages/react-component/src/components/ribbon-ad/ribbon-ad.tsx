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

import { Exclusive } from "./exclusive";
import { Fallback } from "./fallback";
import { Sale } from "./sale";
import { New } from "./new";

export const RibbonAd = ({ className = "", scale = 1, identifier, value, idx }) => {
  const key = identifier.replace(/(\w)(\S+)/g, (m, s0, s1) => `${s0.toUpperCase()}${s1.toLowerCase()}`);
  const knownRibbons = {
    Exclusive,
    Sale,
    New,
  };
  const Ribbon = knownRibbons[key] ?? Fallback;
  return <Ribbon {...{ className: `${className} ribbon-ad`, scale, identifier, value, idx }} />;
};
