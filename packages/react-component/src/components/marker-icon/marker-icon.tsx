/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2022
 *
 *==================================================
 */
import { SvgIcon } from "@mui/material";

export const MarkerIcon = ({ label, ...props }) => {
  return (
    <SvgIcon style={{ height: "50", width: "40" }}>
      <path
        d="M 12,2 C 8.1340068,2 5,5.1340068 5,9 c 0,5.25 7,13 7,13 0,0 7,-7.75 7,-13 0,-3.8659932 -3.134007,-7 -7,-7 z"
        fill="#6393F2"
      />
      <text fontSize="10" fill="white" x="12" y="13" textAnchor="middle">
        {label}
      </text>
    </SvgIcon>
  );
};
