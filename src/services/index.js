import UserRepository from '../repository/UserRepository.js'
import PetRepository from '../repository/PetRepository.js'
import AdoptionRepository from '../repository/AdoptionRepository.js'

export const usersService = new UserRepository()
export const petsService = new PetRepository()
export const adoptionsService = new AdoptionRepository()
