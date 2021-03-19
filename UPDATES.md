[//]: # "================================================="
[//]: # "Licensed Materials - Property of HCL Technologies"
[//]: #
[//]: # "HCL Commerce"
[//]: #
[//]: # "(C) Copyright HCL Technologies Limited 2020"
[//]: #
[//]: # "================================================="

## Change History

### 2020/06/30 HCL Commerce Version 9.1.0 - Initial Release

Initial Release of React Store SDK with B2C Emerald Store Application and B2B Sapphire Store Application.

### 2020/08/30 HCL Commerce Version 9.1.2 - Refreshed Store Application

The React Store Application (Emerald and Sapphire) has been updated with the following enhancements:

1. Support for create, update and delete of addresses in Address Book.
1. Enhanced checkout pages and flow with selection and update of addresses from Address Book.
1. Support for Variants in Store including search results, navigation through categories and as target of references in merchandising associations or marketing activities.
1. Support for shared user sessions across browser tabs.
1. Enhanced mini-cart with display of recent items and cart totals.
1. Enhanced category navigation on desktop view.

This version of the React Store Application requires corresponding HCL Commerce Version 9.1.2 Search services for variant support.

### 2020/10/16 HCL Commerce Version 9.1.3 - Refreshed Store Application

The React Store Application (Emerald and Sapphire) has been updated with the following enhancements:

1. Multiple languages support through URL parameter.
1. Enhanced Review Order page in the Checkout flow.

The React Store Application (Sapphire only) has been updated with the following enhancements:

1. Access to Organization, Users, and Approvals administrative toolings through the storefront for buyer administrators or buyer approvers.
1. Support for Shipping-related contract terms and conditions, including Address Book and Shipping Methods, for Single Shipment.
1. Support for Payment-related contract terms and conditions, including Address Book and Predefined Payment Methods, for Single Payment.
1. Support for Purchase Order Number on accounts and Spending Limit Approvals.
1. Enhanced Order History Detail pages.

This version of the React Store Application requires corresponding HCL Commerce Version 9.1.3 Search services for multiple languages support.

### 2020/12/11 HCL Commerce Version 9.1.4 - Refreshed Store Application

The React Store Application (Emerald and Sapphire) has been updated with the following enhancements:

1. Support for content and digital assets managed and served from HCL Digital Experience (DX) product.

- Support for 'Marketing Content' template from DX within Marketing Spots on any page
- Support for 'Marketing Video Content' template from DX within Marketing Spots on any page
- Multiple language support for DX Content

1. Support for multiple images displayed as carousel on products, variants and skus on Product Display Page
1. Support for attachments to products, variants and skus on Product Display Page
1. Support for developers to view generated API flow diagrams when run in development mode of SDK

This version of the React Store Application requires corresponding HCL Commerce Version 9.1.4 Search services for multiple angle image support
and attachments.
This version of the React Store Application optionally includes support HCL Digital Experience if content is returned from a Marketing Spot that
references a DX external content type.

### 2021/03/19 HCL Commerce Version 9.1.6 - Refreshed Store Application

The React Store Application (Emerald and Sapphire) has been updated with the following enhancements:

1. Re-designed "Sign-in and Registration" page.
1. Support for multiple languages using language dropdown menu.
1. Support for forgot password resetting flow.
1. Support for expired password resetting flow.
1. Support for HCL Commerce CSR react app.

This version of the React Store Application requires corresponding HCL Commerce CSR React App Version 9.1.6 to enable Customer Service capability.

## Limitations

The list of latest features delivered in the React Store Applications are described for Emerald:

https://help.hcltechsw.com/commerce/9.1.0/storeseparation/refs/react_emerald_flows.html

and for Sapphire:

https://help.hcltechsw.com/commerce/9.1.0/storeseparation/refs/react_sapphire_flows.html

Additional pages and features will be added to the React Store Application for Emerald and Sapphire in future releases of the HCL Commerce Store SDK.

There are specific limitations in the React store applications that developers and customers need to be aware of:

1. For Sapphire, support for specific contract terms and conditions are limited product restriction and price terms and conditions.
   Others terms and conditions such as Fulfillment Centers, Shipping Charges, Right to Buy limits, or mixed contracts that incur
   Multiple Shipment/Payment are not yet supported and may not appear or cause checkout to not complete.

1. A customer shopping session on the store can be shared across multiple tabs on the same browser and is maintained in local storage to support browsing
   and shopping across multiple tabs even though each tab is running as a separate applications. If modifications to the user, addresses or cart are made
   in one tab, any other tab will maintain the same user session but may require the customer to reload the page in order for the tab to see the updated modifications.
   Further, some specific states that are maintained in the React application during checkout flow such as the selection of recurring order flag may not be visible
   in other tabs even after reload and the shopper and may need to restart checkout flow.

1. Support for Organization, Users and Approvals administrative tools for buyer administrators or buyer approvers within the store will launch the
   corresponding UI from Management Center from with the store UI as described here: https://help.hcltechsw.com/commerce/9.1.0/storeseparation/refs/react_b2bbuyers.html.  
   A user can access these administrative tools within the store with the same session when logging in from the store's login page.
   If the same user logs in to Management Center from another browser tab or window, this action will terminate the same user's session in the store.
   Returning to the browser window in the store UI will require relogging in to the store. To avoid such issues, consider blocking access
   to Management Center host/port in production live environments for buyer adminstrators or buyer approvers.

1. The React store provides a react component for content-recommendations that can display marketing content business objects created in Management Center.
   The React store application provides an implementation that renders sample content ads as shown in Emerald and Sapphire stores, but can utilize only a subset
   of the fields available in the marketing content tool. The source code is provided and can be customized to render in the storefront while making use of
   additional fields. Some Marketing content fields that are NOT currently used by the react component in the application include:

- Any Marketing content type with 'click action type' = 'Predefined click action'
- Any Marketing content type with 'click action type' = 'Predefined click action for promotion'
- Marketing content type 'Asset' with 'Number of click action' = 'Multiple (Image Map)'
