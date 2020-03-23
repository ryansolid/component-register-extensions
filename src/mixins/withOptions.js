import { createMixin } from 'component-register';

export default fn => createMixin(options =>
  ({...options, ...fn(options)})
)