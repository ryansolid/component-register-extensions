import { Utils } from 'component-register'
import css from './css'

COUNTER = 0

Registry = {}

requestCSSId = (key) ->
  return if Utils.nativeShadowDOM
  key = key.toLowerCase()
  return Registry[key] if key of Registry
  cssId = "_co#{COUNTER++}"
  Registry[key] = cssId
  cssId

parseNodes = (nodes) ->
  for node in nodes when node.nodeType is 1 and cssId = (host = node.getRootNode()?.host)?._cssId
    if node.nodeName is 'STYLE'
      unless document.getElementById(cssId)
        scope = if host.nodeName.indexOf('-') > -1 then host.nodeName.toLowerCase()
        node.textContent = css(node.textContent, scope, cssId)
        node.id = cssId
        document.head.appendChild(node)
      else node.parentNode.removeChild(node)
      continue
    node.setAttribute(cssId, '')
    parseNodes(node.childNodes) if node.childNodes.length
  return

# real time node updates
applyCSSPolyfill = (element = document.body) ->
  return if Utils.nativeShadowDOM
  observer = new MutationObserver (mutations) ->
    for mutation in mutations
      continue unless (nodes = mutation.addedNodes).length
      parseNodes(nodes)
    return
  observer.observe(element, {childList: true, subtree: true})

export { requestCSSId, applyCSSPolyfill }
