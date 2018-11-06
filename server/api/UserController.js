import Controller from '../web/Controller';
import Api from '../web/Api';

@Controller({
  path: '/api/user'
})
export default class UserController {
  @Api({
    path: '/',
    method: 'get'
  })
  getMessage(req, res) {
    res.send('Hello World2');
  }
}
