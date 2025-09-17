const cartBtn = document.querySelector('.cart-btn');
const cartSidebar = document.getElementById('cart');
const overlay = document.getElementById('overlay');
const cartItemsList = document.getElementById('cart-items');
const totalPriceElem = document.getElementById('total');
const clearCartBtn = document.getElementById('clear-cart');
const checkoutBtn = document.getElementById('checkout');
const orderButtons = document.querySelectorAll('.order-card button');

let cart = [];

function updateCartUI() {
    cartItemsList.innerHTML = '';
    let total = 0;

    cart.forEach((item, idx) => {
        total += item.price;
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.name} - $${item.price}</span>
            <button class="remove-btn" data-index="${idx}">×</button>
        `;
        cartItemsList.appendChild(li);
    });

    totalPriceElem.textContent = total.toFixed(2);
}

function openCart() {
    cartSidebar.classList.add('open');
    overlay.classList.add('active');
}

function closeCart() {
    cartSidebar.classList.remove('open');
    overlay.classList.remove('active');
}

cartBtn.addEventListener('click', () => {
    openCart();
});

overlay.addEventListener('click', () => {
    closeCart();
});

clearCartBtn.addEventListener('click', () => {
    cart = [];
    updateCartUI();
    closeCart();
});

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Корзина пуста');
        return;
    }

    // Сохраняем корзину в localStorage и переходим
    localStorage.setItem('checkoutCart', JSON.stringify(cart));
    window.location.href = 'checkout.html';
});

cartItemsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
        const index = +e.target.dataset.index;
        cart.splice(index, 1);
        updateCartUI();
    }
});

orderButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.order-card');
        const name = card.dataset.name;
        const price = parseFloat(card.dataset.price);
        const img = card.dataset.img;

        cart.push({ name, price, img });
        updateCartUI();
        openCart();
    });
});

const burgerMenu = document.getElementById('burger-menu');
const mainNav = document.getElementById('main-nav');

burgerMenu.addEventListener('click', () => {
    mainNav.classList.toggle('open');
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('#main-nav a, #main-nav button').forEach(el => {
    el.addEventListener('click', () => {
        mainNav.classList.remove('open');
    });
});
