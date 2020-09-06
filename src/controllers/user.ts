import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { BadRequestError } from '../errors'
import { Password } from '../helpers'
import dotenv from 'dotenv'
import { randomBytes } from 'crypto'
import RefreshToken from '../models/refreshToken'

dotenv.config()

import User from '../models/user'

class UserController {
  public postSignin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body
    const existingUser = await User.findOne({ where: { email } })
    if (!existingUser) {
      throw new BadRequestError('User not found')
    }
    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    )
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials')
    }
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: '10m',
      }
    )
    res.status(200).json({ bearer: userJwt })
  }

  public postSignup = async (req: Request, res: Response) => {
    const { password } = req.body
    const hashedPassword = await Password.toHash(password)
    const user: User = await User.create({
      userName: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      firstName: req.body.firstname,
      lastName: req.body.lastname,
    })
    const refreshToken = randomBytes(64).toString('hex')
    await RefreshToken.create({
      token: refreshToken,
      userId: user.id,
      email: user.email,
    })
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: '10m',
      }
    )
    req.session = {
      bearer: userJwt,
      refreshToken: refreshToken,
    }
    res.status(201).json({
      message: 'User created, please sign in!',
      bearer: userJwt,
      refreshToken: refreshToken,
    })
  }
}

export default new UserController()
