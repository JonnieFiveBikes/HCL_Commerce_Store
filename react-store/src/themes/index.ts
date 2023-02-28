/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020, 2021
 *
 *==================================================
 */
import { emeraldTheme as Emerald, sapphireTheme as Sapphire } from "@hcl-commerce-store-sdk/react-component";
const themes = { Emerald, Sapphire };
const CurrentTheme = themes[process.env.REACT_APP_STORENAME || "Emerald"] ?? Emerald;
export { CurrentTheme };
