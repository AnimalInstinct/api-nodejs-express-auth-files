import { Request, Response } from 'express'
import { getFilePath } from '../services'

class DnaController {
  public test = async (req: Request, res: Response) => {
    return res.json('Hello world!')
  }
  public data = async (req: Request, res: Response) => {
    const filePath = await getFilePath(req.params.id)
    const reader = require('xlsx')
    const file = reader.readFile(filePath)
    const sheets = file.SheetNames
    var data = reader.utils.sheet_to_json(file.Sheets[sheets[0]])
    return res.json(data)
  }
}

export default new DnaController()
