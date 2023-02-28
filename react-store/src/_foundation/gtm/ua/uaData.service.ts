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
import { HOME, ONSITE_SEARCH, LISTER, PDP, CHECKOUT, CONTENT, CART } from "../../constants/gtm";
//Custom libraries
import v2CategoryResourceService from "../../apis/search/categories.service";

const UADataService = {
  PAGETITLE: "",

  setPageTitle(title: any) {
    this.PAGETITLE = title;
  },
  getPagePath() {
    const locationPath = window.location.pathname;
    return locationPath === "/" ? locationPath : locationPath.replace(/\/$/, "");
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
    const category = breadcrumbLabels.slice(0, breadcrumbLabels.length - 1).join("/");
    const subCategory = breadcrumbLabels[breadcrumbLabels.length - 1];

    return { breadcrumbLabels, category, subCategory };
  },
  async sendHomePageViewEvent(page) {
    const obj = {
      pageCategory: HOME,
      pageSubCategory: HOME,
      pagePath: this.getPagePath(),
      pageTitle: this.PAGETITLE,
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
      pageTitle: this.PAGETITLE,
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
      pageTitle: this.PAGETITLE,
      pagePath: this.getPagePath(),
      ...this.getUserInfoFromStore(),
    };
    return obj;
  },
  async sendPDPPageViewEvent(breadcrumbs) {
    const obj = {
      pageCategory: PDP,
      pageSubCategory: this.getBreadCrumbsData(breadcrumbs).category,
      pageTitle: this.PAGETITLE,
      pagePath: this.getPagePath(),
      ...this.getUserInfoFromStore(),
    };
    return obj;
  },
  async sendCheckoutPageViewEvent(pageSubCategory) {
    const obj = {
      pageTitle: this.PAGETITLE,
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
      pageTitle: this.PAGETITLE,
      ...this.getUserInfoFromStore(),
    };
    if (cid.toLowerCase().localeCompare(obj.pagePath.substring(1).replace("-", "").toLowerCase()) === 0) return obj;
  },
  async NavigationClick(eventAction, eventLabel) {
    return { eventAction, eventLabel };
  },
  async sendFormCompletionEvent(eventAction) {
    return eventAction;
  },
  async sendProductImpressionEvent(productList, listerFlag, breadcrumbs, sellers, storeName) {
    let currency: string = "";
    const marketplaceSellers = sellers.sellers;
    const productarr = productList.map((product, index) => {
      currency = this.getProductPrice(product.price).currency;
      return {
        name: product.name,
        id: product.partNumber,
        price: this.getProductPrice(product.price).price,
        category: listerFlag ? this.getBreadCrumbsData(breadcrumbs).category : "",
        list: listerFlag ? this.getBreadCrumbsData(breadcrumbs).subCategory : "Search Results",
        position: index + 1,
        affiliation: marketplaceSellers?.find((s) => s.id === product.sellerId)?.organizationName,
      };
    });
    return { productarr, currency, marketplaceStore: marketplaceSellers.length > 0 ? storeName : null };
  },

  async sendProductClickEvent(product, index, listerFlag, breadcrumbs, sellers, storeName) {
    const marketplaceSellers = sellers.sellers;
    const obj = {
      id: product.partNumber,
      name: product.name,
      price: this.getProductPrice(product.price).price,
      category: listerFlag ? this.getBreadCrumbsData(breadcrumbs).category : "",
      list: listerFlag ? this.getBreadCrumbsData(breadcrumbs).subCategory : "Search Results",
      currency: this.getProductPrice(product.price).currency,
      affiliation: marketplaceSellers?.find((s) => s.id === product.sellerId)?.organizationName,
      marketplaceStore: marketplaceSellers.length > 0 ? storeName : null,
    };
    return obj;
  },
  async sendPDPDetailViewEvent(currentProdSelect, breadcrumbs, sellers, storeName) {
    const breadcrumbLength = this.getBreadCrumbsData(breadcrumbs).breadcrumbLabels.length;
    const { id, name, price, sellerId } = currentProdSelect.sku[0];
    const marketplaceSellers = sellers.sellers;
    const obj = {
      id: id,
      name: name,
      price: this.getProductPrice(price).price,
      category: this.getBreadCrumbsData(breadcrumbs).category,
      variant: currentProdSelect["selectedAttributes"] || "",
      list: this.getBreadCrumbsData(breadcrumbs).breadcrumbLabels[breadcrumbLength - 2],
      currency: this.getProductPrice(price).currency,
      affiliation: marketplaceSellers?.find((s) => s.id === sellerId)?.organizationName,
      marketplaceStore: marketplaceSellers.length > 0 ? storeName : null,
    };
    return obj;
  },
  async sendB2BPDPDetailViewEvent(productData, productPartNumber, breadcrumbs, sellers, storeName) {
    const { breadcrumbLabels, category, subCategory } = this.getBreadCrumbsData(breadcrumbs);
    const leafCategoryForProduct = breadcrumbLabels[breadcrumbLabels.length - 2];
    const marketplaceSellers = sellers.sellers;
    const obj = {
      id: productPartNumber,
      name: subCategory,
      category: category,
      list: leafCategoryForProduct,
      price: productData && this.getProductPrice(productData.price).price,
      currency: productData ? this.getProductPrice(productData.price).currency : "",
      affiliation: marketplaceSellers?.find((s) => s.id === productData.sellerId)?.organizationName,
      marketplaceStore: marketplaceSellers.length > 0 ? storeName : null,
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
  async sendAddToCartEvent(currentProdSelect, breadcrumbs, sellers, storeName) {
    const { id, name, price, partNumber, type } = currentProdSelect.sku[0];
    const productsObj: Array<object> = [];
    const currencyCode = this.getProductPrice(price).currency;
    const marketplaceSellers = sellers.sellers;
    const obj = {
      id: id,
      name: name,
      partNumber: partNumber,
      type: type,
      price: this.getProductPrice(price).price,
      category: this.getBreadCrumbsData(breadcrumbs).category,
      variant: currentProdSelect["selectedAttributes"] || "",
      quantity: currentProdSelect.quantity,
      affiliation: marketplaceSellers?.find((s) => s.id === currentProdSelect.sku[0].sellerId)?.organizationName,
    };
    productsObj.push(obj);
    return { productsObj, currencyCode, marketplaceStore: marketplaceSellers.length > 0 ? storeName : null };
  },

  async sendB2BAddToCartEvent(
    product,
    skusByPart,
    partAndQuantity,
    breadcrumbs,
    entitledOrgs,
    activeOrgId,
    sellers,
    storeName
  ) {
    const { category, subCategory } = this.getBreadCrumbsData(breadcrumbs);
    const currencyCode = this.getProductPrice(product.price).currency;
    const marketplaceSellers = sellers.sellers;
    const productsObj: any[] = partAndQuantity.map((element) => ({
      id: element.key,
      name: subCategory,
      price: this.getProductPrice(skusByPart[element.key].price).price,
      category: category,
      quantity: element.value,
      affiliation: marketplaceSellers?.find((s) => s.id === product.sellerId)?.organizationName,
    }));
    const hcl_account = entitledOrgs?.find((o) => o.organizationId === activeOrgId)?.organizationName;
    return {
      productsObj,
      currencyCode,
      hcl_account,
      marketplaceStore: marketplaceSellers.length > 0 ? storeName : null,
    };
  },

  async sendRemoveFromCartEvent(item, entitledOrgs, activeOrgId, sellers, storeName) {
    const { partNumber, name, orderItemPrice, quantity, currency } = item;
    const hcl_account = entitledOrgs?.find((o) => o.organizationId === activeOrgId)?.organizationName;
    const marketplaceSellers = sellers.sellers;
    const obj = {
      id: partNumber,
      name: name,
      price: parseFloat(orderItemPrice),
      quantity: parseInt(quantity),
      currency,
      hcl_account,
      affiliation: marketplaceSellers?.find((s) => s.id === item.sellerId)?.organizationName,
      marketplaceStore: marketplaceSellers.length > 0 ? storeName : null,
    };
    return obj;
  },
  async sendCheckoutEvent(cart, orderItems, step, value, entitledOrgs, activeOrgId, sellers, storeName) {
    const currency = cart.grandTotalCurrency;
    const marketplaceSellers = sellers.sellers;
    const productArr = orderItems.map((orderItem) => {
      return {
        id: orderItem.partNumber,
        name: orderItem.name,
        price: orderItem.orderItemPrice,
        quantity: parseInt(orderItem.quantity),
        affiliation: marketplaceSellers?.find((s) => s.id === orderItem.sellerId)?.organizationName,
      };
    });
    const hcl_account = entitledOrgs?.find((o) => o.organizationId === activeOrgId)?.organizationName;
    return {
      step,
      value,
      productArr,
      currency,
      hcl_account,
      marketplaceStore: marketplaceSellers.length > 0 ? storeName : null,
    };
  },

  //This function has already included an async call to send request to GA
  sendPurchaseEvent(cart, orderItems, entitledOrgs, activeOrgId, sellers, storeName) {
    const { orderId, grandTotal, totalSalesTax, totalShippingTax, totalAdjustment } = cart;
    const partNumberCatgroupMap = new Map<any, any>();
    let currency = null;
    const marketplaceSellers = sellers.sellers;
    let productArr = orderItems.map((orderItem) => {
      const parentCatalogGroupID = orderItem.parentCatalogGroupID;
      const arr = parentCatalogGroupID.split("/");
      currency = orderItem.currency;
      if (arr && arr.length >= 1) {
        let catgroupID = arr[arr.length - 1];
        catgroupID = catgroupID.substring(catgroupID.indexOf("_") + 1);
        partNumberCatgroupMap.set(orderItem.partNumber, catgroupID);
      }
      return {
        id: orderItem.partNumber,
        name: orderItem.name,
        price: orderItem.unitPrice,
        quantity: parseInt(orderItem.quantity),
        affiliation: marketplaceSellers?.find((s) => s.id === orderItem.sellerId)?.organizationName,
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
                affiliation: element.affiliation,
              };
            } else {
              return {
                category: categoryId,
                id: element.id,
                name: element.name,
                price: element.price,
                quantity: element.quantity,
                affiliation: element.affiliation,
              };
            }
          }
          return null;
        });
        productArr = null;
        const hcl_account = entitledOrgs?.find((o) => o.organizationId === activeOrgId)?.organizationName;
        const obj = {
          purchaseId: orderId,
          totalcost: grandTotal,
          tax: totalSalesTax,
          shippingcost: totalShippingTax,
          discount: totalAdjustment,
          currency: currency,
          productArrWithCategory,
          hcl_account,
          marketplaceStore: marketplaceSellers.length > 0 ? storeName : null,
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
    const price = productOfferPrice > 0 ? productOfferPrice : prodDisplayPrice > 0 ? prodDisplayPrice : 0;
    return { price, currency };
  },

  async fetchCategoriesId(param: any) {
    const result = await v2CategoryResourceService.getV2CategoryResourcesUsingGET(param);
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
    const { entitledOrgs, activeOrgId, sellers, storeName } = page;
    const hcl_account = entitledOrgs?.find((o) => o.organizationId === activeOrgId)?.organizationName;
    const obj = {
      pageTitle: page.pageTitle,
      pagePath: this.getPagePath(),
      pageCategory: CART,
      pageSubCategory: page.pageSubCategory,
      ...this.getUserInfoFromStore(),
      hcl_account,
      sellers,
      storeName,
    };
    return obj;
  },
};

export default UADataService;
