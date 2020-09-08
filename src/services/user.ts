import User from '../models/user'
import { BadRequestError, NotFoundError } from '../errors'
import { Password } from '../helpers'
import jwt from 'jsonwebtoken'
import { randomBytes } from 'crypto'
import Session from '../models/session'

const createSession = async (user: User, userJwt: string) => {
  const refreshToken = randomBytes(64).toString('hex')
  const payload = jwt.verify(userJwt, process.env.JWT_SECRET!) as UserPayload
  const expiresAt = new Date(parseInt(payload.exp) * 1000)
  const session = await Session.create({
    refreshToken: refreshToken,
    accessToken: userJwt,
    userId: user.id,
    email: user.email,
    expiresAt,
  })
  return session
}

export const createUser = async (userData: User) => {
  const { userName, email, password, firstName, lastName } = userData
  const hashedPassword = await Password.toHash(password)
  const user: User = await User.create({
    userName,
    email,
    password: hashedPassword,
    firstName,
    lastName,
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
  const session = await createSession(user, userJwt)
  return {
    userJwt,
    refreshToken: session.get('refreshToken'),
  }
}

export const login = async (email: string, password: string) => {
  try {
    const existingUser = await User.findOne({ where: { email } })
    if (!existingUser) {
      throw new BadRequestError('User not found')
      return
    }
    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    )
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials')
    }

    const _bearer = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: '10m',
      }
    )
    // If there is no session in DB, create one, if old session foun, delete it and create new one
    let session = await Session.findOne({ where: { userId: existingUser.id } })
    if (session) {
      session.destroy()
    }
    session = await createSession(existingUser, _bearer)

    return {
      _bearer,
      refreshToken: session.refreshToken,
    }
  } catch (error) {}
}
interface UserPayload {
  id: string
  email: string
  exp: string
}

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const session = await Session.findOne({
      where: {
        refreshToken,
      },
    })
    if (session) {
      const _bearer = jwt.sign(
        {
          id: session.userId,
          email: session.email,
        },
        process.env.JWT_SECRET!,
        {
          expiresIn: '10m',
        }
      )
      session.set('accessToken', _bearer)
      session.save()
      return {
        _bearer,
      }
    }
  } catch (e) {
    throw e
  }
}

export const fetchUserById = async (userId: string) => {
  try {
    const user = await User.findOne({ where: { id: userId } })
    if (!user) {
      return Promise.reject('User info not found.')
    }
    return {
      id: user.get('id'),
    }
  } catch (e) {
    throw e
  }
}

export const destroySession = async (userId: string) => {
  try {
    const destroyedNumber = await Session.destroy({
      where: {
        userId,
      },
    })
    return destroyedNumber > 0
  } catch (e) {
    throw e
  }
}
