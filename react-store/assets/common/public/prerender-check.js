/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2023
 *
 *==================================================
 */

// setup prerender for crawler
window.prerenderReady = false;
if (
  typeof navigator !== "undefined" &&
  (navigator.userAgent.includes("Prerender") || navigator.userAgent.includes("prerender"))
) {
  window.__isPrerender__ = true;
}
