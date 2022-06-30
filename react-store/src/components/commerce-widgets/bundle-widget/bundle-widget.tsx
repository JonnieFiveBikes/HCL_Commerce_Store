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

//Foundation
import { withBundleWidget } from "./hooks/use-bundle";
import { BundleWidget, withCustomTableContext } from "@hcl-commerce-store-sdk/react-component";
import { WidgetProps } from "../../../_foundation/constants/seo-config";

const garnish =
  (Component: React.ComponentType<any>): React.FC<WidgetProps> =>
  ({ widget, page, ...props }) => {
    // Garnish product-ized component with custom-table context
    const WithCTCtx = withCustomTableContext(Component);
    return <WithCTCtx {...{ widget, page, hasCTCtx: true, ...props }} />;
  };
export default garnish(withBundleWidget(BundleWidget));
