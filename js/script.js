// Supongamos que tienes un arreglo de productos
const products = [
  { name: 'Producto 1', price: 10 },
  { name: 'Producto 2', price: 15 },
  // Agrega más productos aquí
];

function addToCart(productName, price) {
  // Función para agregar productos al carrito
}

function updateCart() {
  // Función para actualizar el contenido del carrito
}

function searchProducts() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
  displayFilteredProducts(filteredProducts);
}

function displayFilteredProducts(filteredProducts) {
  const productsContainer = document.getElementById('products');
  productsContainer.innerHTML = '';

  filteredProducts.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    
    const productName = document.createElement('h2');
    productName.textContent = product.name;

    const productPrice = document.createElement('p');
    productPrice.classList.add('price');
    productPrice.textContent = `$${product.price}`;

    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Agregar al carrito';
    addToCartButton.addEventListener('click', () => addToCart(product.name, product.price));

    productDiv.appendChild(productName);
    productDiv.appendChild(productPrice);
    productDiv.appendChild(addToCartButton);

    productsContainer.appendChild(productDiv);
  });
}

// Muestra todos los productos al cargar la página
displayFilteredProducts(products);
let cartItems = [];
let total = 0;

function addToCart(productName, price) {
  cartItems.push({ name: productName, price: price });
  total += price;
  updateCart();
}

function updateCart() {
  const cartItemsElement = document.getElementById("cart-items");
  const totalElement = document.getElementById("total");
  cartItemsElement.innerHTML = "";
  totalElement.innerText = total;

  cartItems.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.innerText = `${item.name} - $${item.price}`;
    cartItemsElement.appendChild(listItem);
  });
}
