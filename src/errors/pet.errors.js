import { ERRORS } from '../constants/enums/errors.js'
import { CustomError } from './CustomError.js'

export class PetCreationError extends CustomError {
  constructor () {
    super(ERRORS.PET_CREATION_ERROR, 'Error creating pet')
  }
}

export class PetUpdateError extends CustomError {
  constructor () {
    super(ERRORS.PET_UPDATE_ERROR, 'Error updating pet')
  }
}

export class PetDeleteError extends CustomError {
  constructor () {
    super(ERRORS.PET_DELETE_ERROR, 'Error deleting pet')
  }
}
