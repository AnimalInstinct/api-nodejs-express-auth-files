import { Application, Router, Request, Response } from 'express'
// import {
//   currentUserRouter,
//   signinRouter,
//   signoutRouter,
//   signupRouter,
// } from './auth/routes'

const router = (app: Application) => {
  const router: Router = Router()

  router.get('/', (req: Request, res: Response) => {
    res.status(200).json({
      message: 'This is where the awesomeness happen...',
    })
  })

  // app.use(currentUserRouter)
  // app.use(signinRouter)
  // app.use(signoutRouter)
  // app.use(signupRouter)

  app.use('/api/v1', router)
}

export default router
