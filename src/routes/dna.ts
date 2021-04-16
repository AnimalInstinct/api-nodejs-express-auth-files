import { Router } from 'express'
import { requireAuth, currentUser } from '../middleware'
import DnaController from '../controllers/dna'
import wrapAsync from '../helpers/async.wrapper'

class DnaRouter {
  public router!: Router

  constructor() {
    this.router = Router()
    this.router.get('/data/:id', wrapAsync(DnaController.data))
    this.router.get('/test', wrapAsync(DnaController.test))
  }
}

export default new DnaRouter().router
