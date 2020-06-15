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
import Emerald from "./emerald-theme";
import Sapphire from "./sapphire-theme";
const themes = { Emerald, Sapphire };
const CurrentTheme = themes[process.env.REACT_APP_STORENAME];
export { CurrentTheme };
