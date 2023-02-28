/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2021
 *
 *==================================================
 */
//Custom libraries
import { DX_IMAGE_PATH_STARTS_WITH, DX_IMAGE_THUMBNAIL_TRUE } from "./constants";

const commonUtil = {
  /**
   * Perform link action accordingly
   * @param link the link contains action instruction
   */
  parseContentUrl: (link: string): any => {
    let rc: any = null;

    /**
     * case 1: add to cart
     *  OrderItemAdd?partNumber=LR-DECO-0003-0001&URL=OrderCalculate?URL=OrderItemDisplay&calculationUsageId=-1&quantity=1&catalogId=#catalogId#&storeId=#storeId#
     *
     */
    if (link.indexOf("OrderItemAdd?") === 0) {
      rc = {
        action: "addToCart",
        partnumber: [link.replace("OrderItemAdd?", "").split("&")[0].split("=")[1]],
      };
    } else if (link.indexOf("InterestItemAdd") === 0) {
      /**
       * case 2: add to wishlist
       *  InterestItemAdd?partNumber=AuroraWMDRS-001&URL=InterestItemDisplay&catalogId=#catalogId#&storeId=#storeId#
       *
       */
      rc = {
        action: "addToWishlist",
        partnumber: [link.replace("InterestItemAdd?", "").split("&")[0].split("=")[1]],
      };
    } else if (link.startsWith("http://") || link.startsWith("https://")) {
      /**
       * case 4: external link
       *
       */
      window.open(link, "_blank");
    } else {
      return link;
    }

    return rc;
  },

  // Returns thumbnail image path for DX-DAM -- Only for EmeraldPlus & SapphirePlus
  // If Search does not return thumbnailImage, check fullImage and
  // If fullImage exists, set as thumbnailImage and append "?thumbnail=true" at end of fullImage
  getThumbnailImagePath(thumbnail: string, fullImage: string): string {
    let thumbnailImagePath: string = "";
    if (thumbnail) {
      thumbnailImagePath = thumbnail;
    } else if (fullImage && fullImage.toLowerCase().startsWith(DX_IMAGE_PATH_STARTS_WITH)) {
      thumbnailImagePath = fullImage + DX_IMAGE_THUMBNAIL_TRUE;
    }
    return thumbnailImagePath;
  },

  /**
   * attempt to individually encode parts of a url that is possibly hierarchical
   * @param url the url to analyze
   * @returns a url with path-split parts encoded
   */
  encodeURLParts: (url: string) =>
    url
      .split("/")
      .map((part) => encodeURIComponent(part))
      .join("/"),
};

export { commonUtil };
