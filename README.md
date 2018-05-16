# Component Register Extensions

This package includes a few mixins for Component Register.

## withEvents

Provides a 'events' as a property to your component with a number of event helpers.

## withTimer

Providers a 'timer' property which has release safe delay and interval methods.

## withShadyCSS

Provides mechanism to polyfill shadydom css in unsupporting browsers. Registers the custom element.

This library also exposes the CSS Polyfill directly with:

## requestCSSId(key)

Pass in a key and it will return a new or an existing identifier for that key to set on your element as element._cssId. withShadyCSS does this for you automatically for your custom elements. One limitation is this polyfill only supports a single style tag per shadowroot.

## applyCSSPolyfill

This method uses a mutation observer to transform elements and style tags to work with the updated scoped styles. You must call this on application startup for the polyfill to work.