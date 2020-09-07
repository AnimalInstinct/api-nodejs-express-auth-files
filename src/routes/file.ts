import { Router } from 'express'
import FilesController from '../controllers/file'
import wrapAsync from '../helpers/async.wrapper'
import { requireAuth, currentUser } from '../middleware'
import multer from 'multer'

const mime = require('mime-types')
const path = require('path')
const upload = multer({
  dest: 'uploads/',
  storage: multer.diskStorage({
    destination: path.join(path.resolve(__dirname, '../..'), 'uploads'),
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
      cb(
        null,
        `${file.fieldname}-${uniqueSuffix}.${mime.extension(file.mimetype)}`
      )
    },
  }),
})

class FilesRouter {
  public router!: Router

  constructor() {
    this.router = Router()
    this.router.post(
      '/upload',
      currentUser,
      requireAuth,
      upload.single('myFile'),
      wrapAsync(FilesController.postUpload)
    )
    this.router.get(
      '/list',
      currentUser,
      requireAuth,
      wrapAsync(FilesController.getFilesList)
    )
    this.router.delete(
      '/delete/:id',
      currentUser,
      requireAuth,
      wrapAsync(FilesController.deleteFile)
    )
    this.router.get(
      '/:id',
      currentUser,
      requireAuth,
      wrapAsync(FilesController.getFile)
    )
    this.router.get(
      '/download/:id',
      currentUser,
      requireAuth,
      wrapAsync(FilesController.downloadFile)
    )
    this.router.put(
      '/update/:id',
      currentUser,
      requireAuth,
      upload.single('myFile'),
      wrapAsync(FilesController.updateFile)
    )
  }
}

export default new FilesRouter().router
