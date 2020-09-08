import { Request, Response } from 'express'
import { BadRequestError } from 'src/errors'
import {
  upsertFile,
  fetchFileById,
  fetchFiles,
  deleteFileById,
  getFilePath,
} from '../services'
const mime = require('mime-types')

class FilesController {
  public postUpload = async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({
        message: 'No file to upload.',
      })
    } else {
      try {
        const fileData = {
          originalName: req.file.originalname,
          extension: mime.extension(req.file.mimetype),
          mimeType: req.file.mimetype,
          size: req.file.size,
          path: req.file.path,
        }
        const newFile = await upsertFile(fileData)
        return res.status(201).json(newFile)
      } catch (error) {
        throw error
      }
    }
  }

  public getFile = async (req: Request, res: Response) => {
    try {
      const file = await fetchFileById(req.params.id)
      return res.status(200).json(file)
    } catch (error) {
      if (error === 'File not found.') {
        return res.status(404).json({
          message: 'File not found.',
        })
      }
      throw error
    }
  }

  public getFilesList = async (req: Request, res: Response) => {
    try {
      const listSize = parseInt(req.query.listSize as string)
      const page = parseInt(req.query.page as string)
      const files = await fetchFiles(listSize || 10, page || 1)
      return res.status(200).json(files)
    } catch (error) {
      throw error
    }
  }

  public downloadFile = async (req: Request, res: Response) => {
    try {
      const filePath = await getFilePath(req.params.id)
      return res.status(200).download(filePath)
    } catch (error) {
      if (error === 'File not found.') {
        return res.status(404).json({
          message: 'File not found.',
        })
      }
      throw error
    }
  }

  public updateFile = async (req: Request, res: Response) => {
    const uploadedFile = req.file
    try {
      const updatedFile = await upsertFile(
        {
          originalName: uploadedFile.originalname,
          extension: mime.extension(uploadedFile.mimetype),
          mimeType: uploadedFile.mimetype,
          size: uploadedFile.size,
          path: uploadedFile.path,
        },
        req.params.id
      )
      return res.status(200).json(updatedFile)
    } catch (error) {
      if (error === 'File not found.') {
        return res.status(404).json({
          message: 'File not found.',
        })
      }
      throw error
    }
  }

  public deleteFile = async (req: Request, res: Response) => {
    try {
      await deleteFileById(req.params.id)
      return res.sendStatus(204)
    } catch (error) {
      if (error === 'File not found.') {
        return res.status(404).json({
          message: 'File not found.',
        })
      }
      throw error
    }
  }
}

export default new FilesController()
