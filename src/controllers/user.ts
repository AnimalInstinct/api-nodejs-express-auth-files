import { Request, Response, NextFunction } from 'express'
import {
  login,
  createUser,
  refreshAccessToken,
  fetchUserById,
  destroySession,
} from '../services'
import dotenv from 'dotenv'
import { NotAuthorizedError, NotFoundError } from '../errors'
dotenv.config()

class UserController {
  public postSignup = async (req: Request, res: Response) => {
    const tokenPair = await createUser(req.body)
    const { userJwt: jwt, refreshToken } = tokenPair
    req.session = {
      jwt,
    }
    res.status(201).json({
      message: 'User created, please sign in!',
      bearer: jwt,
      refreshToken: refreshToken,
    })
  }

  public postSignin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body
    const jwt = await login(email, password)
    req.session = {
      jwt,
    }
    if (!jwt) {
      throw new NotFoundError()
    }
    res.status(200).json(jwt)
  }

  public postNewToken = async (req: Request, res: Response) => {
    try {
      const jwt = await refreshAccessToken(req.body.refreshToken)
      req.session = {
        jwt,
      }
      return res.status(200).json(jwt)
    } catch (error) {
      if (error === 'Invalid refreshToken.') {
        return res.status(400).json({
          message: error,
        })
      }
      throw error
    }
  }

  public getSignout = async (req: Request, res: Response) => {
    try {
      if (req.currentUser) {
        const result = await destroySession(req.currentUser?.id)
        if (result) {
          req.session = null
          return res.sendStatus(200)
        }
      }
    } catch (error) {
      throw error
    }
  }

  public getInfo = async (req: Request, res: Response) => {
    const currentUser = req.currentUser || null
    try {
      if (currentUser) {
        const userInfo = await fetchUserById(currentUser.id)
        return res.status(200).json(userInfo)
      }
    } catch (error) {
      if (error === 'User info not found.') {
        return res.status(400).json({
          message: error,
        })
      }
      throw error
    }
  }
}

export default new UserController()
