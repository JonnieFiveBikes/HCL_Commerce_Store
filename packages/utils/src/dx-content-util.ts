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
import { CONTENT_TEMPLATE, DX_HOST } from "./marketing";

const dxData = new Map();
const dataMap = new Map();

/**
 * The util to handle DX Content.
 */
export const DXContentUtil = {
  /**
   * Method to filter out the content data from response and forwards that data for processing
   * @param  {any} content
   */
  getdataMap: (content: any) => {
    dataMap.clear();
    dxData.clear();
    let elements = content?.content?.elements.element;
    if (elements instanceof Array) {
      elements.forEach((elem) => {
        dataMap.set(elem.name, elem.data.PropertiesContent);
      });
    }
    return DXContentUtil.generateDxData();
  },

  /**
   * Prepares the dx content data using the helper methods of @dxDataHelper that processes @valueMap and return a processed DXData which is used for rendering.
   * @returns any
   */
  generateDxData: (): any => {
    dxDataHelper.imageData();
    dxDataHelper.imageUsage();
    dxDataHelper.video();
    dxDataHelper.text();
    dxDataHelper.textElementWidth();
    dxDataHelper.textAlignment();
    dxDataHelper.textElementPaddingDesktop();
    dxDataHelper.textElementPaddingTablet();
    dxDataHelper.textElementPaddingMobile();
    dxDataHelper.buttonLink();
    dxDataHelper.buttonText();
    dxDataHelper.buttonAppearance();
    dxDataHelper.heightDesktop();
    dxDataHelper.heightTablet();
    dxDataHelper.heightMobile();
    dxDataHelper.elementAlignment();
    dxDataHelper.borderRadius();
    dxDataHelper.dropShadow();
    dxDataHelper.layoutDirection();
    dxDataHelper.videoAutoPlay();
    dxDataHelper.videoControl();
    dxDataHelper.videoPoster();
    dxDataHelper.videoUsage();
    dxDataHelper.videoVolume();
    dxDataHelper.mlTranslation();
    return dxData;
  },
};
const publicUrlPath = process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "";

const dxDataHelper = {
  buttonLink: () => {
    if (dataMap.get(CONTENT_TEMPLATE.BUTTON_LINK)) {
      let text: any = dataMap.get(CONTENT_TEMPLATE.BUTTON_LINK);
      dxData.set(CONTENT_TEMPLATE.BUTTON_LINK, publicUrlPath + text?.value);
    }
  },

  buttonText: () => {
    if (dataMap.get(CONTENT_TEMPLATE.BUTTON_TEXT_DISPLAY)) {
      let text: any = dataMap.get(CONTENT_TEMPLATE.BUTTON_TEXT_DISPLAY);
      dxData.set(CONTENT_TEMPLATE.BUTTON_TEXT_DISPLAY, text.value);
    }
  },
  imageData: () => {
    if (dataMap.get(CONTENT_TEMPLATE.IMAGE)) {
      let imageVal: any = dataMap.get(CONTENT_TEMPLATE.IMAGE);
      let imageValue = imageVal.image?.resourceUri?.value;
      if (!imageValue) {
        let val: any = dataMap.get(CONTENT_TEMPLATE.IMAGE_ALTERNATE_URL);
        imageValue = val.value;
      }
      imageValue = imageValue?.split(DX_HOST)[1];
      imageValue = DX_HOST + imageValue;
      dxData.set(CONTENT_TEMPLATE.IMAGE, imageValue);
    }
  },
  imageUsage: () => {
    if (dataMap.get(CONTENT_TEMPLATE.IMAGE_USAGE)) {
      let status: boolean = false;
      let value = dxDataHelper.getOptionSelection(dataMap, CONTENT_TEMPLATE.IMAGE_USAGE);
      if (value === CONTENT_TEMPLATE.USE_AS_BACKGROUND_IMAGE) {
        status = true;
      }
      dxData.set(CONTENT_TEMPLATE.IMAGE_USAGE, status);
    }
  },
  video: () => {
    let elem = dataMap.get(CONTENT_TEMPLATE.VIDEO);
    if (elem) {
      let AltURL: any;
      let URL = elem.resourceUri?.value;
      if (!URL) {
        AltURL = dataMap.get(CONTENT_TEMPLATE.VIDEO_ALTERNATE_URL);
        URL = AltURL?.value;
      }
      URL = URL?.split(DX_HOST)[1];
      URL = DX_HOST + URL;
      dxData.set(CONTENT_TEMPLATE.VIDEO, URL);
    }
  },

  text: () => {
    if (dataMap.get(CONTENT_TEMPLATE.TEXT)) {
      let text: any = dataMap.get(CONTENT_TEMPLATE.TEXT);
      dxData.set(CONTENT_TEMPLATE.TEXT, text.value);
    }
  },
  textElementWidth: () => {
    if (dataMap.get(CONTENT_TEMPLATE.TEXT_ELEMENT_WIDTH)) {
      let value = dxDataHelper.getOptionSelection(dataMap, CONTENT_TEMPLATE.TEXT_ELEMENT_WIDTH);
      dxData.set(CONTENT_TEMPLATE.TEXT_ELEMENT_WIDTH, value);
    }
  },
  textAlignment: () => {
    if (dataMap.get(CONTENT_TEMPLATE.TEXT_ALIGNMENT)) {
      let value = dxDataHelper.getOptionSelection(dataMap, CONTENT_TEMPLATE.TEXT_ALIGNMENT);
      dxData.set(CONTENT_TEMPLATE.TEXT_ALIGNMENT, value);
    }
  },
  textElementPaddingDesktop: () => {
    if (dataMap.get(CONTENT_TEMPLATE.TEXT_ELEMENT_PADDING_DESKTOP)) {
      let textElement: any = dataMap.get(CONTENT_TEMPLATE.TEXT_ELEMENT_PADDING_DESKTOP);
      const textElementDesktop = parseInt(textElement.integer);
      dxData.set(CONTENT_TEMPLATE.TEXT_ELEMENT_PADDING_DESKTOP, textElementDesktop);
    }
  },
  textElementPaddingTablet: () => {
    if (dataMap.get(CONTENT_TEMPLATE.TEXT_ELEMENT_PADDING_TABLET)) {
      let textElement: any = dataMap.get(CONTENT_TEMPLATE.TEXT_ELEMENT_PADDING_TABLET);
      const textElementTablet = parseInt(textElement.integer);
      dxData.set(CONTENT_TEMPLATE.TEXT_ELEMENT_PADDING_TABLET, textElementTablet);
    }
  },
  textElementPaddingMobile: () => {
    if (dataMap.get(CONTENT_TEMPLATE.TEXT_ELEMENT_PADDING_MOBILE)) {
      let textElement: any = dataMap.get(CONTENT_TEMPLATE.TEXT_ELEMENT_PADDING_MOBILE);
      const textElementMobile = parseInt(textElement.integer);
      dxData.set(CONTENT_TEMPLATE.TEXT_ELEMENT_PADDING_MOBILE, textElementMobile);
    }
  },
  buttonAppearance: () => {
    if (dataMap.get(CONTENT_TEMPLATE.BUTTON_APPEARANCE)) {
      let val: string = CONTENT_TEMPLATE.PRIMARY;
      let value = dxDataHelper.getOptionSelection(dataMap, CONTENT_TEMPLATE.BUTTON_APPEARANCE);
      if (value === CONTENT_TEMPLATE.PRIMARY_BUTTON) {
        val = CONTENT_TEMPLATE.PRIMARY;
      }
      if (value === CONTENT_TEMPLATE.SECONDARY_BUTTON) {
        val = CONTENT_TEMPLATE.SECONDARY;
      }
      if (value === CONTENT_TEMPLATE.TEXT_LINK) {
        val = CONTENT_TEMPLATE.TEXT_APPEARANCE;
      }
      if (value === CONTENT_TEMPLATE.USE_ENTIRE_CONTENT_AREA_AS_LINK) {
        val = CONTENT_TEMPLATE.AREA;
      }
      dxData.set(CONTENT_TEMPLATE.BUTTON_APPEARANCE, val);
    }
  },
  heightDesktop: () => {
    if (dataMap.get(CONTENT_TEMPLATE.HEIGHT_DESKTOP)) {
      let heightData: any = dataMap.get(CONTENT_TEMPLATE.HEIGHT_DESKTOP);
      const heightDesktop = parseInt(heightData.integer);
      dxData.set(CONTENT_TEMPLATE.HEIGHT_DESKTOP, heightDesktop);
    }
  },
  heightTablet: () => {
    if (dataMap.get(CONTENT_TEMPLATE.HEIGHT_TABLET)) {
      let heightData: any = dataMap.get(CONTENT_TEMPLATE.HEIGHT_TABLET);
      const heightTablet = parseInt(heightData.integer);
      dxData.set(CONTENT_TEMPLATE.HEIGHT_TABLET, heightTablet);
    }
  },
  heightMobile: () => {
    if (dataMap.get(CONTENT_TEMPLATE.HEIGHT_MOBILE)) {
      let heightData: any = dataMap.get(CONTENT_TEMPLATE.HEIGHT_MOBILE);
      const heightMobile = parseInt(heightData.integer);
      dxData.set(CONTENT_TEMPLATE.HEIGHT_MOBILE, heightMobile);
    }
  },
  elementAlignment: () => {
    if (dataMap.get(CONTENT_TEMPLATE.ELEMENT_ALIGNMENT)) {
      let val: string = CONTENT_TEMPLATE.CENTER;
      let value = dxDataHelper.getOptionSelection(dataMap, CONTENT_TEMPLATE.ELEMENT_ALIGNMENT);
      if (value === "Start") {
        val = CONTENT_TEMPLATE.FLEX_START;
      }
      if (value === "Center") {
        val = CONTENT_TEMPLATE.CENTER;
      }
      if (value === "End") {
        val = CONTENT_TEMPLATE.FLEX_END;
      }
      dxData.set(CONTENT_TEMPLATE.ELEMENT_ALIGNMENT, val);
    }
  },
  borderRadius: () => {
    if (dataMap.get(CONTENT_TEMPLATE.BORDER_RADIUS)) {
      let borderData: any = dataMap.get(CONTENT_TEMPLATE.BORDER_RADIUS);
      const borderRadius = parseInt(borderData?.integer);
      dxData.set(CONTENT_TEMPLATE.BORDER_RADIUS, borderRadius);
    }
  },
  dropShadow: () => {
    if (dataMap.get(CONTENT_TEMPLATE.DROP_SHADOW)) {
      let val: boolean = false;
      let value = dxDataHelper.getOptionSelection(dataMap, CONTENT_TEMPLATE.DROP_SHADOW);
      if (value === CONTENT_TEMPLATE.USE_DROP_SHADOW || value === CONTENT_TEMPLATE.SHOW_DROP_SHADOW) {
        val = true;
      }
      dxData.set(CONTENT_TEMPLATE.DROP_SHADOW, val);
    }
  },
  layoutDirection: () => {
    if (dataMap.get(CONTENT_TEMPLATE.LAYOUT_DIRECTION)) {
      let status: any = "row";
      let value = dxDataHelper.getOptionSelection(dataMap, CONTENT_TEMPLATE.LAYOUT_DIRECTION);
      if (value === "Column") {
        status = "column";
      }
      dxData.set(CONTENT_TEMPLATE.LAYOUT_DIRECTION, status);
    }
  },

  videoUsage: () => {
    let status: boolean = false;
    let value = dxDataHelper.getOptionSelection(dataMap, CONTENT_TEMPLATE.USE_AS_BACKGROUND_VIDEO);
    if (value === CONTENT_TEMPLATE.VIDEO_USAGE) {
      status = true;
    }
    dxData.set(CONTENT_TEMPLATE.USE_AS_BACKGROUND_VIDEO, status);
  },
  videoControl: () => {
    if (dataMap.get(CONTENT_TEMPLATE.VIDEO_CONTROLS)) {
      let status: boolean = false;
      let value = dxDataHelper.getOptionSelection(dataMap, CONTENT_TEMPLATE.VIDEO_CONTROLS);
      if (value === CONTENT_TEMPLATE.SHOW_VIDEO_CONTROLS) {
        status = true;
      }
      dxData.set(CONTENT_TEMPLATE.VIDEO_CONTROLS, status);
    }
  },
  videoVolume: () => {
    if (dataMap.get(CONTENT_TEMPLATE.VIDEO_VOLUME)) {
      let status: boolean = false;
      let value = dxDataHelper.getOptionSelection(dataMap, CONTENT_TEMPLATE.VIDEO_VOLUME);
      if (value === CONTENT_TEMPLATE.NOT_MUTED) {
        status = true;
      }
      dxData.set(CONTENT_TEMPLATE.VIDEO_VOLUME, status);
    }
  },
  videoAutoPlay: () => {
    if (dataMap.get(CONTENT_TEMPLATE.VIDEO_AUTOPLAY)) {
      const value: string = dxDataHelper.getOptionSelection(dataMap, CONTENT_TEMPLATE.VIDEO_AUTOPLAY);
      const autoPlay: boolean = value
        ? value.toLowerCase() === CONTENT_TEMPLATE.VIDEO_AUTOPLAY_YES.toLowerCase()
        : false;
      dxData.set(CONTENT_TEMPLATE.VIDEO_AUTOPLAY, autoPlay);
    }
  },
  videoPoster: () => {
    let elem = dataMap.get(CONTENT_TEMPLATE.VIDEO_POSTER);
    if (elem) {
      let AltURL: any;
      let URL = elem.image?.resourceUri?.value;
      if (!URL) {
        AltURL = dataMap.get(CONTENT_TEMPLATE.VIDEO_POSTER_ALTERNATE_URL);
        URL = AltURL?.value;
      }
      URL = URL?.split(DX_HOST)[1];
      URL = DX_HOST + URL;
      dxData.set(CONTENT_TEMPLATE.VIDEO_POSTER, URL);
    }
  },
  mlTranslation: () => {
    if (dataMap.get(CONTENT_TEMPLATE.ML_TRANSLATION)) {
      let text: any = dataMap.get(CONTENT_TEMPLATE.ML_TRANSLATION);
      dxData.set(CONTENT_TEMPLATE.ML_TRANSLATION, text.value);
    }
  },

  /**
   * Generic method to which can be used to identify the option selected in case of radio button fields
   * @param  {any} valueMap: processed DxData Map
   * @param  {string} type: name of field
   * @returns string
   */
  getOptionSelection: (valueMap: any, type: string): string => {
    let option: any;
    let value: any;
    const optionObject = valueMap.get(type);
    option =
      optionObject && optionObject.optionselection.options.option ? optionObject.optionselection.options.option : "";
    for (let val of option) {
      if (val.selected) {
        value = val.value;
      }
    }
    return value;
  },
};
