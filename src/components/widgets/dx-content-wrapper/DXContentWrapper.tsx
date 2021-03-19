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
import React, { useState, useEffect } from "react";
import Axios, { Canceler } from "axios";
import getDisplayName from "react-display-name";
//Foundation libraries
import contentControllerService from "../../../_foundation/apis/dx/contentController.service";
import mLConfigControllerService from "../../../_foundation/apis/dx/mLConfigController.service";

import { localStorageUtil } from "../../../_foundation/utils/storageUtil";
import { useSite } from "../../../_foundation/hooks/useSite";
import { LOCALE } from "../../../_foundation/constants/common";
//Custom libraries
import {
  CONTENT_TEMPLATE,
  CONTENT_TYPE_VIDEO,
} from "../../../constants/marketing";
import { DXContent } from "./DXContent";
import { DXVideoContent } from "./DXVideoContent";
import { isNull } from "lodash-es";
import { CommerceEnvironment } from "../../../constants/common";

interface DXContentWrapperProps {
  contentId: string;
  transform?: Function;
}

/**
 * DX Content Wrapper
 * fetches DX content response and routes to UI component based on type
 * @param props
 */
const DXContentWrapper: React.FC<DXContentWrapperProps> = (props: any) => {
  const widgetName = getDisplayName(DXContentWrapper);
  const content_id = props.contentId;
  const transform = props.transform;

  const [content, setContent] = useState<any>(null);
  const [contentType, setContentType] = useState<string>("");

  const CancelToken = Axios.CancelToken;
  let cancels: Canceler[] = [];

  const payloadBase: any = {
    widget: widgetName,
    cancelToken: new CancelToken(function executor(c) {
      cancels.push(c);
    }),
  };

  const childProps = {
    content: content,
    transform: transform,
  };
  const { mySite } = useSite();
  useEffect(() => {
    if (content_id) {
      if (mySite) {
        const locale =
          localStorageUtil.get(LOCALE)?.split("_")[0] ||
          CommerceEnvironment.dxLanguageMap[mySite.defaultLanguageID];
        const payload = {
          skipErrorSnackbar: true,
          content_id,
          access_type: "dxrest",
          locale,
          ...payloadBase,
        };
        mLConfigControllerService
          .accessMLSTranslations(payload)
          .then((res) => {
            var mlcontentId: any;
            mlcontentId = res?.data?.translatedItems[locale].id;
            if (mlcontentId !== isNull) {
              const payload_translation = {
                content_id: mlcontentId,
                access_type: "dxrest",
                ...payloadBase,
              };
              contentControllerService
                .webContentReadContent(payload_translation)
                .then((res) => {
                  if (res?.data?.content) {
                    setContent(res.data.content);
                    let templateID = res.data.links.contentTemplate.href;
                    templateID = templateID.split("/content-templates/")[1];
                    if (templateID === CONTENT_TEMPLATE.VIDEO_TEMPLATE_ID) {
                      setContentType(CONTENT_TYPE_VIDEO);
                    }
                  }
                });
            }
          })
          .catch((error) => {
            contentControllerService
              .webContentReadContent(payload)
              .then((res) => {
                if (res?.data?.content) {
                  setContent(res.data.content);
                  let templateID = res.data.links.contentTemplate.href;
                  templateID = templateID.split("/content-templates/")[1];
                  if (templateID === CONTENT_TEMPLATE.VIDEO_TEMPLATE_ID) {
                    setContentType(CONTENT_TYPE_VIDEO);
                  }
                }
              })
              .catch((error) => {
                console.log(error);
              });
          });
      }
    }
    return () => {
      cancels.forEach((cancel) => cancel("Cancel due to component unmounted"));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mySite]);

  return contentType === CONTENT_TYPE_VIDEO ? (
    <DXVideoContent {...childProps} />
  ) : (
    <DXContent {...childProps} />
  );
};

export default DXContentWrapper;
