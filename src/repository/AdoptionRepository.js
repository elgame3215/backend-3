import Adoption from '../dao/Adoption.js'
import GenericRepository from './GenericRepository.js'

export default class AdoptionRepository extends GenericRepository {
  constructor () {
    super(new Adoption())
  }
}
