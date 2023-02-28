/*
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

//standard libraries
import React, { useRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import { CardMedia } from "@mui/material";

/**
 * Type definition for props of {@link MarketingContentMedia}
 */
type MarketingContentMediaProps = {
  /**
   * The media type of the content, whether is `video` or not
   */
  media?: string;
  /**
   * The source path for the media.
   */
  source: string;
  /**
   * Indicates whether or not the video autoplay need to enabled.
   */
  autoPlay?: boolean;
  /**
   * Indicates whether the HTML video control menu is enabled or not.
   */
  controls?: boolean;
  /**
   * Indicate whether to mute the volume of the video or not.
   */
  muted?: boolean;
  /**
   * If `true`, it specifies that the video will start over again, every time it is finished.
   */
  loop?: boolean;
  /**
   * The other attributes that supported by HTML video tag.
   */
  [extraProp: string]: any;
};

/**
 * The marketing media content React component.
 * For props definition @see {@link MarketingContentMediaProps}
 * @param props media properties
 */
export const MarketingContentMedia: React.FC<MarketingContentMediaProps> = ({ media, source, ...props }) => {
  const isVideo = media === "video";
  const component = isVideo ? "video" : "div";
  const { autoPlay, controls, muted, loop, ...rest } = props;
  const vidRef: any = useRef(null);

  const debouncedCallback = useDebouncedCallback(() => {
    handleScroll();
  }, 200);

  const handleScroll = () => {
    let dimensions: any;
    if (vidRef && vidRef.current) {
      dimensions = vidRef.current.parentElement.getBoundingClientRect();
      if (dimensions?.height > -dimensions?.y) {
        vidRef.current?.play();
      } else {
        vidRef.current?.pause();
      }
    }
  };

  if (isVideo) {
    window.addEventListener("scroll", debouncedCallback, true);

    if (autoPlay) {
      Object.assign(rest, { autoPlay });
    }
    if (controls) {
      Object.assign(rest, { controls });
    }
    if (muted) {
      Object.assign(rest, { muted });
    }
    Object.assign(rest, { loop: true, className: "video" });
  }

  return <CardMedia ref={vidRef} component={component} image={source} {...rest} />;
};
