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
// Standard libraries
import React from "react";

// UI
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
//Custom
import { constants } from "@hcl-commerce-store-sdk/utils";

interface IconLoadProps {
  fileExtension: string;
}

/**
 * displays list of Attachment
 * @param props
 * @param fileExtension
 */

export const IconLoad: React.FC<IconLoadProps> = ({ fileExtension }) => {
  const extentionValidation = {
    image: constants.IMAGE,
    video: constants.VIDEO,
  };
  const iconload = (extension: string) => {
    if (extension === extentionValidation.image) {
      return <ImageRoundedIcon />;
    } else if (extension === extentionValidation.video) {
      return <OndemandVideoOutlinedIcon />;
    } else {
      return <AttachFileOutlinedIcon />;
    }
  };

  return iconload(fileExtension.toUpperCase().split("/")[0]);
};
