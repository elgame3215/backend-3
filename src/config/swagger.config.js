import swaggerJSDoc from 'swagger-jsdoc'
import { baseDir } from './config.js'

const apiPath = `${baseDir}/src/docs/**/*.yaml`

export const specs = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Proyecto backend-3 (adoptMe)',
      description: 'API utilizada para el proyecto de backend-3',
      version: '1.0.0'
    }
  },
  apis: [apiPath]
})
