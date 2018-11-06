import Express from 'express';
import AppContext from './web/AppContext';
import path from 'path';


const context = new AppContext({
  app: Express(),
  controllerContextPath: path.join(__dirname, 'api')
});

export default () => {
  context.start();
}
