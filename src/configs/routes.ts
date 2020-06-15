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
import { lazy } from "react";
//Custom libraries
import * as ROUTES from "../constants/routes";

//Common pages
const SEO = lazy(() => import("../_foundation/seo/SEO"));
const Home = lazy(() => import("../components/pages/home/Home"));
const Cart = lazy(() => import("../components/pages/cart/Cart"));
const Checkout = lazy(() => import("../components/pages/checkout/Checkout"));
const SignIn = lazy(() => import("../components/pages/sign-in/SignIn"));
const SearchResults = lazy(() =>
  import("../components/pages/search-results/SearchResults")
);

//Emerald pages
const Account = lazy(() =>
  import("../components/pages/_emerald/account/Account")
);

//Sapphire pages
const Dashboard = lazy(() =>
  import("../components/pages/_sapphire/dashboard/Dashboard")
);
const OrderHistory = lazy(() =>
  import("../components/pages/_sapphire/order/OrderHistoryPage")
);
const RecurringOrders = lazy(() =>
  import("../components/pages/_sapphire/order/RecurringOrdersPage")
);
const OrderDetailsPage = lazy(() =>
  import("../components/pages/_sapphire/order/OrderDetailsPage")
);
const AccountSummary = lazy(() =>
  import("../components/pages/_sapphire/account-summary/AccountSummary")
);
const BuyerUserRegistration = lazy(() =>
  import(
    "../components/pages/_sapphire/buyer-user-registration/BuyerUserRegistration"
  )
);
const BuyerOrganizationRegistration = lazy(() =>
  import(
    "../components/pages/_sapphire/buyer-organization-registration/BuyerOrganizationRegistration"
  )
);

export const ROUTE_CONFIG = {
  B2B: [
    {
      key: ROUTES.HOME,
      path: ROUTES.HOME,
      exact: true,
      component: Home,
    },
    {
      key: ROUTES.DASHBOARD,
      path: ROUTES.DASHBOARD,
      exact: true,
      isProtected: ROUTES.REGISTER_PROTECTED,
      component: Dashboard,
    },
    {
      key: ROUTES.PERSONAL_INFORMATION,
      path: ROUTES.PERSONAL_INFORMATION,
      exact: true,
      isProtected: ROUTES.REGISTER_PROTECTED,
      component: AccountSummary,
    },
    {
      key: ROUTES.CART,
      path: ROUTES.CART,
      exact: true,
      isProtected: ROUTES.REGISTER_PROTECTED,
      component: Cart,
    },
    {
      key: ROUTES.SIGNIN,
      path: ROUTES.SIGNIN,
      exact: true,
      isProtected: ROUTES.GENERIC_PROTECTED,
      component: SignIn,
    },
    {
      key: ROUTES.ORG_REGISTRATION,
      path: ROUTES.ORG_REGISTRATION,
      exact: true,
      isProtected: ROUTES.GENERIC_PROTECTED,
      component: BuyerOrganizationRegistration,
    },
    {
      key: ROUTES.BUYER_REGISTRATION,
      path: ROUTES.BUYER_REGISTRATION,
      exact: true,
      isProtected: ROUTES.GENERIC_PROTECTED,
      component: BuyerUserRegistration,
    },
    {
      key: ROUTES.CHECKOUT,
      path: ROUTES.CHECKOUT,
      exact: true,
      isProtected: ROUTES.REGISTER_PROTECTED,
      component: Checkout,
    },
    {
      key: ROUTES.SEARCH,
      path: ROUTES.SEARCH,
      exact: true,
      component: SearchResults,
    },
    {
      key: ROUTES.ORDER_HISTORY,
      path: ROUTES.ORDER_HISTORY,
      exact: true,
      isProtected: ROUTES.REGISTER_PROTECTED,
      component: OrderHistory,
    },
    {
      key: ROUTES.RECURRING_ORDERS,
      path: ROUTES.RECURRING_ORDERS,
      exact: true,
      isProtected: ROUTES.REGISTER_PROTECTED,
      component: RecurringOrders,
    },
    {
      key: ROUTES.ORDER_DETAILS,
      path: ROUTES.ORDER_DETAILS_ROUTE,
      exact: true,
      isProtected: ROUTES.REGISTER_PROTECTED,
      component: OrderDetailsPage,
    },
    {
      key: "other",
      path: "/*",
      exact: true,
      component: SEO,
    },
  ],
  B2C: [
    {
      key: ROUTES.HOME,
      path: ROUTES.HOME,
      exact: true,
      component: Home,
    },
    {
      key: ROUTES.CART,
      path: ROUTES.CART,
      exact: true,
      component: Cart,
    },
    {
      key: ROUTES.SIGNIN,
      path: ROUTES.SIGNIN,
      exact: true,
      isProtected: ROUTES.GENERIC_PROTECTED,
      component: SignIn,
    },
    {
      key: ROUTES.CHECKOUT,
      path: ROUTES.CHECKOUT,
      exact: true,
      component: Checkout,
    },
    {
      key: ROUTES.ACCOUNT,
      path: ROUTES.ACCOUNT,
      exact: true,
      isProtected: ROUTES.REGISTER_PROTECTED,
      component: Account,
    },
    {
      key: ROUTES.SEARCH,
      path: ROUTES.SEARCH,
      exact: true,
      component: SearchResults,
    },
    {
      key: "other",
      path: "/*",
      exact: true,
      component: SEO,
    },
  ],
};
