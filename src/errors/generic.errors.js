import { ERRORS } from '../constants/enums/error.codes.js'
import { CustomError } from './CustomError.js'

export class InternalServerError extends CustomError {
  constructor () {
    super(ERRORS.INTERNAL_SERVER_ERROR, 'Internal server error')
  }
}
