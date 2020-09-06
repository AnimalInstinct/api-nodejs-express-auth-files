import { Router } from 'express'
import UserController from '../controllers/user'
import wrapAsync from './async.wrapper'

class UserRouter {
  public router!: Router

  constructor() {
    this.router = Router()
    this.router.post('/signup', wrapAsync(UserController.postSignup))
    this.router.post('/signin', wrapAsync(UserController.postSignin))
  }
}

export default new UserRouter().router
