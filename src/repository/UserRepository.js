import GenericRepository from './GenericRepository.js'

export default class UserRepository extends GenericRepository {
  getUserByEmail = (email) => {
    return this.getBy({ email })
  }

  getUserById = (id) => {
    return this.getBy({ _id: id })
  }
}
