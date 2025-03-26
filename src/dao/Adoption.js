import { GenericDao } from './Generic.dao.js'
import adoptionModel from './models/Adoption.js'

export default class Adoption extends GenericDao {
  constructor () {
    super(adoptionModel)
  }
}
