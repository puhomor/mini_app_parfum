// Telegram Web App инициализация
const tg = window.Telegram.WebApp;
tg.expand();
tg.setHeaderColor('#000000');
tg.setBackgroundColor('#000000');

// Данные о товарах с РАЗНЫМИ изображениями
const products = {
    1: {
        name: "Creed Aventus",
        description: "Ананас, берёза, амбра. Стойкость 12+ часов. Классический мужской аромат, созданный в 2010 году. Идеален для особых случаев.",
        volumes: [
            { size: "50ml", price: 32000 },
            { size: "100ml", price: 42000 }
        ],
        catalogImage: "/static/images/Creed_Aventus.tiff", // Изображение для каталога
        productImage: "/static/images/Creed_Aventus.tiff", // Изображение для карточки товара
        badge: "🔥"
    },
    2: {
        name: "Tom Ford Noir Extreme",
        description: "Восточно-пряный, ваниль, сандал. Роскошный вечерний аромат для уверенных мужчин.",
        volumes: [
            { size: "50ml", price: 28000 },
            { size: "100ml", price: 38000 }
        ],
        catalogImage: "/static/images/духи1.tiff", // Разное изображение
        productImage: "/static/images/духи1.tiff",
        badge: "NEW"
    },
    3: {
        name: "Dior Sauvage",
        description: "Свежий, пряный, амброксан. Стойкость 10+ часов. Современный классик.",
        volumes: [
            { size: "50ml", price: 26000 },
            { size: "100ml", price: 36000 }
        ],
        catalogImage: "/static/images/духи1.tiff",
        productImage: "/static/images/духи1.tiff",
        badge: "🔥"
    },
    4: {
        name: "Chanel Bleu",
        description: "Цитрусовый, древесный. Стойкость 8+ часов. Универсальный аромат на каждый день.",
        volumes: [
            { size: "50ml", price: 24000 },
            { size: "100ml", price: 34000 }
        ],
        catalogImage: "/static/images/духи1.tiff",
        productImage: "/static/images/духи1.tiff",
        badge: "⭐"
    }
};

// Глобальные переменные
let cart = [];
let currentProduct = null;
let selectedVolumeIndex = 0;
let currentDelivery = 'pickup';
let userTelegramTag = '';

// Элементы DOM
const productCards = document.querySelectorAll('.product-card');
const cartButton = document.getElementById('cartButton');
const cartModal = document.getElementById('cartModal');
const productPage = document.getElementById('productPage');
const backBtn = document.getElementById('backBtn');
const checkoutButton = document.getElementById('checkoutButton');
const orderModal = document.getElementById('orderModal');
const addToCartBtn = document.getElementById('addToCartBtn');

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен');
    initTelegramUser();
    initEventListeners();
    loadCart();
    
    // Устанавливаем разные изображения для товаров в каталоге
    setupCatalogImages();
    
    // Скрываем все модалки при загрузке
    closeCartModal();
    closeOrderModal();
    hideProductPage();
});

// Установка разных изображений для товаров в каталоге
function setupCatalogImages() {
    console.log('Устанавливаем изображения для каталога');
    
    productCards.forEach(card => {
        const productId = parseInt(card.dataset.productId);
        const product = products[productId];
        
        if (product) {
            const imgElement = card.querySelector('.product-image img');
            if (imgElement) {
                // Устанавливаем изображение из массива products
                imgElement.src = product.catalogImage;
                imgElement.alt = product.name;
                console.log(`Установлено изображение для ${product.name}: ${product.catalogImage}`);
            }
        }
    });
}

function initTelegramUser() {
    if (tg.initDataUnsafe.user) {
        const user = tg.initDataUnsafe.user;
        userTelegramTag = user.username ? `@${user.username}` : `ID: ${user.id}`;
        document.getElementById('userTagValue').textContent = userTelegramTag;
    }
}

function initEventListeners() {
    console.log('Инициализация обработчиков событий');
    
    // Клик по карточке товара
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            console.log('Клик по карточке товара');
            const productId = parseInt(this.dataset.productId);
            showProductPage(productId);
        });
    });
    
    // Кнопка "Назад" на странице товара
    backBtn.addEventListener('click', hideProductPage);
    
    // Кнопка корзины
    cartButton.addEventListener('click', openCartModal);
    
    // Кнопка "Добавить в корзину"
    addToCartBtn.addEventListener('click', addCurrentProductToCart);
    
    // Кнопка "Оформить заказ" в корзине
    checkoutButton.addEventListener('click', openOrderModal);
    
    // Доставка
    document.querySelectorAll('.delivery-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.delivery-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentDelivery = this.dataset.delivery;
            
            const addressField = document.getElementById('addressField');
            addressField.style.display = currentDelivery !== 'pickup' ? 'block' : 'none';
        });
    });
    
    // Отправка формы заказа
    document.getElementById('orderForm').addEventListener('submit', submitOrder);
    
    // Клик вне модалок для закрытия
    window.addEventListener('click', function(e) {
        if (e.target === cartModal) closeCartModal();
        if (e.target === orderModal) closeOrderModal();
    });
}

// Корзина
function addCurrentProductToCart() {
    console.log('Клик на "Добавить в корзину"');
    
    if (!currentProduct) {
        console.error('Нет текущего продукта');
        return;
    }
    
    const product = products[currentProduct];
    if (!product) {
        console.error('Продукт не найден:', currentProduct);
        return;
    }
    
    const selectedVolume = product.volumes[selectedVolumeIndex];
    if (!selectedVolume) {
        console.error('Объем не найден');
        return;
    }
    
    const cartItem = {
        id: Date.now(),
        productId: currentProduct,
        name: product.name,
        volume: selectedVolume.size,
        price: selectedVolume.price,
        quantity: 1
    };
    
    console.log('Добавляем в корзину:', cartItem);
    
    // Проверяем, есть ли уже такой товар
    const existingIndex = cart.findIndex(item => 
        item.productId === cartItem.productId && item.volume === cartItem.volume
    );
    
    if (existingIndex > -1) {
        cart[existingIndex].quantity++;
    } else {
        cart.push(cartItem);
    }
    
    saveCart();
    updateCartUI();
    
    // Уведомление
    tg.showPopup({
        title: '✅ Добавлено',
        message: `${product.name} (${selectedVolume.size}) добавлен в корзину`,
        buttons: [{ type: 'ok' }]
    });
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotalPrice = document.getElementById('cartTotalPrice');
    
    // Обновляем счетчик
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Обновляем список товаров
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div style="text-align: center; color: #666; padding: 20px;">Корзина пуста</div>';
        cartTotalPrice.textContent = '0₽';
        return;
    }
    
    let totalPrice = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-volume">${item.volume} × ${item.quantity} шт.</div>
            </div>
            <div class="cart-item-right">
                <div class="cart-item-price">${itemTotal.toLocaleString('ru-RU')}₽</div>
                <button class="remove-item-btn" onclick="removeFromCart(${item.id})">
                    Удалить
                </button>
            </div>
        `;
        cartItems.appendChild(itemElement);
    });
    
    cartTotalPrice.textContent = `${totalPrice.toLocaleString('ru-RU')}₽`;
}

function saveCart() {
    localStorage.setItem('parfumCart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('parfumCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

// Страница товара
function showProductPage(productId) {
    console.log('Показываем страницу товара ID:', productId);
    
    currentProduct = productId;
    const product = products[productId];
    
    if (!product) {
        console.error('Продукт не найден:', productId);
        return;
    }
    
    console.log('Найден продукт:', product);
    
    // Заполняем данные
    document.getElementById('productPageTitle').textContent = product.name;
    document.getElementById('productPageName').textContent = product.name;
    document.getElementById('productPageDescription').textContent = product.description;
    
    // Устанавливаем изображение для карточки товара
    const productImage = document.getElementById('productPageImage');
    if (productImage) {
        console.log('Устанавливаем изображение товара:', product.productImage);
        productImage.src = product.productImage;
        productImage.alt = product.name;
    }
    
    // Заполняем объемы
    const volumeOptions = document.getElementById('volumeOptions');
    volumeOptions.innerHTML = '';
    
    product.volumes.forEach((volume, index) => {
        const option = document.createElement('div');
        option.className = `volume-option ${index === 0 ? 'active' : ''}`;
        option.textContent = `${volume.size} - ${volume.price.toLocaleString('ru-RU')}₽`;
        option.addEventListener('click', () => selectVolume(index));
        volumeOptions.appendChild(option);
    });
    
    // Устанавливаем первый объем
    selectVolume(0);
    
    // Показываем страницу товара и скрываем главную
    productPage.style.display = 'block';
    document.querySelector('.container').style.display = 'none';
}

function hideProductPage() {
    productPage.style.display = 'none';
    document.querySelector('.container').style.display = 'block';
}

function selectVolume(index) {
    selectedVolumeIndex = index;
    const product = products[currentProduct];
    const volume = product.volumes[index];
    
    // Обновляем активный класс
    document.querySelectorAll('.volume-option').forEach((opt, i) => {
        opt.classList.toggle('active', i === index);
    });
    
    // Обновляем цену
    document.getElementById('productPagePrice').textContent = `${volume.price.toLocaleString('ru-RU')}₽`;
}

// Модалки
function openCartModal() {
    cartModal.style.display = 'block';
}

function closeCartModal() {
    cartModal.style.display = 'none';
}

function openOrderModal() {
    if (cart.length === 0) {
        tg.showPopup({
            title: 'Корзина пуста',
            message: 'Добавьте товары в корзину',
            buttons: [{ type: 'ok' }]
        });
        return;
    }
    
    closeCartModal();
    
    // Формируем детали заказа
    const orderSummary = document.getElementById('orderSummary');
    let summaryHTML = '';
    let totalPrice = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        summaryHTML += `<div>${item.name} (${item.volume}) × ${item.quantity} шт. - ${itemTotal.toLocaleString('ru-RU')}₽</div>`;
    });
    
    orderSummary.innerHTML = summaryHTML;
    document.getElementById('summaryTotal').textContent = `${totalPrice.toLocaleString('ru-RU')}₽`;
    
    orderModal.style.display = 'block';
}

function closeOrderModal() {
    orderModal.style.display = 'none';
}

// Отправка заказа
async function submitOrder(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('.submit-order-btn');
    const originalText = submitBtn.textContent;
    
    try {
        submitBtn.textContent = '⏳ Отправляем...';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        
        // Формируем данные заказа
        const orderData = {
            cart: cart,
            total_price: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            total_items: cart.reduce((sum, item) => sum + item.quantity, 0),
            customer_name: document.getElementById('customerName').value || 'Не указано',
            telegram_tag: userTelegramTag,
            delivery_type: currentDelivery,
            address: currentDelivery !== 'pickup' ? document.getElementById('address').value : 'Самовывоз: м. Авиамоторная',
            comments: document.getElementById('comments').value || 'Нет комментариев'
        };
        
        // Отправляем на сервер
        const response = await fetch('/place_order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            submitBtn.textContent = '✅ Успешно!';
            
            // Очищаем корзину
            cart = [];
            saveCart();
            updateCartUI();
            
            // Закрываем через 1.5 секунды
            setTimeout(() => {
                closeOrderModal();
                closeCartModal();
                
                tg.showPopup({
                    title: '🎉 Заказ оформлен!',
                    message: 'Я свяжусь с вами в Telegram в течение 5 минут',
                    buttons: [{ type: 'ok' }]
                });
                
                // Сбрасываем форму
                document.getElementById('orderForm').reset();
                document.getElementById('addressField').style.display = 'none';
                
            }, 1500);
            
        } else {
            throw new Error(result.error);
        }
        
    } catch (error) {
        submitBtn.textContent = '❌ Ошибка';
        
        tg.showPopup({
            title: 'Ошибка',
            message: 'Не удалось отправить заказ. Попробуйте снова',
            buttons: [{ type: 'ok' }]
        });
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }, 2000);
        
        console.error('Order error:', error);
    }
}

// Глобальные функции
window.removeFromCart = removeFromCart;
window.closeCartModal = closeCartModal;
window.closeOrderModal = closeOrderModal;