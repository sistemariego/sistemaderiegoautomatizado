// JavaScript code for the online store's functionality

document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-count');
    const productsContainer = document.getElementById('products');
    const listaCarrito = document.getElementById('lista-carrito');
    const comprarBtn = document.getElementById('comprar');

    const products = [
        { id: 1, name: 'Sistema de Riego Automático 1', price: 100, img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', desc: 'Ideal para jardines pequeños y medianos.' },
        { id: 2, name: 'Sistema de Riego Automático 2', price: 150, img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', desc: 'Control inteligente y sensores de humedad.' },
        { id: 3, name: 'Sistema de Riego Automático 3', price: 200, img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80', desc: 'Cobertura para grandes áreas y cultivos.' },
    ];

    function renderProducts() {
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('producto');
            productDiv.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.desc}</p>
                <p style="font-weight:bold;color:#45a049;">Precio: $${product.price}</p>
                <button class="add-to-cart" data-id="${product.id}">Agregar al carrito</button>
            `;
            productsContainer.appendChild(productDiv);
        });
    }

    function updateCartCount() {
        cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    }

    function renderCart() {
        if (listaCarrito) {
            if (cart.length === 0) {
                listaCarrito.innerHTML = '<p>El carrito está vacío.</p>';
                return;
            }
            listaCarrito.innerHTML = cart.map(item => `
                <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid #eee;">
                    <span>${item.name} (x${item.quantity})</span>
                    <span style="font-weight:bold;">$${item.price * item.quantity}</span>
                    <button class="remove-item" data-id="${item.id}" style="background:#e53935;color:#fff;border:none;padding:4px 10px;border-radius:6px;cursor:pointer;">Eliminar</button>
                </div>
            `).join('');
        }
    }

    productsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            const productId = parseInt(event.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            const cartItem = cart.find(item => item.id === productId);
            if (cartItem) {
                cartItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            renderCart();
        }
    });

    if (listaCarrito) {
        listaCarrito.addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-item')) {
                const productId = parseInt(event.target.getAttribute('data-id'));
                cart = cart.filter(item => item.id !== productId);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                renderCart();
            }
        });
    }

    if (comprarBtn) {
        comprarBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('El carrito está vacío.');
                return;
            }
            window.location.href = "checkout.html";
        });
    }

    renderProducts();
    renderCart();
    updateCartCount();
});