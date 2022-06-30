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
import { SkuListWidget, withCustomTableContext } from "@hcl-commerce-store-sdk/react-component";
import { WidgetProps } from "../../../_foundation/constants/seo-config";
//Foundation libraries
import { withUseProduct } from "../product-information-widget/hooks/use-product-b2b-details-layout";

/**
 * A high order component that wraps a component with b2b product information.
 * @param Component the wrapping component.
 * @returns A component that has ability to process b2b product data.
 */
const garnish =
  (Component: React.ComponentType<any>): React.FC<WidgetProps> =>
  ({ widget, page, ...props }) => {
    // Garnish product-ized component with custom-table context
    const WithCTCtx = withCustomTableContext(Component);
    return <WithCTCtx {...{ widget, page, hasCTCtx: true, ...props }} />;
  };

export default garnish(withUseProduct(SkuListWidget));
