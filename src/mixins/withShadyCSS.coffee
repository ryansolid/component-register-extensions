import { createMixin} from 'component-register'
import { requestCSSId } from '../css-polyfill'

export default createMixin (options) ->
  { element } = options
  element._cssId = requestCSSId(element.nodeName)
  options