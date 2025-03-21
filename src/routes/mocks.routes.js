import { Router } from 'express'
import { generatePet } from '../mocks/pets.js'

const router = Router()

router.get('/mockingpets', async (req, res) => {
  const payload = []
  for (let i = 0; i < 100; i++) {
    payload.push(generatePet())
  }
  res.status(200).json({ status: 'sucess', payload })
})

export default router
