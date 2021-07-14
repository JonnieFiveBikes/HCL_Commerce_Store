/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *==================================================
 */
//HCL SDK
import { B2BProductPageLayout } from "@hcl-commerce-store-sdk/react-component";
//Foundation libraries
import { withLayout } from "../../_foundation/hooks/use-layout";
import { withProductContext } from "../../_foundation/context/product-context";

export default withProductContext(withLayout(B2BProductPageLayout));
