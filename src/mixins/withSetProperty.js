import { createMixin } from "component-register";

export default createMixin(options => {
  const { element } = options;
  element.setProperty = function(name, value) {
    if (!(name in this.props)) return;
    const prop = this.props[name],
      oldValue = prop.value;
    this[name] = value;
    if (prop.notify)
      this.dispatchEvent(
        new CustomEvent("propertychange", {
          bubbles: true,
          cancelable: true,
          composed: true,
          detail: { value, oldValue, name }
        })
      );
  };
  return options;
});
