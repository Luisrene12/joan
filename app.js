// Productos iniciales del catálogo
const products = [
  {
    name: "Coca Cola 600ml",
    price: 1.50,
    image: "https://via.placeholder.com/150?text=Coca+Cola"
  },
  {
    name: "Pepsi 600ml",
    price: 1.40,
    image: "https://via.placeholder.com/150?text=Pepsi"
  },
  {
    name: "Agua Mineral 500ml",
    price: 1.00,
    image: "https://via.placeholder.com/150?text=Agua+Mineral"
  },
  {
    name: "Red Bull 250ml",
    price: 2.50,
    image: "https://via.placeholder.com/150?text=Red+Bull"
  }
];

let cart = [];

// Mostrar productos del catálogo
function displayProducts(productArray) {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  productArray.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('col-md-4');

    productCard.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${product.image || 'https://via.placeholder.com/150'}" class="card-img-top" alt="${product.name}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text fw-bold">$${product.price.toFixed(2)}</p>
          <button class="btn btn-primary mt-auto add-to-cart-btn" data-name="${product.name}" data-price="${product.price}">
            Añadir al carrito
          </button>
        </div>
      </div>
    `;

    productList.appendChild(productCard);
  });

  // Agregar eventos a los botones
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', addToCart);
  });
}

// Agregar producto al carrito
function addToCart(e) {
  const name = e.target.dataset.name;
  const price = parseFloat(e.target.dataset.price);

  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  updateCart();
}

// Actualizar carrito
function updateCart() {
  const cartList = document.getElementById('cart-list');
  const cartTotal = document.getElementById('cart-total');
  let total = 0;

  if (cart.length === 0) {
    cartList.innerHTML = '<p class="text-muted text-center">Tu carrito está vacío</p>';
    cartTotal.innerText = '0.00';
    return;
  }

  cartList.innerHTML = '';
  cart.forEach(item => {
    total += item.price * item.quantity;
    const cartItem = document.createElement('div');
    cartItem.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mb-2');

    cartItem.innerHTML = `
      <div>
        <strong>${item.name}</strong> x${item.quantity}
      </div>
      <div>
        $${(item.price * item.quantity).toFixed(2)}
      </div>
    `;

    cartList.appendChild(cartItem);
  });

  cartTotal.innerText = total.toFixed(2);
  updateWhatsAppLink();
}

// Actualizar link de WhatsApp
function updateWhatsAppLink() {
  const whatsappBtn = document.getElementById('whatsapp-btn');
  const phoneNumber = "51999999999"; // ← aquí pon tu número real
  let message = "¡Hola! Quiero comprar:\n\n";

  cart.forEach(item => {
    message += `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  message += `\nTotal a pagar: $${total.toFixed(2)}`;

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  whatsappBtn.href = url;
}

// Agregar productos manualmente
const form = document.getElementById('product-form');
form.addEventListener('submit', e => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const price = parseFloat(document.getElementById('price').value);
  const image = document.getElementById('image').value.trim();

  if (name && price) {
    products.push({ name, price, image });
    displayProducts(products);
    form.reset();
  }
});

// Buscar productos
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', e => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
  displayProducts(filteredProducts);
});

// Inicializar página
displayProducts(products);
