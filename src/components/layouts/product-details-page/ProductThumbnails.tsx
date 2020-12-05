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
import ProductThumbnailSlider from "./ProductThumbnailSlider";

interface ProductThumbnailsProps {
  imageList: any[];
  changeMainImage: Function;
  index?: number;
}

const ProductThumbnails: React.FC<ProductThumbnailsProps> = (
  props: ProductThumbnailsProps
) => {
  const { imageList, changeMainImage, index } = props;

  const chooseImage = (index: number) => {
    changeMainImage(index);
  };
  return (
    <ProductThumbnailSlider
      slidesList={imageList}
      chooseImage={chooseImage}
      index={index}
    />
  );
};

export default ProductThumbnails;
