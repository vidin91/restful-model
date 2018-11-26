import express from 'express';
import {ApplicationContext} from '../server/web';
import ItemsController from './ItemsController';
import ItemsService from './ItemsService';
import BodyParser from 'body-parser';

const app = express();
app.use(BodyParser.urlencoded({extended: true}));
app.use(BodyParser.json());

const context = new ApplicationContext({
  app
});

context.registerController(ItemsController, {
  service: ItemsService
});

context.start();
