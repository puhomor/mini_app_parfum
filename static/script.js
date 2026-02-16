// Telegram Web App инициализация
const tg = window.Telegram.WebApp;
tg.expand();
tg.setHeaderColor('#000000');
tg.setBackgroundColor('#000000');

// Данные о товарах с дополнительными полями
const products = {
    1: {
        brand: "Cerruti", // НЕВИДИМОЕ ПОЛЕ ДЛЯ ПОИСКА
        name: "Cerruti 1881 Pour Femme, 50ml",
        description: "Верхние ноты\nМимоза, фиалка, бергамот, ирис, фрезия, ромашка, роза\n\nНоты сердца\nЖасмин, флердоранж, кориандр, герань, гвоздика, жасминовая эссенция\n\nБазовые ноты\nДревесные аккорды, мускус, сандал, амбра, ваниль, кедр\n\nЦена ориентировочная. Точную стоимость сообщим после оформления заказа.",
        volumes: [
            { size: "50ml", price: 2850, oldPrice: 3350 }
        ],
        catalogImage: "/static/images/11.jpg",
        productImage: "/static/images/11.jpg",
        additionalImages: [ // ДОПОЛНИТЕЛЬНЫЕ ФОТО
            "/static/images/13.jpg",
            "/static/images/12.jpg"
        ],
        badge: "🔥",
        retailerLink: "https://www.letu.ru/product/cerutti-1881-tualetnaya-voda-1881-pour-femme/155400333/sku/170800550"
    },
    2: {
        brand: "Cacharel",
        name: "Cacharel Noa, 50ml",
        description: "Верхние ноты\nБелый мускус, Пион, Фрезия, Зеленые ноты, Персик, Слива\n\nНоты сердца\nЛилия, Ландыш, Зеленая трава, Жасмин, Иланг-иланг, Роза\n\nБазовые ноты\nКофе, Ваниль, Сандал, Кориандр, Ладан, Бобы тонка, Кедр\n\nЦена ориентировочная. Точную стоимость сообщим после оформления заказа.",
        volumes: [
            { size: "50ml", price: 3500, oldPrice: 4700 }
        ],
        catalogImage: "/static/images/21.jpg",
        productImage: "/static/images/21.jpg",
        additionalImages: [
            "/static/images/22.jpg"
        ],
        badge: "NEW",
        retailerLink: "https://www.letu.ru/product/cacharel-zhenskaya-tualetnaya-voda-noa/153500274/sku/168900534"
    },
    3: {
        brand: "Calvin Klein",
        name: "Calvin Klein Truth, 100ml",
        description: "Верхние ноты\nБамбук, Клевер, Бергамот, Ветивер, Лимон и Пачули\n\nНоты сердца\nЛилия, Пион, Сандал, Мимоза, Цветок шелкового дерева и Ежевика\n\nЦена ориентировочная. Точную стоимость сообщим после оформления заказа.",
        volumes: [
            { size: "100ml", price: 3800, oldPrice: 5000 }
        ],
        catalogImage: "/static/images/33.png",
        productImage: "/static/images/33.png",
        additionalImages: [
            "/static/images/34.png",
            "/static/images/32.jpg"
        ],
        badge: "🔥",
        retailerLink: "https://www.letu.ru/product/calvin-klein-parfyumernaya-voda-truth/167900118"
    },
    4: {
        brand: "Calvin Klein",
        name: "Calvin Klein Eternity Air For Women, 100ml",
        description: "Верхняя нота\nНебесный Аккорд, Грейпфрут\n\nНота сердца\nГруша, Пион, Ландыш\n\nБазовая нота\nКедр, Мускус, Серая амбра\n\nЦена ориентировочная. Точную стоимость сообщим после оформления заказа.",
        volumes: [
            { size: "100ml", price: 6450, oldPrice: 8700 }
        ],
        catalogImage: "/static/images/41.jpg",
        productImage: "/static/images/41.jpg",
        additionalImages: [
            "/static/images/42.WEBP",
            "/static/images/43.WEBP",
            "/static/images/44.WEBP"
        ],
        badge: "⭐",
        retailerLink: "https://goldapple.ru/80116000003-eternity-air-for-women/"
    },
    5: {
        brand: "LANVIN",
        name: "Lanvin Eclat D'Arpege, 100ml",
        description: "Верхние ноты\nЗеленая сирень, листья сицилийского лимона, чай\n\nНоты сердца\nПион, китайский османтус, глициния (вистерия), цветок персика, зеленый чай\n\nБазовые ноты\nБелый мускус, амбра, ливанский кедр\n\nЦена ориентировочная. Точную стоимость сообщим после оформления заказа.",
        volumes: [
            { size: "100ml", price: 6960, oldPrice: 9930 }
        ],
        catalogImage: "/static/images/51.WEBP",
        productImage: "/static/images/51.WEBP",
        additionalImages: [
            "/static/images/52.WEBP",
            "/static/images/53.WEBP",
            "/static/images/54.WEBP"
        ],
        badge: "🔥",
        retailerLink: "https://goldapple.ru/7330400003-eclat-d-arpege/"
    },
    6: {
        brand: "Guerlain",
        name: "Guerlain LUI, 50ml",
        description: "Верхние ноты\nГруша (свежесть, сочность) и Бергамот\n\nСредние ноты (сердце)\nБензоин, Гвоздика\n\nБазовые ноты\nКожа, Дым, Ваниль, Древесные ноты, Мускус\n\nЦена ориентировочная. Точную стоимость сообщим после оформления заказа.",
        volumes: [
            { size: "50ml", price: 18900, oldPrice: 27000 }
        ],
        catalogImage: "/static/images/61.WEBP",
        productImage: "/static/images/61.WEBP",
        additionalImages: [
            "/static/images/62.WEBP"
        ],
        badge: "🔥",
        retailerLink: "https://randewoo.ru/product/guerlain-lui?ysclid=mkp5ymju7w973006428&utm_source=yandex.ru&utm_medium=organic&utm_campaign=yandex.ru&utm_referrer=yandex.ru"
    },

    7: {
        brand: "LALIQUE",
        name: "LALIQUE L'Amour, 30ml",
        description: "Верхние ноты\nШафран, ягоды можжевельника, китайский грейпфрут (или помело)\n\nНоты сердца (средние)\nЧерная фиалка, кожа, иногда отмечается роза\n\nБазовые ноты\nМалина, ветивер, кашмеран\n\nЦена ориентировочная. Точную стоимость сообщим после оформления заказа.",
        volumes: [
            { size: "30ml", price: 5520, oldPrice: 7900 }
        ],
        catalogImage: "/static/images/71.WEBP",
        productImage: "/static/images/71.WEBP",
        additionalImages: [
            "/static/images/72.WEBP",
            "/static/images/73.WEBP",
            "/static/images/74.WEBP"
        ],
        badge: "🔥",
        retailerLink: "https://www.letu.ru/product/lalique-l-amour/3900046"
    },

    8: {
        brand: "BYREDO",
        name: "BYREDO black saffron, 50ml",
        description: "Верхние ноты\nКожи, Шафран\n\nНоты сердца\nГелиотроп, Фиалка\n\nБазовые ноты\nДревесные ноты, Малина, Кедр\n\nЦена ориентировочная. Точную стоимость сообщим после оформления заказа.",
        volumes: [
            { size: "50ml", price: 13640, oldPrice: 19483 }
        ],
        catalogImage: "/static/images/81.WEBP",
        productImage: "/static/images/81.WEBP",
        additionalImages: [
            "/static/images/82.WEBP"
        ],
        badge: "🔥",
        retailerLink: "https://goldapple.ru/26731900002-black-saffron/"
    },

    9: {
        brand: "KILIAN",
        name: "KILIAN PARIS Born To Be Unforgettable, 50ml",
        description: "Верхние ноты\nБергамот, Грейпфрут, Мандарин\n\nНоты сердца\nГерань, Лаванда, Шалфей мускатный\n\nБазовые ноты\nПачули, Ветивер, Дубовый мох\n\nЦена ориентировочная. Точную стоимость сообщим после оформления заказа.",
        volumes: [
            { size: "50ml", price: 9650, oldPrice: 13770 }
        ],
        catalogImage: "/static/images/91.jpg",
        productImage: "/static/images/91.jpg",
        additionalImages: [
            "/static/images/92.jpg"
        ],
        badge: "🔥",
        retailerLink: "https://www.letu.ru/product/kilian-paris-born-to-be-unforgettable/153700592/sku/169100777"
    },

    10: {
        brand: "JIMMY CHOO",
        name: "JIMMY CHOO Floral, 90ml",
        description: "Верхние ноты\nМандарин, Бергамот\n\nНоты сердца\nФрезия, Жасмин, Нектарин\n\nБазовые ноты\nКедр, Корица, Мускус\n\nЦена ориентировочная. Точную стоимость сообщим после оформления заказа.",
        volumes: [
            { size: "90ml", price: 7800, oldPrice: 11150 }
        ],
        catalogImage: "/static/images/101.jpg",
        productImage: "/static/images/101.jpg",
        additionalImages: [
            "/static/images/102.jpg"
        ],
        badge: "🔥",
        retailerLink: "https://www.letu.ru/product/jimmy-choo-floral/71200029/sku/85600036"
    },

    11: {
        brand: "BANDERAS",
        name: "BANDERAS Blue Seduction, 100ml",
        description: "Верхние ноты\nАрбуз, Огурец, Бергамот, Мандарин\n\nНоты сердца\nАнанас, Дыня, Водные ноты, Базилик\n\nБазовые ноты\nМускус, Древесные ноты, Амбра\n\nЦена ориентировочная. Точную стоимость сообщим после оформления заказа.",
        volumes: [
            { size: "100ml", price: 2800, oldPrice: 3550 }
        ],
        catalogImage: "/static/images/111.jpg",
        productImage: "/static/images/111.jpg",
        additionalImages: [
            "/static/images/114.jpg",
            "/static/images/113.jpg",
            "/static/images/112.jpg"
        ],
        badge: "🔥",
        retailerLink: "https://www.letu.ru/product/antonio-banderas-blue-seduction-for-men/11288/sku/43583"
    },

    12: {
        brand: "Sergio Tacchini",
        name: "Sergio Tacchini Donna, 75ml",
        description: "Верхние ноты\nПрохладная свежесть, Озон, Арбуз, Дыня\n\nНоты сердца\nЦикламен, Пион, Ландыш, Магнолия, Гардения\n\nБазовые ноты\nСандаловое дерево, Мускус, Водяные фрукты\n\n⚠️ Цена ориентировочная. Точную стоимость сообщим после оформления заказа.",
        volumes: [
            { size: "75ml", price: 2400, oldPrice: 3300 },
            { size: "75ml tester", price: 2100, oldPrice: 2900 },
            { size: "50ml", price: 2100, oldPrice: 2590 }
        ],
        catalogImage: "/static/images/121.webp",
        productImage: "/static/images/121.webp",
        additionalImages: [
            
        ],
        badge: "🔥",
        retailerLink: "https://randewoo.ru/product/sergio-tacchini-donna"
    },

    13: {
        brand: "Baldessarini",
        name: "Baldessarini Ambre, 90ml",
        description: "Верхние ноты\nМандарин, Красное яблоко\n\nНоты сердца\nКожа, Фиалка, Лабданум\n\nБазовые ноты\nАмбра, Ваниль, Дуб\n\n⚠️ Цена ориентировочная. Точную стоимость сообщим после оформления заказа.",
        volumes: [
            { size: "90ml", price: 4200, oldPrice: 5850 }
        ],
        catalogImage: "/static/images/131.jpg",
        productImage: "/static/images/131.jpg",
        additionalImages: [
            "/static/images/132.jpg",
            "/static/images/133.jpg",
            "/static/images/134.jpg"
        ],
        badge: "🔥",
        retailerLink: "https://goldapple.ru/7032100002-ambre?srsltid=AfmBOoo57oVRdnb2bCr3MsZc7Ykl8tydXSHljU-Bj54ngZOfj4H9wfu1"
    },

    14: {
        brand: "Trussardi",
        name: "Trussardi My Land, 100ml",
        description: "Верхние ноты\nБергамот, Зеленый мандарин\n\nНоты сердца\nЛаванда, Фиалка, Калон\n\nБазовые ноты\nКожа, Ветивер, Бобы тонка, Кашмирское дерево\n\n⚠️ Цена ориентировочная. Точную стоимость сообщим после оформления заказа.",
        volumes: [
            { size: "100ml", price: 3970, oldPrice: 5200 }
        ],
        catalogImage: "/static/images/142.jpg",
        productImage: "/static/images/142.jpg",
        additionalImages: [
            "/static/images/141.jpg"
        ],
        badge: "🔥",
        retailerLink: "https://www.letu.ru/product/trussardi-my-land/2600010/sku/2700001"
    },
};

// Функция для создания описания товара
function createProductDescription(product) {
    const description = product.description || '';
    const retailerLink = product.retailerLink || ''; // Берем ссылку из данных товара
    
    let html = '';
    
    // 1. Ссылка на ритейлера (если есть)
    if (retailerLink) {
        html += `<div class="retailer-info">
            <div class="retailer-title">Эти же духи в ритейле:</div>
            <a href="${retailerLink}" target="_blank" class="retailer-link">
                ${retailerLink}
            </a>
            <div class="retailer-note">(цена в 1.5-2 раза выше нашей)</div>
        </div>`;
    }
    
    // 2. Ноты (если есть)
    if (description) {
        html += `<div class="notes-section">
            <div class="notes-title">Пирамида аромата:</div>
            <div class="notes-content">${formatNotes(description)}</div>
        </div>`;
    }
    
    return html;
}

function formatNotes(description) {
    const lines = description.split('\n');
    let html = '';
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line === '') {
            html += '<br>';
            continue;
        }
        // Более гибкая проверка: ищем ключевые слова в строке
        if (line.toLowerCase().includes('верхние ноты') || 
            line.toLowerCase().includes('ноты сердца') || 
            line.toLowerCase().includes('средние ноты') || 
            line.toLowerCase().includes('базовые ноты') ||
            line.toLowerCase().includes('нота')) {
            html += `<div class="note-category">${line}</div>`;
        } 
        // Проверяем, содержит ли строка "цена ориентировочная"
        else if (line.toLowerCase().includes('цена ориентировочная')) {
            html += `<div class="price-warning-note">${line}</div>`;
        }
        else {
            html += `<div class="note-item">${line}</div>`;
        }
    }
    return html;
}

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
// Установка разных изображений для товаров в каталоге
function setupCatalogImages() {
    console.log('Устанавливаем изображения для каталога');
    
    productCards.forEach(card => {
        const productId = parseInt(card.dataset.productId);
        const product = products[productId];
        
        if (product) {
            // Устанавливаем изображение
            const imgElement = card.querySelector('.product-image img');
            if (imgElement) {
                imgElement.src = product.catalogImage;
                imgElement.alt = product.name;
            }
            
            // Устанавливаем невидимое поле бренда для поиска
            const brandElement = document.createElement('div');
            brandElement.className = 'product-brand';
            brandElement.textContent = product.brand;
            card.appendChild(brandElement);
            
            // Устанавливаем цены В СТОЛБИК
            const priceContainer = card.querySelector('.product-price-container');
            if (priceContainer) {
                const volume = product.volumes[0]; // Первый объем по умолчанию
                const discountPercent = Math.round((1 - volume.price / volume.oldPrice) * 100);
                
                priceContainer.innerHTML = `
                    <div class="catalog-prices">
                        <div class="catalog-old-price">${volume.oldPrice.toLocaleString('ru-RU')}₽</div>
                        <div class="catalog-current-price-row">
                            <span class="catalog-current-price">${volume.price.toLocaleString('ru-RU')}₽</span>
                            <span class="catalog-discount">-${discountPercent}%</span>
                        </div>
                    </div>
                    <div class="product-name">${product.name}</div>
                `;
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
        oldPrice: selectedVolume.oldPrice,
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

// Функция для смены дополнительных изображений
function changeAdditionalImage(imageIndex) {
    const product = products[currentProduct];
    if (!product || !product.additionalImages || !product.additionalImages[imageIndex]) return;
    
    const mainImage = document.getElementById('productPageImage');
    mainImage.src = product.additionalImages[imageIndex];
    
    // Обновляем активный класс
    document.querySelectorAll('.additional-image').forEach((img, index) => {
        img.classList.toggle('active', index === imageIndex);
    });
}

// Страница товара
// Страница товара
function showProductPage(productId) {
    // Сохраняем текущую позицию скролла
    localStorage.setItem('catalogScrollPosition', window.scrollY);
    console.log('Показываем страницу товара ID:', productId);
    
    currentProduct = productId;
    const product = products[productId];
    
    if (!product) {
        console.error('Продукт не найден:', productId);
        return;
    }
    
    console.log('Найден продукт:', product);
    console.log('Дополнительные изображения:', product.additionalImages);
    
    // Заполняем данные
    document.getElementById('productPageTitle').textContent = product.name;
    document.getElementById('productPageName').textContent = product.name;
    // Устанавливаем описание с ссылкой на ритейлера и нотами
    const descriptionElement = document.getElementById('productPageDescription');
    descriptionElement.innerHTML = createProductDescription(product);
    
    // Создаем слайдер с фотографиями
    const additionalImagesContainer = document.getElementById('productImagesSection');
    if (additionalImagesContainer) {
        additionalImagesContainer.innerHTML = '';
        
        // ВСЕ ИЗОБРАЖЕНИЯ (основное + дополнительные)
        const allImages = [product.productImage, ...(product.additionalImages || [])];
        
        // Создаем контейнер для слайдера
        const sliderContainer = document.createElement('div');
        sliderContainer.className = 'product-images-slider';
        sliderContainer.id = 'imageSlider';
        
        // Создаем трек для слайдов
        const sliderTrack = document.createElement('div');
        sliderTrack.className = 'slider-track';
        
        // Добавляем все фото в слайдер
        allImages.forEach((imageUrl, index) => {
            const slide = document.createElement('div');
            slide.className = 'slide';
            slide.dataset.index = index;
            
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = `${product.name} - фото ${index + 1}`;
            img.loading = 'lazy';
            
            // Обработчик ошибок загрузки изображения
            img.onerror = function() {
                console.error('Ошибка загрузки изображения:', imageUrl);
                this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 100 100"><rect width="100" height="100" fill="%230f0f15"/><text x="50" y="55" font-family="Arial" font-size="10" fill="%23666" text-anchor="middle">Изображение</text><text x="50" y="70" font-family="Arial" font-size="10" fill="%23666" text-anchor="middle">не загружено</text></svg>';
            };
            
            slide.appendChild(img);
            sliderTrack.appendChild(slide);
        });
        
        sliderContainer.appendChild(sliderTrack);
        
        // Счетчик фото
        const imageCounter = document.createElement('div');
        imageCounter.className = 'image-counter';
        imageCounter.id = 'imageCounter';
        imageCounter.textContent = `1 / ${allImages.length}`;
        sliderContainer.appendChild(imageCounter);
        
        // Стрелки навигации
        const prevArrow = document.createElement('button');
        prevArrow.className = 'slider-arrow prev';
        prevArrow.innerHTML = '◀';
        prevArrow.title = 'Предыдущее фото';
        
        const nextArrow = document.createElement('button');
        nextArrow.className = 'slider-arrow next';
        nextArrow.innerHTML = '▶';
        nextArrow.title = 'Следующее фото';
        
        sliderContainer.appendChild(prevArrow);
        sliderContainer.appendChild(nextArrow);
        
        // Индикаторы (точки)
        const indicator = document.createElement('div');
        indicator.className = 'slider-indicator';
        
        allImages.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
            dot.dataset.index = index;
            indicator.appendChild(dot);
        });
        
        sliderContainer.appendChild(indicator);
        
        // Добавляем слайдер на страницу
        additionalImagesContainer.appendChild(sliderContainer);
        
        // Миниатюры (если фото больше 1)
        if (allImages.length > 1) {
            const thumbnailsContainer = document.createElement('div');
            thumbnailsContainer.className = 'image-thumbnails';
            
            allImages.forEach((imageUrl, index) => {
                const thumbnail = document.createElement('div');
                thumbnail.className = `thumbnail-item ${index === 0 ? 'active' : ''}`;
                thumbnail.dataset.index = index;
                
                const img = document.createElement('img');
                img.src = imageUrl;
                img.alt = `Миниатюра ${index + 1}`;
                
                thumbnail.appendChild(img);
                thumbnailsContainer.appendChild(thumbnail);
                
                // Обработчик клика по миниатюре
                thumbnail.addEventListener('click', () => {
                    goToSlide(index);
                });
            });
            
            additionalImagesContainer.appendChild(thumbnailsContainer);
        }
        
        // Инициализируем слайдер
        initImageSlider(allImages.length);
    }
    
    // Заполняем объемы
    // Заполняем объемы - ТОЛЬКО ОБЪЕМ И НОВАЯ ЦЕНА
    const volumeOptions = document.getElementById('volumeOptions');
    volumeOptions.innerHTML = '';
    
    product.volumes.forEach((volume, index) => {
        const option = document.createElement('div');
        option.className = `volume-option ${index === 0 ? 'active' : ''}`;
        option.innerHTML = `
            <div class="volume-size">${volume.size}</div>
            <div class="volume-price">${volume.price.toLocaleString('ru-RU')}₽</div>
        `;
        option.addEventListener('click', () => selectVolume(index));
        volumeOptions.appendChild(option);
    });
    
    // Устанавливаем первый объем
    selectVolume(0);
    
    // Показываем страницу товара и скрываем главную
    productPage.style.display = 'block';
    document.querySelector('.container').style.display = 'none';
}

// Восстанавливаем позицию скролла при возврате
function hideProductPage() {
    productPage.style.display = 'none';
    document.querySelector('.container').style.display = 'block';
    
    // Восстанавливаем позицию скролла
    const savedPosition = localStorage.getItem('catalogScrollPosition');
    if (savedPosition) {
        setTimeout(() => {
            window.scrollTo(0, parseInt(savedPosition));
            localStorage.removeItem('catalogScrollPosition'); // Очищаем после восстановления
        }, 50); // Небольшая задержка для гарантии
    }
}

// Слайдер фотографий
let currentSlide = 0;
let totalSlides = 0;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;

function initImageSlider(slidesCount) {
    totalSlides = slidesCount;
    currentSlide = 0;
    
    const sliderTrack = document.querySelector('.slider-track');
    const prevArrow = document.querySelector('.slider-arrow.prev');
    const nextArrow = document.querySelector('.slider-arrow.next');
    const dots = document.querySelectorAll('.slider-dot');
    const thumbnails = document.querySelectorAll('.thumbnail-item');
    
    if (!sliderTrack) return;
    
    // Настройка слайдера
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Обработчики стрелок
    prevArrow?.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextArrow?.addEventListener('click', () => goToSlide(currentSlide + 1));
    
    // Обработчики точек
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.dataset.index);
            goToSlide(index);
        });
    });
    
    // Свайп для мобильных
    sliderTrack.addEventListener('touchstart', touchStart);
    sliderTrack.addEventListener('touchmove', touchMove);
    sliderTrack.addEventListener('touchend', touchEnd);
    
    // Клик для десктопов
    sliderTrack.addEventListener('mousedown', touchStart);
    sliderTrack.addEventListener('mousemove', touchMove);
    sliderTrack.addEventListener('mouseup', touchEnd);
    sliderTrack.addEventListener('mouseleave', touchEnd);
    
    // Клавиатура
    document.addEventListener('keydown', (e) => {
        if (!productPage.style.display || productPage.style.display === 'none') return;
        
        if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
        if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
    });
}

function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    
    currentSlide = index;
    updateSlider();
}

function updateSlider() {
    const sliderTrack = document.querySelector('.slider-track');
    const dots = document.querySelectorAll('.slider-dot');
    const thumbnails = document.querySelectorAll('.thumbnail-item');
    const imageCounter = document.getElementById('imageCounter');
    
    if (sliderTrack) {
        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    // Обновляем точки
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
    
    // Обновляем миниатюры
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentSlide);
        
        // Прокручиваем миниатюры, если нужно
        if (index === currentSlide) {
            thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    });
    
    // Обновляем счетчик
    if (imageCounter) {
        imageCounter.textContent = `${currentSlide + 1} / ${totalSlides}`;
    }
}

// Функции для свайпа/перетаскивания
function touchStart(event) {
    if (event.type === 'touchstart') {
        startPos = event.touches[0].clientX;
    } else {
        startPos = event.clientX;
        event.preventDefault(); // Предотвращаем выделение текста
    }
    
    isDragging = true;
    const sliderTrack = document.querySelector('.slider-track');
    sliderTrack.style.transition = 'none';
}

function touchMove(event) {
    if (!isDragging) return;
    
    let currentPosition;
    if (event.type === 'touchmove') {
        currentPosition = event.touches[0].clientX;
    } else {
        currentPosition = event.clientX;
    }
    
    const diff = currentPosition - startPos;
    const sliderTrack = document.querySelector('.slider-track');
    
    if (sliderTrack) {
        currentTranslate = prevTranslate + diff;
        sliderTrack.style.transform = `translateX(calc(-${currentSlide * 100}% + ${currentTranslate}px))`;
    }
}

function touchEnd() {
    if (!isDragging) return;
    
    isDragging = false;
    const sliderTrack = document.querySelector('.slider-track');
    sliderTrack.style.transition = 'transform 0.3s ease';
    
    const movedBy = currentTranslate;
    
    // Если свайп был достаточно сильным - меняем слайд
    if (Math.abs(movedBy) > 50) {
        if (movedBy > 0) {
            goToSlide(currentSlide - 1); // Свайп вправо
        } else {
            goToSlide(currentSlide + 1); // Свайп влево
        }
    } else {
        // Возвращаем на текущий слайд
        updateSlider();
    }
    
    prevTranslate = 0;
    currentTranslate = 0;
}

// Вспомогательные функции для создания элементов
function createImageThumbnail(imageUrl, altText, index, isActive) {
    const container = document.createElement('div');
    container.className = `additional-image-thumb ${isActive ? 'active' : ''}`;
    container.style.cssText = `
        width: 80px;
        height: 80px;
        border-radius: 8px;
        overflow: hidden;
        cursor: pointer;
        border: 2px solid ${isActive ? '#00bfff' : 'transparent'};
        flex-shrink: 0;
    `;
    
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = altText;
    img.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: cover;
    `;
    img.onerror = function() {
        this.style.display = 'none';
        this.parentElement.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#111;color:#666;font-size:0.8em;">Нет фото</div>';
    };
    
    container.appendChild(img);
    container.addEventListener('click', () => {
        document.getElementById('productPageImage').src = imageUrl;
        document.querySelectorAll('.additional-image-thumb').forEach(thumb => {
            thumb.style.borderColor = 'transparent';
        });
        container.style.borderColor = '#00bfff';
        
        // Обновляем точки
        const dots = document.querySelectorAll('.image-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    });
    
    return container;
}

function createDotIndicator(index, isActive) {
    const dot = document.createElement('div');
    dot.className = `image-dot ${isActive ? 'active' : ''}`;
    dot.style.cssText = `
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: ${isActive ? '#00bfff' : '#333'};
        cursor: pointer;
    `;
    dot.addEventListener('click', () => {
        changeAdditionalImage(index);
        document.querySelectorAll('.image-dot').forEach(d => {
            d.style.background = '#333';
        });
        dot.style.background = '#00bfff';
    });
    return dot;
}

// Функция для смены изображений
function changeAdditionalImage(imageIndex) {
    const product = products[currentProduct];
    if (!product) return;
    
    let imageUrl;
    if (imageIndex === 0) {
        imageUrl = product.productImage;
    } else {
        imageUrl = product.additionalImages[imageIndex - 1];
    }
    
    if (imageUrl) {
        const mainImage = document.getElementById('productPageImage');
        mainImage.src = imageUrl;
        
        // Обновляем активный класс у миниатюр
        document.querySelectorAll('.additional-image-thumb').forEach((thumb, index) => {
            thumb.style.borderColor = index === imageIndex ? '#00bfff' : 'transparent';
        });
        
        // Обновляем активный класс у точек
        document.querySelectorAll('.image-dot').forEach((dot, index) => {
            dot.style.background = index === imageIndex ? '#00bfff' : '#333';
        });
    }
}

function selectVolume(index) {
    selectedVolumeIndex = index;
    const product = products[currentProduct];
    const volume = product.volumes[index];
    
    // Обновляем активный класс
    document.querySelectorAll('.volume-option').forEach((opt, i) => {
        opt.classList.toggle('active', i === index);
    });
    
    // Обновляем цены - ТОЛЬКО НОВАЯ ЦЕНА БЕЗ СТАРОЙ
    document.getElementById('productPagePrice').innerHTML = `
        <div class="product-page-price-row">
            <span class="product-page-old-price">${volume.oldPrice.toLocaleString('ru-RU')}₽</span>
            <span class="product-page-current-price">${volume.price.toLocaleString('ru-RU')}₽</span>
            <span class="product-page-discount">-${Math.round((1 - volume.price / volume.oldPrice) * 100)}%</span>
        </div>
    `;
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
    let totalOldPrice = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        const itemOldTotal = item.oldPrice * item.quantity;
        totalPrice += itemTotal;
        totalOldPrice += itemOldTotal;
        summaryHTML += `<div>${item.name} (${item.volume}) × ${item.quantity} шт. - ${itemTotal.toLocaleString('ru-RU')}₽</div>`;
    });
    
    const discountPercent = Math.round((1 - totalPrice / totalOldPrice) * 100);
    
    orderSummary.innerHTML = `
        ${summaryHTML}
        <div style="margin-top: 10px; color: #666; text-decoration: line-through;">
            Было: ${totalOldPrice.toLocaleString('ru-RU')}₽
        </div>
        <div style="color: #ff0080;">
            Скидка: -${discountPercent}%
        </div>
    `;
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
            total_old_price: cart.reduce((sum, item) => sum + (item.oldPrice * item.quantity), 0),
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

// Проверка ширины экрана для правильного отображения колонок
function checkScreenWidth() {
    const screenWidth = window.innerWidth;
    const catalog = document.querySelector('.catalog');
    
    if (catalog) {
        if (screenWidth >= 375 && screenWidth <= 600) {
            catalog.style.gridTemplateColumns = 'repeat(2, 1fr)';
            catalog.style.maxWidth = '100%';
        }
        
        if (screenWidth < 375) {
            catalog.style.gridTemplateColumns = '1fr';
            catalog.style.maxWidth = '340px';
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);
    setTimeout(checkScreenWidth, 500);
});