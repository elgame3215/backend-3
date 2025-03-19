import PetDTO from '../dto/Pet.dto.js'
import { InternalServerError } from '../errors/generic.errors.js'
import { PetCreationError, PetDeleteError, PetUpdateError } from '../errors/pet.errors.js'
import { petsService } from '../services/index.js'
import __dirname from '../utils/index.js'

const getAllPets = async (req, res, next) => {
  try {
    const pets = await petsService.getAll()

    res.send({ status: 'success', payload: pets })
  } catch (err) {
    return next(new InternalServerError())
  }
}

const createPet = async (req, res, next) => {
  const { name, specie, birthDate } = req.body
  try {
    if (!name || !specie || !birthDate) return res.status(400).send({ status: 'error', error: 'Incomplete values' })

    const pet = PetDTO.getPetInputFrom({ name, specie, birthDate })
    const result = await petsService.create(pet)

    res.send({ status: 'success', payload: result })
  } catch (err) {
    return next(new PetCreationError())
  }
}

const updatePet = async (req, res, next) => {
  try {
    const petUpdateBody = req.body
    const petId = req.params.pid
    await petsService.update(petId, petUpdateBody)

    res.send({ status: 'success', message: 'pet updated' })
  } catch (err) {
    return next(new PetUpdateError())
  }
}

const deletePet = async (req, res, next) => {
  try {
    const petId = req.params.pid
    await petsService.delete(petId)

    res.send({ status: 'success', message: 'pet deleted' })
  } catch (err) {
    return next(new PetDeleteError())
  }
}

const createPetWithImage = async (req, res, next) => {
  const { name, specie, birthDate } = req.body
  const file = req.file
  try {
    if (!name || !specie || !birthDate) return res.status(400).send({ status: 'error', error: 'Incomplete values' })

    console.log(file)

    const pet = PetDTO.getPetInputFrom({
      name,
      specie,
      birthDate,
      image: `${__dirname}/../public/img/${file.filename}`
    })

    console.log(pet)

    const result = await petsService.create(pet)

    res.send({ status: 'success', payload: result })
  } catch (err) {
    return next(new PetCreationError())
  }
}
export default {
  getAllPets,
  createPet,
  updatePet,
  deletePet,
  createPetWithImage
}
