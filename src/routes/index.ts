import { Router } from 'express'
import IndexController from '../controllers'
import { isAuthenticated } from '../middleware/check-auth'

class IndexRouter {
  public router!: Router

  constructor() {
    this.router = Router()

    this.router.post('/', isAuthenticated, IndexController.index)
  }
}

export default new IndexRouter().router
