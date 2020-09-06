import { Router } from 'express'
import IndexController from '../controllers'
import { requireAuth } from '../middleware'
class IndexRouter {
  public router!: Router

  constructor() {
    this.router = Router()

    this.router.post('/', requireAuth, IndexController.index)
  }
}

export default new IndexRouter().router
