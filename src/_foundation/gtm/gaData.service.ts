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
import GTMDLService from "./gtmDataLayer.service";
//Foundation libraries
import { localStorageUtil } from "../utils/storageUtil";
import { CURRENT_USER } from "../constants/common";
import { OFFER, DISPLAY } from "../../constants/common";
import {
  HOME,
  ONSITE_SEARCH,
  LISTER,
  PDP,
  CHECKOUT,
  CONTENT,
} from "../constants/gtm";
//Custom libraries
import v2CategoryResourceService from "../apis/search/categories.service";

let PAGETITLE = "";
let PAGEPATH = "";

const GADataService = {
  setPageTitle(title: any) {
    PAGETITLE = title;
  },
  setPagePath(path: any) {
    PAGEPATH = path;
  },
  getUserInfoFromStore() {
    const currentUser = localStorageUtil.get(CURRENT_USER);
    if (currentUser) {
      const { userId, userLoggedIn } = currentUser;
      return {
        login: userLoggedIn ? "logged In" : "logged Out",
        userID: userId,
      };
    } else {
      return {
        login: "logged Out",
        userID: -1002,
      };
    }
  },
  getBreadCrumbsData(breadcrumbs) {
    const breadcrumbLabels = breadcrumbs.map((data) => data.label);
    const category = breadcrumbLabels
      .slice(0, breadcrumbLabels.length - 1)
      .join("/");
    const subCategory = breadcrumbLabels[breadcrumbLabels.length - 1];

    return { breadcrumbLabels, category, subCategory };
  },
  sendHomePageViewEvent() {
    const obj = {
      pageCategory: HOME,
      pageSubCategory: HOME,
      pagePath: "/",
      pageTitle: PAGETITLE,
      ...this.getUserInfoFromStore(),
    };
    GTMDLService.measurePageView(obj);
  },
  sendSearchPageViewEvent(productListTotal, searchTerm) {
    const obj = {
      pageCategory: ONSITE_SEARCH,
      onsiteSearch: productListTotal > 0 ? "Successful Search" : "Zero Search",
      searchTerm,
      productResults: productListTotal,
      pageTitle: PAGETITLE,
      pagePath: PAGEPATH + "?searchTerm=" + searchTerm,
      ...this.getUserInfoFromStore(),
    };
    GTMDLService.measurePageView(obj);
  },
  sendListerPageViewEvent(productListTotal, breadcrumbs) {
    const obj = {
      pageCategory: LISTER,
      pageSubCategory: this.getBreadCrumbsData(breadcrumbs).category,
      listerResults: productListTotal,
      pageTitle: PAGETITLE,
      pagePath: PAGEPATH,
      ...this.getUserInfoFromStore(),
    };
    GTMDLService.measurePageView(obj);
  },
  sendPDPPageViewEvent(breadcrumbs) {
    const obj = {
      pageCategory: PDP,
      pageSubCategory: this.getBreadCrumbsData(breadcrumbs).category,
      pageTitle: PAGETITLE,
      pagePath: PAGEPATH,
      ...this.getUserInfoFromStore(),
    };
    GTMDLService.measurePageView(obj);
  },
  sendCheckoutPageViewEvent(pageSubCategory, pathname) {
    const obj = {
      pageTitle: PAGETITLE,
      pagePath: pathname,
      pageCategory: CHECKOUT,
      pageSubCategory,
      ...this.getUserInfoFromStore(),
    };
    GTMDLService.measurePageView(obj);
  },
  sendContentPageViewEvent(cid) {
    const obj = {
      pageCategory: CONTENT,
      pageSubCategory: CONTENT,
      pagePath: PAGEPATH,
      pageTitle: PAGETITLE,
      ...this.getUserInfoFromStore(),
    };
    if (
      cid
        .toLowerCase()
        .localeCompare(
          obj.pagePath.substring(1).replace("-", "").toLowerCase()
        ) === 0
    )
      GTMDLService.measurePageView(obj);
  },
  sendFormCompletionEvent(eventAction) {
    GTMDLService.measureFormCompletion(eventAction);
  },
  sendProductImpressionEvent(productList, listerFlag, breadcrumbs) {
    let currency: String = "";
    const productarr = productList.map((product, index) => {
      currency = this.getProductPrice(product.price).currency;
      return {
        name: product.name,
        id: product.partNumber,
        price: this.getProductPrice(product.price).price,
        category: listerFlag
          ? this.getBreadCrumbsData(breadcrumbs).category
          : "",
        list: listerFlag
          ? this.getBreadCrumbsData(breadcrumbs).subCategory
          : "Search Results",
        position: index + 1,
      };
    });
    GTMDLService.measureProductImpression(productarr, currency);
  },
  sendProductClickEvent(product, index, listerFlag, breadcrumbs) {
    const obj = {
      id: product.partNumber,
      name: product.name,
      price: this.getProductPrice(product.price).price,
      category: listerFlag ? this.getBreadCrumbsData(breadcrumbs).category : "",
      list: listerFlag
        ? this.getBreadCrumbsData(breadcrumbs).subCategory
        : "Search Results",
    };
    GTMDLService.measureProductClick(obj);
  },
  sendPDPDetailViewEvent(currentProdSelect, breadcrumbs) {
    const breadcrumbLength = this.getBreadCrumbsData(breadcrumbs)
      .breadcrumbLabels.length;
    const { id, name, price } = currentProdSelect.sku;
    const obj = {
      id: id,
      name: name,
      price: this.getProductPrice(price).price,
      category: this.getBreadCrumbsData(breadcrumbs).category,
      variant: currentProdSelect["selectedAttributes"] || "",
      list: this.getBreadCrumbsData(breadcrumbs).breadcrumbLabels[
        breadcrumbLength - 2
      ],
    };
    GTMDLService.measureViewOfProductDetail(obj);
  },
  sendB2BPDPDetailViewEvent(productPartNumber, breadcrumbs) {
    const { breadcrumbLabels, category, subCategory } = this.getBreadCrumbsData(
      breadcrumbs
    );
    const leafCategoryForProduct =
      breadcrumbLabels[breadcrumbLabels.length - 2];
    const obj = {
      id: productPartNumber,
      name: subCategory,
      category: category,
      list: leafCategoryForProduct,
    };
    GTMDLService.measureViewOfProductDetail(obj);
  },
  sendPromotionImpression(promo) {
    if (promo.baseMarketingSpotActivityData) {
      const { contentId, contentName } = promo.baseMarketingSpotActivityData[0];
      const promoArr = [
        {
          id: contentId,
          name: contentName,
        },
      ];

      GTMDLService.measurePromotionImpressions(promoArr);
    }
  },
  sendPromotionClick(promo) {
    const { contentId, contentName } = promo.baseMarketingSpotActivityData[0];
    const promoObj = {
      id: contentId,
      name: contentName,
    };

    GTMDLService.measurePromotionClick(promoObj);
  },
  sendAddToCartEvent(currentProdSelect, breadcrumbs) {
    const { id, name, price } = currentProdSelect.sku;
    const productObj: Array<Object> = [];
    const obj = {
      id: id,
      name: name,
      price: this.getProductPrice(price).price,
      category: this.getBreadCrumbsData(breadcrumbs).category,
      variant: currentProdSelect["selectedAttributes"] || "",
      currency: this.getProductPrice(price).currency,
      quantity: currentProdSelect.quantity,
    };
    productObj.push(obj);
    GTMDLService.measureAddToCart(productObj);
  },

  sendB2BAddToCartEvent(currentProdSelect, result, breadcrumbs) {
    const { category, subCategory } = this.getBreadCrumbsData(breadcrumbs);
    const price = currentProdSelect.partNumber.price;
    const productObj: Array<Object> = [];
    result.map((element) => {
      const obj = {
        id: element.key,
        name: subCategory,
        price: this.getProductPrice(price).price,
        category: category,
        currency: this.getProductPrice(price).currency,
        quantity: element.value,
      };
      productObj.push(obj);
    });
    GTMDLService.measureAddToCart(productObj);
  },

  sendRemoveFromCartEvent(item) {
    const { partNumber, name, orderItemPrice, quantity } = item;
    const obj = {
      id: partNumber,
      name: name,
      price: parseFloat(orderItemPrice),
      quantity: parseInt(quantity),
    };
    GTMDLService.measureRemoveFromCart(obj);
  },
  sendCheckoutEvent(orderItems, step, value) {
    const productArr = orderItems.map((order) => {
      return {
        id: order.partNumber,
        name: order.name,
        price: order.orderItemPrice,
        quantity: parseInt(order.quantity),
      };
    });
    GTMDLService.measureCheckout({ step, value, productArr });
  },
  sendPurchaseEvent(cart, orderItems) {
    const {
      orderId,
      grandTotal,
      totalSalesTax,
      totalShippingTax,
      totalAdjustment,
    } = cart;
    const partNumberCatgroupMap = new Map<any, any>();
    let currency = null;
    let productArr = orderItems.map((order) => {
      let parentCatalogGroupID = order.parentCatalogGroupID;
      let arr = parentCatalogGroupID.split("/");
      currency = order.currency;
      if (arr && arr.length >= 1) {
        let catgroupID = arr[arr.length - 1];
        partNumberCatgroupMap.set(order.partNumber, catgroupID);
      }
      return {
        id: order.partNumber,
        name: order.name,
        price: order.unitPrice,
        quantity: parseInt(order.quantity),
      };
    });

    const set = new Set(Array.from(partNumberCatgroupMap.values()));
    const param = { id: Array.from(set) };

    fetchCategoriesId(param)
      .then((value) => {
        const productArrWithCategory = productArr.map((element) => {
          const partNumber = element.id;
          if (partNumberCatgroupMap.get(partNumber)) {
            const categoryId = partNumberCatgroupMap.get(partNumber);
            const categoryName = value.get(categoryId);

            if (categoryName) {
              return {
                category: categoryName,
                id: element.id,
                name: element.name,
                price: element.price,
                quantity: element.quantity,
              };
            }
          }
        });
        productArr = null;
        const obj = {
          purchaseId: orderId,
          totalcost: grandTotal,
          tax: totalSalesTax,
          shippingcost: totalShippingTax,
          discount: totalAdjustment,
          currency: currency,
          productArrWithCategory,
        };
        GTMDLService.measuringPurchases(obj);
      })
      .catch((error) => {
        console.log("Could not get category ID from search ", error);
      });
  },

  /**
   * get the product offer price and display price
   * @param priceArray
   */
  getProductPrice(priceArray) {
    let productOfferPrice = 0;
    let prodDisplayPrice = 0;
    let currency: string = "";
    if (priceArray) {
      for (const price of priceArray) {
        if (price.usage === OFFER && price.value !== "") {
          productOfferPrice = parseFloat(price.value);
          currency = price.currency;
        } else if (price.usage === DISPLAY && price.value !== "") {
          prodDisplayPrice = parseFloat(price.value);
          currency = price.currency;
        }
      }
    }
    const price =
      productOfferPrice > 0
        ? productOfferPrice
        : prodDisplayPrice > 0
        ? prodDisplayPrice
        : 0;
    return { price, currency };
  },
};

async function fetchCategoriesId(param: any) {
  const result = await v2CategoryResourceService.getV2CategoryResourcesUsingGET(
    param
  );
  const contentMap = new Map<any, any>();
  const content = result.data.contents;
  if (content) {
    content.forEach((element) => {
      contentMap.set(element.id, element.name);
    });
  }
  return contentMap;
}

export default GADataService;
