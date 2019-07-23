import { getCurrentElement } from 'component-register';
import { assignCSSId } from '../css-polyfill';

export default function useShadyCSS() {
  const element = getCurrentElement();
  assignCSSId(element, element.nodeName)
}