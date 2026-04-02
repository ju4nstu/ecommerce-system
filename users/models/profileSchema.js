export const updateSchema = {
  body: {
    type: "object",
    required: ["user_phone", "user_birth", "user_name"],
    properties: {
      user_phone: { type: "string", minLength: Number(process.env.PHONE_NUMBER_MIN_LENGTH), maxLength: Number(process.env.PHONE_NUMBER_MIN_LENGTH) },
      user_birth: { type: "string", minLength: Number(process.env.BIRTH_DAY_MIN_LENGTH), maxLength: Number(process.env.BIRTH_DAY_MIN_LENGTH) },
      user_name: { type: "string" },
    },
    additionalProperties: false
  }
}