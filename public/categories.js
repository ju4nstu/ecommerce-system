document.querySelectorAll('#side-panel a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault()
    const category = e.target.textContent.toLowerCase()

    window.history.pushState({}, '', `/categories/${category}`)

    loadProducts(category)
  })
})

function loadProducts(category) {
  fetch(`/api/products?category=${category}`)
    .then(res => res.json())
    .then(products => {
      const container = document.querySelector('.product-grid')
      products.forEach(product => {
        container.innerHTML += `
          <div class="product-card">
            <p>${product.name}</p>
            <p>${product.description}</p>
            <p>${product.stock}</p>
            <p>$${product.price}</p>
          </div>
        `
      })
    })
}