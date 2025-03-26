import { faker } from '@faker-js/faker'
import { createHash } from '../utils/index.js'

export async function generateUser ({ admin = false }) {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  return {
    first_name: firstName,
    last_name: lastName,
    email: faker.internet.email({ firstName, lastName }),
    password: await createHash('coder123'),
    role: admin ? 'admin' : 'user',
    pets: []
  }
}

export async function generateUsers (petsNum) {
  const pets = []
  for (let i = 0; i < petsNum; i++) {
    const admin = i % 10 === 0 // 1 admin cada 10 usuarios
    pets.push(await generateUser({ admin }))
  }
  return pets
}
