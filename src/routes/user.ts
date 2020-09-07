import { Router } from 'express'
import UserController from '../controllers/user'
import wrapAsync from '../helpers/async.wrapper'
import { currentUser, requireAuth } from '../middleware'

class UserRouter {
  public router!: Router

  constructor() {
    this.router = Router()
    this.router.post('/new_token', wrapAsync(UserController.postNewToken))
    this.router.post('/signup', wrapAsync(UserController.postSignup))
    this.router.post('/signin', wrapAsync(UserController.postSignin))
    this.router.get(
      '/signout',
      currentUser,
      wrapAsync(UserController.getSignout)
    )
    this.router.get(
      '/info',
      currentUser,
      requireAuth,
      wrapAsync(UserController.getInfo)
    )
  }
}

export default new UserRouter().router
