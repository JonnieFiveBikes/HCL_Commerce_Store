/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2022
 *
 *==================================================
 */

//Foundation
import { KitWidget, withCustomTableContext } from "@hcl-commerce-store-sdk/react-component";
import { WidgetProps } from "../../../_foundation/constants/seo-config";
import { withKitWidget } from "./hooks/use-kit";

const garnish =
  (Component: React.ComponentType<any>): React.FC<WidgetProps> =>
  ({ widget, page, ...props }) => {
    // Garnish product-ized component with custom-table context
    const WithCTCtx = withCustomTableContext(Component);
    return <WithCTCtx {...{ widget, page, hasCTCtx: true, ...props }} />;
  };
export default garnish(withKitWidget(KitWidget));
