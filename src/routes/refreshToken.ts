import { Router } from 'express'
import RefreshTokenController from '../controllers/refreshtoken'
import wrapAsync from './async.wrapper'

class RefreshTokenRouter {
  public router!: Router

  constructor() {
    this.router = Router()
    this.router.post('/', wrapAsync(RefreshTokenController.postNewToken))
  }
}

export default new RefreshTokenRouter().router
