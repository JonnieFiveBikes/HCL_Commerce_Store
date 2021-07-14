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
import { CategoryRecommendationWidget } from "@hcl-commerce-store-sdk/react-component";
//foundation
import { withESpotContext } from "../../_foundation/context/espot-context";
import { withUseESpot } from "../../_foundation/hooks/use-espot";

export default withESpotContext(withUseESpot(CategoryRecommendationWidget));
