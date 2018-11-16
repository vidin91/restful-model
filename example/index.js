import express from 'express';
import {ApplicationContext} from '../server/web';
import ItemsController from './ItemsController';

const context = new ApplicationContext({
  app: express()
});

context.registerController(ItemsController);

context.start();
