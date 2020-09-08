import { Router } from 'express'
import UserController from '../controllers/user'
import wrapAsync from '../helpers/async.wrapper'
import { currentUser, requireAuth, validateRequest } from '../middleware'
import { body } from 'express-validator'

class UserRouter {
  public router!: Router

  constructor() {
    this.router = Router()
    this.router.post('/new_token', wrapAsync(UserController.postNewToken))
    this.router.post(
      '/signup',
      [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password')
          .trim()
          .isLength({ min: 4, max: 20 })
          .withMessage('Password must be between 4 and 20 characters'),
      ],
      validateRequest,
      wrapAsync(UserController.postSignup)
    )
    this.router.post(
      '/signin',
      [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password')
          .trim()
          .isLength({ min: 4, max: 20 })
          .withMessage('Password must be between 4 and 20 characters'),
      ],
      validateRequest,
      wrapAsync(UserController.postSignin)
    )
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
