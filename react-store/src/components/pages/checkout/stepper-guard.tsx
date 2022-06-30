/**
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
import React, { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router";
import * as ROUTES from "../../../constants/routes";

export interface StepperGuardProps {
  setVisited: (arg0: number) => void;
  visited: number;
  steps: string[];
  activeStep: number;
  isCheckoutWithProfile: boolean;
}

interface ContextType {
  extraProps: any;
}

export const CheckoutStepperGuard: React.FC<StepperGuardProps> = ({
  setVisited,
  visited,
  steps = [],
  activeStep,
  isCheckoutWithProfile,
}: any) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (steps.length > 0 && activeStep !== undefined) {
      if ((activeStep && activeStep < 0) || (activeStep > visited + 1 && !isCheckoutWithProfile)) {
        navigate(ROUTES.CHECKOUT, { replace: true });
      } else {
        setVisited(activeStep);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStep, steps, setVisited, visited]);

  return null;
};

export const withOutletContext =
  (WrappedComponent: React.ComponentType<any>): React.FC<any> =>
  () => {
    const { extraProps } = useOutletContext<ContextType>();
    return <WrappedComponent {...extraProps} />;
  };
