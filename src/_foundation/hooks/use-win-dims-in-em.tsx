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
  const { innerWidth, innerHeight } = window;
  const w = innerWidth / 16.0;
  const h = innerHeight / 16.0;
  const [dims, setDims] = useState({ w, h });

  useEffect(() => {
    const calcResize = () => {
      const { innerWidth, innerHeight } = window;
      const w = innerWidth / 16.0;
      const h = innerHeight / 16.0;
      setDims({ w, h });
    };

    window.addEventListener("resize", calcResize);
    return () => window.removeEventListener("resize", calcResize);
  }, []);

  return dims;
};
