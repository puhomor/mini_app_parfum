// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;
tg.expand(); // Разворачиваем на весь экран

// Элементы DOM
const orderBtns = document.querySelectorAll('.order-btn');
const volumeBtns = document.querySelectorAll('.volume-btn');
const modal = document.getElementById('orderModal');
const closeBtn = document.querySelector('.close');
const orderForm = document.getElementById('orderForm');

// Текущий выбранный товар
let currentProduct = {
    name: '',
    volume: '',
    price: ''
};

// Обработчики кнопок объема
volumeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Удаляем активный класс у всех кнопок в родителе
        const parent = this.closest('.volume-selector');
        parent.querySelectorAll('.volume-btn').forEach(b => b.classList.remove('active'));
        
        // Добавляем активный класс текущей кнопке
        this.classList.add('active');
        
        // Обновляем данные
        currentProduct.volume = this.dataset.volume;
        currentProduct.price = this.dataset.price;
    });
});

// Обработчики кнопок заказа
orderBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Получаем данные о товаре
        const productCard = this.closest('.product-card');
        const productName = this.dataset.product;
        const activeVolume = productCard.querySelector('.volume-btn.active');
        
        currentProduct = {
            name: productName,
            volume: activeVolume.dataset.volume,
            price: activeVolume.dataset.price
        };
        
        // Заполняем форму
        document.getElementById('selectedProduct').value = currentProduct.name;
        document.getElementById('selectedVolume').value = currentProduct.volume;
        document.getElementById('selectedPrice').value = currentProduct.price;
        
        // Обновляем текст в модалке
        document.getElementById('summaryText').textContent = 
            `${currentProduct.name}, ${currentProduct.volume} - ${parseInt(currentProduct.price).toLocaleString('ru-RU')}₽`;
        
        // Показываем модалку
        modal.style.display = 'block';
    });
});

// Закрытие модалки
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Отправка формы
orderForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = orderForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    try {
        submitBtn.disabled = true;
        submitBtn.textContent = '⏳ Отправляем...';
        
        const orderData = {
            perfume_name: document.getElementById('selectedProduct').value,
            volume: document.getElementById('selectedVolume').value,
            price: document.getElementById('selectedPrice').value,
            customer_name: document.getElementById('customerName').value,
            phone: document.getElementById('phone').value,
            comments: document.getElementById('comments').value
        };
        
        // Отправляем на бэкенд Flask
        const response = await fetch('/place_order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            submitBtn.textContent = '✅ Заказ отправлен!';
            
            // Закрываем модалку через 2 секунды
            setTimeout(() => {
                modal.style.display = 'none';
                orderForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Можно показать всплывающее уведомление в Telegram
                tg.showPopup({
                    title: 'Успешно!',
                    message: 'Заказ отправлен. Я свяжусь с вами в Telegram в течение 5 минут.',
                    buttons: [{ type: 'ok' }]
                });
                
            }, 2000);
        } else {
            throw new Error(result.error || 'Ошибка отправки');
        }
        
    } catch (error) {
        submitBtn.textContent = '❌ Ошибка';
        alert('Ошибка при отправке заказа: ' + error.message);
        submitBtn.disabled = false;
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
        }, 2000);
    }
});

// Закрытие приложения (опционально)
function closeApp() {
    tg.close();
}

// Автозаполнение данных пользователя из Telegram (если доступно)
if (tg.initDataUnsafe.user) {
    const user = tg.initDataUnsafe.user;
    if (user.first_name) {
        document.getElementById('customerName').value = user.first_name + (user.last_name ? ' ' + user.last_name : '');
    }
    if (user.username) {
        document.getElementById('phone').placeholder = `@${user.username}`;
    }
}