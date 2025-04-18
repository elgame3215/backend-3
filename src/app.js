import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import swaggerUi from 'swagger-ui-express'

import usersRouter from './routes/users.routes.js'
import petsRouter from './routes/pets.routes.js'
import adoptionsRouter from './routes/adoption.routes.js'
import sessionsRouter from './routes/sessions.routes.js'
import mocksRouter from './routes/mocks.routes.js'
import { CustomError } from './errors/CustomError.js'
import { CONFIG } from './config/config.js'
import { specs } from './config/swagger.config.js'

const app = express()
const PORT = process.env.PORT || 8080
mongoose.connect(CONFIG.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err))

app.use(express.json())
app.use(cookieParser())

app.use('/api/users', usersRouter)
app.use('/api/pets', petsRouter)
app.use('/api/adoptions', adoptionsRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/api/mocks', mocksRouter)

app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(specs))

app.use((err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(500).json({ status: 'error', error: err.message })
  } else {
    res.status(500).json({ status: 'error', error: 'Internal server error' })
  }
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
