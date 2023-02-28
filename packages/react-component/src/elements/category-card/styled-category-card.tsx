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
import styled from "@mui/styled-engine-sc";
import { StyledLink } from "../link";
import { StyledBox } from "../box";

/**
 * The styling for Category Card layout.
 */
export const StyledCategoryCard = styled(({ ...props }) =>
  props.to ? <StyledLink {...props} /> : <StyledBox {...props} />
)`
  ${({ theme }) => `
   display: block;

   img {
     display: block;
     transition: transform ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeIn};
   }

   a&:hover {
     .MuiPaper-root {
       box-shadow: ${theme.shadows[2]};
     }

     img {
       transform: scale(0.92);
       border-radius: ${theme.shape.borderRadius}px;
     }

     .MuiTypography-root  {
       color: ${theme.palette.primary.main};
     }
   }

   ${theme.breakpoints.down("md")} {
     .category-card-text {
       &.MuiTypography-h3 {
         font-size: 1.5rem;
       }
       &.MuiTypography-subtitle2 {
         font-size: 0.9rem;
         margin-top: ${theme.spacing(1)};
       }
     }
   }
   `}
`;
