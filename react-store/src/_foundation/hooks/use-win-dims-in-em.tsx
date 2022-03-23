/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020,2021
 *
 *==================================================
 */

import { useEffect, useState } from "react";

export const useWinDimsInEM = () => {
  const { clientWidth, clientHeight } = document.documentElement;
  const w = clientWidth / 16.0;
  const h = clientHeight / 16.0;
  const w_px = clientWidth;
  const h_px = clientHeight;
  const [dims, setDims] = useState({ w, h, w_px, h_px });

  useEffect(() => {
    const calcResize = () => {
      const { clientWidth, clientHeight } = document.documentElement;
      const w = clientWidth / 16.0;
      const h = clientHeight / 16.0;
      const w_px = clientWidth;
      const h_px = clientHeight;
      setDims({ w, w_px, h_px, h });
    };

    window.addEventListener("resize", calcResize);
    return () => window.removeEventListener("resize", calcResize);
  }, []);

  return dims;
};
