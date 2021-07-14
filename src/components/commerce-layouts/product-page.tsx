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
//UI
import { ProductPageLayout } from "@hcl-commerce-store-sdk/react-component";
//foundation libraries
import { withLayout } from "../../_foundation/hooks/use-layout";
import { withProductContext } from "../../_foundation/context/product-context";

export default withProductContext(withLayout(ProductPageLayout));
