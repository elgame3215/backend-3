import { GenericDao } from './Generic.dao.js'
import petModel from './models/Pet.js'

export default class Pet extends GenericDao {
  constructor () {
    super(petModel)
  }
}
