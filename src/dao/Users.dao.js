import { GenericDao } from './Generic.dao.js'
import userModel from './models/User.js'

export default class User extends GenericDao {
  constructor () {
    super(userModel)
  }
}
