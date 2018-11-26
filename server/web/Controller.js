import {Router} from 'express';

export default function Controller(config) {
  if (!config || !config.path) {
    // TODO - improve validation
    throw new Error('Controller: bad config');
  }

  return function (Target) {
    return (app, options) => {
      let router = new Router();
      app.use(config.path, router);
      let ctx = new Target(options);

      Object.entries(Object.getOwnPropertyDescriptors(Target.prototype)).forEach(([key, desc]) => {
        if (desc.value.webContext) {
          let {path, method} = desc.value.webContext;
          router[method](path, desc.value.bind(ctx));
        }
      });
    }
  }
}
