export function Entropy(len) {
  let entropy = Math.round(len * Math.log2(94))

  if (entropy <= 59) return false
  if (entropy >= 60) return true
}

// const password = '12345'
// console.log(Entropy(password.length))