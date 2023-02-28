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
import { OFFER, DISPLAY } from "../../../constants/common";
import GA4GTMDLService from "./gtmDataLayer.service";
//Custom libraries
import v2CategoryResourceService from "../../apis/search/categories.service";

const GA4DataService = {
  PAGETITLE: "",
  PAGEPATH: "",
  setPageTitle(title: any) {
    this.PAGETITLE = title; // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  setPagePath(path: any) {
    this.PAGEPATH = path; // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  async sendAddToCartEvent(cart, currentProdSelect, breadcrumbs, sellers, storeName) {
    const cartObj = {
      grandTotal: cart.grandTotal,
      grandTotalCurrency: cart.grandTotalCurrency,
    };
    const { id, name, partNumber, price, type } = currentProdSelect.sku[0];
    const productsObj: Array<object> = [];
    const currencyCode = this.getProductPrice(price).currency;
    const marketplaceSellers = sellers.sellers;
    const obj = {
      id: id,
      name: name,
      type: type,
      partNumber: partNumber,
      price: this.getProductPrice(price).price,
      category: this.getBreadCrumbsData(breadcrumbs).category,
      variant: currentProdSelect["selectedAttributes"] || "",
      quantity: currentProdSelect.quantity,
      affiliation: marketplaceSellers?.find((s) => s.id === currentProdSelect.sku[0].sellerId)?.organizationName,
    };
    productsObj.push(obj);
    return { cartObj, productsObj, currencyCode, marketplaceStore: marketplaceSellers.length > 0 ? storeName : null };
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

  getBreadCrumbsData(breadcrumbs) {
    const breadcrumbLabels = breadcrumbs.map((data) => data.label);
    const category = breadcrumbLabels.slice(0, breadcrumbLabels.length - 1).join("/");
    const subCategory = breadcrumbLabels[breadcrumbLabels.length - 1];

    return { breadcrumbLabels, category, subCategory };
  },

  async sendRemoveFromCartEvent(item, entitledOrgs, activeOrgId, sellers, storeName) {
    const { partNumber, productId, name, orderItemPrice, quantity, currency } = item;
    const hcl_account = entitledOrgs?.find((o) => o.organizationId === activeOrgId)?.organizationName;
    const marketplaceSellers = sellers.sellers;
    const product = {
      id: productId,
      name: name,
      partNumber: partNumber,
      price: parseFloat(orderItemPrice),
      quantity: parseInt(quantity),
      currency,
      hcl_account,
      affiliation: marketplaceSellers?.find((s) => s.id === item.sellerId)?.organizationName,
      marketplaceStore: marketplaceSellers.length > 0 ? storeName : null,
    };
    return product;
  },

  sendPurchaseEvent(cart, orderItems, entitledOrgs, activeOrgId, sellers, storeName) {
    const { orderId, totalProductPrice, totalSalesTax, totalShippingTax, totalShippingCharge, totalAdjustment } = cart;
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
        discount: orderItem.totalAdjustment.value,
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
                category: categoryName || "Search Results",
                id: element.id,
                name: element.name,
                price: element.price,
                quantity: element.quantity,
                discount: element.discount,
                affiliation: element.affiliation,
              };
            } else {
              return {
                category: categoryId,
                id: element.id,
                name: element.name,
                price: element.price,
                quantity: element.quantity,
                discount: element.discount,
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
          totalcost: totalProductPrice,
          salesTax: totalSalesTax,
          shippingTax: totalShippingTax,
          shippingcost: totalShippingCharge,
          totalDiscount: totalAdjustment,
          currency: currency,
          productArrWithCategory,
          hcl_account,
          marketplaceStore: marketplaceSellers.length > 0 ? storeName : null,
        };
        GA4GTMDLService.measuringPurchases(obj);
      })
      .catch((error) => {
        console.log("Could not get category ID from search ", error);
      });
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

  async sendCheckoutEvent(cart, orderItems, step, value, entitledOrgs, activeOrgId, sellers, storeName) {
    let paymentMethod = "";
    const cartObj = {
      grandTotal: cart.grandTotal,
      grandTotalCurrency: cart.grandTotalCurrency,
    };
    if (cart && cart.paymentInstruction) {
      paymentMethod = cart.paymentInstruction[0].payMethodId;
    }
    const hcl_account = entitledOrgs?.find((o) => o.organizationId === activeOrgId)?.organizationName;
    const marketplaceSellers = sellers.sellers;
    const productArr = orderItems.map((orderItem) => {
      return {
        id: orderItem.partNumber,
        name: orderItem.name,
        price: orderItem.orderItemPrice,
        quantity: parseInt(orderItem.quantity),
        currency: orderItem.currency,
        shippingTier: orderItem.shipModeCode,
        affiliation: marketplaceSellers?.find((s) => s.id === orderItem.sellerId)?.organizationName,
      };
    });
    return {
      cartObj,
      step,
      value,
      productArr,
      paymentMethod,
      hcl_account,
      marketplaceStore: marketplaceSellers.length > 0 ? storeName : null,
    };
  },

  async sendViewCartEvent(cart, orderItems, entitledOrgs, activeOrgId, sellers, storeName) {
    const hcl_account = entitledOrgs?.find((o) => o.organizationId === activeOrgId)?.organizationName;
    const marketplaceSellers = sellers.sellers;
    const cartObj = {
      grandTotal: cart?.grandTotal,
      grandTotalCurrency: cart?.grandTotalCurrency,
    };
    const productArr = orderItems.map((orderItem) => {
      return {
        id: orderItem.partNumber,
        name: orderItem.name,
        price: orderItem.orderItemPrice,
        quantity: parseInt(orderItem.quantity),
        currency: orderItem.currency,
        shippingTier: orderItem.shipModeCode,
        brand: orderItem.brand,
        category: orderItem.category,
        variant: orderItem.variant,
        coupon: orderItem.coupon,
        tax: orderItem.tax,
        discount: orderItem.discount,
        affiliation: marketplaceSellers?.find((s) => s.id === orderItem.sellerId)?.organizationName,
      };
    });
    return { cartObj, productArr, hcl_account, marketplaceStore: marketplaceSellers.length > 0 ? storeName : null };
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

  async sendProductImpressionEvent(productList, listerFlag, breadcrumbs, sellers, storeName) {
    const marketplaceSellers = sellers.sellers;
    const productArr = productList.map((product, index) => {
      return {
        name: product.name,
        id: product.partNumber,
        price: this.getProductPrice(product.price).price,
        category: listerFlag ? this.getBreadCrumbsData(breadcrumbs).category : "",
        list: listerFlag ? this.getBreadCrumbsData(breadcrumbs).subCategory : "Search Results",
        position: index + 1,
        currency: this.getProductPrice(product.price).currency,
        affiliation: marketplaceSellers?.find((s) => s.id === product.sellerId)?.organizationName,
      };
    });
    const currency = productArr?.length > 0 ? productArr[0].currency : "";
    return { productArr, currency, marketplaceStore: marketplaceSellers.length > 0 ? storeName : null };
  },

  async sendSearchPageViewEvent(productListTotal, searchTerm) {
    return { searchTerm, productResults: productListTotal ?? 0 };
  },

  async sendProductClickEvent(product, index, listerFlag, breadcrumbs, sellers, storeName) {
    const marketplaceSellers = sellers.sellers;
    const obj = {
      id: product.partNumber,
      name: product.name,
      price: this.getProductPrice(product.price).price,
      category: listerFlag ? this.getBreadCrumbsData(breadcrumbs).category : "",
      list: listerFlag ? this.getBreadCrumbsData(breadcrumbs).subCategory : "Search Results",
      position: index + 1,
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
      quantity: currentProdSelect.quantity,
      currency: this.getProductPrice(price).currency,
      affiliation: marketplaceSellers?.find((s) => s.id === sellerId)?.organizationName,
      marketplaceStore: marketplaceSellers.length > 0 ? storeName : null,
    };
    return obj;
  },

  async sendB2BAddToCartEvent(
    cart,
    product,
    skusByPart,
    partAndQuantity,
    breadcrumbs,
    entitledOrgs,
    activeOrgId,
    sellers,
    storeName
  ) {
    const cartObj = { grandTotal: cart.grandTotal, grandTotalCurrency: cart.grandTotalCurrency };
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
      cartObj,
      productsObj,
      currencyCode,
      hcl_account,
      marketplaceStore: marketplaceSellers.length > 0 ? storeName : null,
    };
  },

  async sendB2BPDPDetailViewEvent(productData, productPartNumber, breadcrumbs, sellers, storeName) {
    const { breadcrumbLabels, category, subCategory } = this.getBreadCrumbsData(breadcrumbs);
    const leafCategoryForProduct = breadcrumbLabels[breadcrumbLabels.length - 2];
    const marketplaceSellers = sellers.sellers;
    const obj = {
      id: productPartNumber,
      name: subCategory,
      price: productData && this.getProductPrice(productData.price).price,
      category: category,
      list: leafCategoryForProduct,
      currency: productData ? this.getProductPrice(productData.price).currency : "",
      affiliation: marketplaceSellers?.find((s) => s.id === productData.sellerId)?.organizationName,
      marketplaceStore: marketplaceSellers.length > 0 ? storeName : null,
    };
    return obj;
  },
};

export default GA4DataService;
