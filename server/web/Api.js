export default function Api (config) {
  return function (target, key, decorator) {
    // TODO - improve config validation
    if (!config || !config.path || !config.method) {
      throw new Error('Api: config error');
    }
    decorator.value.webContext = {
      path: config.path,
      method: config.method
    };
    return decorator;
  }
}
