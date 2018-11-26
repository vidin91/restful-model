import Express from 'express';
import fs from 'fs';
import path from 'path';

export default class ApplicationContext {
  constructor(config = {}) {
    this.services = new Map();
    this.config = config;
    this.app = config.app;
    this.port = config.port || 8080;
    this.controllerContextPath = config.controllerContextPath;
    if (this.controllerContextPath) {
      this.load();
    }
  }

  getService(name) {
    if (this.services.has(name)) {
      return this.services.get(name);
    }
  }

  registerService(name, service, override = false) {
    if (!this.services.has(name) || override === true) {
      service = typeof service === 'function' ? new service() : service;
      this.services.set(name, service);
      return true;
    }
    return false;
  }

  registerController(controller, options) {
    //TODO - validate that there are no route conflicts
    controller(this.app, options);
  }

  load() {
    if (this.controllerContextPath) {
      fs.readdirSync(this.controllerContextPath).forEach(file => {
        let controller = require(path.join(this.controllerContextPath, file));
        if (controller.default) {
          controller = controller.default;
        }
        controller(this.app);
      });
    }
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Server successfully started at port:${this.port}`);
    })
  }
}
