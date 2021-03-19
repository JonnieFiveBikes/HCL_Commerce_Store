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

//Standard libraries
//UA
import UADataService from "./ua/uaData.service";
import GTMDLService from "./ua/gtmDataLayer.service";
//GA4
import GA4DataService from "./ga4/ga4Data.service";
import GA4GTMDLService from "./ga4/gtmDataLayer.service";

const AsyncCall = {
  measureHomePageView(page, { enableUA, enableGA4 }) {
    if (enableUA) {
      UADataService.sendHomePageViewEvent(page)
        .then((obj) => {
          GTMDLService.measurePageView(obj);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  sendSearchPageViewEvent(
    { productListTotal, searchTerm },
    { enableUA, enableGA4 }
  ) {
    if (enableUA) {
      UADataService.sendSearchPageViewEvent(productListTotal, searchTerm)
        .then((obj) => {
          GTMDLService.measureKeywordSearch(obj);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  sendListerPageViewEvent(
    { productListTotal, breadcrumb },
    { enableUA, enableGA4 }
  ) {
    if (enableUA) {
      UADataService.sendListerPageViewEvent(productListTotal, breadcrumb)
        .then((obj) => {
          GTMDLService.measurePageView(obj);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  sendPDPPageViewEvent(breadcrumbs, { enableUA, enableGA4 }) {
    if (enableUA) {
      UADataService.sendPDPPageViewEvent(breadcrumbs)
        .then((obj) => {
          GTMDLService.measurePageView(obj);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  sendCheckoutPageViewEvent(
    { pageSubCategory, pathname },
    { enableUA, enableGA4 }
  ) {
    if (enableUA) {
      UADataService.sendCheckoutPageViewEvent(pageSubCategory)
        .then((obj) => {
          GTMDLService.measurePageView(obj);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  sendContentPageViewEvent(cid, { enableUA, enableGA4 }) {
    if (enableUA) {
      UADataService.sendContentPageViewEvent(cid)
        .then((obj) => {
          GTMDLService.measurePageView(obj);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  sendNavigationClick({ eventAction, eventLabel }, { enableUA, enableGA4 }) {
    if (enableUA) {
      UADataService.NavigationClick(eventAction, eventLabel)
        .then((obj) => {
          const { eventAction, eventLabel } = obj;
          GTMDLService.measureNavigationClick(eventAction, eventLabel);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  sendFormCompletionEvent(eventAction, { enableUA, enableGA4 }) {
    if (enableUA) {
      UADataService.sendFormCompletionEvent(eventAction)
        .then((obj) => {
          GTMDLService.measureFormCompletion(obj);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  sendProductImpressionEvent(
    { productList, listerFlag, breadcrumbs },
    { enableUA, enableGA4 }
  ) {
    if (enableUA) {
      UADataService.sendProductImpressionEvent(
        productList,
        listerFlag,
        breadcrumbs
      )
        .then((obj) => {
          const { productarr, currency } = obj;
          GTMDLService.measureProductImpression(productarr, currency);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (enableGA4) {
      GA4DataService.sendProductImpressionEvent(
        productList,
        listerFlag,
        breadcrumbs
      )
        .then((obj) => {
          const { productArr, currency } = obj;
          GA4GTMDLService.measureProductImpression(productArr, currency);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  sendProductClickEvent(
    { product, index, listerFlag, breadcrumbs },
    { enableUA, enableGA4 }
  ) {
    if (enableUA) {
      UADataService.sendProductClickEvent(
        product,
        index,
        listerFlag,
        breadcrumbs
      )
        .then((obj) => {
          GTMDLService.measureProductClick(obj);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (enableGA4) {
      GA4DataService.sendProductClickEvent(
        product,
        index,
        listerFlag,
        breadcrumbs
      )
        .then((obj) => {
          GA4GTMDLService.measureProductClick(obj);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  sendPDPDetailViewEvent(
    { currentProdSelect, breadcrumbs },
    { enableUA, enableGA4 }
  ) {
    if (currentProdSelect?.sku?.id || currentProdSelect?.sku?.name) {
      if (enableUA) {
        UADataService.sendPDPDetailViewEvent(currentProdSelect, breadcrumbs)
          .then((obj) => {
            GTMDLService.measureViewOfProductDetail(obj);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      if (enableGA4) {
        GA4DataService.sendPDPDetailViewEvent(currentProdSelect, breadcrumbs)
          .then((obj) => {
            GA4GTMDLService.measureViewOfProductDetail(obj);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  },
  sendB2BPDPDetailViewEvent(
    { productData, productPartNumber, breadcrumbs },
    { enableUA, enableGA4 }
  ) {
    if (enableUA) {
      UADataService.sendB2BPDPDetailViewEvent(
        productData,
        productPartNumber,
        breadcrumbs
      )
        .then((obj) => {
          GTMDLService.measureViewOfProductDetail(obj);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (enableGA4) {
      GA4DataService.sendB2BPDPDetailViewEvent(
        productData,
        productPartNumber,
        breadcrumbs
      )
        .then((obj) => {
          GA4GTMDLService.measureViewOfProductDetail(obj);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  sendPromotionImpression(promo, { enableUA, enableGA4 }) {
    if (enableUA) {
      UADataService.sendPromotionImpression(promo)
        .then((obj) => {
          GTMDLService.measurePromotionImpressions(obj);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (enableGA4) {
      GA4DataService.sendPromotionImpression(promo)
        .then((obj) => {
          GA4GTMDLService.measurePromotionImpressions(obj);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  sendPromotionClick(eSpotRoot, { enableUA, enableGA4 }) {
    if (enableUA) {
      UADataService.sendPromotionClick(eSpotRoot)
        .then((obj) => {
          GTMDLService.measurePromotionClick(obj);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (enableGA4) {
      GA4DataService.sendPromotionClick(eSpotRoot)
        .then((obj) => {
          GA4GTMDLService.measurePromotionClick(obj);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  sendAddToCartEvent(payload, { enableUA, enableGA4 }) {
    if (enableUA) {
      UADataService.sendAddToCartEvent(
        payload.currentSelection,
        payload.breadcrumbs
      )
        .then((obj) => {
          GTMDLService.measureAddToCart(obj);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (enableGA4) {
      GA4DataService.sendAddToCartEvent(
        payload.cart,
        payload.currentSelection,
        payload.breadcrumbs
      )
        .then((obj) => {
          GA4GTMDLService.measureAddToCart(obj);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  sendB2BAddToCartEvent(
    { cart, currentProdSelect, result, breadcrumbs },
    { enableUA, enableGA4 }
  ) {
    if (enableUA) {
      const p = Promise.resolve("B2B");
      p.then((v) => {
        return UADataService.sendB2BAddToCartEvent(
          currentProdSelect,
          result,
          breadcrumbs
        );
      })
        .then((obj) => {
          GTMDLService.measureAddToCart(obj);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (enableGA4) {
      const p = Promise.resolve("B2B");
      p.then((v) => {
        return GA4DataService.sendB2BAddToCartEvent(
          cart,
          currentProdSelect,
          result,
          breadcrumbs
        );
      })
        .then((obj) => {
          GA4GTMDLService.measureAddToCart(obj);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  sendRemoveFromCartEvent(item, { enableUA, enableGA4 }) {
    if (enableUA) {
      UADataService.sendRemoveFromCartEvent(item)
        .then((obj) => {
          GTMDLService.measureRemoveFromCart(obj);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (enableGA4) {
      GA4DataService.sendRemoveFromCartEvent(item)
        .then((obj) => {
          GA4GTMDLService.measureRemoveFromCart(obj);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  sendCheckoutEvent(
    { cart, orderItems, step, value },
    { enableUA, enableGA4 }
  ) {
    if (enableUA) {
      UADataService.sendCheckoutEvent(cart, orderItems, step, value)
        .then((obj) => {
          GTMDLService.measureCheckout(obj);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (enableGA4) {
      GA4DataService.sendCheckoutEvent(cart, orderItems, step, value)
        .then((obj) => {
          GA4GTMDLService.measureCheckout(obj);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  sendPurchaseEvent(purchaseObj, { enableUA, enableGA4 }) {
    //sendPurchaseEvent is an async call
    const { cart, orderItems } = purchaseObj;
    if (enableUA) {
      UADataService.sendPurchaseEvent(cart, orderItems);
    }
    if (enableGA4) {
      GA4DataService.sendPurchaseEvent(cart, orderItems);
    }
  },
  sendViewCartEvent({ cart, orderItems }, { enableUA, enableGA4 }) {
    if (enableGA4) {
      GA4DataService.sendViewCartEvent(cart, orderItems)
        .then((obj) => {
          GA4GTMDLService.measureViewCart(obj);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  sendCartPageViewEvent(page, { enableUA, enableGA4 }) {
    if (enableUA) {
      UADataService.sendCartPageViewEvent(page)
        .then((obj) => {
          GTMDLService.measurePageView(obj);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};

export default AsyncCall;
