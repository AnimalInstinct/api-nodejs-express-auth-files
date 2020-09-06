import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { BadRequestError, NotFoundError } from '../errors'
import { Password } from '../helpers'
import dotenv from 'dotenv'
import { randomBytes } from 'crypto'
import User from '../models/user'

dotenv.config()

import RefreshToken from '../models/refreshToken'

class RefreshTokenController {
  public postNewToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { refreshToken } = req.body
    const existingToken = await RefreshToken.findOne({
      where: { token: refreshToken },
    })
    if (!existingToken) {
      throw new BadRequestError('Refresh token not found')
    }

    const userJwt = jwt.sign(
      {
        id: existingToken.userId,
        email: existingToken.email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: '10m',
      }
    )

    req.session = {
      bearer: userJwt,
    }

    res.status(200).json({ bearer: userJwt })
  }
}

export default new RefreshTokenController()
