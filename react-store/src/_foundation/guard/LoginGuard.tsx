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
import { matchRoutes, useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";
//Foundation libraries
import { useSite } from "../../_foundation/hooks/useSite";
//Custom libraries
import { ROUTE_CONFIG } from "../../configs/routes";
import { REGISTER_PROTECTED, GENERIC_PROTECTED, HOME, MP_SELLER_REG_PROTECTED } from "../../constants/routes";
//Redux
import { loginStatusSelector, userInitStatusSelector } from "../../redux/selectors/user";
import { MP_ENABLED, MP_SELLER_REG_ENABLED, STRING_TRUE } from "../../constants/common";

const LoginGuard: React.FC = () => {
  const { mySite } = useSite();
  const location: any = useLocation();
  const navigate = useNavigate();
  const loginStatus = useSelector(loginStatusSelector);
  const userInited = useSelector(userInitStatusSelector);

  useEffect(() => {
    if (mySite && userInited) {
      const { userData = {} } = mySite.storeCfg ?? {};
      const mpSellerRegEnabled =
        STRING_TRUE === userData[MP_ENABLED] && STRING_TRUE === userData[MP_SELLER_REG_ENABLED];
      const routes = mySite.isB2B ? ROUTE_CONFIG.B2B : ROUTE_CONFIG.B2C;
      const branch = matchRoutes(routes, location.pathname);

      let protectedRoute =
        !mpSellerRegEnabled && branch?.some(({ route }) => route["isProtected"] === MP_SELLER_REG_PROTECTED);

      if (!protectedRoute) {
        if (!loginStatus) {
          protectedRoute = branch?.some((b) => {
            return b.route["isProtected"] === REGISTER_PROTECTED;
          });
        } else {
          protectedRoute = branch?.some((b) => {
            return b.route["isProtected"] === GENERIC_PROTECTED;
          });
        }
      }

      if (protectedRoute) {
        navigate(HOME);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, loginStatus, mySite, userInited]);

  return <></>;
};

export default LoginGuard;
