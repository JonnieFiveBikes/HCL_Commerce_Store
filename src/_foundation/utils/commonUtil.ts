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

const commonUtil = {
  /**
   * Perform link action accordingly
   * @param link the link contains action instruction
   */
  parseConentUrl: (link: string): any => {
    /**
     * case 1: add to cart
     *  OrderItemAdd?partNumber=LR-DECO-0003-0001&URL=OrderCalculate?URL=OrderItemDisplay&calculationUsageId=-1&quantity=1&catalogId=#catalogId#&storeId=#storeId#
     *
     */
    if (link.indexOf("OrderItemAdd?") === 0) {
      return {
        action: "addToCart",
        partnumber: [
          link.replace("OrderItemAdd?", "").split("&")[0].split("=")[1],
        ],
      };
    } else if (link.indexOf("InterestItemAdd") === 0) {
      /**
       * case 2: add to wishlist
       *  InterestItemAdd?partNumber=AuroraWMDRS-001&URL=InterestItemDisplay&catalogId=#catalogId#&storeId=#storeId#
       *
       */
      return {
        action: "addToWishlist",
        partnumber: [
          link.replace("InterestItemAdd?", "").split("&")[0].split("=")[1],
        ],
      };
    } else if (
      /**
       * case 3: "/home"
       *
       */
      !link.includes("?") &&
      !link.includes("=") &&
      link.split("/").length > 1
    ) {
      link = link.substring(link.indexOf("/"));
      return {
        action: "navigate",
        toLink: link,
      };
    } else if (link.startsWith("http://") || link.startsWith("https://")) {
      /**
       * case 4: external link
       *
       */
      window.open(link, "_blank");
    } else {
      return {
        action: "navigate",
        toLink: link,
      };
    }
  },
};

export default commonUtil;
