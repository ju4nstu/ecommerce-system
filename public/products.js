fetch('/api/products')
  .then(res => res.json())
  .then(products => {
    const container = document.querySelector('.product-grid')
    const fragment = document.createDocumentFragment()

    products.forEach(product => {
      const product_card = document.createElement('article')
      product_card.className = 'product-card'
      product_card.innerHTML += `
          <img src="/img/${product.id}.png" alt="Product Image">
          <div class="product-info">
            <h3>${product.name}</h3>
            <p class="price">$${product.price}</p>
            <p class="description">${product.description}</p>
            <p class="stock ${ (product.stock < 10) ? 'out-of-stock' : 'in-stock' }">Stock: ${product.stock} left</p>
            <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Add to cart</button> 
          </div>
        `

      fragment.appendChild(product_card)
    })
    container.appendChild(fragment)
  })
// place holder image:
// https://via.placeholder.com/300x200/333/888?text=Product+Image


function finalValue (products) {
  let final_value = 0
  for (let product of products) {
    final_value += product.quantity * product.price
  }
  return parseFloat(final_value)
}

let cart = JSON.parse(localStorage.getItem('cart')) || []

function refreshCart() {
  const container = document.querySelector('.cart-item-list')
  const fragment = document.createDocumentFragment()
  const p = document.getElementById('final-value')
  
  container.innerHTML = ''
  p.textContent = '$' + finalValue(cart)

  for (let product of cart) {
    const product_content = document.createElement('p')
    product_content.textContent = `${product.name}, quantity: ${product.quantity}, price: ${product.price}`
    fragment.appendChild(product_content)
  }

  container.appendChild(fragment)
}

refreshCart()

document.querySelector('.product-grid').addEventListener('click', (e) => {
  if (e.target.classList.contains('add-to-cart')) {
    let productId = parseInt(e.target.dataset.id)
    let productName = e.target.dataset.name
    let productPrice = parseFloat(e.target.dataset.price)

    addCart(productId, productName, productPrice)
  }
})


function addCart(productId, productName, productPrice) {
  let cart = JSON.parse(localStorage.getItem('cart')) || []

  const existing = cart.find(item => item.id === productId)

  if (existing) {
    existing.quantity++
  } else {
    cart.push({ id: productId, name: productName, quantity: 1, price: productPrice})
  }

  localStorage.setItem('cart', JSON.stringify(cart))

  p.textContent = '$' + finalValue(cart)

  refreshCart()
}

