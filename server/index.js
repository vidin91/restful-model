import Express from 'express';
import ApplicationContext from './web/ApplicationContext';
import path from 'path';
import UserController from './api/UserController';


const context = new ApplicationContext({
  app: Express()
});

context.registerController(UserController);

export default () => {
  context.start();
}
