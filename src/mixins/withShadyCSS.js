import { createMixin } from 'component-register';
import { assignCSSId } from '../css-polyfill';

export default createMixin( options => {
  const { element } = options;
  assignCSSId(element, element.nodeName);
  return options;
});