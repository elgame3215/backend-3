import PetDTO from '../dto/Pet.dto.js'
import UserDTO from '../dto/User.dto.js'
import { InternalServerError } from '../errors/generic.errors.js'
import { generatePets } from '../mocks/pets.js'
import { generateUsers } from '../mocks/users.js'
import { petsService, usersService } from '../services/index.js'

export class MocksController {
  static mockingPets (req, res) {
    const pets = generatePets(50)
    const payload = pets.map(pet => PetDTO.getPetInputFrom(pet))

    return res.status(200).json({ status: 'success', payload })
  }

  static async mockingUsers (req, res) {
    const users = await generateUsers(50)
    const payload = users.map(user => UserDTO.getUserTokenFrom(user))

    return res.status(200).json({ status: 'success', payload })
  }

  static async generateData (req, res, next) {
    const { users: usersNum, pets: petsNum } = req.body

    const users = await generateUsers(usersNum)
    const pets = generatePets(petsNum)

    try {
      await usersService.createMany(users)
      await petsService.createMany(pets)
    } catch (error) {
      console.error(error)

      return next(new InternalServerError())
    }

    return res.status(201).json({ status: 'success', message: 'Data generated' })
  }
}
