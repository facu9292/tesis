// script.js

const cartButton = document.getElementById('cartButton');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const totalPriceElement = document.getElementById('totalPrice');
const clearCartButton = document.getElementById('clearCart');
const username = 'JuanP'; // Simulación de un usuario autenticado

// Cargar el carrito desde localStorage si existe
let cart = JSON.parse(localStorage.getItem(`${username}_cart`)) || [];

// Función para agregar un producto al carrito
function addToCart(name, price) {
    const existingProductIndex = cart.findIndex(product => product.name === name);

    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push({ name, price: parseFloat(price), quantity: 1 });
    }

    saveCart();
    updateCart();
}

// Función para actualizar la visualización del carrito
function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${product.name} - $${(product.price * product.quantity).toFixed(2)}
            <div class="quantity-control">
                <button class="decreaseQuantity">-</button>
                <span>x${product.quantity}</span>
                <button class="increaseQuantity">+</button>
            </div>
            <button class="removeItem">X</button>
        `;

        li.querySelector('.removeItem').addEventListener('click', () => removeFromCart(product.name));
        li.querySelector('.increaseQuantity').addEventListener('click', () => changeQuantity(product.name, 1));
        li.querySelector('.decreaseQuantity').addEventListener('click', () => changeQuantity(product.name, -1));

        cartItems.appendChild(li);

        total += product.price * product.quantity;
    });

    totalPriceElement.textContent = total.toFixed(2);
    cartCount.textContent = cart.length;
}

// Función para cambiar la cantidad de un producto en el carrito
function changeQuantity(name, amount) {
    const productIndex = cart.findIndex(product => product.name === name);

    if (productIndex > -1) {
        cart[productIndex].quantity += amount;

        if (cart[productIndex].quantity <= 0) {
            cart.splice(productIndex, 1);
        }

        saveCart();
        updateCart();
    }
}

// Función para eliminar un producto del carrito
function removeFromCart(name) {
    const productIndex = cart.findIndex(product => product.name === name);

    if (productIndex > -1) {
        cart.splice(productIndex, 1);
        saveCart();
        updateCart();
    }
}

// Función para vaciar el carrito
function clearCart() {
    cart = [];
    saveCart();
    updateCart();
}

// Función para guardar el carrito en localStorage
function saveCart() {
    localStorage.setItem(`${username}_cart`, JSON.stringify(cart));
}

// Añadir eventos a los botones "Agregar al carrito"
document.querySelectorAll('.addToCart').forEach(button => {
    button.addEventListener('click', () => {
        const productElement = button.parentElement;
        const name = productElement.getAttribute('data-name');
        const price = productElement.getAttribute('data-price');
        addToCart(name, price);
    });
});

// Añadir evento al botón de vaciar carrito
clearCartButton.addEventListener('click', clearCart);

// Cargar el carrito al iniciar la página
window.onload = updateCart;
