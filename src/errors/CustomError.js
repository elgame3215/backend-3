export class CustomError extends Error {
  constructor (code, message) {
    super(message)
    this.code = code
  }
}
