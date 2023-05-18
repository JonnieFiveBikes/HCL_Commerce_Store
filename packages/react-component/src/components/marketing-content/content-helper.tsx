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
import { DOMNode, Element, domToReact } from "html-react-parser";
import { camelCase } from "lodash-es";
import { StyledTypography, StyledContainer, StyledGrid } from "../../elements";

export const COMPONENT_CONST = {
  grid: "Grid",
  typography: "Typography",
  container: "Container",
};
//typography
const typographyPrefix = "MuiTypography-";
const typographyAlignPrefix = `${typographyPrefix}align`;
const variants = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "subtitle1",
  "subtitle2",
  "body1",
  "body2",
  "caption",
  "button",
  "overline",
];
//container
const containerPrefix = "MuiContainer-";
//grid
const gridPrefix = "MuiGrid-";
const gridItem = `${gridPrefix}item`;
const gridContainer = `${gridPrefix}container`;
const gridBreakPointXS = `${gridPrefix}grid-xs-`;
const gridBreakPointMD = `${gridPrefix}grid-md-`;
const gridBreakPointSM = `${gridPrefix}grid-sm-`;
const gridBreakPointLG = `${gridPrefix}grid-lg-`;
const gridBreakPointXL = `${gridPrefix}grid-xl-`;

// minimum support for MUI Container, Grid and Typography
export const findMuiComponentAttributes = (classNames: string[]) => {
  const result: any = {};

  for (const _s of classNames) {
    const s = _s.trim();
    if (s.indexOf(typographyAlignPrefix) === 0) {
      result.component = COMPONENT_CONST.typography;
      result.align = s.substring(typographyAlignPrefix.length).toLowerCase();
    } else if (s.indexOf(typographyPrefix) === 0) {
      result.component = COMPONENT_CONST.typography;
      const _variantCandidate = s.substring(typographyPrefix.length);
      if (variants.includes(_variantCandidate)) {
        result.variant = _variantCandidate;
      }
    } else if (s.indexOf(containerPrefix) === 0) {
      result.component = COMPONENT_CONST.container;
    } else if (s.indexOf(gridPrefix) === 0) {
      result.component = COMPONENT_CONST.grid;
      if (s.indexOf(gridContainer) === 0) {
        result.container = true;
      } else if (s.indexOf(gridItem) === 0) {
        result.item = true;
      } else if (s.indexOf(gridBreakPointXS) === 0) {
        result.xs = Number(s.substring(gridBreakPointXL.length));
      } else if (s.indexOf(gridBreakPointSM) === 0) {
        result.sm = Number(s.substring(gridBreakPointSM.length));
      } else if (s.indexOf(gridBreakPointMD) === 0) {
        result.md = Number(s.substring(gridBreakPointMD.length));
      } else if (s.indexOf(gridBreakPointLG) === 0) {
        result.sm = Number(s.substring(gridBreakPointLG.length));
      }
    }
  }
  return result;
};

export const parseStyle = (styles: string) => {
  if (styles) {
    const style: any = {};
    styles
      .split(/\s*;\s*/)
      .filter(Boolean)
      .forEach((s) => {
        const sl = s.split(/\s*:\s*/).filter(Boolean);
        if (sl.length === 2) {
          const [key, value] = sl;
          style[camelCase(key)] = value.replace("px", "");
        }
      });
    return style;
  }
  return null;
};

export const replaceDx = (node: DOMNode): any => {
  let rc: JSX.Element | null = null;

  if (node instanceof Element && node.type === "tag") {
    const { class: className = "", style: _style, ...attrs } = node.attribs;
    const _result = findMuiComponentAttributes(className.split(" "));
    if (_result) {
      const { component, ...result } = _result;
      const style = parseStyle(_style);
      if (component === COMPONENT_CONST.typography && (result.variant || result.align)) {
        rc = (
          <StyledTypography {...result} component={node.name} {...{ className, style, ...attrs }}>
            {node.children && domToReact(node.children, { replace: replaceDx })}
          </StyledTypography>
        );
      } else if (component === COMPONENT_CONST.container) {
        rc = (
          <StyledContainer {...{ className, style, ...attrs }}>
            {node.children && domToReact(node.children, { replace: replaceDx })}
          </StyledContainer>
        );
      } else if (component === COMPONENT_CONST.grid) {
        rc = (
          <StyledGrid {...result} {...{ className, style, ...attrs }}>
            {node.children && domToReact(node.children, { replace: replaceDx })}
          </StyledGrid>
        );
      }
    }
  }

  return rc;
};
