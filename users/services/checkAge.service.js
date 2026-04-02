import 'dotenv/config'

export function calculateAge(birthdate) {
  const today = new Date()
  const birth = new Date(birthdate)

  let years = today.getUTCFullYear() - birth.getUTCFullYear()
  let months = today.getUTCMonth() - birth.getUTCMonth()
  let days = today.getUTCDate() - birth.getUTCDate()

  if (months < 0) {
    years--
    months += 12
  }
  if (days < 0) {
    months--
    days += 30
  }

  return [years, months, days]
}

export function checkAge(birthdate) { 
  const age = calculateAge(birthdate)
  if (age[0] < process.env.ADULTHOOD_AGE) {
    return false
  } 
  else {
    return true
  }
}

// console.log(calculateAge("2007/07/15"))
// console.log(checkAge("2008/11/27"))