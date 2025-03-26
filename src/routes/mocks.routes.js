import { Router } from 'express'
import { generatePet } from '../mocks/pets.js'
import { MocksController } from '../controllers/mocks.controller.js'

const router = Router()

router.get('/mockingpets', MocksController.mockingPets)
router.get('/mockingusers', MocksController.mockingUsers)
router.post('/generateData', MocksController.generateData)

export default router
