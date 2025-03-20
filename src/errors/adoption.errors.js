import { ERRORS } from '../constants/enums/error.codes.js'
import { CustomError } from './CustomError.js'

export class CreateAdoptionError extends CustomError {
  constructor () {
    super(ERRORS.CREATE_ADOPTION_ERROR, 'Error creating adoption')
  }
}
