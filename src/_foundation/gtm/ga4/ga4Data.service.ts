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

let PAGETITLE = "";
let PAGEPATH = "";
const GA4DataService = {
  setPageTitle(title: any) {
    PAGETITLE = title;
  },
  setPagePath(path: any) {
    PAGEPATH = path;
  },
  async sendAddToCartEvent(cart, currentProdSelect, breadcrumbs) {
    const cartObj = {
      grandTotal: cart.grandTotal,
      grandTotalCurrency: cart.grandTotalCurrency,
    };
    const { id, name, partNumber, price, type } = currentProdSelect.sku;
    const productsObj: Array<object> = [];
    const currencyCode = this.getProductPrice(price).currency;
    const obj = {
      id: id,
      name: name,
      type: type,
      partNumber: partNumber,
      price: this.getProductPrice(price).price,
      category: this.getBreadCrumbsData(breadcrumbs).category,
      variant: currentProdSelect["selectedAttributes"] || "",
      quantity: currentProdSelect.quantity,
    };
    productsObj.push(obj);
    return { cartObj, productsObj, currencyCode };
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

  getBreadCrumbsData(breadcrumbs) {
    const breadcrumbLabels = breadcrumbs.map((data) => data.label);
    const category = breadcrumbLabels
      .slice(0, breadcrumbLabels.length - 1)
      .join("/");
    const subCategory = breadcrumbLabels[breadcrumbLabels.length - 1];

    return { breadcrumbLabels, category, subCategory };
  },

  async sendRemoveFromCartEvent(item) {
    const {
      partNumber,
      productId,
      name,
      orderItemPrice,
      quantity,
      currency,
    } = item;
    const product = {
      id: productId,
      name: name,
      partNumber: partNumber,
      price: parseFloat(orderItemPrice),
      quantity: parseInt(quantity),
      currency,
    };
    return product;
  },

  sendPurchaseEvent(cart, orderItems) {
    const {
      orderId,
      totalProductPrice,
      totalSalesTax,
      totalShippingTax,
      totalShippingCharge,
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
        discount: order.totalAdjustment.value,
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
              };
            }
          }
          return null;
        });
        productArr = null;
        const obj = {
          purchaseId: orderId,
          totalcost: totalProductPrice,
          salesTax: totalSalesTax,
          shippingTax: totalShippingTax,
          shippingcost: totalShippingCharge,
          totalDiscount: totalAdjustment,
          currency: currency,
          productArrWithCategory,
        };
        GA4GTMDLService.measuringPurchases(obj);
      })
      .catch((error) => {
        console.log("Could not get category ID from search ", error);
      });
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

  async sendCheckoutEvent(cart, orderItems, step, value) {
    let paymentMethod = "";
    const cartObj = {
      grandTotal: cart.grandTotal,
      grandTotalCurrency: cart.grandTotalCurrency,
    };

    if (cart && cart.paymentInstruction) {
      paymentMethod = cart.paymentInstruction[0].payMethodId;
    }

    const productArr = orderItems.map((order) => {
      return {
        id: order.partNumber,
        name: order.name,
        price: order.orderItemPrice,
        quantity: parseInt(order.quantity),
        currency: order.currency,
        shippingTier: order.shipModeCode,
      };
    });

    return { cartObj, step, value, productArr, paymentMethod };
  },

  async sendViewCartEvent(cart, orderItems) {
    const cartObj = {
      grandTotal: cart?.grandTotal,
      grandTotalCurrency: cart?.grandTotalCurrency,
    };
    const productArr = orderItems.map((order) => {
      return {
        id: order.partNumber,
        name: order.name,
        price: order.orderItemPrice,
        quantity: parseInt(order.quantity),
        currency: order.currency,
        shippingTier: order.shipModeCode,
        brand: order.brand,
        category: order.category,
        variant: order.variant,
        coupon: order.coupon,
        tax: order.tax,
        discount: order.discount,
        affiliation: order.affiliation || "Online Store",
      };
    });
    return { cartObj, productArr };
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

  async sendProductImpressionEvent(productList, listerFlag, breadcrumbs) {
    const productArr = productList.map((product, index) => {
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
        currency: this.getProductPrice(product.price).currency,
      };
    });
    const currency = productArr?.length > 0 ? productArr[0].currency : "";
    return { productArr, currency };
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
      position: index + 1,
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
      quantity: currentProdSelect.quantity,
      currency: this.getProductPrice(price).currency,
    };
    return obj;
  },

  async sendB2BAddToCartEvent(cart, currentProdSelect, result, breadcrumbs) {
    const cartObj = {
      grandTotal: cart.grandTotal,
      grandTotalCurrency: cart.grandTotalCurrency,
    };
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
    return { cartObj, productsObj, currencyCode };
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
      price: productData && this.getProductPrice(productData.price).price,
      category: category,
      list: leafCategoryForProduct,
      currency: productData
        ? this.getProductPrice(productData.price).currency
        : "",
    };
    return obj;
  },
};

export default GA4DataService;
