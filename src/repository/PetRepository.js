import Pet from '../dao/Pets.dao.js'
import GenericRepository from './GenericRepository.js'

export default class PetRepository extends GenericRepository {
  constructor () {
    super(new Pet())
  }
}
