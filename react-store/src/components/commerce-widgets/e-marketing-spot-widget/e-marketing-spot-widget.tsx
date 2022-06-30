/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020,2021
 *
 *==================================================
 */
//store-packages
import { EMarketingSpotWidget } from "@hcl-commerce-store-sdk/react-component";
//foundation
import { withESpotContext } from "./hooks/espot-context";
import { withUseESpot } from "./hooks/use-espot";

export default withESpotContext(withUseESpot(EMarketingSpotWidget));
