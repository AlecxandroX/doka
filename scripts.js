// Adicione ao final do seu arquivo scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const closeCartButton = document.getElementById('close-cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    let cart = [];

    cartIcon.addEventListener('click', () => {
        toggleCart();
    });

    closeCartButton.addEventListener('click', () => {
        toggleCart();
    });

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            addToCart(id, name, price);
        });
    });

    function addToCart(id, name, price) {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity++;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        updateCart();
    }

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        let count = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            const img = document.createElement('img');
            img.src = `https://via.placeholder.com/50x50?text=${item.name}`;
            img.alt = item.name;
            li.appendChild(img);
            li.textContent += `${item.name} x${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}`;
            cartItems.appendChild(li);
            total += item.price * item.quantity;
            count += item.quantity;
        });

        cartTotal.textContent = total.toFixed(2);
        cartCount.textContent = count;
    }

    function toggleCart() {
        if (cartModal.style.display === 'flex') {
            cartModal.style.animation = 'slide-out 0.3s ease-in';
            setTimeout(() => {
                cartModal.style.display = 'none';
            }, 250);
        } else {
            cartModal.style.display = 'flex';
            cartModal.style.animation = 'slide-in 0.3s ease-out';
        }
    }
});
