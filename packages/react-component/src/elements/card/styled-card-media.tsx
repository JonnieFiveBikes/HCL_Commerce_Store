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
import React from "react";
import styled from "styled-components";
import CardMedia from "@material-ui/core/CardMedia";
import { dimensions } from "../../themes/variables";

const thumbnailSize = dimensions.productCard.thumbnail;

const StyledCardMedia = styled(({ ...props }) => <CardMedia {...props} />)`
  width: ${thumbnailSize}px;
  height: ${thumbnailSize}px;
  margin: 20px auto 10px;
  background-size: contain;
  position: relative;
`;

export { StyledCardMedia };
