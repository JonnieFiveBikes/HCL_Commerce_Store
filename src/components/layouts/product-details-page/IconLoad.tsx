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
import { useTranslation } from "react-i18next";
import React from "react";
//UI
import ImageRoundedIcon from "@material-ui/icons/ImageRounded";
import AttachFileOutlinedIcon from "@material-ui/icons/AttachFileOutlined";
import OndemandVideoOutlinedIcon from "@material-ui/icons/OndemandVideoOutlined";
//Custom
import { IMAGE, VIDEO } from "../../../constants/common";

/**
 * displays list of Attachment
 * @param props
 * @param fileExtension
 */

function IconLoad({ fileExtension }: any) {
  const { t } = useTranslation();

  const extentionValidation = {
    image: IMAGE,
    video: VIDEO,
  };
  const iconload = (extension: String) => {
    if (extension === extentionValidation.image) {
      return <ImageRoundedIcon />;
    } else if (extension === extentionValidation.video) {
      return <OndemandVideoOutlinedIcon />;
    } else {
      return <AttachFileOutlinedIcon />;
    }
  };

  return iconload(fileExtension.toUpperCase().split("/")[0]);
}

export { IconLoad };
