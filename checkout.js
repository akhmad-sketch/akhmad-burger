const cartSummary = document.getElementById('cart-summary');
const form = document.getElementById('payment-form');

// Получаем корзину из localStorage
const cart = JSON.parse(localStorage.getItem('checkoutCart')) || [];

if (cart.length === 0) {
    cartSummary.innerHTML = '<p>Ваша корзина пуста.</p>';
    form.style.display = 'none';
} else {
    let total = 0;
    const list = document.createElement('ul');
    cart.forEach(item => {
        total += item.price;
        const li = document.createElement('li');
        li.textContent = `${item.name} — $${item.price.toFixed(2)}`;
        list.appendChild(li);
    });

    const totalElem = document.createElement('p');
    totalElem.innerHTML = `<strong>Итог: $${total.toFixed(2)}</strong>`;

    cartSummary.appendChild(list);
    cartSummary.appendChild(totalElem);
}

// Обработка формы
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Здесь можно добавить проверку данных или отправку на сервер
    alert('Спасибо за заказ! Ваш заказ оформлен.');

    // Очищаем корзину
    localStorage.removeItem('checkoutCart');
    window.location.href = 'index.html';
});
