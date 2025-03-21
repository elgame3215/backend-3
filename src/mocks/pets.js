import { faker } from '@faker-js/faker'

export function generatePet () {
  return {
    name: faker.animal.petName(),
    specie: faker.animal.type(),
    birthDate: faker.date.recent({ days: 1200 })
  }
}
