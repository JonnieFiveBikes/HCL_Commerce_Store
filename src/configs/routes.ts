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
import { RouteConfig } from "react-router-config";

//Common pages
const SEO = lazy(() => import("../_foundation/seo/SEO"));

//component
const SignIn = lazy(() => import("../components/pages/sign-in/SignIn"));
const ForgotPassword = lazy(
  () => import("../components/pages/forgot-password/ForgotPassword")
);
const AddressBook = lazy(
  () => import("../components/pages/address-book/AddressBook")
);
const EditAddress = lazy(
  () => import("../components/pages/address-book/EditAddress")
);
const AddAddress = lazy(
  () => import("../components/pages/address-book/AddAddress")
);
const SearchResults = lazy(
  () => import("../components/pages/search-results/SearchResults")
);

//checkout
const Shipping = lazy(
  () => import("../components/pages/checkout/shipping/Shipping")
);
const Billing = lazy(() => import("../components/widgets/checkout-payment"));

const Review = lazy(() => import("../components/widgets/checkout-review"));
const CheckoutProfiles = lazy(
  () => import("../components/pages/checkout-profile/CheckoutProfiles")
);

//Emerald pages
const Account = lazy(
  () => import("../components/pages/_emerald/account/Account")
);

//Sapphire pages
const Dashboard = lazy(
  () => import("../components/pages/_sapphire/dashboard/Dashboard")
);
const OrderHistoryPage = lazy(
  () => import("../components/pages/_sapphire/order/OrderHistoryPage")
);
const RecurringOrders = lazy(
  () => import("../components/pages/_sapphire/order/RecurringOrdersPage")
);
const OrderDetailsPage = lazy(
  () => import("../components/pages/_sapphire/order/OrderDetailsPage")
);
const AccountSummary = lazy(
  () => import("../components/pages/_sapphire/account-summary/AccountSummary")
);
const BuyerUserRegistration = lazy(
  () =>
    import(
      "../components/pages/_sapphire/buyer-user-registration/BuyerUserRegistration"
    )
);
const BuyerOrganizationRegistration = lazy(
  () =>
    import(
      "../components/pages/_sapphire/buyer-organization-registration/BuyerOrganizationRegistration"
    )
);
const AdminTools = lazy(
  () => import("../components/pages/_sapphire/adminTools/AdminTools")
);
const CheckoutProfileCreate = lazy(
  () => import("../components/pages/checkout-profile/CheckoutProfileCreate")
);
const InprogressOrderDetailsPage = lazy(
  () =>
    import("../components/pages/_sapphire/order/inprogress-order-details-page")
);

const InprogressOrders = lazy(
  () => import("../components/pages/_sapphire/order/inprogress-orders")
);

const CheckoutRouteConfig: RouteConfig[] = [
  {
    key: ROUTES.CHECKOUT_SHIPPING,
    path: ROUTES.CHECKOUT_SHIPPING,
    component: Shipping,
  },
  {
    key: ROUTES.CHECKOUT_PAYMENT,
    path: ROUTES.CHECKOUT_PAYMENT,
    component: Billing,
  },
  {
    key: ROUTES.CHECKOUT_REVIEW,
    path: ROUTES.CHECKOUT_REVIEW,
    component: Review,
  },
];

const B2BRouteConfig: RouteConfig[] = [
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
    key: ROUTES.SIGNIN,
    path: ROUTES.SIGNIN,
    exact: true,
    isProtected: ROUTES.GENERIC_PROTECTED,
    component: SignIn,
  },
  {
    key: ROUTES.FORGOT_PASSWORD,
    path: ROUTES.FORGOT_PASSWORD,
    exact: true,
    isProtected: ROUTES.GENERIC_PROTECTED,
    component: ForgotPassword,
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
    key: ROUTES.CHECKOUT_PROFILE_CREATE,
    path: ROUTES.CHECKOUT_PROFILE_CREATE,
    isProtected: ROUTES.REGISTER_PROTECTED,
    component: CheckoutProfileCreate,
  },
  {
    key: ROUTES.CHECKOUT_PROFILE_EDIT,
    path: ROUTES.CHECKOUT_PROFILE_EDIT,
    isProtected: ROUTES.REGISTER_PROTECTED,
    component: CheckoutProfileCreate,
  },
  {
    key: ROUTES.CHECKOUT_PROFILES,
    path: ROUTES.CHECKOUT_PROFILES,
    isProtected: ROUTES.REGISTER_PROTECTED,
    component: CheckoutProfiles,
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
    component: OrderHistoryPage,
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
    key: ROUTES.ADDRESS_BOOK,
    path: ROUTES.ADDRESS_BOOK,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    component: AddressBook,
  },
  {
    key: ROUTES.EDIT_ADDRESS,
    path: ROUTES.EDIT_ADDRESS_ROUTE,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    component: EditAddress,
  },
  {
    key: ROUTES.ADD_ADDRESS,
    path: ROUTES.ADD_ADDRESS,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    component: AddAddress,
  },
  {
    key: ROUTES.ORGANIZATION_MANAGEMENT,
    path: ROUTES.ORGANIZATION_MANAGEMENT,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    component: AdminTools,
  },
  {
    key: ROUTES.BUYER_MANAGEMENT,
    path: ROUTES.BUYER_MANAGEMENT,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    component: AdminTools,
  },
  {
    key: ROUTES.APPROVALS_MANAGEMENT,
    path: ROUTES.APPROVALS_MANAGEMENT,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    component: AdminTools,
  },
  {
    key: ROUTES.ORDER_APPROVAL,
    path: ROUTES.ORDER_APPROVAL,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    component: AdminTools,
  },
  {
    key: ROUTES.IP_ORDER_DETAILS,
    path: ROUTES.IP_ORDER_DETAILS_ROUTE,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    component: InprogressOrderDetailsPage,
  },
  {
    key: ROUTES.INPROGRESS_ORDERS,
    path: ROUTES.INPROGRESS_ORDERS,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    component: InprogressOrders,
  },
  {
    key: "other",
    path: "/*",
    exact: true,
    component: SEO,
  },
];
const B2CRouteConfig: RouteConfig[] = [
  {
    key: ROUTES.SIGNIN,
    path: ROUTES.SIGNIN,
    exact: true,
    isProtected: ROUTES.GENERIC_PROTECTED,
    component: SignIn,
  },
  {
    key: ROUTES.FORGOT_PASSWORD,
    path: ROUTES.FORGOT_PASSWORD,
    exact: true,
    isProtected: ROUTES.GENERIC_PROTECTED,
    component: ForgotPassword,
  },
  {
    key: ROUTES.CHECKOUT_PROFILE_CREATE,
    path: ROUTES.CHECKOUT_PROFILE_CREATE,
    isProtected: ROUTES.REGISTER_PROTECTED,
    component: CheckoutProfileCreate,
  },
  {
    key: ROUTES.CHECKOUT_PROFILE_EDIT,
    path: ROUTES.CHECKOUT_PROFILE_EDIT,
    isProtected: ROUTES.REGISTER_PROTECTED,
    component: CheckoutProfileCreate,
  },
  {
    key: ROUTES.CHECKOUT_PROFILES,
    path: ROUTES.CHECKOUT_PROFILES,
    isProtected: ROUTES.REGISTER_PROTECTED,
    component: CheckoutProfiles,
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
    key: ROUTES.ADDRESS_BOOK,
    path: ROUTES.ADDRESS_BOOK,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    component: AddressBook,
  },
  {
    key: ROUTES.EDIT_ADDRESS,
    path: ROUTES.EDIT_ADDRESS_ROUTE,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    component: EditAddress,
  },
  {
    key: ROUTES.ADD_ADDRESS,
    path: ROUTES.ADD_ADDRESS,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    component: AddAddress,
  },
  {
    key: ROUTES.ORDER_HISTORY,
    path: ROUTES.ORDER_HISTORY,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    component: OrderHistoryPage,
  },
  {
    key: ROUTES.ORDER_DETAILS,
    path: ROUTES.ORDER_DETAILS_ROUTE,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    component: OrderDetailsPage,
  },
  {
    key: ROUTES.IP_ORDER_DETAILS,
    path: ROUTES.IP_ORDER_DETAILS_ROUTE,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    component: InprogressOrderDetailsPage,
  },
  {
    key: ROUTES.INPROGRESS_ORDERS,
    path: ROUTES.INPROGRESS_ORDERS,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    component: InprogressOrders,
  },
  {
    key: "other",
    path: "/*",
    exact: true,
    component: SEO,
  },
];
export const ROUTE_CONFIG = {
  B2B: B2BRouteConfig,
  B2C: B2CRouteConfig,
  Checkout: CheckoutRouteConfig,
};
