## Preview Layout and Widget information

### Communication between CMC and Store

#### Page and Layout updated/initialized

Upon launch of Store from CMC iframe or after navigation,

1. store postMessage to parent CMC window use `"action": "PREVIEW_LAYOUT_INITIALIZED"` with proper layout information and preview report.
2. if store is using the layout fallback from store config constant, the layout object will have `"isStoreDefault": true` flag set.

#### Show page widget information

Store will highlight widgets and display "show widget information icon"s on page upon receiving message from CMC with `Action: "PREVIEW_SHOW_PAGE_INFORMATION"`. If a postMessage with `Action:"PREVIEW_HIDE_PAGE_INFORMATION"` was received, store will hide the highlight and "show info" icon.

Once a "show widget information icon" is clicked, store will postMessage to CMC using `"action": "PREVIEW_SHOW_WIDGET_INFO"` with appropriate widget information and preview report.

### Implementation

1. `PreviewInfoContext`: the context holds the `show` or `hide` page/widget information state(action request) that received from CMC. The consumer of the context are each individual widget that wrapped inside `PreviewWidgetInfoFrame`.
2. `PreviewWidgetInfoFrame` handles two things:

   - wrap widget inside as child
   - listen and receive show/hide info context changes
   - show/hide highlight and `show info` icon according to context values
   - handle click action on `show info` icon, send widget info along with preview report(from eSpot response) to CMC.

3. layout change/initialization event is handled in `SEO` component. Layout and preview report is send to CMC upon each time URL get updated.
