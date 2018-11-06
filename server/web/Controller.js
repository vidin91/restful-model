import {Router} from 'express';

export default function Controller(config) {
  if (!config || !config.path) {
    // TODO - improve validation
    throw new Error('Controller: bad config');
  }

  return function (Target) {
    return (app) => {
      let router = new Router();
      app.use(config.path, router);

      Object.entries(Object.getOwnPropertyDescriptors(Target.prototype)).forEach(([key, desc]) => {
        if (desc.value.webContext) {
          let {path, method} = desc.value.webContext;
          router[method](path, desc.value);
        }
      });
    }
  }
}
