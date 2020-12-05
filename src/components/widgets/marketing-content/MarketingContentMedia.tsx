/*
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
import React, { useRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import { CardMedia } from "@material-ui/core";

const MarketingContentMedia = ({ media, source, ...props }) => {
  const isVideo = media === "video";
  const component = isVideo ? "video" : "div";
  let { autoPlay, controls, muted, loop, ...rest } = props;
  const vidRef: any = useRef(null);

  const [debouncedCallback] = useDebouncedCallback(() => {
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

  return (
    <CardMedia ref={vidRef} component={component} image={source} {...rest} />
  );
};

export default MarketingContentMedia;
