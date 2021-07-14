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
import TagManager from "react-gtm-module";
//Foundation libraries
import {
  GA4_EVENT_ADD_TO_CART,
  GA4_EVENT_REMOVE_FROM_CART,
  GA4_EVENT_PURCHASE,
  GA4_EVENT_BEGIN_CHECKOUT,
  GA4_EVENT_ADD_PAYMENT_INFO,
  GA4_EVENT_ADD_SHIPPING_INFO,
  GA4_EVENT_VIEW_CART,
  GA4_EVENT_SELECT_PROMOTION,
  GA4_EVENT_VIEW_PROMOTION,
  GA4_EVENT_VIEW_ITEM_LIST,
  GA4_EVENT_SELECT_ITEM,
  GA_EVENT_VIEW_ITEM,
} from "../../constants/gtm";

const DATALAYER_NAME = "PageDataLayer";

const GA4GTMDLService = {
  initializeGTM(id: string, auth: string, preview: string) {
    const tagManagerArgs = {
      gtmId: id,
      auth: auth,
      preview: preview,
      dataLayerName: DATALAYER_NAME,
    };
    TagManager.initialize(tagManagerArgs);
  },

  /**
   *  Measure adding a product to a shopping cart by using an 'add' actionFieldObject and a list of productFieldObjects.
   * `@method`
   * `@name GTM#measureAddToCart`
   *
   *
   * `@param {any} products`  object and have following properties:
   ** `@property {string} id (required)` The product ID (e.g. LR-FNTR-0001).
   ** `@property {string} name (required)` The name of the product (e.g. Wooden Angled Chair).
   ** `@property {string} currency ` Currency e.g EUR
   ** `@property {string} brand ` The brand associated with the product (e.g. Baker).
   ** `@property {string} cat ` The category to which the product belongs (e.g. Furniture). Use / as a delimiter to specify up to 5-levels of hierarchy (e.g. Living Room/Furniture/Wooden Angled Chair).
   ** `@property {string} variant ` The variant of the product (e.g. Black).
   ** `@property { number} price `  The price of a product (e.g. 29.20).
   ** `@property { number} quantity `  The quantity of a product (e.g. 2).
   **/
  measureAddToCart(products) {
    let { cartObj } = products;
    let grandTotal = Number(cartObj.grandTotal || 0);
    const productObj = products.productsObj;
    const items: any = [];
    if (productObj && productObj.length > 0) {
      productObj.forEach((product) => {
        items.push({
          item_id: product.id,
          item_name: product.name,
          ...(product.brand && { item_brand: product.brand }),
          ...(product.category && { item_category: product.category }),
          ...(product.partNumber && {
            item_variant: product.partNumber,
          }),
          ...(product.price && { price: product.price }),
          ...(product.currency && { currency: product.currency }),
          ...(product.quantity && { quantity: product.quantity }),
        });
      });
      const tagManagerArgsGA4 = {
        dataLayer: {
          event: GA4_EVENT_ADD_TO_CART,
          ecommerce: {
            currency: cartObj.grandTotalCurrency || "",
            value: grandTotal || 0,
            addToCartItems: items,
          },
        },
        dataLayerName: DATALAYER_NAME,
      };
      TagManager.dataLayer(tagManagerArgsGA4);
    }
  },

  /**
   *  Measure the removal of a product from a shopping cart by using an 'remove' actionFieldObject.
   * `@method`
   * `@name GTM#measureRemoveFromCart`
   *
   *
   * `@param {any} productObj`  object and have following properties:
   ** `@property {string} id (required)` The product ID (e.g. LR-FNTR-0001).
   ** `@property {string} name (required)` The name of the product (e.g. Wooden Angled Chair).
   ** `@property {string} brand ` The brand associated with the product (e.g. Baker).
   ** `@property {string} cat ` The category to which the product belongs (e.g. Furniture). Use / as a delimiter to specify up to 5-levels of hierarchy (e.g. Living Room/Furniture/Wooden Angled Chair).
   ** `@property {string} variant ` The variant of the product (e.g. Black).
   ** `@property { number} price `  The price of a product (e.g. 29.20).
   ** `@property { number} quantity `  The quantity of a product (e.g. 2).
   **/
  measureRemoveFromCart(productObj) {
    let cartValue: Number = productObj.price;

    const tagManagerArgsGA4 = {
      dataLayer: {
        event: GA4_EVENT_REMOVE_FROM_CART,
        ecommerce: {
          ...(productObj.currency && { currency: productObj.currency }),
          ...(cartValue && { value: cartValue }),
          removeFromCartItems: [
            {
              item_id: productObj.id,
              item_name: productObj.name,
              ...(productObj.brand && { item_brand: productObj.brand }),
              ...(productObj.category && {
                item_category: productObj.category,
              }),
              ...(productObj.partNumber && {
                item_variant: productObj.partNumber,
              }),
              ...(productObj.price && { price: productObj.price }),
              ...(productObj.currency && { currency: productObj.currency }),
              ...(productObj.quantity && { quantity: productObj.quantity }),
            },
          ],
        },
      },
      dataLayerName: DATALAYER_NAME,
    };
    TagManager.dataLayer(tagManagerArgsGA4);
  },

  /**
   *  Measure transaction details into the Data Layer using the purchase action.
   * `@method`
   * `@name GTM#measuringPurchases`
   *
   *
   * `@param {any} purchaseObj`  object and have following properties:
   * `@property {string} purchaseId (required)` The transaction ID (e.g. T1234).
   * `@property {string} affiliation `The store or affiliation from which this transaction occurred (e.g. Emerald Store).
   * `@property {number} totalcost ` the total revenue or grand total associated with the transaction (e.g. 11.99).
   *  This value may include shipping, tax costs, or other adjustments to total revenue that you want to include as part of your revenue calculations.
   * `@property {number} tax ` The total tax associated with the transaction.
   * `@property {number} shippingcost ` The shipping cost associated with the transaction.
   * `@property {string} discount `he transaction coupon redeemed with the transaction.
   *
   * * `@property {any} productArr ` arry of product obj and object have following properties:
   ** `@property {string} id (required)` The product ID (e.g. LR-FNTR-0001).
   ** `@property {string} name (required)` The name of the product (e.g. Wooden Angled Chair).
   ** `@property {string} brand ` The brand associated with the product (e.g. Baker).
   ** `@property {string} category ` The category to which the product belongs (e.g. Furniture). Use / as a delimiter to specify up to 5-levels of hierarchy (e.g. Living Room/Furniture/Wooden Angled Chair).
   ** `@property {string} variant ` The variant of the product (e.g. Black).
   ** `@property { number} price `  The price of a product (e.g. 29.20).
   ** `@property { number} quantity `  The quantity of a product (e.g. 2).
   **/
  measuringPurchases(purchaseObj) {
    let products: any = [];
    let list = new Set();
    purchaseObj.productArrWithCategory.forEach((product) => {
      const productObj = {
        name: product.name,
        id: product.id,
        ...(product.price && { price: product.price }),
        ...(product.brand && { brand: product.brand }),
        ...(product.category && { category: product.category }),
        ...(product.variant && { variant: product.variant }),
        ...(product.quantity && { quantity: product.quantity }),
        ...(product.coupon && { coupon: product.coupon }),
      };
      products.push(productObj);
      list.add(productObj.category);
    });

    let items: any = [];
    let cartValue: Number = purchaseObj.totalcost;
    let cartCurrency = purchaseObj.currency;
    let cartTax: Number = purchaseObj.salesTax;
    let cartShipping: Number = purchaseObj.shippingcost;
    let cartTransactionId = purchaseObj.purchaseId;
    purchaseObj.productArrWithCategory.forEach((product) => {
      const itemObj = {
        item_name: product.name,
        item_id: product.id,
        ...(product.price && { price: product.price }),
        ...(product.brand && { item_brand: product.brand }),
        ...(product.category && { item_list_name: product.category }),        
        ...(product.category && { item_category: product.category }),
        ...(product.variant && { item_variant: product.variant }),
        ...(product.quantity && { quantity: product.quantity }),
        ...(product.coupon && { coupon: product.coupon }),
        ...(product.currency && { currency: product.currency }),
        ...(product.tax && { tax: product.tax }),
        ...(product.discount && { discount: product.discount }),
      };
      items.push(itemObj);
    });

    const tagManagerArgsGA4 = {
      dataLayer: {
        event: GA4_EVENT_PURCHASE,
        ecommerce: {
          transaction_id: cartTransactionId,
          ...(cartCurrency && { currency: cartCurrency }),
          ...(cartValue && { value: cartValue }),
          ...(cartTax && { tax: cartTax }),
          ...(cartShipping && { shipping: cartShipping }),
          purchaseItems: items,
        },
      },
      dataLayerName: DATALAYER_NAME,
    };
    TagManager.dataLayer(tagManagerArgsGA4);
  },

  /**
   *  Measure checkout process into the Data Layer using the checkout action.
   * `@method`
   * `@name GTM#measureCheckout`   *
   *
   * `@param {any} orderObj`  object and have following properties:
   * `@property {number} step (required)` The checkout step number .
   * `@property {string} value (required)`The name of the checkout step (e.g. Shipping and Billing).
   *
   * * `@property {any} productArr ` arry of product obj and object have following properties:
   ** `@property {string} id (required)` The product ID (e.g. LR-FNTR-0001).
   ** `@property {string} name (required)` The name of the product (e.g. Wooden Angled Chair).
   ** `@property {string} brand ` The brand associated with the product (e.g. Baker).
   ** `@property {string} category ` The category to which the product belongs (e.g. Furniture). Use / as a delimiter to specify up to 5-levels of hierarchy (e.g. Living Room/Furniture/Wooden Angled Chair).
   ** `@property {string} variant ` The variant of the product (e.g. Black).
   ** `@property { number} price `  The price of a product (e.g. 29.20).
   ** `@property { number} quantity `  The quantity of a product (e.g. 2).
   **/
  measureCheckout(orderObj) {
    let { cartObj } = orderObj;
    if (orderObj.step === 1) {
      // Send begin_checkout event
      let items: any = [];
      orderObj.productArr.forEach((product) => {
        const itemObj = {
          item_name: product.name,
          item_id: product.id,
          ...(product.price && { price: product.price }),
          ...(product.brand && { item_brand: product.brand }),
          ...(product.category && { item_category: product.category }),
          ...(product.variant && { item_variant: product.variant }),
          ...(product.quantity && { quantity: product.quantity }),
          ...(product.coupon && { coupon: product.coupon }),
          ...(product.currency && { currency: product.currency }),
          ...(product.tax && { tax: product.tax }),
          ...(product.discount && { discount: product.discount }),
        };
        items.push(itemObj);
      });

      const tagManagerArgsGA4 = {
        dataLayer: {
          event: GA4_EVENT_BEGIN_CHECKOUT,
          ecommerce: {
            currency: cartObj.grandTotalCurrency || "",
            value: cartObj.grandTotal || 0,
            beginCheckoutItems: items,
          },
        },
        dataLayerName: DATALAYER_NAME,
      };
      TagManager.dataLayer(tagManagerArgsGA4);
    } else if (orderObj.step === 2) {
      let cartShippingTier = "";

      // Send add_shipping_info event
      let items: any = [];
      orderObj.productArr.forEach((product) => {
        cartShippingTier = product.shippingTier;

        const itemObj = {
          item_name: product.name,
          item_id: product.id,
          ...(product.price && { price: product.price }),
          ...(product.brand && { item_brand: product.brand }),
          ...(product.category && { item_category: product.category }),
          ...(product.variant && { item_variant: product.variant }),
          ...(product.quantity && { quantity: product.quantity }),
          ...(product.coupon && { coupon: product.coupon }),
          ...(product.currency && { currency: product.currency }),
          ...(product.tax && { tax: product.tax }),
          ...(product.discount && { discount: product.discount }),
        };
        items.push(itemObj);
      });

      const tagManagerArgsGA4 = {
        dataLayer: {
          event: GA4_EVENT_ADD_SHIPPING_INFO,
          ecommerce: {
            currency: cartObj.grandTotalCurrency || "",
            value: cartObj.grandTotal || 0,
            ...(cartShippingTier && { shipping_tier: cartShippingTier }),
            addShippingInfoItems: items,
          },
        },
        dataLayerName: DATALAYER_NAME,
      };
      TagManager.dataLayer(tagManagerArgsGA4);
    } else if (orderObj.step === 3) {
      // Send add_payment_info event
      let items: any = [];
      let cartPaymentType = orderObj.paymentMethod;

      orderObj.productArr.forEach((product) => {
        const itemObj = {
          item_name: product.name,
          item_id: product.id,
          ...(product.price && { price: product.price }),
          ...(product.brand && { item_brand: product.brand }),
          ...(product.category && { item_category: product.category }),
          ...(product.variant && { item_variant: product.variant }),
          ...(product.quantity && { quantity: product.quantity }),
          ...(product.coupon && { coupon: product.coupon }),
          ...(product.currency && { currency: product.currency }),
          ...(product.tax && { tax: product.tax }),
          ...(product.discount && { discount: product.discount }),
        };
        items.push(itemObj);
      });

      const tagManagerArgsGA4 = {
        dataLayer: {
          event: GA4_EVENT_ADD_PAYMENT_INFO,
          ecommerce: {
            currency: cartObj.grandTotalCurrency || "",
            value: cartObj.grandTotal || 0,
            ...(cartPaymentType && { payment_type: cartPaymentType }),
            addPaymentInfoItems: items,
          },
        },
        dataLayerName: DATALAYER_NAME,
      };
      TagManager.dataLayer(tagManagerArgsGA4);
    }
  },

  /**
   *  Measure view cart process into the Data Layer using the view cart action.
   * `@method`
   * `@name GTM#measureViewCart`
   *
   * `@param {any} orderObj`  object and have following properties:
   * `@property {string} value ` The value of the cart.
   *
   * `@property {any} productArr ` arry of product obj and object have following properties:
   * `@property {string} id (required)` The product ID (e.g. LR-FNTR-0001).
   * `@property {string} name (required)` The name of the product (e.g. Wooden Angled Chair).
   * `@property {string} brand ` The brand associated with the product (e.g. Baker).
   * `@property {string} category ` The category to which the product belongs (e.g. Furniture). Use / as a delimiter to specify up to 5-levels of hierarchy (e.g. Living Room/Furniture/Wooden Angled Chair).
   * `@property {string} variant ` The variant of the product (e.g. Black).
   * `@property { number} price `  The price of a product (e.g. 29.20).
   * `@property { number} quantity `  The quantity of a product (e.g. 2).
   **/
  measureViewCart(orderObj) {
    let { cartObj } = orderObj;
    let items: any = [];
    orderObj.productArr.forEach((product) => {
      const itemObj = {
        item_name: product.name,
        item_id: product.id,
        ...(product.price && { price: product.price }),
        ...(product.brand && { item_brand: product.brand }),
        ...(product.category && { item_category: product.category }),
        ...(product.variant && { item_variant: product.variant }),
        ...(product.quantity && { quantity: product.quantity }),
        ...(product.coupon && { coupon: product.coupon }),
        ...(product.currency && { currency: product.currency }),
        ...(product.tax && { tax: product.tax }),
        ...(product.discount && { discount: product.discount }),
        ...(product.affiliation && { affiliation: product.affiliation }),
      };
      items.push(itemObj);
    });
    const tagManagerArgsGA4 = {
      dataLayer: {
        event: GA4_EVENT_VIEW_CART,
        ecommerce: {
          currency: cartObj.grandTotalCurrency || "",
          ...(items && items.length > 0 && { viewCartItems: items }),
          value: cartObj.grandTotal || 0,
        },
      },
      dataLayerName: DATALAYER_NAME,
    };
    TagManager.dataLayer(tagManagerArgsGA4);
  },
  /**
   *  Measure a promotion impression,
   * set the promoView key in your ecommerce data layer var to a promoFieldObject that describes the promotions displayed to users on the page.
   * `@method`
   * `@name GTM#measurePromotionImpressions`
   *
   *
   * `@param {any} PromoArr`  object Array and Promo object have following properties:
   ** `@property {string} id (required)` The promotion ID (e.g. PROMO_1234).
   ** `@property {string} name (required)` The name of the promotion (e.g. Summer Sale).
   ** `@property {string} creative ` The creative associated with the promotion (e.g. summer_banner2).
   ** `@property {string} position `  The position of the creative (e.g. banner_slot_1).
   **/
  measurePromotionImpressions(promoArr) {
    let items: any = [];
    promoArr.forEach((promo) => {
      const impressionObj = {
        promotion_name: promo.name,
        promotion_id: promo.id,
      };
      items.push(impressionObj);
    });
    const tagManagerArgs = {
      dataLayer: {
        event: GA4_EVENT_VIEW_PROMOTION,
        ecommerce: {
          viewPromotionItems: items,
        },
      },
      dataLayerName: DATALAYER_NAME,
    };
    TagManager.dataLayer(tagManagerArgs);
  },
  /**
   *  To measure a click on a promotion, push the promoClick action to the data layer with an array containing a promoFieldObject describing the clicked promotion
   * `@method`
   * `@name GTM#measurePromotionClick`
   *
   *
   * `@param {any} promoObj`  Promo object have following properties:
   ** `@property {string} id (required)` The promotion ID (e.g. PROMO_1234).
   ** `@property {string} name (required)` The name of the promotion (e.g. Summer Sale).
   ** `@property {string} creative ` The creative associated with the promotion (e.g. summer_banner2).
   ** `@property {string} position `  The position of the creative (e.g. banner_slot_1).
   **/
  measurePromotionClick(promoObj) {
    const tagManagerArgs = {
      dataLayer: {
        event: GA4_EVENT_SELECT_PROMOTION,
        ecommerce: {
          selectPromotionItems: [
            {
              promotion_name: promoObj.name,
              promotion_id: promoObj.id,
            },
          ],
        },
      },
      dataLayerName: DATALAYER_NAME,
    };
    TagManager.dataLayer(tagManagerArgs);
  },

  /**
   * Measure product impressions by using the impression action and one or more impressionFieldObjects
   * `@method`
   * `@name GTM#measureProductImpression`
   *
   * `@param {string} currencyCode` Currency e.g ('EUR')
   *
   * `@param {any} productArr` array of object and have following properties:
   ** `@property {string} id (required)` The product ID (e.g. LR-FNTR-0001).
   ** `@property {string} name (required)` The name of the product (e.g. Wooden Angled Chair).
   ** `@property {string} list ` The list or collection to which the product belongs (e.g. Search Results).
   ** `@property {string} brand ` The brand associated with the product (e.g. Baker).
   ** `@property {string} category ` The category to which the product belongs (e.g. Furniture). Use / as a delimiter to specify up to 5-levels of hierarchy (e.g. Living Room/Furniture/Wooden Angled Chair).
   ** `@property {string} variant ` The variant of the product (e.g. Black).
   ** `@property {number} position ` The product's position in a list or collection (e.g. 2).
   ** `@property { number} price `  The price of a product (e.g. 29.20).
   **/
  measureProductImpression(productArr, currency) {
    let items: any = [];
    let itemListName: any;
    let itemListId: any;

    productArr.forEach((product) => {
      const item = {
        item_name: product.name,
        item_id: product.id,
        ...(product.price && { price: product.price }),
        ...(product.brand && { item_brand: product.brand }),
        ...(product.category && { item_category: product.category }),
        ...(product.variant && { item_variant: product.variant }),
        ...(product.list && { item_list_name: product.list }),
        ...(product.position && { index: product.position }),
        ...(product.currency && { currency: product.currency }),
      };
      items.push(item);
      itemListName = item.item_list_name;
      itemListId = item.item_category;
    });
    const tagManagerArgs = {
      dataLayer: {
        event: GA4_EVENT_VIEW_ITEM_LIST,
        ecommerce: {
          currency: currency || "",
          item_list_name: itemListName,
          item_list_id: itemListId,
          viewItemListItems: items,
        },
      },
      dataLayerName: DATALAYER_NAME,
    };
    TagManager.dataLayer(tagManagerArgs);
  },

  /**
   * Measure clicks on product links by pushing a click action to the data layer, along with a productFieldObject to represent the clicked product.
   * `@method`
   * `@name GTM#measureProductClick`
   *
   *
   * `@param {any} productObj`  object and have following properties:
   ** `@property {string} id (required)` The product ID (e.g. LR-FNTR-0001).
   ** `@property {string} name (required)` The name of the product (e.g. Wooden Angled Chair).
   ** `@property {string} list ` The list or collection to which the product belongs (e.g. Search Results).
   ** `@property {string} brand ` The brand associated with the product (e.g. Baker).
   ** `@property {string} cat ` The category to which the product belongs (e.g. Furniture). Use / as a delimiter to specify up to 5-levels of hierarchy (e.g. Living Room/Furniture/Wooden Angled Chair).
   ** `@property {string} variant ` The variant of the product (e.g. Black).
   ** `@property {number} position ` The product's position in a list or collection (e.g. 2).
   ** `@property { number} price `  The price of a product (e.g. 29.20).
   **/
  measureProductClick(productObj) {
    const tagManagerArgs = {
      dataLayer: {
        event: GA4_EVENT_SELECT_ITEM,
        ecommerce: {
          currency: productObj.currency || "",
          selectItemItems: [
            {
              item_name: productObj.name,
              item_id: productObj.id,
              ...(productObj.price && { price: productObj.price }),
              ...(productObj.brand && { item_brand: productObj.brand }),
              ...(productObj.category && {
                item_category: productObj.category,
              }),
              ...(productObj.variant && { item_variant: productObj.variant }),
              ...(productObj.position && { index: productObj.position }),
            },
          ],
        },
      },
      dataLayerName: DATALAYER_NAME,
    };
    TagManager.dataLayer(tagManagerArgs);
  },

  /**
   * Measure a view of product details by pushing a detail action to the data layer, along with one or more productFieldObjects representing the products being viewed.
   * `@method`
   * `@name GTM#measureViewOfProductDetail`
   *
   *
   * `@param {any} productObj`  object and have following properties:
   ** `@property {string} id (required)` The product ID (e.g. LR-FNTR-0001).
   ** `@property {string} name (required)` The name of the product (e.g. Wooden Angled Chair).
   ** `@property {string} list ` The list or collection to which the product belongs (e.g. Search Results).
   ** `@property {string} brand ` The brand associated with the product (e.g. Baker).
   ** `@property {string} category ` The category to which the product belongs (e.g. Furniture). Use / as a delimiter to specify up to 5-levels of hierarchy (e.g. Living Room/Furniture/Wooden Angled Chair).
   ** `@property {string} variant ` The variant of the product (e.g. Black).
   ** `@property { number} price `  The price of a product (e.g. 29.20).
   **/
  measureViewOfProductDetail(productObj) {
    const tagManagerArgs = {
      dataLayer: {
        event: GA_EVENT_VIEW_ITEM,
        ecommerce: {
          currency: productObj.currency || "",
          viewItemItems: [
            {
              item_name: productObj.name,
              item_id: productObj.id,
              ...(productObj.price && { price: productObj.price }),
              ...(productObj.brand && { item_brand: productObj.brand }),
              ...(productObj.category && {
                item_category: productObj.category,
              }),
              ...(productObj.variant && { item_variant: productObj.variant }),
              ...(productObj.list && { item_list_name: productObj.list }),
              ...(productObj.position && { index: productObj.position }),
              ...(productObj.quantity && { quantity: productObj.quantity }),
            },
          ],
        },
      },
      dataLayerName: DATALAYER_NAME,
    };
    TagManager.dataLayer(tagManagerArgs);
  },
};

export default GA4GTMDLService;
