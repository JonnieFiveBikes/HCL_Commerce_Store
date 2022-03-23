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
import React from "react";
import { ProductThumbnailSlider } from "./product-thumbnail-slider";

interface ProductThumbnailsProps {
  imageList: any[];
  changeMainImage: (index: number) => void;
  index?: number;
}

export const ProductThumbnails: React.FC<ProductThumbnailsProps> = (props: ProductThumbnailsProps) => {
  const { imageList: slidesList, changeMainImage, index } = props;

  const chooseImage = (index: number) => {
    changeMainImage(index);
  };
  return <ProductThumbnailSlider {...{ slidesList, chooseImage, index }} />;
};
