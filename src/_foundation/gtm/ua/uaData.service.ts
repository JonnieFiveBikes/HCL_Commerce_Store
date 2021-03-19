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
import { localStorageUtil } from "../../utils/storageUtil";
import { CURRENT_USER } from "../../constants/common";
import { OFFER, DISPLAY } from "../../../constants/common";
import {
  HOME,
  ONSITE_SEARCH,
  LISTER,
  PDP,
  CHECKOUT,
  CONTENT,
  CART,
} from "../../constants/gtm";
//Custom libraries
import v2CategoryResourceService from "../../apis/search/categories.service";

let PAGETITLE = "";

const UADataService = {
  setPageTitle(title: any) {
    PAGETITLE = title;
  },
  getPagePath() {
    const locationPath = window.location.pathname;
    return locationPath === "/"
      ? locationPath
      : locationPath.replace(/\/$/, "");
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
  async sendHomePageViewEvent(page) {
    const obj = {
      pageCategory: HOME,
      pageSubCategory: HOME,
      pagePath: this.getPagePath(),
      pageTitle: PAGETITLE,
      ...page,
      ...this.getUserInfoFromStore(),
    };
    return obj;
  },
  async sendSearchPageViewEvent(productListTotal, searchTerm) {
    if (!productListTotal) {
      productListTotal = 0;
    }
    const obj = {
      pageCategory: ONSITE_SEARCH,
      onsiteSearch: productListTotal > 0 ? "Successful Search" : "Zero Search",
      searchTerm,
      productResults: productListTotal,
      pageTitle: PAGETITLE,
      pagePath: this.getPagePath() + "?searchTerm=" + searchTerm,
      ...this.getUserInfoFromStore(),
    };

    return obj;
  },
  async sendListerPageViewEvent(productListTotal, breadcrumbs) {
    const obj = {
      pageCategory: LISTER,
      pageSubCategory: this.getBreadCrumbsData(breadcrumbs).category,
      listerResults: productListTotal,
      pageTitle: PAGETITLE,
      pagePath: this.getPagePath(),
      ...this.getUserInfoFromStore(),
    };
    return obj;
  },
  async sendPDPPageViewEvent(breadcrumbs) {
    const obj = {
      pageCategory: PDP,
      pageSubCategory: this.getBreadCrumbsData(breadcrumbs).category,
      pageTitle: PAGETITLE,
      pagePath: this.getPagePath(),
      ...this.getUserInfoFromStore(),
    };
    return obj;
  },
  async sendCheckoutPageViewEvent(pageSubCategory) {
    const obj = {
      pageTitle: PAGETITLE,
      pagePath: this.getPagePath(),
      pageCategory: CHECKOUT,
      pageSubCategory,
      ...this.getUserInfoFromStore(),
    };
    return obj;
  },
  async sendContentPageViewEvent(cid) {
    const obj = {
      pageCategory: CONTENT,
      pageSubCategory: CONTENT,
      pagePath: this.getPagePath(),
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
      return obj;
  },
  async NavigationClick(eventAction, eventLabel) {
    return { eventAction, eventLabel };
  },
  async sendFormCompletionEvent(eventAction) {
    return eventAction;
  },
  async sendProductImpressionEvent(productList, listerFlag, breadcrumbs) {
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
    return { productarr, currency };
  },

  async sendProductClickEvent(product, index, listerFlag, breadcrumbs) {
    const obj = {
      id: product.partNumber,
      name: product.name,
      price: this.getProductPrice(product.price).price,
      category: listerFlag ? this.getBreadCrumbsData(breadcrumbs).category : "",
      list: listerFlag
        ? this.getBreadCrumbsData(breadcrumbs).subCategory
        : "Search Results",
      currency: this.getProductPrice(product.price).currency,
    };
    return obj;
  },
  async sendPDPDetailViewEvent(currentProdSelect, breadcrumbs) {
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
      currency: this.getProductPrice(price).currency,
    };
    return obj;
  },
  async sendB2BPDPDetailViewEvent(productData, productPartNumber, breadcrumbs) {
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
      price: productData && this.getProductPrice(productData.price).price,
      currency: productData
        ? this.getProductPrice(productData.price).currency
        : "",
    };
    return obj;
  },
  async sendPromotionImpression(promo) {
    if (promo.baseMarketingSpotActivityData) {
      const { contentId, contentName } = promo.baseMarketingSpotActivityData[0];
      const promoArr = [
        {
          id: contentId,
          name: contentName,
        },
      ];
      return promoArr;
    }
  },
  async sendPromotionClick(promo) {
    const { contentId, contentName } = promo.baseMarketingSpotActivityData[0];
    const promoObj = {
      id: contentId,
      name: contentName,
    };
    return promoObj;
  },
  async sendAddToCartEvent(currentProdSelect, breadcrumbs) {
    const { id, name, price } = currentProdSelect.sku;
    const productsObj: Array<object> = [];
    const currencyCode = this.getProductPrice(price).currency;
    const obj = {
      id: id,
      name: name,
      price: this.getProductPrice(price).price,
      category: this.getBreadCrumbsData(breadcrumbs).category,
      variant: currentProdSelect["selectedAttributes"] || "",
      quantity: currentProdSelect.quantity,
    };
    productsObj.push(obj);
    return { productsObj, currencyCode };
  },
  async sendB2BAddToCartEvent(currentProdSelect, result, breadcrumbs) {
    const { category, subCategory } = this.getBreadCrumbsData(breadcrumbs);
    const price = currentProdSelect.partNumber.price;
    const productsObj: Array<object> = [];
    const currencyCode = this.getProductPrice(price).currency;
    result.forEach((element) => {
      const obj = {
        id: element.key,
        name: subCategory,
        price: this.getProductPrice(price).price,
        category: category,
        quantity: element.value,
      };
      productsObj.push(obj);
    });
    return { productsObj, currencyCode };
  },
  async sendRemoveFromCartEvent(item) {
    const { partNumber, name, orderItemPrice, quantity, currency } = item;
    const obj = {
      id: partNumber,
      name: name,
      price: parseFloat(orderItemPrice),
      quantity: parseInt(quantity),
      currency,
    };
    return obj;
  },
  async sendCheckoutEvent(cart, orderItems, step, value) {
    const currency = cart.grandTotalCurrency;
    const productArr = orderItems.map((order) => {
      return {
        id: order.partNumber,
        name: order.name,
        price: order.orderItemPrice,
        quantity: parseInt(order.quantity),
      };
    });
    return { step, value, productArr, currency };
  },

  //This function has already included an async call to send request to GA
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

    this.fetchCategoriesId(param)
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
          return null;
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

  async fetchCategoriesId(param: any) {
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
  },
  async sendCartPageViewEvent(page) {
    const obj = {
      pageTitle: page.pageTitle,
      pagePath: this.getPagePath(),
      pageCategory: CART,
      pageSubCategory: page.pageSubCategory,
      ...this.getUserInfoFromStore(),
    };
    return obj;
  },
};

export default UADataService;
