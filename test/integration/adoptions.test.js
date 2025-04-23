import supertest from 'supertest'
import { expect } from 'chai'
import { after, before, describe, it } from 'mocha'
import Pet from '../../src/dao/Pets.dao.js'
import User from '../../src/dao/Users.dao.js'
import mongoose from 'mongoose'
import { CONFIG } from '../../src/config/config.js'
import { examplePets, exampleUsers } from '../mocks.js'
import Adoption from '../../src/dao/Adoption.js'

const client = supertest('http://localhost:8080/api/adoptions')
mongoose.connect(CONFIG.MONGO_URL)

describe('Adoptions API', async function () {
  const userDao = new User()
  const petDao = new Pet()
  const adoptionsDao = new Adoption()
  before(async function () {
    this.timeout(50000)

    const [{ _id: userID }] = await userDao.saveMany(exampleUsers)
    const [{ _id: petID }] = await petDao.save(examplePets)
    const { _id: adoptionID } = await adoptionsDao.save({
      owner: userID,
      pet: petID
    })
    this.userID = userID
    this.petID = petID
    this.adoptionID = adoptionID
  })

  after(async function () {
    userDao.clear()
    petDao.clear()
    adoptionsDao.clear()
  })

  it('should get all adoptions as an array', async function () {
    const response = await client.get('/')
    const data = await response.body

    expect(response).to.have.property('status', 200)
    expect(data).to.have.property('status', 'success')
    expect(data.payload).to.be.an('array')
  })

  it('should create an adoption', async function () {
    const response = await client.post(`/${this.userID}/${this.petID}`)
    const data = await response.body

    expect(response).to.have.property('status', 200)
    expect(data).to.have.property('status', 'success')
  })

  it('should get an adoption by id', async function () {
    const response = await client.get(`/${this.adoptionID}`)
    const data = await response.body

    expect(response).to.have.property('status', 200)
    expect(data).to.have.property('status', 'success')
    expect(data.payload).to.have.property('owner')
    expect(data.payload).to.have.property('pet')
  })
})
