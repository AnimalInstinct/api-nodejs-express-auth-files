import { Router } from 'express'
import UserController from '../controllers/user'
import wrapAsync from '../helpers/async.wrapper'
import { currentUser } from '../middleware'

class UserRouter {
  public router!: Router

  constructor() {
    this.router = Router()
    this.router.post('/signup', wrapAsync(UserController.postSignup))
    this.router.post('/signin', wrapAsync(UserController.postSignin))
    this.router.get('/signout', wrapAsync(UserController.getSignout))
    this.router.get('/info', currentUser, wrapAsync(UserController.getInfo))
  }
}

export default new UserRouter().router
