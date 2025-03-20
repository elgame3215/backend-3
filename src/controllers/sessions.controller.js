import { usersService } from '../services/index.js'
import { createHash, passwordValidation } from '../utils/index.js'
import jwt from 'jsonwebtoken'
import UserDTO from '../dto/User.dto.js'
import { InternalServerError } from '../errors/generic.errors.js'

const register = async (req, res, next) => {
  const { first_name, last_name, email, password } = req.body

  if (!first_name || !last_name || !email || !password) return res.status(400).send({ status: 'error', error: 'Incomplete values' })

  try {
    const exists = await usersService.getUserByEmail(email)

    if (exists) return res.status(400).send({ status: 'error', error: 'User already exists' })

    const hashedPassword = await createHash(password)
    const user = {
      first_name,
      last_name,
      email,
      password: hashedPassword
    }
    const result = await usersService.create(user)
    console.log(result)

    res.send({ status: 'success', payload: result._id })
  } catch (error) {
    return next(new InternalServerError())
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) return res.status(400).send({ status: 'error', error: 'Incomplete values' })

  try {
    const user = await usersService.getUserByEmail(email)

    if (!user) return res.status(404).send({ status: 'error', error: "User doesn't exist" })

    const isValidPassword = await passwordValidation(user, password)

    if (!isValidPassword) return res.status(400).send({ status: 'error', error: 'Incorrect password' })
    const userDto = UserDTO.getUserTokenFrom(user)
    const token = jwt.sign(userDto, 'tokenSecretJWT', { expiresIn: '1h' })

    return res.cookie('coderCookie', token, { maxAge: 3600000 }).send({ status: 'success', message: 'Logged in' })
  } catch (error) {
    return next(new InternalServerError())
  }
}

const current = async (req, res, next) => {
  const cookie = req.cookies.coderCookie
  const user = jwt.verify(cookie, 'tokenSecretJWT')

  if (user) { return res.send({ status: 'success', payload: user }) }
}

const unprotectedLogin = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) return res.status(400).send({ status: 'error', error: 'Incomplete values' })

  try {
    const user = await usersService.getUserByEmail(email)

    if (!user) return res.status(404).send({ status: 'error', error: "User doesn't exist" })

    const isValidPassword = await passwordValidation(user, password)

    if (!isValidPassword) return res.status(400).send({ status: 'error', error: 'Incorrect password' })

    const token = jwt.sign(user, 'tokenSecretJWT', { expiresIn: '1h' })

    res.cookie('unprotectedCookie', token, { maxAge: 3600000 }).send({ status: 'success', message: 'Unprotected Logged in' })
  } catch (error) {
    return next(new InternalServerError())
  }
}

const unprotectedCurrent = async (req, res, next) => {
  const cookie = req.cookies.unprotectedCookie
  const user = jwt.verify(cookie, 'tokenSecretJWT')

  if (user) { return res.send({ status: 'success', payload: user }) }
}

export default {
  current,
  login,
  register,
  unprotectedLogin,
  unprotectedCurrent
}
