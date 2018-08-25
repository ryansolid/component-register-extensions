import { nativeShadowDOM } from 'component-register';
import css from './css';

let counter = 0;
const Registry = {};

export function requestCSSId(key) {
  if (nativeShadowDOM) return;
  key = key.toLowerCase();
  if (key in Registry) return Registry[key];
  const cssId = `_co${counter++}`;
  Registry[key] = cssId;
  return cssId;
}

function parseNodes(nodes) {
  nodes.forEach(node => {
    if (node.nodeType !== 1) return;
    const host = node.getRootNode().host
    if (!host) return;
    const cssId = host._cssId
    if (!cssId) return;

    if (node.nodeName === 'STYLE') {
      if (!document.getElementById(cssId)) {
        let scope;
        if (host.nodeName.indexOf('-') > -1) scope = host.nodeName.toLowerCase();
        node.textContent = css(node.textContent, scope, cssId);
        node.id = cssId;
        document.head.appendChild(node);
      } else node.parentNode.removeChild(node);
      return;
    }
    node.setAttribute(cssId, '');
    if (node.childNodes.length) parseNodes(node.childNodes);
  });
}

// real time node updates
export function applyCSSPolyfill(element = document.body) {
  if (nativeShadowDOM) return;
  const observer = new MutationObserver(mutations => {
    for(let i = 0, l = mutations.length; i < l; i++) {
      if (mutations[i].addedNodes) parseNodes(mutations[i].addedNodes);
    }
  });
  observer.observe(element, {childList: true, subtree: true});
}