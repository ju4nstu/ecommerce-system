import 'dotenv/config'

export const usersSignUpSchema = {
  body: {
    type: "object",
    required: ["email", "password", "name", "birthday"],
    properties: {
      name: { type: "string" },
      email: { type: "string" },
      password: { type: "string", minLength: Number(process.env.PASSWORD_MIN_LENGTH) },
      birthday: { type: "string", minLength: Number(process.env.BIRTH_DAY_MIN_LENGTH), maxLength: Number(process.env.BIRTH_DAY_MIN_LENGTH) },
      phone: { type: "string", minLength: Number(process.env.PHONE_NUMBER_MIN_LENGTH), maxLength: Number(process.env.PHONE_NUMBER_MIN_LENGTH) }
    },
    additionalProperties: false
  }
}

export const usersSignInSchema = {
  body: {
    type: "object",
    required: ["email", "password"],
    properties: {
      name: { type: "string" },
      email: { type: "string" },
      password: { type: "string" },
      phone: { type: "string", minLength: Number(process.env.PHONE_NUMBER_MIN_LENGTH), maxLength: Number(process.env.PHONE_NUMBER_MIN_LENGTH) }
    },
    additionalProperties: false
  }
}
