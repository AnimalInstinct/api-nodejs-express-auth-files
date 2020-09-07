import File from '../models/file'
import fs from 'fs'

interface FileData {
  originalName: string
  extension: string | null
  mimeType: string
  size: number
  path: string
}

export const upsertFile = async (fileData: FileData, fileId?: string) => {
  try {
    // If file exists rewrite it (for update)
    if (fileId) {
      const existedFile = await File.findOne({
        where: {
          id: fileId,
        },
        attributes: [
          'id',
          'originalName',
          'extension',
          'mimeType',
          'size',
          'path',
        ],
      })
      if (!existedFile) {
        return Promise.reject('File not found.')
      }
      fs.unlinkSync(existedFile.get('path'))
      existedFile.set(fileData)
      existedFile.save()
      return {
        id: existedFile.get('id'),
        originalName: existedFile.get('originalName'),
        extension: existedFile.get('extension'),
        mimeType: existedFile.get('mimeType'),
        size: existedFile.get('size'),
      }
    }
    const newFile = await File.create({
      ...fileData,
    })
    return {
      ...fileData,
      id: newFile.get('id'),
    }
  } catch (error) {
    throw error
  }
}

export const fetchFiles = async (listSize: number, page: number) => {
  try {
    return await File.findAll({
      limit: listSize,
      offset: listSize * (page - 1),
      attributes: ['id', 'originalName', 'extension', 'mimeType', 'size'],
    })
  } catch (error) {
    throw error
  }
}

export const fetchFileById = async (fileId: string) => {
  try {
    const file = await File.findOne({
      where: {
        id: fileId,
      },
      attributes: ['id', 'originalName', 'extension', 'mimeType', 'size'],
    })
    if (!file) {
      return Promise.reject('File not found.')
    }
    return file.toJSON()
  } catch (error) {
    throw error
  }
}

export const getFilePath = async (fileId: string) => {
  try {
    const file = await File.findOne({
      where: {
        id: fileId,
      },
      attributes: ['path'],
    })
    if (!file) {
      return Promise.reject('File not found.')
    }
    return file.get('path')
  } catch (error) {
    throw error
  }
}

export const deleteFileById = async (id: string) => {
  try {
    const file = await File.findOne({
      where: {
        id,
      },
      attributes: ['id', 'path'],
    })
    if (!file) {
      return Promise.reject('File not found.')
    }
    const path = file.get('path')
    await file.destroy()
    fs.unlinkSync(path)
  } catch (error) {
    throw error
  }
}
