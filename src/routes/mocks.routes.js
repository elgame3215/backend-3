import { Router } from 'express'
import { MocksController } from '../controllers/mocks.controller.js'

const router = Router()

router.get('/mockingpets', MocksController.mockingPets)
router.get('/mockingusers', MocksController.mockingUsers)
router.post('/generateData', MocksController.generateData)

export default router
