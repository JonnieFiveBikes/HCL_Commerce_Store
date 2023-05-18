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
//Standard libraries
import React, { lazy, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import getDisplayName from "react-display-name";

//HCL SDK
import { PageLayoutProps } from "@hcl-commerce-store-sdk/react-component";
//custom libraries
import { CATEGORY_DISPLAY } from "../../constants/marketing";
import { PRODUCT_DISPLAY } from "../../constants/marketing";
//Redux
import { TRIGGER_MARKETING_ACTION } from "../../redux/actions/marketingEvent";
//Foundation
import { LayoutProps, Widget } from "../constants/seo-config";
import { PAGE_TYPE } from "../constants/common";
import AsyncCall from "../gtm/async.service";
import { useSite } from "./useSite";
import { SLOTID } from "../../constants/common";
import { PreviewWidgetInfoFrame } from "../preview/widget";

interface UseLayoutProps extends LayoutProps {
  WrappedComponent: React.ComponentType<PageLayoutProps>;
}

const useLayout = ({ page, slots, WrappedComponent, ...props }: UseLayoutProps) => {
  const widgetName = getDisplayName(WrappedComponent);
  const dispatch = useDispatch();

  const { mySite } = useSite();
  const DM_ReqCmd = page.tokenName === "CategoryToken" ? CATEGORY_DISPLAY : PRODUCT_DISPLAY;
  let mktParam: any;
  switch (page.tokenName) {
    case "CategoryToken":
      mktParam = {
        categoryId: page.tokenValue,
        DM_ReqCmd: DM_ReqCmd,
        widget: widgetName,
      };
      break;
    case "ProductToken":
      mktParam = {
        productId: page.tokenValue,
        DM_ReqCmd: DM_ReqCmd,
        widget: widgetName,
      };
  }

  const slotsObj = useMemo(() => {
    const getSlot = (array: any[], id: string) => {
      return array.find((o) => o[SLOTID] === id) || {};
    };

    const getSlotWidgets = (slotId: string) => {
      const widgets = getSlot(slots, slotId).widgets || [];
      return widgets.map((widget: Widget) => {
        const Widget = lazy(() => import(`../../components/commerce-widgets/${widget.widgetName}`));
        return {
          key: `slot-${slotId}-${widget.id}`,
          CurrentComponent: () => {
            return (
              <PreviewWidgetInfoFrame widget={{ ...widget, dataId: page?.externalContext?.identifier || "" }}>
                <Widget {...{ widget, page }} cid={widget.id} />
              </PreviewWidgetInfoFrame>
            );
          },
        };
      });
    };

    const slotsObjects = slots?.reduce((a, c) => {
      a[c[SLOTID]] = getSlotWidgets(c[SLOTID]);
      return a;
    }, {});

    let Widget: any;
    switch (page.externalContext.identifier) {
      case "CartPage":
        Widget = lazy(() => import("../../components/widgets/cart/cart-widget"));
        break;
      case "CheckOutPage":
        Widget = lazy(() => import("../../components/pages/checkout/Checkout"));
        break;
      case "OrderConfirmationPage":
        Widget = lazy(() => import("../../components/pages/order-confirmation/OrderConfirmation"));
        break;
      default:
        Widget = null;
    }
    if (Widget) {
      const arr: Array<any> = [];
      const obj = {
        key: "slot-builtIn",
        CurrentComponent: () => {
          return <Widget {...props} />;
        },
      };
      arr.push(obj);
      return Object.assign({ ...slotsObjects }, { builtIn: arr });
    }
    return slotsObjects;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slots, page]);

  useEffect(() => {
    if (mktParam) {
      dispatch(TRIGGER_MARKETING_ACTION(mktParam));
    }
    //GA360
    if (page.type === PAGE_TYPE.HOME_PAGE || page.externalContext.identifier === PAGE_TYPE.HOME_PAGE) {
      if (mySite.enableGA) {
        AsyncCall.measureHomePageView({}, { enableUA: mySite.enableUA, enableGA4: mySite.enableGA4 });
      }
    } else if (page.type === PAGE_TYPE.CATEGORY_PAGE) {
      if (mySite.enableGA) {
        AsyncCall.sendContentPageViewEvent(page.externalContext.identifier, {
          enableUA: mySite.enableUA,
          enableGA4: mySite.enableGA4,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    slotsObj,
  };
};
/**
 * A high order component that wraps a component needs processed page and slots data.
 * @param WrappedComponent the wrapped component.
 * @returns A component that has ability to process slots data.
 */
export const withLayout =
  (WrappedComponent: React.ComponentType<PageLayoutProps>): React.FC<LayoutProps> =>
  ({ page, slots, ...props }) => {
    const { slotsObj } = useLayout({ page, slots, WrappedComponent, ...props });
    return <WrappedComponent cid={page.externalContext.identifier} slots={slotsObj} {...props} />;
  };
