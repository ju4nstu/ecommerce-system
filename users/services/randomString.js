export function genString(length) {
  let result = ''

  while (result.length < length) {
    result += Math.random().toString(36).substring(2)
  }
  return result.substring(0, length)
}

export function genInt(max, len) {
  let result = ''

  while (result.length < len) {
    result += Math.floor(Math.random() * max)
  }
  return result
}
//console.log(genInt(9, 3))
//console.log(genString(12))