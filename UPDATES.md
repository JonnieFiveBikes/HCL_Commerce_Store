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

## Limitations

The list of latest features delivered in the React Store Applications are described for Emerald:

https://help.hcltechsw.com/commerce/9.1.0/storeseparation/refs/react_emerald_flows.html

and for Sapphire:

https://help.hcltechsw.com/commerce/9.1.0/storeseparation/refs/react_sapphire_flows.html

Additional pages and features will be added to the React Store Application for Emerald and Sapphire in future releases of the HCL Commerce Store SDK.

There are specific limitations in the React store applications that developers and customers need to be aware of:

1. For Sapphire, support for specific contract terms and conditions are limited product restriction and price terms and conditions.
   Others terms and conditions such as Address Book, Approvals, Fulfillment Centers, Shipping or Right to Buy limits are not yet supported and
   may not appear or cause checkout to not complete.

1. A customer shopping session on the store can be shared across multiple tabs on the same browser and is maintained in local storage to support browsing
   and shopping across multiple tabs even though each tab is running as a separate applications. If modifications to the user, addresses or cart are made
   in one tab, any other tab will maintain the same user session but may require the customer to reload the page in order for the tab to see the updated modifications.
   Further, some specific states that are maintained in the React application during checkout flow such as the selection of recurring order flag may not be visible
   in other tabs even after reload and the shopper and may need to restart checkout flow.
