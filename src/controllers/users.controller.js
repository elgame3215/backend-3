import { InternalServerError } from '../errors/generic.errors.js'
import { usersService } from '../services/index.js'

const getAllUsers = async (req, res, next) => {
  try {
    const users = await usersService.getAll()

    res.send({ status: 'success', payload: users })
  } catch (error) {
    return next(new InternalServerError())
  }
}

const getUser = async (req, res, next) => {
  const userId = req.params.uid
  try {
    const user = await usersService.getUserById(userId)

    if (!user) return res.status(404).send({ status: 'error', error: 'User not found' })

    return res.send({ status: 'success', payload: user })
  } catch (error) {
    return next(new InternalServerError())
  }
}

const updateUser = async (req, res, next) => {
  const updateBody = req.body
  console.log({ updateBody })
  const userId = req.params.uid
  try {
    const user = await usersService.getUserById(userId)

    if (!user) return res.status(404).send({ status: 'error', error: 'User not found' })

    await usersService.update(userId, updateBody)

    return res.send({ status: 'success', message: 'User updated' })
  } catch (error) {
    return next(new InternalServerError())
  }
}

const deleteUser = async (req, res, next) => {
  const userId = req.params.uid
  try {
    await usersService.getUserById(userId)

    return res.send({ status: 'success', message: 'User deleted' })
  } catch (error) {
    return next(new InternalServerError())
  }
}

export default {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser
}
