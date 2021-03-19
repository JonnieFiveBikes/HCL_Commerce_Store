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
const Home = lazy(() => import("../components/pages/home/Home"));
const Cart = lazy(() => import("../components/pages/cart/Cart"));

//component
const SignIn = lazy(() => import("../components/pages/sign-in/SignIn"));
const ForgotPassword = lazy(
  () => import("../components/widgets/forgot-password/ForgotPassword")
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
const Checkout = lazy(() => import("../components/pages/checkout/Checkout"));
const Shipping = lazy(
  () => import("../components/pages/checkout/shipping/Shipping")
);
const Billing = lazy(
  () => import("../components/pages/checkout/payment/Payment")
);
const Review = lazy(() => import("../components/pages/checkout/review/Review"));
const OrderConfirmation = lazy(
  () => import("../components/pages/order-confirmation/OrderConfirmation")
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
    key: ROUTES.CHECKOUT,
    path: ROUTES.CHECKOUT,
    isProtected: ROUTES.REGISTER_PROTECTED,
    component: Checkout,
    routes: CheckoutRouteConfig,
  },
  {
    key: ROUTES.ORDER_CONFIRMATION,
    path: ROUTES.ORDER_CONFIRMATION,
    isProtected: ROUTES.REGISTER_PROTECTED,
    component: OrderConfirmation,
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
    key: "other",
    path: "/*",
    exact: true,
    component: SEO,
  },
];
const B2CRouteConfig: RouteConfig[] = [
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
    key: ROUTES.FORGOT_PASSWORD,
    path: ROUTES.FORGOT_PASSWORD,
    exact: true,
    isProtected: ROUTES.GENERIC_PROTECTED,
    component: ForgotPassword,
  },
  {
    key: ROUTES.CHECKOUT,
    path: ROUTES.CHECKOUT,
    component: Checkout,
    routes: CheckoutRouteConfig,
  },
  {
    key: ROUTES.ORDER_CONFIRMATION,
    path: ROUTES.ORDER_CONFIRMATION,
    component: OrderConfirmation,
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
    key: "other",
    path: "/*",
    exact: true,
    component: SEO,
  },
];
export const ROUTE_CONFIG = {
  B2B: B2BRouteConfig,
  B2C: B2CRouteConfig,
};
