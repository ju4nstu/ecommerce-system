export function DefaultErrorHanlder(server, opts) { 
  server.setErrorHandler(function (error, req, rep) {
    //console.log("ERROR ==>", error)
    
    if (error instanceof AppError) {
      return rep.code(error.statusCode).send({ message: error.message })
    }
    
    if (error.validation) {
      return rep.status(422).send(new Error(error.validation[0].message))
    }
    return rep.code(500).send({ message: 'Internal server error' })
  })
}

export class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message)
    this.statusCode = statusCode
  }

  static INVALID_CREDENTIALS() {
    return new AppError('Invalid crendentials', 401)
  }

  static VIOLATES_UNIQUE_CONSTRAINT(name) {
    return new AppError(`${name} is already in use`, 401)
  }

  static UNAUTHORIZED() {
    return new AppError('Unauthorized', 401)
  }
}
