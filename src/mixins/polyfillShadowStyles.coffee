import { Utils, createMixin} from 'component-register'
import { css, html } from '../css-polyfill'
COUNTER = 0

export default (config={scopeCSS: true}) ->
  createMixin (options) ->
    { element } = options
    cssId = "_co#{COUNTER++}" unless Utils.nativeShadowDOM
    appendStyles = (styles, mount) ->
      return unless styles
      unless cssId
        script = document.createElement('style')
        script.setAttribute('type', 'text/css')
        script.textContent = styles
        mount or= element.renderRoot()
        mount.appendChild(script)
        return options
      # append globally otherwise
      scope = element.nodeName.toLowerCase()
      unless script = document.head.querySelector("[scope='#{scope}']")
        styles = css(scope, styles, if config.scopeCSS then cssId else undefined)
        script = document.createElement('style')
        script.setAttribute('type', 'text/css')
        script.setAttribute('scope', scope)
        script.id = cssId
        script.textContent = styles
        document.head.appendChild(script)
      else cssId = script.id

    transformTemplate = (template) -> html(template, cssId) if cssId and config.scopeCSS

    { options..., appendStyles, transformTemplate }