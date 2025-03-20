import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

import usersRouter from './routes/users.router.js'
import petsRouter from './routes/pets.router.js'
import adoptionsRouter from './routes/adoption.router.js'
import sessionsRouter from './routes/sessions.router.js'
import { CustomError } from './errors/CustomError.js'

const app = express()
const PORT = process.env.PORT || 8080
mongoose.connect('URL DE MONGO')

app.use(express.json())
app.use(cookieParser())

app.use('/api/users', usersRouter)
app.use('/api/pets', petsRouter)
app.use('/api/adoptions', adoptionsRouter)
app.use('/api/sessions', sessionsRouter)

app.use((err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(500).json({ status: 'error', error: err.message })
  } else {
    res.status(500).json({ status: 'error', error: 'Internal server error' })
  }
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
