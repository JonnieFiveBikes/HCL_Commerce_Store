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
import { useLocation, useHistory } from "react-router";
import { useSelector } from "react-redux";
import { matchRoutes } from "react-router-config";
//Foundation libraries
import { useSite } from "../../_foundation/hooks/useSite";
//Custom libraries
import { ROUTE_CONFIG } from "../../configs/routes";
import {
  REGISTER_PROTECTED,
  GENERIC_PROTECTED,
  HOME,
} from "../../constants/routes";
//Redux
import {
  loginStatusSelector,
  userInitStatusSelector,
} from "../../redux/selectors/user";

const LoginGuard: React.FC = () => {
  const { mySite } = useSite();
  const location = useLocation();
  const history = useHistory();
  const loginStatus = useSelector(loginStatusSelector);
  const userInited = useSelector(userInitStatusSelector);

  useEffect(() => {
    if (mySite && userInited) {
      const routes = mySite.isB2B ? ROUTE_CONFIG.B2B : ROUTE_CONFIG.B2C;
      const branch = matchRoutes(routes, location.pathname);
      let protectedRoute;
      if (!loginStatus) {
        protectedRoute = branch.some((b) => {
          return b.route["isProtected"] === REGISTER_PROTECTED;
        });
      } else {
        protectedRoute = branch.some((b) => {
          return b.route["isProtected"] === GENERIC_PROTECTED;
        });
      }
      if (!!protectedRoute) {
        history.push(HOME);
      }
    }
  }, [location, loginStatus, mySite, userInited]);

  return <></>;
};

export default LoginGuard;
