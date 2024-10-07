// script.js
document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.getElementById('cart-total');
    let total = 0;

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', event => {
            const productElement = event.target.parentElement;
            const productName = productElement.querySelector('h2').textContent;
            const productPrice = parseFloat(productElement.querySelector('p').textContent.replace('$', ''));

            // Añadir producto al carrito
            const cartItem = document.createElement('li');
            cartItem.textContent = `${productName} - $${productPrice.toFixed(2)}`;
            cartItems.appendChild(cartItem);

            // Actualizar total
            total += productPrice;
            cartTotal.textContent = `$${total.toFixed(2)}`;
        });
    });
});
