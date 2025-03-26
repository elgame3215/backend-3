import User from '../dao/Users.dao.js'
import GenericRepository from './GenericRepository.js'

export default class UserRepository extends GenericRepository {
  constructor () {
    super(new User())
  }

  getUserByEmail = (email) => {
    return this.getBy({ email })
  }

  getUserById = (id) => {
    return this.getBy({ _id: id })
  }
}
