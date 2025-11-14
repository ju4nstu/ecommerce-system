
document.getElementById('signup-form').addEventListener('submit', async (e) => {
  e.preventDefault()

  const email = document.getElementById('signup-email').value
  const password = document.getElementById('signup-password').value
  const name = document.getElementById('signup-name').value
  
  await fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ name: name, email: email, password: password })
  })
})

document.getElementById('login-form').addEventListener('submit', async(e) => {
  e.preventDefault()

  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const res = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include'
  })
    
  const data = await res.json()
  console.log(data.message)
  console.log(data.user)


  const headerRight = document.querySelector('.header-right')

  const p = document.createElement('p')
  const userName = document.createTextNode(data.user)
  p.appendChild(userName)

  headerRight.appendChild(p)
  
  const loginBtn = document.getElementById('login-open-btn')
  const signupBtn = document.getElementById('signup-open-btn')
  loginBtn.remove()
  signupBtn.remove()
  
  document.body.insertBefore(p, headerRight)
})

fetch('/secure-route', {
  method: 'GET',
  credentials: 'include'
})

fetch('/', {
  method: 'GET',
  credentials: 'include'
})