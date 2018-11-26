import {Api, Controller} from '../server/web';

@Controller({
  path: '/api/items'
})
export default class ItemsController {
  constructor(options) {
    this.service = options.service;
  }

  @Api({
    path: '/',
    method: 'get'
  })
  async getAll(req, res) {
    try {
      res.send(await this.service.getAllItems());
    } catch(e) {
      res.status(500);
      res.send(e);
    }
  }

  @Api({
    path: '/:id',
    method: 'get'
  })
  async getById(request, response) {
    try {
      response.send(await this.service.getById(request.params.id));
    } catch(e) {
      response.status(500);
      response.send(e);
    }
  }

  @Api({
    path: '/',
    method: 'post'
  })
  async create(request, response) {
    try {
      response.send(await this.service.create(request.body));
    } catch(e) {
      response.status(500);
      response.send(e);
    }
  }

  @Api({
    path: '/:id',
    method: 'put'
  })
  async update(req, res) {
    try {
      res.send(await this.service.update(req.params.id, req.body))
    } catch(e) {
      res.status(500);
      res.send(e);
    }
  }
}
