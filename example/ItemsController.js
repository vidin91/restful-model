import {Api, Controller} from '../server/web';

@Controller({
  path: '/api/items'
})
export default class ItemsController {
  @Api({
    path: '/',
    method: 'get'
  })
  getAll(req, res) {
    res.send('done');
  }

  @Api({
    path: '/:id',
    method: 'get'
  })
  getById(request, response) {
    response.send(request.params.id);
  }
}
