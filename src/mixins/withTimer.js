import { isFunction, createMixin} from 'component-register';

export default createMixin( options => {
  const { element } = options;
  const timer = {
    delay(delayTime, callback) {
      if (isFunction(delayTime)) [delayTime, callback] = [0, delayTime];
      let timer = setTimeout(callback, delayTime);
      element.addReleaseCallback(() => clearTimeout(timer));
      return timer;
    },
    interval(delayTime, callback) {
      let timer = setInterval(callback, delayTime);
      element.addReleaseCallback(() => clearInterval(timer));
      return timer;
    }
  }
  return { ...options, timer }
});