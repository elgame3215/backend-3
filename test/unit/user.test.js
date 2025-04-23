/* eslint-disable no-unused-expressions */
import { before, describe, it } from 'mocha'
import { expect } from 'chai'
import mongoose from 'mongoose'
import { CONFIG } from '../../src/config/config.js'
import User from '../../src/dao/Users.dao.js'
import { exampleUsers } from '../mocks.js'

describe('Users DAO', function () {
  before(function () {
    mongoose.connect(CONFIG.MONGO_URL)
    const dao = new User()
    this.dao = dao
  })

  this.beforeEach(async function () {
    await this.dao.clear()
    await this.dao.saveMany(exampleUsers)

    const [savedUser] = await this.dao.get()
    const { _id: userID } = savedUser

    this.exampleUserID = userID
    this.exampleUser = savedUser

    this.timeout(5000)
  })

  it('should get all users as an array', async function () {
    const users = await this.dao.get()
    expect(users).to.be.an('array')
  })

  it('should create a user', async function () {
    const exampleUser = {
      ...exampleUsers[0],
      email: 'roberto@gmail.com'
    }
    const user = await this.dao.save(exampleUser)

    expect(user).to.deep.include(exampleUser)
    expect(user).to.have.property('_id')
  })

  it('should update a user', async function () {
    const updatedUser = await this.dao.update(this.exampleUserID, { first_name: 'matias', last_name: 'almeyda' })

    expect(updatedUser).to.deep.include({ first_name: 'matias', last_name: 'almeyda' })
    expect(this.exampleUser).to.not.deep.include({ first_name: 'matias', last_name: 'almeyda' })
  })

  it('should delete a user', async function () {
    let deletedUser = await this.dao.getById(this.exampleUserID)
    expect(deletedUser).to.exist

    await this.dao.delete(this.exampleUserID)

    deletedUser = await this.dao.getById(this.exampleUserID)
    expect(deletedUser).to.not.exist
  })
})
