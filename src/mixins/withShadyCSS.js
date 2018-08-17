import { createMixin} from 'component-register';
import { requestCSSId } from '../css-polyfill';

export default createMixin( options => {
  const { element } = options;
  element._cssId = requestCSSId(element.nodeName);
  return options;
});