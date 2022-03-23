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

//component
const SignIn = lazy(() => import("../components/pages/sign-in/SignIn"));
const ForgotPassword = lazy(() => import("../components/pages/forgot-password/ForgotPassword"));
const AddressBook = lazy(() => import("../components/pages/address-book/AddressBook"));
const EditAddress = lazy(() => import("../components/pages/address-book/EditAddress"));
const AddAddress = lazy(() => import("../components/pages/address-book/AddAddress"));
const SearchResults = lazy(() => import("../components/pages/search-results/SearchResults"));

//checkout
const Shipping = lazy(() => import("../components/pages/checkout/shipping/Shipping"));
const Billing = lazy(() => import("../components/widgets/checkout-payment"));

const Review = lazy(() => import("../components/widgets/checkout-review"));
const CheckoutProfiles = lazy(() => import("../components/pages/checkout-profile/CheckoutProfiles"));

//Emerald pages
const Account = lazy(() => import("../components/pages/_emerald/account/Account"));

//Sapphire pages
const Dashboard = lazy(() => import("../components/pages/_sapphire/dashboard/Dashboard"));
const OrderHistoryPage = lazy(() => import("../components/pages/_sapphire/order/OrderHistoryPage"));
const RecurringOrders = lazy(() => import("../components/pages/_sapphire/order/RecurringOrdersPage"));
const OrderDetailsPage = lazy(() => import("../components/pages/_sapphire/order/OrderDetailsPage"));
const BuyerUserRegistration = lazy(
  () => import("../components/pages/_sapphire/buyer-user-registration/BuyerUserRegistration")
);
const BuyerOrganizationRegistration = lazy(
  () => import("../components/pages/_sapphire/buyer-organization-registration/BuyerOrganizationRegistration")
);
const AdminTools = lazy(() => import("../components/pages/_sapphire/adminTools/AdminTools"));
const CheckoutProfileCreate = lazy(() => import("../components/pages/checkout-profile/CheckoutProfileCreate"));
const InprogressOrderDetailsPage = lazy(
  () => import("../components/pages/_sapphire/order/inprogress-order-details-page")
);

const InprogressOrders = lazy(() => import("../components/pages/_sapphire/order/inprogress-orders"));

const RequisitionLists = lazy(() => import("../components/pages/_sapphire/requisition-lists/requisition-lists"));

const RequisitionListDetailsPage = lazy(
  () => import("../components/pages/_sapphire/requisition-lists/requisition-list-details-page")
);
const ViewUploadLogs = lazy(() => import("../components/pages/_sapphire/requisition-lists/ViewUploadLogs"));

const Compare = lazy(() => import("../components/pages/compare/compare"));

const CheckoutRouteConfig = (props) => [
  {
    key: ROUTES.CHECKOUT_SHIPPING,
    path: ROUTES.CHECKOUT_SHIPPING,
    element: <Shipping {...props} />,
  },
  {
    key: ROUTES.CHECKOUT_PAYMENT,
    path: ROUTES.CHECKOUT_PAYMENT,
    element: <Billing {...props} />,
  },
  {
    key: ROUTES.CHECKOUT_REVIEW,
    path: ROUTES.CHECKOUT_REVIEW,
    element: <Review {...props} />,
  },
];

const CompareConfig = {
  key: ROUTES.COMPARE_ROUTE,
  path: ROUTES.COMPARE_ROUTE,
  exact: true,
  element: <Compare />,
};

const B2BRouteConfig: any[] = [
  {
    key: ROUTES.DASHBOARD,
    path: ROUTES.DASHBOARD,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    element: <Dashboard />,
  },
  {
    key: ROUTES.SIGNIN,
    path: ROUTES.SIGNIN,
    exact: true,
    isProtected: ROUTES.GENERIC_PROTECTED,
    element: <SignIn />,
  },
  {
    key: ROUTES.FORGOT_PASSWORD,
    path: ROUTES.FORGOT_PASSWORD,
    exact: true,
    isProtected: ROUTES.GENERIC_PROTECTED,
    element: <ForgotPassword />,
  },
  {
    key: ROUTES.ORG_REGISTRATION,
    path: ROUTES.ORG_REGISTRATION,
    exact: true,
    isProtected: ROUTES.GENERIC_PROTECTED,
    element: <BuyerOrganizationRegistration />,
  },
  {
    key: ROUTES.BUYER_REGISTRATION,
    path: ROUTES.BUYER_REGISTRATION,
    exact: true,
    isProtected: ROUTES.GENERIC_PROTECTED,
    element: <BuyerUserRegistration />,
  },
  {
    key: ROUTES.CHECKOUT_PROFILE_CREATE,
    path: ROUTES.CHECKOUT_PROFILE_CREATE,
    isProtected: ROUTES.REGISTER_PROTECTED,
    element: <CheckoutProfileCreate />,
  },
  {
    key: ROUTES.CHECKOUT_PROFILE_EDIT,
    path: ROUTES.CHECKOUT_PROFILE_EDIT,
    isProtected: ROUTES.REGISTER_PROTECTED,
    element: <CheckoutProfileCreate />,
  },
  {
    key: ROUTES.CHECKOUT_PROFILES,
    path: ROUTES.CHECKOUT_PROFILES,
    isProtected: ROUTES.REGISTER_PROTECTED,
    element: <CheckoutProfiles />,
  },
  {
    key: ROUTES.SEARCH,
    path: ROUTES.SEARCH,
    exact: true,
    element: <SearchResults />,
  },
  {
    key: ROUTES.ORDER_HISTORY,
    path: ROUTES.ORDER_HISTORY,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    element: <OrderHistoryPage />,
  },
  {
    key: ROUTES.RECURRING_ORDERS,
    path: ROUTES.RECURRING_ORDERS,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    element: <RecurringOrders />,
  },
  {
    key: ROUTES.ORDER_DETAILS,
    path: ROUTES.ORDER_DETAILS_ROUTE,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    element: <OrderDetailsPage />,
  },
  {
    key: ROUTES.ADDRESS_BOOK,
    path: ROUTES.ADDRESS_BOOK,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    element: <AddressBook />,
  },
  {
    key: ROUTES.EDIT_ADDRESS,
    path: ROUTES.EDIT_ADDRESS_ROUTE,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    element: <EditAddress />,
  },
  {
    key: ROUTES.ADD_ADDRESS,
    path: ROUTES.ADD_ADDRESS,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    element: <AddAddress />,
  },
  {
    key: ROUTES.ORGANIZATION_MANAGEMENT,
    path: ROUTES.ORGANIZATION_MANAGEMENT,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    element: <AdminTools />,
  },
  {
    key: ROUTES.BUYER_MANAGEMENT,
    path: ROUTES.BUYER_MANAGEMENT,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    element: <AdminTools />,
  },
  {
    key: ROUTES.APPROVALS_MANAGEMENT,
    path: ROUTES.APPROVALS_MANAGEMENT,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    element: <AdminTools />,
  },
  {
    key: ROUTES.ORDER_APPROVAL,
    path: ROUTES.ORDER_APPROVAL,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    element: <AdminTools />,
  },
  {
    key: ROUTES.IP_ORDER_DETAILS,
    path: ROUTES.IP_ORDER_DETAILS_ROUTE,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    element: <InprogressOrderDetailsPage />,
  },
  {
    key: ROUTES.INPROGRESS_ORDERS,
    path: ROUTES.INPROGRESS_ORDERS,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    element: <InprogressOrders />,
  },
  {
    key: ROUTES.REQUISITION_LISTS,
    path: ROUTES.REQUISITION_LISTS,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    element: <RequisitionLists />,
  },
  {
    key: ROUTES.REQUISITION_LIST_DETAILS,
    path: ROUTES.REQUISITION_LIST_DETAILS_ROUTE,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    element: <RequisitionListDetailsPage />,
  },
  {
    key: ROUTES.VIEW_UPLOAD_LOGS,
    path: ROUTES.VIEW_UPLOAD_LOGS,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    element: <ViewUploadLogs />,
  },
  CompareConfig,
  {
    key: "other",
    path: "/*",
    exact: true,
    element: <SEO />,
  },
];
const B2CRouteConfig: any[] = [
  {
    key: ROUTES.SIGNIN,
    path: ROUTES.SIGNIN,
    exact: true,
    isProtected: ROUTES.GENERIC_PROTECTED,
    element: <SignIn />,
  },
  {
    key: ROUTES.FORGOT_PASSWORD,
    path: ROUTES.FORGOT_PASSWORD,
    exact: true,
    isProtected: ROUTES.GENERIC_PROTECTED,
    element: <ForgotPassword />,
  },
  {
    key: ROUTES.CHECKOUT_PROFILE_CREATE,
    path: ROUTES.CHECKOUT_PROFILE_CREATE,
    isProtected: ROUTES.REGISTER_PROTECTED,
    element: <CheckoutProfileCreate />,
  },
  {
    key: ROUTES.CHECKOUT_PROFILE_EDIT,
    path: ROUTES.CHECKOUT_PROFILE_EDIT,
    isProtected: ROUTES.REGISTER_PROTECTED,
    element: <CheckoutProfileCreate />,
  },
  {
    key: ROUTES.CHECKOUT_PROFILES,
    path: ROUTES.CHECKOUT_PROFILES,
    isProtected: ROUTES.REGISTER_PROTECTED,
    element: <CheckoutProfiles />,
  },
  {
    key: ROUTES.ACCOUNT,
    path: ROUTES.ACCOUNT,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    element: <Account />,
  },
  {
    key: ROUTES.SEARCH,
    path: ROUTES.SEARCH,
    exact: true,
    element: <SearchResults />,
  },
  {
    key: ROUTES.ADDRESS_BOOK,
    path: ROUTES.ADDRESS_BOOK,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    element: <AddressBook />,
  },
  {
    key: ROUTES.EDIT_ADDRESS,
    path: ROUTES.EDIT_ADDRESS_ROUTE,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    element: <EditAddress />,
  },
  {
    key: ROUTES.ADD_ADDRESS,
    path: ROUTES.ADD_ADDRESS,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    element: <AddAddress />,
  },
  {
    key: ROUTES.ORDER_HISTORY,
    path: ROUTES.ORDER_HISTORY,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    element: <OrderHistoryPage />,
  },
  {
    key: ROUTES.ORDER_DETAILS,
    path: ROUTES.ORDER_DETAILS_ROUTE,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    element: <OrderDetailsPage />,
  },
  {
    key: ROUTES.IP_ORDER_DETAILS,
    path: ROUTES.IP_ORDER_DETAILS_ROUTE,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    element: <InprogressOrderDetailsPage />,
  },
  {
    key: ROUTES.INPROGRESS_ORDERS,
    path: ROUTES.INPROGRESS_ORDERS,
    exact: true,
    isProtected: ROUTES.REGISTER_PROTECTED,
    element: <InprogressOrders />,
  },
  CompareConfig,
  {
    key: "other",
    path: "/*",
    exact: true,
    element: <SEO />,
  },
];
export const ROUTE_CONFIG = {
  B2B: B2BRouteConfig,
  B2C: B2CRouteConfig,
  Checkout: CheckoutRouteConfig,
};
